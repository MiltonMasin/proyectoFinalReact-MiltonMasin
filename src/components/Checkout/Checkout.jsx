import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { getDocs, collection, query, where, documentId, writeBatch, addDoc } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig"

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    })
    const { cart, total, clearCart } = useContext(CartContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const createOrder = async () => {
        try {
            setLoading(true);
    
            // Verificar si los campos requeridos tienen valores
            if (!formData.name || !formData.email || !formData.phone|| !total) {
                console.error("Por favor, complete todos los campos");
                setLoading(false);
                return;
            }
    
            const objOrder = {
                buyer: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                },
                items: cart,
                total
            }
    
            const batch = writeBatch(db);
            const outOfStock = [];
            const ids = cart.map(prod => prod.id);
    
            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids));
    
            const querySnapshot = await getDocs(productsCollection);
            const { docs } = querySnapshot;
    
            docs.forEach(doc => {
                const data = doc.data();
                const stockDb = data.stock;
    
                const productAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productAddedToCart.quantity;
    
                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...data });
                }
            });
    
            if (outOfStock.length === 0) {
                batch.commit();
    
                const orderCollection = collection(db, 'orders');
                const { id } = await addDoc(orderCollection, objOrder);
    
                clearCart();
                setOrderId(id);
            } else {
                console.error('Hay productos que no tienen stock disponible');
            }
        } catch (error) {
            console.error('Hubo un error en la generacion de la orden:', error);
        } finally {
            setLoading(false);
        }
    }
    if(loading) {
        return <h1>Su orden está siendo generada...</h1>
    }

    if(orderId) {
        return <h1>El id de su orden es: {orderId}</h1>
    }

    return  (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={(e) => { e.preventDefault(); createOrder(); }} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                <br />
                <label htmlFor="phone">Teléfono:</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                <br />
                <button type="submit">Generar orden de compra</button>
            </form>
            <h2>Resumen de la Orden:</h2>
            <ul>
                {cart.map((product) => (
                    <li key={product.id}>
                        {product.name} - Cantidad: {product.quantity} - Precio Unitario: ${product.price * product.quantity}
                    </li>
                ))}
                <li>Total: ${total}</li>
            </ul>
        </div>
    )
}

export default Checkout



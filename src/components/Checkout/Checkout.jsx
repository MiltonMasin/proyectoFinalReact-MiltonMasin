import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { getDocs, collection, query, where, documentId, writeBatch, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
    const { cart, total, clearCart } = useContext(CartContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const createOrder = async () => {
        try {
            setLoading(true);
            const objOrder = {
                buyer: userData,
                items: cart,
                total
            };

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
            console.error('Hubo un error en la generación de la orden', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1>Su orden está siendo generada...</h1>;
    }

    if (orderId) {
        return <h1>El id de su orden es: {orderId}</h1>;
    }

    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={createOrder}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Teléfono:
                    <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Generar orden de compras</button>
            </form>
        </div>
    );
};

export default Checkout;

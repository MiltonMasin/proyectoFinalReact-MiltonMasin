
import { useContext, useState} from "react"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { useNotification } from "../../notification/hooks/useNotification"
const ItemDetail = ({id, name, category, price, img, description, stock}) =>{

    const {addItem} = useContext (CartContext)

    const {showNotification} = useNotification()

    const handleOnAdd = (quantity) =>{
        const objProduxtToAdd = {
            id, name, price, quantity
        }
        console.log(objProduxtToAdd)
        console.log('Agregue al carrito: ', quantity)
        showNotification('success', `Se agrego correctamente ${quantity} ${name}`)

       /*  setQuantity(quantity) */

       addItem(objProduxtToAdd)
    }
 
    return(
        <article>
             <img src={img} style={{width:100}} />
             <h3>{name}</h3>
            <h4>{category}</h4>
            <h4>Precio: ${price}</h4>
            <h4>Descripicion:{description}</h4>
            <ItemCount onAdd={handleOnAdd} stock={stock}/>
    
        </article>

       
    )
}

export default ItemDetail
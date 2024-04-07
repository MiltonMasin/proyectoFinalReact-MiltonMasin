import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";




const CartWidget = ()=>{

    const {totalQuantity} = useContext(CartContext)

    return(
       <Link to={'/cart'}>
        <FiShoppingCart />
        {totalQuantity}
       </Link>
    )
}

export default CartWidget
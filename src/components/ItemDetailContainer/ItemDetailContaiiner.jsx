import { useEffect, useState } from "react"
import { getProductsById } from "../../../asynckMock"
import ItemDetail from "../ItemDetail/ItemDeail"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig"
const ItemDetailContainer = ()=>{
    const [product, setProduct]= useState(null)


    const {itemId}= useParams()

    useEffect(()=>{
        const productDoc= doc(db, 'products', itemId)

        getDoc(productDoc)
            .then(queryDocumentSnapshot=>{
                const data = queryDocumentSnapshot.data()
                const productAdapted = {id: queryDocumentSnapshot.id, ...data}
                setProduct(productAdapted)
            })
            .catch()
        
/*         getProductsById(itemId)
            .then(result=>{
                    setProduct(result)
            }) */
    },[itemId])

    return(
        <main>
        <h1>Detalles de productos</h1>
            <ItemDetail {...product}/>
        </main>
    )
}

export default ItemDetailContainer
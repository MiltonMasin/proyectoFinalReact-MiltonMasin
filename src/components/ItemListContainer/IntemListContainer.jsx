import { useEffect, useState, memo } from "react";
/* import { getProducts, getProductsByCategory } from "../../../asynckMock"; */
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import ItemGrid from "../ItemGrid/ItemGrid"
import { useNotification } from "../../notification/hooks/useNotification";
import {collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";

const ItemListMemoized = memo(ItemList)
const ItemGrisMemoized = memo (ItemGrid)

const ItemListContainer = ({greeting})=>{
const [products, setProducts]= useState([])

const [listView, setListView] = useState(true)

const { categoryId }= useParams()

const { showNotification } = useNotification()

const toggleView = () => {
    setListView(prevState => !prevState);
  };


  useEffect(() => {

    const productsCollection = categoryId ? (
      query(collection(db, 'products'), where('category', '==', categoryId))
  ) : (
      query(collection(db, 'products'), orderBy('name', 'desc'))
  )

    

    getDocs(productsCollection)
        .then(querySnapshot =>{
          const prodcutsAdapted = querySnapshot.docs.map(doc =>{
            const data = doc.data()
            return {id: doc.id, ...data}
          })
          setProducts(prodcutsAdapted)
        })
        .catch(error=>{
          showNotification('error', 'Hubo un error')
        })

  }, [categoryId]);


    return(
        <div>
        <h1>{greeting}</h1>
      <button onClick={toggleView} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        {listView ? 'Ver en Cuadricula' : 'Ver en Lista'}
      </button>
      {listView ?<ItemListMemoized products={products}  /> : <ItemGrisMemoized products={products} />}

        </div>

    )
}


export default ItemListContainer;    
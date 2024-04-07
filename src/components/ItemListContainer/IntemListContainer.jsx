import { useEffect, useState, memo } from "react";
/* import { getProducts, getProductsByCategory } from "../../../asynckMock"; */
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import ItemGrid from "../ItemGrid/ItemGrid"

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";

const ItemListMemoized = memo(ItemList)
const ItemGrisMemoized = memo (ItemGrid)

const ItemListContainer = ({greeting})=>{
const [products, setProducts]= useState([])

const [listView, setListView] = useState(true)

const { categoryId }= useParams()

const toggleView = () => {
    setListView(prevState => !prevState);
  };


  useEffect(() => {
    const productsCollection = collection(db, 'products');

    
  
    getDocs(productsCollection)
      .then(querySnapshot => {
        const productsAdapted = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProducts(productsAdapted); 
      })
      .catch(error => {
        showNotification('error', 'Hubo un error cargando los productos');
      });
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
 import './App.css';

import Navbar from "./components/Navbar/Navbar"
import ItemListContainer from "./components/ItemListContainer/IntemListContainer"; import ItemCount from './components/ItemCount/ItemCount';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContaiiner';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './notification/NotificationServ';
import CartView from './components/CartView/CartView';
import Checkout from './components/Checkout/Checkout';

 function App() {


  return (
    <> 
       <BrowserRouter>  {/* Dentro de esta va todo lo que no necesite una ruta y se va a mostrar siempre */} 
        <NotificationProvider>
          <CartProvider>
           <Navbar />
           <Routes> {/*Estos si dependen de la ruta de navegacion, la ruta si se ve en la url*/}
             <Route path='/' element={<ItemListContainer greeting="Bienvenidos a Barberia Don Jose"/>}></Route>
             <Route path='/category/:categoryId' element={<ItemListContainer greeting="Productos por categoria"/>}></Route>
            <Route path='/item/:itemId' element={<ItemDetailContainer/>}></Route>
            <Route path='/cart' element={<CartView/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
           </Routes>
         </CartProvider>
        </NotificationProvider> 
       </BrowserRouter>
    </>   ) }
 export default App

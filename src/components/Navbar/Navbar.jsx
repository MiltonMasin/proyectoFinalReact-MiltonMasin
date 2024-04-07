import classes from './Navbar.module.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {db} from '../../services/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'


    const Navbar = (props)=>{
        const navigate = useNavigate()
        const [categories, setCategories] = useState([])

        useEffect(()=>{
            const categoriesCollection = collection(db, 'categories')

            getDocs(categoriesCollection).then(querySnapshot=>{
                const categoriesAdapted = querySnapshot.docs.map(doc=>{
                    const data = doc.data()
                    return {id : doc.id, ...data}
                })
                setCategories(categoriesAdapted)
            })

        },[])

        return(
            <header className={classes.header}>
            <h4 onClick={()=> navigate('/')} style={{cursor: 'pointer'}}>Barberia Don Jose</h4>
            <nav>
                {
                    categories.map(cat => {
                        return <Link key={cat.id} to={`/category/${cat.slug}`}>{cat.name}</Link>
                    })
                }
           </nav>

            
            <CartWidget/>

            </header>
        )
    }

export default Navbar
import classes from './Navbar.module.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {db} from '../../services/firebase/firebaseConfig'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'


    const Navbar = (props)=>{
        const [categories, setCategories] = useState([])
        const navigate = useNavigate()

        useEffect(()=>{
            const categoriesCollection = collection(db, 'categories')
            getDocs(categoriesCollection)
            .then(querySnapshot => {
                const categoriesAdapted = querySnapshot.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data}
                })
                setCategories(categoriesAdapted)
            })
            .catch(error => {
                console.error('error')
            })
    }, [])


        


        
        return(
            <header className={classes.header}>
            <h4 onClick={()=> navigate('/')} style={{cursor: 'pointer'}}>Barberia Don Jose</h4>
            <nav>

                {
                    categories.map(cat=>{
                        return <Link key={cat.id} to={`/category/${cat.slug}`}>{cat.name}</Link>
                    })
                }
                
                {/* <Link className={`${classes.link} btn btn-primary`} to={'/'}>{props.texto0}</Link>
                <Link className={`${classes.link} btn btn-primary`} to='/category/cabello'>{props.texto1}</Link>
                <Link className={`${classes.link} btn btn-primary`} to='/category/barba'>{props.texto2}</Link>
                <Link className={`${classes.link} btn btn-primary`} to='/category/afeitado'>{props.texto3}</Link>  */}
                
                
           </nav>

            
            <CartWidget/>

            </header>
        )
    }

export default Navbar
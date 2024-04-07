import Item from "../Item/Item"


const ItemGrid=({products})=>{


    return(
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {
                products.map(products=>{
                    return <Item key={products.id} {...products} style={{ border: '1px solid #ccc', padding: '1rem' }}/>
                })
            }
        </section>
    )
}

export default ItemGrid
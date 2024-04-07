const products = [
    {
        id: '1', name: 'Pomada Opaca', price: 2500, category:'cabello', img: 'https://caballeroarmado.cl/cdn/shop/files/old-wax-fuerte-100grs-41201213473019.png?v=1696980762&width=2040',stock: 25, desription:'Descripcion Pomada'
    },
    {
        id: '2', name: 'Pomada Brillante', price: 3000, category:'cabello', img:'https://caballeroarmado.cl/cdn/shop/products/old-wax-suave-50-gr-sir-fausto-39648012501243.png?v=1696981724&width=2040', stock: 10, desription:'Descripcion Pomada'
    },
    {
        id: '3', name: 'Pomada Extra Fuerte', price: 3500, category:'cabello', img:'https://caballeroarmado.cl/cdn/shop/files/old-wax-extra-fuerte-sir-fausto-41201450189051.png?v=1696982197&width=2040', stock: 10, desription:'Descripcion Pomada'
    },
    {
        id: '4', name: 'Shampoo para Barba', price: 6000, category:'barba', img:'https://sirfausto.ar/cdn/shop/products/CSHAMPOOBARBA_1200x.jpg?v=1667575484', stock: 20, desription:'Descripcion Shampoo'
    },
    {
        id: '5', name: 'Tónico Fortalecedor Barba', price: 60000, category: 'barba', img: 'https://sirfausto.ar/cdn/shop/products/KITBARBA1_1200x.jpg?v=1661287709', stock: 15, desription:'Descripcion Fortalecedor'
    },
    {
        id: '6', name: 'Shave Oil PURE', price: 24000, category: 'afeitado', img: 'https://sirfausto.ar/cdn/shop/products/PUREANTIPOLLUTIOND-TOXBEARDSOFTENERSHAVEOIL_1200x.jpg?v=1662396336', stock: 15, desription:'Descripcion Oil'
    }
 ]


export const getProducts= ()=>{
    return new Promise ((resolve)=>{
        setTimeout(()=>{
            resolve(products)
        },500)
    })
}


export const getProductsById = (itemId)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(products.find(prod => prod.id===itemId))
        },100)
    })
}


export const getProductsByCategory= (categoryId)=>{
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(products.filter(prod=> prod.category===categoryId))
        }, 100);
    })
}

//el resultado de la promesa lo recibo como parametro de la funcion en then
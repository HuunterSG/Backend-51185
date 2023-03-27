import ProductManager from "./class/productManager.js";

const products = new ProductManager('./db/Drinks.json')

// products.addProduct({
//     title:'Coca Cola',
//     description:'Bebida altamente gasificada',
//     thumbnail:'#',
//     code:'fg123h',
//     price: 1500,
//     stock: 25
// })

// products.addProduct({
//     title:'Fanta',
//     description:'Bebida altamente gasificada',
//     thumbnail:'#',
//     code:'fg125h',
//     price: 1500,
//     stock: 25
// })

// products.getProducts()

const env = async() => {
    let drink1 = {
        title:'Coca Cola',
        description:'Bebida altamente gasificada',
        thumbnail:'#',
        code:'fg123h',
        price: 1500,
        stock: 25
    }
    let drink2 = {
        title:'Fanta',
        description:'Bebida altamente gasificada',
        thumbnail:'#',
        code:'fg125h',
        price: 1500,
        stock: 25
    }
    let drink3= {
        title:'Sprite',
        description:'Bebida altamente gasificada',
        thumbnail:'#',
        code:'fg135h',
        price: 1500,
        stock: 25
    }

    let prodDrink1 = await products.addProduct(drink1)
    let prodDrink2 = await products.addProduct(drink2)
    let prodDrink3 = await products.addProduct(drink3)

    console.log(prodDrink1)
    console.log(prodDrink2)
    console.log(prodDrink3)
    let drinks= await products.getProducts()

    console.table(drinks)
    let productById = await products.getProductsById(3)
    console.log(productById)
}

env()


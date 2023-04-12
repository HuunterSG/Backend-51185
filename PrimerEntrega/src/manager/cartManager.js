import fs from 'fs';
// import ProductManager from './productManager.js';
// import * as url from 'url';


// const dirname = url.fileURLToPath(new URL('.', import.meta.url));

// const allProds = new ProductManager(dirname+'../db/products.json')

export default class CartManager{
    constructor(path){
        this.path = path
    }

    async getCart(){
        try {
            const carts = await fs.promises.readFile(this.path,'utf-8')
            return JSON.parse(carts)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async getCartById(id){
        try {
            let cartId = parseInt(id)
            const carts = await this.getCart()
            const cart = carts.find(c => c.id === cartId)
            return cart
        } catch (error) {
            console.log(error)
            return{msg:'El carrito no existe'}
        }
    }

    async addCart(cart){
        try {
            const carts = await this.getCart()
            let cart ={products:[]}
            
            if(carts.length === 0){
                cart.id=1
            }else{
                cart.id= carts[carts.length -1].id +1
            }

            
            carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts,null,'\t'))
            return({msg: 'El carrito se ha añadido: ', cart})
        } catch (error) {
            console.log(`Error to save the cart ${error}`)
        }
    }

    async addProdInCart (idCart, idProd){
        try {
            const carts = await this.getCart()
            const findCart = carts.find((c)=> c.id ===idCart)

            let prodInC= findCart.products
            const pIndex =prodInC.findIndex((p)=> p.id ===idProd)

            if (pIndex !== -1){
                prodInC[pIndex].quantity = prodInC[pIndex].quantity +1
  
            }else{
                let prod = {id:idProd, quantity:1}
                prodInC.push(prod)
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts,null,'\t'))
            return findCart
            
        } catch (error) {
            console.log(error)
        }
    }
}
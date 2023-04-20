import { Router } from "express";
import ProductManager from "../manager/productManager.js";
import * as url from 'url';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const viewsRouter = Router()
const product = new ProductManager(dirname+'../db/products.json')

// viewsRouter.get('/', async(req,res)=>{
//     let allProds = await product.getProduct()
//     res.render('home',{
//         title: "Dragon Bar Z",
//         products: allProds
//     })
// })
viewsRouter.get("/", async (req, res) => {
    let allProducts = await product.getProduct()
    res.render('home', {
        title: "The Drink Home",
        products: allProducts
    })
})
viewsRouter.get('/realTimeProducts', async(req,res)=>{
    try {
        let allProds = await product.getProduct()
        res.render('realTimeProducts',{
            title: "Dragon Bar Z",
            allProds
        })
    } catch (error) {

        res.status(400).send({
            status: "Error",
            msg: `No se pueden visualizar los products`
        });
    }
})


export default viewsRouter
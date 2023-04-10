import ProductManager from "../manager/productManager.js";
import * as url from 'url';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const db = new ProductManager(dirname+'../db/products.json')
const prods= db.getProduct()

const productGet = async (req,res)=>{
    try {
        let limit = parseInt(req.query.limit)
        let allDrinks= await prods
        
        if(!limit){
            return res.send(allDrinks)
        }
        if(limit >= allDrinks.length){
            return res.status(200).send({msg:'el limit supera los objetos, aqui estan los prod: ', allDrinks})   
        }
        const limitDrinks= allDrinks.slice(0, limit)
        return res.status(200).send({msg:'Estos son los prod que solicitaste: ',limitDrinks})
        
    } catch (error) {
        console.log(`Ha ocurrido un error: ${error}`)
    }
}

const getProductById =async (req,res)=>{
    try {
        let id = parseInt(req.params.id)
        let drinkById= await db.getById(id)
        return res.status(200).send({msg:'El producto solicitado es: ',drinkById})
    } catch (error) {
        console.log(`Ha ocurrido un error: ${error}`)
    }
}

const productPost = async (req,res)=>{
    try {
        const {title,description,code,price,status,stock,category,thumbnails}= req.body
        const obj= {title,description,code,price,status,stock,category,thumbnails}
        const productAdd = await db.addProduct(obj)
        return res.status(200).send({msg: 'el producto se ha cargado con exito',productAdd})
    } catch (error) {
        console.log(`Ha ocurrido un error: ${error}`)
    }
}

export {productGet, getProductById, productPost}
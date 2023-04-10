import ProductManager from "../manager/productManager.js";
import * as url from 'url';
import { joiValidator } from "../utils/validator.js";

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
        const obj = await joiValidator.product.validateAsync({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })
        const productAdd = await db.addProduct(obj)
        return res.status(200).send({msg: 'el producto se ha cargado con exito',productAdd})
    } catch (error) {
        console.log(`Ha ocurrido un error: ${error}`)
    }
}

const productPut = async (req,res)=>{
    try{
        const {id} = req.params
        const {title,description,code,price,status,stock,category,thumbnails} = req.body
        const product = await joiValidator.product.validateAsync({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })
        const productUpdate = await db.updateProd(id, product)

        res.status(200).send({msg:'Se ha actualizado el producto', productUpdate})
    }catch(error){
        console.log(error)
    }
}

const productDelete = async (req,res)=>{
    try{
        const id= parseInt(req.params.id)
        const productDelete = await db.getById(id)
        if(!productDelete){
            throw { error: 'no existe el prod'}
        }
        const products= await db.deleteProduct(id)

        res.status(200).send({
            mensaje: 'Producto exitosamente eliminado',
            productoEliminado: productDelete,
            productsInList:products
        })
    }catch(error){
        console.log(error)
    }
}

export {productGet, getProductById, productPost, productPut, productDelete}
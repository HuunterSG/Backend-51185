import ProductManager from "../manager/productManager.js";

const db = new ProductManager()
const prods= db.getProduct()
const productGet = async (req,res)=>{
    try {
        let limit = parseInt(req.query.limit)
        let allDrinks= await prods
        console.log(allDrinks)
        if (isNaN(limit)) {
            return res.status(400).send({ msg: 'Limit debe ser un número', allDrinks });
        }
        if(!limit){
            return res.send(allDrinks)
        }
        if(limit >= allDrinks.length){
            return res.send({msg:'el limit supera los objetos, aqui estan los prod: ', allDrinks})   
        }
        const limitDrinks= allDrinks.slice(0, limit)
        return res.send(limitDrinks)
        
    } catch (error) {
        console.log(`Ha ocurrido un error: ${error}`)
    }
}

const getProductById = async(req,res)=>{

}

export {productGet}
import express from 'express'
import ProductManager from './ProductManager/productManager.js'


const app = express()
const drinks = new ProductManager('./drinks.json')
const prods = drinks.getProduct()
const PORT = 8080
const server = app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto: ${PORT}`)
})

app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res)=>{
    let limit = parseInt(req.query.limit)
    let allDrinks= await prods
    console.log(limit)
    if(!limit){
         return res.send(allDrinks)
    }else if(limit< allDrinks.length){
        let limitDrinks= allDrinks.slice(0, limit)
        return res.send(limitDrinks)
    }else{
        return res.send({msg:'el limit supera los objetos, aqui estan los prod: ', allDrinks})
    }
    
    
})

app.get('/products/:id', async (req,res)=>{
    let id = parseInt(req.params.id)
    let drinkById= await drinks.getById(id)
    res.send(drinkById)
})

server.on("error", (error)=> console.log(`error del server: ${error}`))
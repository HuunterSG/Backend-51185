import express from 'express'
import productManager from './ProductManager/productManager.js'


const app = express()
const drinks = new productManager('./DB/drinks.json')
const prods = drinks.getProduct()
const PORT = 8080
const server = app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto: ${PORT}`)
})

app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res)=>{
    let limit = parseInt(req.query.limit)

    if(!limit) return res.send(await prods)
    let allDrinks= await prods
    let limitDrinks= allDrinks.slice(0,limit)
    res.send(limitDrinks)
})

app.get('/products/:id', async (req,res)=>{
    let id = parseInt(req.params.id)
    let allDrinks = await prods
    let drinkById= allDrinks.find(drink=>drink.id === id)
    res.send(drinkById)
})

server.on("error", (error)=> console.log(`error del server: ${error}`))
import express from 'express'
import productRouter from './routes/routesProduct.js'

const app = express()
const PORT = 8080
const server = app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto: ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productRouter)

server.on('error',(error)=>console.log(`error del servidor: ${error}`))
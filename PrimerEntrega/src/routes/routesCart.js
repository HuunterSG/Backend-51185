import { Router } from "express";
import  { getCartById, cartPost, prodPostInC} from './logicPRoutes.js'

const cartRouter = Router()


cartRouter.get('/:id', getCartById)
cartRouter.post('/', cartPost)
cartRouter.post('/:id/produc/:pid', prodPostInC)


export default cartRouter
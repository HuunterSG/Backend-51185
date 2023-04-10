import { Router } from "express";
import  {productGet, getProductById} from './logicPRoutes.js'

const productRouter = Router()

productRouter.get('/',productGet)
productRouter.get('/:id', getProductById)
productRouter.post('/',)
productRouter.put('/:id',)
productRouter.delete('/:id',)

export default productRouter
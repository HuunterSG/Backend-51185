import { Router } from "express";
import  {productGet, getProductById, productPost} from './logicPRoutes.js'

const productRouter = Router()

productRouter.get('/',productGet)
productRouter.get('/:id', getProductById)
productRouter.post('/', productPost)
productRouter.put('/:id',)
productRouter.delete('/:id',)

export default productRouter
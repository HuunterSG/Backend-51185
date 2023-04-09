import { Router } from "express";
import  {productGet} from './logicPRoutes.js'
const productRouter = Router()

productRouter.get('/',productGet)
productRouter.get('/:id',)
productRouter.post('/',)
productRouter.put('/:id',)
productRouter.delete('/:id',)

export default productRouter
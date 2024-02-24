import { Router } from 'express'
import { makeCartControler } from '../api/cart/cartControlerFactory'

export const cartDiscountRouter = Router()

const applyDiscountCartController = makeCartControler()

cartDiscountRouter.post('/cart-discount', applyDiscountCartController.handle)

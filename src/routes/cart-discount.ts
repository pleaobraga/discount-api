/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { makeCartControler } from '../api/cart/cartControlerFactory'
import { requestBodyValidation } from '../api/cart/validation.schema'
import { validate } from '../middleware/validationMiddleware'

export const cartDiscountRouter = Router()

const applyDiscountCartController = makeCartControler()

cartDiscountRouter.post(
  '/cart-discount',
  validate(requestBodyValidation),
  applyDiscountCartController.handle
)

/* eslint-disable @typescript-eslint/no-misused-promises */
// PRO: Nice routes file, very clean!
import { Router } from 'express'

import { makeCartControler } from '../api/cart/cartControlerFactory'
import { requestBodyValidation } from '../api/cart/validation.schema'
import { validate } from '../middleware/validationMiddleware'

export const cartDiscountRouter = Router()

const applyDiscountCartController = makeCartControler()

cartDiscountRouter.post(
  '/cart-discount',
  // PRO: Validation middleware, raises proper error messages and status codes
  // when the input is invalid, such as with negative prices.
  //
  // CON: Probably have some sort of integration test where we could also test
  // if the validation is being applied correctly.
  validate(requestBodyValidation),
  applyDiscountCartController.handle
)

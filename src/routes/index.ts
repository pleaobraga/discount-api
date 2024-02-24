import express from 'express'
import { cartDiscountRouter } from './cart-discount'

export const routes = express.Router()

routes.use('/api', cartDiscountRouter)

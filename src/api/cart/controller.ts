import type { Request, Response } from 'express'

import type { IRequestDTO } from './dto/dto.interface'
import { type IApplyCartDiscount } from '../../services/cartService/cart.interface'

export class ApplyDiscountCartController {
  constructor(private readonly applyCartDiscount: IApplyCartDiscount) {}

  handle = (
    request: Request<{}, {}, IRequestDTO>,
    response: Response
  ): Response => {
    try {
      const { cart } = request.body

      const discountList = this.applyCartDiscount(cart.lineItems)

      return response.status(200).json(discountList)
    } catch (e: any) {
      return response
        .status((e.statusCode as number) ?? 500)
        .json({ error: e.message })
    }
  }
}

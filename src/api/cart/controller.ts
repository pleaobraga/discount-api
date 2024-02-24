import type { Request, Response } from 'express'

import type { IRequestDTO, IResponseDTO } from './dto/dto.interface'
import { type IApplyCartDiscount } from '../../services/cartService/cart.interface'
import { responseAdapter } from './hellpers'

export class ApplyDiscountCartController {
  constructor(private readonly applyCartDiscount: IApplyCartDiscount) {}

  handle = (
    request: Request<{}, {}, IRequestDTO>,
    response: Response<IResponseDTO | { error: string }>
  ): Response => {
    try {
      const { cart } = request.body

      const discountList = this.applyCartDiscount(cart.lineItems)

      const answerDTO = responseAdapter(discountList)

      return response.status(200).json(answerDTO)
    } catch (e: any) {
      return response
        .status((e.statusCode as number) ?? 500)
        .json({ error: e.message })
    }
  }
}

import { type DiscountProductsCart } from '../../services/cartService/cart.interface'
import { type IResponseDTO } from './dto/dto.interface'

export function responseAdapter(
  discountProductsCart: DiscountProductsCart
): IResponseDTO {
  const { lineItems, totalDiscountCart } = discountProductsCart

  const parsedLineItems = lineItems.map((item) => ({
    ...item,
    price: String(item.price),
    discountPrice: String(item.discountPrice),
  }))

  return { lineItems: parsedLineItems, totalDiscountCart }
}

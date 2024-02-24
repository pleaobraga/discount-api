import { type DiscountProductsCart } from '../../services/cartService/cart.interface'
import { type IResponseDTO } from './dto/dto.interface'

export function responseAdapter(
  discountProductsCart: DiscountProductsCart,
  cartReference: string
): IResponseDTO {
  const { lineItems, totalDiscountCart } = discountProductsCart

  const parsedLineItems = lineItems.map((item) => ({
    ...item,
    price: String(item.price),
    discountPrice: String(item.discountPrice),
  }))

  return {
    cart: {
      reference: cartReference,
      lineItems: parsedLineItems,
      totalDiscountCart,
    },
  }
}

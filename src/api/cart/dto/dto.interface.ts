import type {
  DiscountProductsCart,
  Product,
} from '../../../services/cartService/cart.interface'

export type IResponseDTO = DiscountProductsCart

export type ProductCartDTO = Product

export interface IFinalProduct {
  name: string
  price: number
  sku: string
  discountPrice?: number
}

export interface IRequestDTO {
  cart: {
    reference: string
    lineItems: ProductCartDTO[]
  }
}

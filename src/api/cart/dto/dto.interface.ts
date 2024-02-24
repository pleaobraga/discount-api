export interface DiscountProductCartDTO {
  name: string
  price: string
  sku: string
  discountPrice: string
}

export interface ProductCartDTO {
  name: string
  price: string
  sku: string
}
export interface IResponseDTO {
  cart: {
    reference: string
    lineItems: ProductCartDTO[]
    totalDiscountCart: number
  }
}

export interface IRequestDTO {
  cart: {
    reference: string
    lineItems: ProductCartDTO[]
  }
}

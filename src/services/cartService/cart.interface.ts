import type { IDiscount } from '../discountService/discount.interface'

export interface Product {
  name: string
  price: string
  sku: string
}

export interface DiscountProduct {
  name: string
  price: number
  sku: string
  discountPrice: number
}

export interface DiscountProductsCart {
  lineItems: DiscountProduct[]
  totalDiscountCart: number
}

export type IApplyCartDiscount = (lineItems: Product[]) => DiscountProductsCart

export type IGenerateCardDicountStategy = (
  props: IDiscount
) => IApplyCartDiscount

export type IApplyDiscountOnItem = (props: {
  indexItem: number
  listWithDiscount: DiscountProduct[]
  itemWithDiscount: DiscountProduct
}) => DiscountProduct[]

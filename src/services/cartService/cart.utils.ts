import { AppError } from '../../errors/appErrors'
import { parseFixedNumber } from '../../helper/parse'
import {
  type DiscountProductsCart,
  type DiscountProduct,
  type IApplyDiscountOnItem,
  type Product,
} from './cart.interface'

export const createListWithDiscount = (
  lineItems: Product[]
): DiscountProduct[] => {
  return lineItems.map((item) => ({
    ...item,
    discountPrice: Number(item.price),
    price: Number(item.price),
  }))
}

export const cartHasDiscount = (
  eligibleSkus: Set<string>,
  listWithDiscount: DiscountProduct[]
): boolean => {
  return !!listWithDiscount.find((item) => eligibleSkus.has(item.sku))
}

export const createDiscountProductsCart = (
  listWithDiscount: DiscountProduct[]
): DiscountProductsCart => {
  const { totalDiscountCart } = listWithDiscount.reduce(
    (acc, item) => {
      acc.totalDiscountCart += item.discountPrice
      acc.totalDiscountCart = parseFixedNumber(acc.totalDiscountCart)

      return acc
    },
    { totalDiscountCart: 0 }
  )

  return { lineItems: listWithDiscount, totalDiscountCart }
}

export const getItemToDiscount = (
  eligibleSkus: Set<string>,
  listWithDiscount: DiscountProduct[]
): { indexItem: number; item: DiscountProduct | null } => {
  return listWithDiscount.reduce(
    (acc, item, index) => {
      if (eligibleSkus.has(item.sku)) {
        if (!acc.item) {
          acc.indexItem = index
          acc.item = item

          return acc
        }

        if (acc.item.price > item.price) {
          acc.indexItem = index
          acc.item = item

          return acc
        }
      }

      return acc
    },
    {
      indexItem: -1,
      item: null as DiscountProduct | null,
    }
  )
}

export const updateListItem: IApplyDiscountOnItem = ({
  indexItem,
  listWithDiscount,
  itemWithDiscount,
}) => {
  if (indexItem < 0 || indexItem >= listWithDiscount.length) {
    throw new AppError('Invalid index', 500)
  }

  return Object.assign([], listWithDiscount, { [indexItem]: itemWithDiscount })
}

export const applyDiscountItem = (
  item: DiscountProduct,
  applyDiscount: (amount: number) => number
): DiscountProduct => {
  return {
    ...item,
    discountPrice: applyDiscount(item.price),
  }
}

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

// CON: Could probably name this function as "isCartEligibleForDiscount"
// instead of "cartHasDiscount" to make it more readable, but it's minor.
//
// There is also one case here where it's more implicit on the description
// which is when the cart only has one item, where this is item is both a prequisite
// and eligible for discount. The discount is "Buy ONE and get ANOTHER item for X%
// off". In this case, you should also validate that the cart has at least 2 items.
// Otherwise a cart that has only "COCOA", will apply the discount to it which is not
// correct.
//
export const cartHasDiscount = (
  eligibleSkus: Set<string>,
  listWithDiscount: DiscountProduct[]
): boolean => {
  return !!listWithDiscount.find((item) => eligibleSkus.has(item.sku))
}

export const createDiscountProductsCart = (
  listWithDiscount: DiscountProduct[]
): DiscountProductsCart => {
  // Didn't really understand why you're sending an object to the
  // reduce function here. Could simply sum the values of item.discountedPrice
  // and return it.
  //
  // const totalDiscountCart = listWithDiscount.reduce(
  //   (sum, item) => parseFixedNumber(sum + item.discountPrice),
  //   0
  // )
  //
  // return { lineItems: listWithDiscount, totalDiscountCart }
  //
  // I would also have the totalDiscountCart sum as seperate function, and leave the
  // createDiscountProductsCart function simply as an object creation function.

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
  // CON: Reduce makes the code a bit harder to read, and it's not
  // really necessary here. You could use a filter + sort instead.
  //
  // PRO: Usage of reduce goes through the array only once, while
  // filter + sort would go through the array twice.
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

// CON: No types for the parameters, and no type for the return.
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
  // PRO: Usage of High Order Function to apply discount, very reusable.
  applyDiscount: (amount: number) => number
): DiscountProduct => {
  return {
    ...item,
    // CON: Rename discountPrice to discountedPrice to make it more clear the
    // discount was already calculated.
    discountPrice: applyDiscount(item.price),
  }
}

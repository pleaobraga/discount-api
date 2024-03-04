import {
  applyDiscountItem,
  cartHasDiscount,
  createListWithDiscount,
  createDiscountProductsCart,
  getItemToDiscount,
  updateListItem,
} from './cart.utils'
import {
  type IApplyCartDiscount,
  type IGenerateCardDicountStategy,
} from './cart.interface'

export const cartDiscountStrategy: IGenerateCardDicountStategy = ({
  applyDiscount,
  eligibleSkus,
  prerequisiteSkus,
}) => {
  const applyCartDiscount: IApplyCartDiscount = (lineItems) => {
    const listWithDiscount = createListWithDiscount(lineItems)

    if (!cartHasDiscount(prerequisiteSkus, listWithDiscount)) {
      return createDiscountProductsCart(listWithDiscount)
    }

    const { item, indexItem } = getItemToDiscount(
      eligibleSkus,
      listWithDiscount
    )

    if (!item) return createDiscountProductsCart(listWithDiscount)

    const itemWithDiscount = applyDiscountItem(item, applyDiscount)

    // CON: Rename variable to listWithDiscountApplied
    const listWithDiscountApplyed = updateListItem({
      indexItem,
      itemWithDiscount,
      listWithDiscount,
    })

    return createDiscountProductsCart(listWithDiscountApplyed)
  }

  return applyCartDiscount
}

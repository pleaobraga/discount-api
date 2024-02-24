import { type IDiscountFactory } from './discount.interface'
import { percentageDiscount } from './percentageDiscount.service'

export const discountFactory: IDiscountFactory = ({
  prerequisite,
  eligible,
  discountUnit,
  discountValue,
}) => {
  const prerequisiteSkus = new Set(prerequisite)
  const eligibleSkus = new Set(eligible)

  switch (discountUnit) {
    case 'percentage':
      return {
        applyDiscount: percentageDiscount(discountValue),
        prerequisiteSkus,
        eligibleSkus,
      }
    default:
      throw new Error('Invalid discount type')
  }
}

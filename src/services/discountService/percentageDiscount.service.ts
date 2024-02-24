import { parseFixedNumber } from '../../helper/parse'
import { type IApplyDiscount } from './discount.interface'

export const percentageDiscount: IApplyDiscount = (discountValue: string) => {
  const discountPercentage = Number(discountValue)

  return (amount: number) => {
    const finalValue = amount - (amount * discountPercentage) / 100

    return parseFixedNumber(finalValue)
  }
}

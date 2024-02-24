/* eslint-disable @typescript-eslint/naming-convention */

import { cartDiscountStrategy } from '../../services/cartService/cart.service'
import { discountFactory } from '../../services/discountService/discount.factory'
import { getDiscountConfiguration } from '../../services/discountService/discount.helpers'
import { ApplyDiscountCartController } from './controller'

export function makeCartControler() {
  const { discount_unit, discount_value, eligible_skus, prerequisite_skus } =
    getDiscountConfiguration()

  const discountConfig = discountFactory({
    prerequisite: prerequisite_skus,
    eligible: eligible_skus,
    discountUnit: discount_unit,
    discountValue: discount_value,
  })

  const applyCartDiscount = cartDiscountStrategy({
    ...discountConfig,
  })

  return new ApplyDiscountCartController(applyCartDiscount)
}

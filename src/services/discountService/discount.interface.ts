export type IApplyDiscount = (
  discount_value: string
) => (amount: number) => number

export interface IDiscountFactoryParams {
  prerequisite: string[]
  eligible: string[]
  discountUnit: string
  discountValue: string
}

export interface IDiscount {
  prerequisiteSkus: Set<string>
  eligibleSkus: Set<string>
  applyDiscount: (amount: number) => number
}

export type IDiscountFactory = (props: IDiscountFactoryParams) => IDiscount

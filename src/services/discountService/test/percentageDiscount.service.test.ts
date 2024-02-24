import { percentageDiscount } from '../percentageDiscount.service'

describe('Percentage Discount service', () => {
  it('should return a function', () => {
    const result = percentageDiscount('20')

    expect(typeof result).toBe('function')
  })

  it('should apply the discount', () => {
    expect(percentageDiscount('20')(10)).toBe(8)
  })
})

import { cartDiscountStrategy } from '../cart.service'

describe('Cart Service', () => {
  describe('cartDiscountStrategy', () => {
    it('should apply discount and return DTO', () => {
      const applyDiscount = jest
        .fn()
        .mockImplementation((amount) => amount * 0.2)

      const prerequisiteSkus = new Set(['PEANUT-BUTTER', 'COCOA', 'FRUITY'])
      const eligibleSkus = new Set(['BANANA-CAKE', 'COCOA', 'CHOCOLATE'])

      const lineItems = [
        { name: 'Peanut Butter', price: '39', sku: 'PEANUT-BUTTER' },
        { name: 'Fruity', price: '34.99', sku: 'FRUITY' },
        { name: 'Chocolate', price: '32', sku: 'CHOCOLATE' },
      ]

      const expectedOutput = {
        lineItems: [
          {
            name: 'Peanut Butter',
            price: 39,
            sku: 'PEANUT-BUTTER',
            discountPrice: 39,
          },
          {
            name: 'Fruity',
            price: 34.99,
            sku: 'FRUITY',
            discountPrice: 34.99,
          },
          {
            name: 'Chocolate',
            price: 32,
            sku: 'CHOCOLATE',
            discountPrice: 6.4,
          },
        ],
        totalDiscountCart: 80.39,
      }

      expect(
        cartDiscountStrategy({
          applyDiscount,
          eligibleSkus,
          prerequisiteSkus,
        })(lineItems)
      ).toEqual(expectedOutput)
    })
    it('should return without discount, no eligibleSkus', () => {
      const applyDiscount = jest
        .fn()
        .mockImplementation((amount) => amount * 0.2)

      const prerequisiteSkus = new Set(['PEANUT-BUTTER', 'COCOA', 'FRUITY'])
      const eligibleSkus = new Set(['BANANA-CAKE', 'COCOA', 'CHOCOLATE'])

      const lineItems = [
        { name: 'Peanut Butter', price: '39', sku: 'PEANUT-BUTTER' },
        { name: 'Fruity', price: '34.99', sku: 'FRUITY' },
        { name: 'Peanut Butter', price: '39', sku: 'PEANUT-BUTTER' },
      ]

      const expectedOutput = {
        lineItems: [
          {
            name: 'Peanut Butter',
            price: 39,
            sku: 'PEANUT-BUTTER',
            discountPrice: 39,
          },
          {
            name: 'Fruity',
            price: 34.99,
            sku: 'FRUITY',
            discountPrice: 34.99,
          },
          {
            name: 'Peanut Butter',
            price: 39,
            sku: 'PEANUT-BUTTER',
            discountPrice: 39,
          },
        ],
        totalDiscountCart: 112.99,
      }

      expect(
        cartDiscountStrategy({
          applyDiscount,
          eligibleSkus,
          prerequisiteSkus,
        })(lineItems)
      ).toEqual(expectedOutput)
    })
    it('should return without discount, no  prerequisiteSkus', () => {
      const applyDiscount = jest
        .fn()
        .mockImplementation((amount) => amount * 0.2)

      const prerequisiteSkus = new Set(['PEANUT-BUTTER', 'COCOA', 'FRUITY'])
      const eligibleSkus = new Set(['BANANA-CAKE', 'COCOA', 'CHOCOLATE'])

      const lineItems = [
        { name: 'CHOCOLATE', price: '32', sku: 'CHOCOLATE' },
        { name: 'CHOCOLATE', price: '32', sku: 'CHOCOLATE' },
        { name: 'CHOCOLATE', price: '32', sku: 'CHOCOLATE' },
      ]

      const expectedOutput = {
        lineItems: [
          {
            name: 'CHOCOLATE',
            price: 32,
            sku: 'CHOCOLATE',
            discountPrice: 32,
          },
          {
            name: 'CHOCOLATE',
            price: 32,
            sku: 'CHOCOLATE',
            discountPrice: 32,
          },
          {
            name: 'CHOCOLATE',
            price: 32,
            sku: 'CHOCOLATE',
            discountPrice: 32,
          },
        ],
        totalDiscountCart: 96,
      }

      expect(
        cartDiscountStrategy({
          applyDiscount,
          eligibleSkus,
          prerequisiteSkus,
        })(lineItems)
      ).toEqual(expectedOutput)
    })
  })
})

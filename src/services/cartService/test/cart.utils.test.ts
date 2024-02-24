import { AppError } from '../../../errors/appErrors'

import {
  applyDiscountItem,
  cartHasDiscount,
  createDiscountProductsCart,
  getItemToDiscount,
  updateListItem,
} from '../cart.utils'

const listWithDiscountMock = [
  { name: 'Peanut Butter', price: 2, sku: 'PEANUT-BUTTER', discountPrice: 2 },
  { name: 'Fruity', price: 3, sku: 'FRUITY', discountPrice: 3 },
  { name: 'Chocolate', price: 4, sku: 'CHOCOLATE', discountPrice: 4 },
]

const skuMock = ['PEANUT-BUTTER', 'COCOA', 'FRUITY']

describe('Cart Functions', () => {
  describe('cartHasDiscount', () => {
    it('should return true when lineItmes have eligible sku ', () => {
      expect(cartHasDiscount(new Set(skuMock), listWithDiscountMock)).toBe(true)
    })
    it('should return false whithout line items ', () => {
      expect(cartHasDiscount(new Set(skuMock), [])).toBe(false)
    })
    it('should return false whithout sliblesku ', () => {
      expect(cartHasDiscount(new Set(), [])).toBe(false)
    })
  })

  describe('createDiscountProductsCart', () => {
    it('should create Discount Products Cart ', () => {
      const listWithDiscount = [
        {
          name: 'Peanut Butter',
          price: 1,
          sku: 'PEANUT-BUTTER',
          discountPrice: 1,
        },
        { name: 'Fruity', price: 1, sku: 'FRUITY', discountPrice: 1 },
        { name: 'Chocolate', price: 1, sku: 'CHOCOLATE', discountPrice: 1 },
      ]

      const expectedOutput = {
        lineItems: [
          {
            name: 'Peanut Butter',
            price: 1,
            sku: 'PEANUT-BUTTER',
            discountPrice: 1,
          },
          { name: 'Fruity', price: 1, sku: 'FRUITY', discountPrice: 1 },
          {
            name: 'Chocolate',
            price: 1,
            sku: 'CHOCOLATE',
            discountPrice: 1,
          },
        ],
        totalDiscountCart: 3,
      }

      expect(createDiscountProductsCart(listWithDiscount)).toEqual(
        expectedOutput
      )
    })
  })

  describe('getItemToDiscount', () => {
    it('should return the first smaller elegible item', () => {
      const listWithDiscount = [
        {
          name: 'Peanut Butter',
          price: 3,
          sku: 'PEANUT-BUTTER',
          discountPrice: 3,
        },
        { name: 'Fruity', price: 2, sku: 'FRUITY', discountPrice: 2 },
        { name: 'Chocolate', price: 2, sku: 'CHOCOLATE', discountPrice: 2 },
      ]
      const expectedOutput = {
        item: { name: 'Fruity', price: 2, sku: 'FRUITY', discountPrice: 2 },
        indexItem: 1,
      }

      expect(
        getItemToDiscount(
          new Set(['PEANUT-BUTTER', 'FRUITY', 'CHOCOLATE']),
          listWithDiscount
        )
      ).toEqual(expectedOutput)
    })
    it('should return the smaller elegible item', () => {
      const listWithDiscount = [
        {
          name: 'Peanut Butter',
          price: 2,
          sku: 'PEANUT-BUTTER',
          discountPrice: 2,
        },
        { name: 'Fruity', price: 3, sku: 'FRUITY', discountPrice: 3 },
        { name: 'Chocolate', price: 4, sku: 'CHOCOLATE', discountPrice: 4 },
      ]

      const expectedOutput = {
        item: {
          name: 'Peanut Butter',
          price: 2,
          sku: 'PEANUT-BUTTER',
          discountPrice: 2,
        },
        indexItem: 0,
      }

      expect(
        getItemToDiscount(
          new Set(['PEANUT-BUTTER', 'FRUITY', 'CHOCOLATE']),
          listWithDiscount
        )
      ).toEqual(expectedOutput)
    })
    it('should return no item, empty elegible set', () => {
      const listWithDiscount = [
        {
          name: 'Peanut Butter',
          price: 2,
          sku: 'PEANUT-BUTTER',
          discountPrice: 2,
        },
        { name: 'Fruity', price: 3, sku: 'FRUITY', discountPrice: 3 },
        { name: 'Chocolate', price: 4, sku: 'CHOCOLATE', discountPrice: 4 },
      ]
      const expectedOutput = {
        item: null,
        indexItem: -1,
      }

      expect(getItemToDiscount(new Set(), listWithDiscount)).toEqual(
        expectedOutput
      )
    })
    it('should return no item, item not find', () => {
      const listWithDiscount = [
        {
          name: 'Peanut Butter',
          price: 2,
          sku: 'PEANUT-BUTTER',
          discountPrice: 2,
        },
        { name: 'Fruity', price: 3, sku: 'FRUITY', discountPrice: 3 },
        { name: 'Chocolate', price: 4, sku: 'CHOCOLATE', discountPrice: 4 },
      ]
      const expectedOutput = {
        item: null,
        indexItem: -1,
      }

      expect(getItemToDiscount(new Set('ORANGE'), listWithDiscount)).toEqual(
        expectedOutput
      )
    })
  })

  describe('updateListItem', () => {
    it('should return the updated list', () => {
      const listWithDiscount = [
        {
          name: 'Peanut Butter',
          price: 2,
          sku: 'PEANUT-BUTTER',
          discountPrice: 2,
        },
        { name: 'Fruity', price: 3, sku: 'FRUITY', discountPrice: 3 },
        { name: 'Chocolate', price: 4, sku: 'CHOCOLATE', discountPrice: 4 },
      ]

      const itemWithDiscount = {
        name: 'Fruity',
        price: 3,
        sku: 'FRUITY',
        discountPrice: 1.5,
      }

      const expectedOutput = [
        {
          name: 'Peanut Butter',
          price: 2,
          sku: 'PEANUT-BUTTER',
          discountPrice: 2,
        },
        itemWithDiscount,
        { name: 'Chocolate', price: 4, sku: 'CHOCOLATE', discountPrice: 4 },
      ]

      expect(
        updateListItem({ listWithDiscount, itemWithDiscount, indexItem: 1 })
      ).toEqual(expectedOutput)
    })
    it('should throw error, using invalid index', () => {
      const listWithDiscount = [
        {
          name: 'Peanut Butter',
          price: 2,
          sku: 'PEANUT-BUTTER',
          discountPrice: 2,
        },
        { name: 'Fruity', price: 3, sku: 'FRUITY', discountPrice: 3 },
        { name: 'Chocolate', price: 4, sku: 'CHOCOLATE', discountPrice: 4 },
      ]

      const itemWithDiscount = {
        name: 'Fruity',
        price: 3,
        sku: 'FRUITY',
        discountPrice: 1.5,
      }

      expect(() =>
        updateListItem({ listWithDiscount, itemWithDiscount, indexItem: -1 })
      ).toThrow(new AppError('Invalid index', 500))
    })
    it('should throw error, using bigger index', () => {
      const listWithDiscount = [
        {
          name: 'Peanut Butter',
          price: 2,
          sku: 'PEANUT-BUTTER',
          discountPrice: 2,
        },
        { name: 'Fruity', price: 3, sku: 'FRUITY', discountPrice: 3 },
        { name: 'Chocolate', price: 4, sku: 'CHOCOLATE', discountPrice: 4 },
      ]

      const itemWithDiscount = {
        name: 'Fruity',
        price: 3,
        sku: 'FRUITY',
        discountPrice: 1.5,
      }

      expect(() =>
        updateListItem({ listWithDiscount, itemWithDiscount, indexItem: 9 })
      ).toThrow(new AppError('Invalid index', 500))
    })
  })

  describe('applyDiscountItem', () => {
    it('should return the item with discount price', () => {
      const item = {
        name: 'Fruity',
        price: 3,
        sku: 'FRUITY',
        discountPrice: 3,
      }

      const applyDiscount = jest.fn().mockImplementation((amount) => amount / 3)

      const result = applyDiscountItem(item, applyDiscount)

      const expectedOutput = {
        name: 'Fruity',
        price: 3,
        sku: 'FRUITY',
        discountPrice: 1,
      }

      expect(applyDiscount).toHaveBeenCalled()

      expect(result).toEqual(expectedOutput)
    })
  })
})

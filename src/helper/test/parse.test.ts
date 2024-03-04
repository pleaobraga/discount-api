// PRO: Tests even for small functions
import { parseFixedNumber } from '../parse'

describe('Testing Parse', () => {
  describe('parseFixedNumber', () => {
    const entries = [12.123214214, 12, 34.78, 45.6879, 87.456456546546]
    const expectedOutputs = [12.12, 12, 34.78, 45.69, 87.46]

    entries.forEach((item, index) => {
      it(`should parse correctly ${item} `, () => {
        expect(parseFixedNumber(item)).toEqual(expectedOutputs[index])
      })
    })
  })
})

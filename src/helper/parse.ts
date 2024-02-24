export function parseFixedNumber(value: number, floatNumber = 2) {
  const fixedNumber = value.toFixed(floatNumber)

  return Number(fixedNumber)
}

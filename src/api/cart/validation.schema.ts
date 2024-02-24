import { z } from 'zod'

export const requestBodyValidation = z.object({
  body: z.object({
    cart: z.object({
      reference: z
        .string({
          required_error: 'cart.reference is required',
        })
        .trim()
        .min(1, 'cart.reference cannot be empty'),
      lineItems: z
        .object({
          name: z
            .string({
              required_error: 'cart.lineItems[].name is required',
            })
            .trim()
            .min(1, 'cart.lineItems[].name cannot be empty'),
          price: z
            .string({
              required_error: 'cart.lineItems[].price  is required',
            })
            .trim()
            .min(1, 'cart.lineItems[].price cannot be empty')
            .refine(
              (s) => !s.includes('-'),
              'cart.lineItems[].price cannot be negative'
            ),
          sku: z
            .string({
              required_error: 'cart.lineItems[].sku is required',
            })
            .trim()
            .min(1, 'cart.lineItems[].sku cannot be empty'),
        })
        .array(),
    }),
  }),
})

import { z } from 'zod'

export const userBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const bookBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10),
  price: z.number(),
  author: z.string(),
  categories: z.array(z.string()).min(1)
})
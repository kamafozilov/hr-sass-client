import { z } from 'zod'

export const UserSchema = z.object({
    email: z.string().email('Неверный email'),
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
})

export type TypeUserSchema = z.infer<typeof UserSchema>

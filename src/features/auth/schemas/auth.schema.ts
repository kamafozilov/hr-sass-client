import { z } from 'zod'

export const AuthSchema = z.object({
    email: z.string().email({ message: 'Неверный формат электронной почты' }),
    password: z
        .string()
        .min(6, { message: 'Пароль должен быть не менее 6 символов' }),
})

export type TypeAuthSchema = z.infer<typeof AuthSchema>

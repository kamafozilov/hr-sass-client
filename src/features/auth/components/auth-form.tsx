'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'

import { useAuthMutation } from '../hooks'
import { AuthSchema, TypeAuthSchema } from '../schemas'

export function AuthForm() {
    const form = useForm<TypeAuthSchema>({
        resolver: zodResolver(AuthSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const { login, isLoadingLogin } = useAuthMutation()

    const onSubmit = (data: TypeAuthSchema) => {
        login(data)
    }

    return (
        <div className='flex flex-col gap-y-6'>
            <div className='w-[420px] border px-8 py-6 rounded-md flex flex-col gap-y-6'>
                <div className='flex flex-col gap-2'>
                    <div className='text-2xl font-bold text-center'>
                        Вход в систему
                    </div>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='grid gap-2 space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Электронная почта</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Введите электронную почту'
                                            disabled={isLoadingLogin}
                                            type='email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Введите пароль'
                                            type='password'
                                            disabled={isLoadingLogin}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            variant='default'
                            size='lg'
                            disabled={isLoadingLogin}
                        >
                            Войти
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { companyService } from '@/features/company/services'

import { Button } from '@/shared/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { SidebarMenuButton } from '@/shared/components/ui/sidebar'
import { useProfile } from '@/shared/hooks/useProfile'

type AddCompanyFormValues = {
    name: string
}

export function AddCompanyDialog() {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { data: user } = useProfile()
    const queryClient = useQueryClient()

    const form = useForm<AddCompanyFormValues>({
        defaultValues: {
            name: '',
        },
    })

    const onSubmit = async (values: AddCompanyFormValues) => {
        if (!user) {
            toast.error('Необходимо авторизоваться')
            return
        }

        try {
            setIsLoading(true)
            const company = await companyService.createCompany(values.name)

            await companyService.createUserCompany(user.id, company.id, 'ADMIN')

            toast.success('Компания успешно добавлена')
            setOpen(false)
            form.reset()

            queryClient.invalidateQueries({ queryKey: ['userCompanies'] })

            router.push(`/dashboard/${company.id}`)
        } catch (error) {
            console.error('Error creating company:', error)
            toast.error('Не удалось создать компанию')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {location.pathname.includes('/dashboard/[companyId]') ? (
                    <Button variant='outline' className='gap-2 p-2 w-full'>
                        <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                            <Plus className='size-4' />
                        </div>
                        <div className='font-medium'>Добавить компанию</div>
                    </Button>
                ) : (
                    <SidebarMenuButton size='lg' className='gap-2'>
                        <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                            <Plus className='size-4' />
                        </div>
                        <div className='grid flex-1 text-left text-sm leading-tight'>
                            <span className='truncate font-semibold'>
                                Добавить компанию
                            </span>
                        </div>
                    </SidebarMenuButton>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить новую компанию</DialogTitle>
                    <DialogDescription>
                        Введите название вашей компании для создания
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название компании</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='ООО Моя Компания'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                variant='outline'
                                onClick={() => setOpen(false)}
                                type='button'
                            >
                                Отмена
                            </Button>
                            <Button type='submit' disabled={isLoading}>
                                {isLoading ? 'Создание...' : 'Создать'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

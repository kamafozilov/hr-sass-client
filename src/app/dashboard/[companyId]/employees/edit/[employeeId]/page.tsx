'use client'

import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCompany } from '@/features/company/hooks/useCompany'
import { employeeService } from '@/features/employees'

import { Button } from '@/shared/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'

type EmployeeFormValues = {
    firstName: string
    lastName: string
    position: string
    email: string
}

export default function EditEmployeePage() {
    const { companyId, employeeId } = useParams()
    const router = useRouter()
    const { data: company } = useCompany(companyId as string)
    const [isLoading, setIsLoading] = useState(true)

    const form = useForm<EmployeeFormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            position: '',
            email: '',
        },
    })

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setIsLoading(true)
                const data = await employeeService.getEmployeeById(
                    employeeId as string
                )
                form.reset({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    position: data.position,
                    email: data.email,
                })
            } catch (error) {
                console.error('Error fetching employee:', error)
                toast.error('Не удалось загрузить данные сотрудника')
            } finally {
                setIsLoading(false)
            }
        }

        if (employeeId) {
            fetchEmployee()
        }
    }, [employeeId, form])

    const onSubmit = async (values: EmployeeFormValues) => {
        try {
            setIsLoading(true)
            await employeeService.updateEmployee(employeeId as string, values)
            toast.success('Данные сотрудника обновлены')
            router.push(`/dashboard/${companyId}/employees/list`)
        } catch (error) {
            console.error('Error updating employee:', error)
            toast.error('Не удалось обновить данные сотрудника')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-1 flex-col gap-4 p-4'>
            <div className='flex items-center gap-4 mb-6'>
                <Link href={`/dashboard/${companyId}/employees/list`}>
                    <Button variant='ghost' size='icon'>
                        <ArrowLeft className='size-4' />
                    </Button>
                </Link>
                <h1 className='text-2xl font-bold'>
                    Редактирование сотрудника
                    {company && (
                        <span className='text-muted-foreground font-normal ml-2'>
                            - {company.name}
                        </span>
                    )}
                </h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Данные сотрудника</CardTitle>
                    <CardDescription>
                        Измените информацию о сотруднике и нажмите
                        &quot;Сохранить&quot;
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className='flex justify-center py-4'>
                            <p>Загрузка...</p>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-4'
                            >
                                <FormField
                                    control={form.control}
                                    name='firstName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Имя</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Введите имя'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='lastName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Фамилия</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Введите фамилию'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='position'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Должность</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Введите должность'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='email'
                                                    placeholder='example@mail.com'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex justify-end'>
                                    <Button
                                        type='submit'
                                        disabled={isLoading}
                                        className='gap-2'
                                    >
                                        <Save className='size-4' />
                                        Сохранить
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

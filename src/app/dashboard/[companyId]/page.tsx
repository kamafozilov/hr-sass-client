'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Trash2, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { useCompany } from '@/features/company/hooks/useCompany'
import { companyService } from '@/features/company/services'
import { useEmployees } from '@/features/employees'

import { Button } from '@/shared/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog'

export default function CompanyDashboardPage() {
    const { companyId } = useParams()
    const router = useRouter()
    const queryClient = useQueryClient()
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const { data: company, isLoading: companyLoading } = useCompany(
        companyId as string
    )
    const { data: employees, isLoading: employeesLoading } = useEmployees(
        companyId as string
    )

    const isLoading = companyLoading || employeesLoading

    const handleDeleteCompany = async () => {
        try {
            setIsDeleting(true)
            await companyService.deleteCompany(companyId as string)

            queryClient.invalidateQueries({ queryKey: ['userCompanies'] })

            toast.success('Компания успешно удалена')
            router.push('/dashboard')
        } catch (error) {
            console.error('Error deleting company:', error)
            toast.error('Не удалось удалить компанию')
        } finally {
            setIsDeleting(false)
            setDeleteConfirmOpen(false)
        }
    }

    return (
        <div className='flex flex-1 flex-col gap-4 p-4'>
            <h1 className='text-2xl font-bold mb-6'>
                {companyLoading
                    ? 'Загрузка...'
                    : company?.name || 'Панель управления'}
            </h1>

            <div className='grid gap-4 md:grid-cols-1'>
                <Link
                    href={`/dashboard/${companyId}/employees/list`}
                    className='block'
                >
                    <div className='rounded-xl bg-muted/50 p-4 hover:bg-muted/70 transition-colors'>
                        <div className='flex items-center gap-2 mb-3'>
                            <div className='flex items-center justify-center p-2 rounded-lg bg-blue-100 text-blue-700'>
                                <Users className='size-5' />
                            </div>
                            <h3 className='font-medium'>Сотрудники</h3>
                        </div>
                        <p className='text-muted-foreground'>
                            Управление персоналом компании
                        </p>
                    </div>
                </Link>
            </div>

            <div className='flex-1 rounded-xl bg-muted/50 p-6 min-h-[300px]'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold'>
                        Информация о компании
                    </h2>
                    <div className='flex gap-2'>
                        <Button
                            variant='destructive'
                            size='sm'
                            className='gap-1'
                            onClick={() => setDeleteConfirmOpen(true)}
                        >
                            <Trash2 className='size-4' />
                            <span className='hidden sm:inline'>Удалить</span>
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <div className='animate-pulse space-y-4'>
                        <div className='h-4 bg-muted-foreground/20 rounded w-1/3'></div>
                        <div className='h-4 bg-muted-foreground/20 rounded w-1/2'></div>
                        <div className='h-4 bg-muted-foreground/20 rounded w-1/4'></div>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 gap-6'>
                        <div>
                            <div className='mb-4'>
                                <h3 className='text-sm text-muted-foreground mb-1'>
                                    Название
                                </h3>
                                <p className='font-medium'>
                                    {company?.name || 'Не указано'}
                                </p>
                            </div>
                            <div className='mb-4'>
                                <h3 className='text-sm text-muted-foreground mb-1'>
                                    Статус
                                </h3>
                                <div className='flex items-center gap-2'>
                                    <span className='inline-block w-2 h-2 rounded-full bg-green-500'></span>
                                    <p className='font-medium'>Активна</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='mb-4'>
                                <h3 className='text-sm text-muted-foreground mb-1'>
                                    Количество сотрудников
                                </h3>
                                <p className='font-medium'>
                                    {employees ? employees.length : 0}
                                </p>
                            </div>
                            <div className='mb-4'>
                                <h3 className='text-sm text-muted-foreground mb-1'>
                                    Дата регистрации
                                </h3>
                                <p className='font-medium'>
                                    {company?.createdAt
                                        ? new Date(
                                              company.createdAt
                                          ).toLocaleDateString()
                                        : new Date().toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Диалог подтверждения удаления */}
            <Dialog
                open={deleteConfirmOpen}
                onOpenChange={setDeleteConfirmOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Удаление компании</DialogTitle>
                        <DialogDescription>
                            Вы уверены, что хотите удалить компанию{' '}
                            {company?.name}? Это действие нельзя отменить. Все
                            данные, связанные с этой компанией, включая
                            сотрудников, будут удалены.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => setDeleteConfirmOpen(false)}
                            disabled={isDeleting}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant='destructive'
                            onClick={handleDeleteCompany}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Удаление...' : 'Удалить'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

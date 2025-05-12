'use client'

import { ArrowLeft, Plus, Users } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useCompany } from '@/features/company/hooks/useCompany'
import { useEmployees } from '@/features/employees'

import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/ui/data-table'

import { columns } from './columns'

export default function EmployeesListPage() {
    const { companyId } = useParams()
    const { data: company, isLoading: companyLoading } = useCompany(
        companyId as string
    )
    const { data: employees, isLoading: employeesLoading } = useEmployees(
        companyId as string
    )

    const isLoading = companyLoading || employeesLoading

    return (
        <div className='flex flex-1 flex-col gap-4 p-4'>
            <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center gap-4'>
                    <Link href={`/dashboard/${companyId}`}>
                        <Button variant='ghost' size='icon'>
                            <ArrowLeft className='size-4' />
                        </Button>
                    </Link>
                    <h1 className='text-2xl font-bold flex items-center gap-2'>
                        <Users className='size-6' />
                        <span>Список сотрудников</span>
                        {!companyLoading && company && (
                            <span className='text-muted-foreground font-normal'>
                                - {company.name}
                            </span>
                        )}
                    </h1>
                </div>
                <Link href={`/dashboard/${companyId}/employees/create`}>
                    <Button className='gap-1'>
                        <Plus className='size-4' />
                        <span>Добавить</span>
                    </Button>
                </Link>
            </div>

            {isLoading ? (
                <div className='rounded-xl border p-6'>
                    <p className='text-center py-10'>Загрузка...</p>
                </div>
            ) : employees && employees.length > 0 ? (
                <DataTable columns={columns} data={employees} />
            ) : (
                <div className='rounded-xl border p-6'>
                    <div className='text-center py-10'>
                        <Users className='size-12 mx-auto mb-4 text-muted-foreground opacity-50' />
                        <h2 className='text-xl font-semibold mb-2'>
                            Нет сотрудников
                        </h2>
                        <p className='text-muted-foreground mb-6'>
                            В данной компании пока нет добавленных сотрудников
                        </p>
                        <Link href={`/dashboard/${companyId}/employees/create`}>
                            <Button>
                                <Plus className='size-4 mr-2' />
                                <span>Добавить сотрудника</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

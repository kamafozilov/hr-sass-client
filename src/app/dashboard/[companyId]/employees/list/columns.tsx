'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

import { employeeService } from '@/features/employees'
import { IEmployee } from '@/features/employees/types'

import { Button } from '@/shared/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

export const columns: ColumnDef<IEmployee>[] = [
    {
        accessorKey: 'firstName',
        header: 'Имя',
    },
    {
        accessorKey: 'lastName',
        header: 'Фамилия',
    },
    {
        accessorKey: 'position',
        header: 'Должность',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const employee = row.original

            const handleDelete = async () => {
                if (
                    confirm('Вы уверены, что хотите удалить этого сотрудника?')
                ) {
                    try {
                        await employeeService.deleteEmployee(employee.id)
                        toast.success('Сотрудник успешно удален')
                        window.location.reload()
                    } catch (error) {
                        console.error('Error deleting employee:', error)
                        toast.error('Не удалось удалить сотрудника')
                    }
                }
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='size-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link
                            href={`/dashboard/${employee.companyId}/employees/edit/${employee.id}`}
                        >
                            <DropdownMenuItem>
                                <Edit className='mr-2 size-4' />
                                <span>Редактировать</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            className='text-destructive'
                            onClick={handleDelete}
                        >
                            <Trash2 className='mr-2 size-4' />
                            <span>Удалить</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

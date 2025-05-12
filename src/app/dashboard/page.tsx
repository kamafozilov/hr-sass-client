'use client'

import { Loader2 } from 'lucide-react'
import { redirect, usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { useUserCompanies } from '@/shared/hooks/useUserCompanies'

export default function DashboardPage() {
    const { data: companies, isLoading } = useUserCompanies()
    const pathname = usePathname()

    useEffect(() => {
        if (!isLoading && companies && companies.length > 0) {
            if (pathname === '/dashboard') {
                redirect(`/dashboard/${companies[0].id}`)
            } else if (pathname.startsWith('/dashboard/')) {
                const subPath = pathname.replace('/dashboard', '')
                redirect(`/dashboard/${companies[0].id}${subPath}`)
            }
        }
    }, [companies, isLoading, pathname])

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-full'>
                <Loader2 className='size-8 animate-spin text-muted-foreground' />
            </div>
        )
    }

    if (!companies || companies.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-full gap-4 p-4 text-center'>
                <h1 className='text-2xl font-bold'>
                    Добро пожаловать в HR SaaS
                </h1>
                <p className='text-muted-foreground max-w-md'>
                    Для начала работы добавьте вашу компанию, используя кнопку в
                    левой панели навигации
                </p>
            </div>
        )
    }

    return null
}

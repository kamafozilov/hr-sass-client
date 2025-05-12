'use client'

import { Building, Info, Users } from 'lucide-react'
import * as React from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/shared/components/ui/sidebar'
import { useUserCompanies } from '@/shared/hooks/useUserCompanies'

import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'

const data = {
    user: {
        name: 'Админ',
        email: 'admin@example.com',
        avatar: '/avatars/kamron.jpg',
    },
    companies: [
        {
            name: 'ООО Акме',
            logo: Building,
            plan: 'Корпоративный',
        },
    ],
    navMain: [
        {
            title: 'Сотрудники',
            url: '/dashboard/employees',
            icon: Users,
            isActive: true,
            items: [
                {
                    title: 'Список сотрудников',
                    url: '/dashboard/employees/list',
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: companies } = useUserCompanies()
    const hasCompanies = companies && companies.length > 0

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                {hasCompanies ? (
                    <NavMain items={data.navMain} />
                ) : (
                    <div className='px-4 py-3 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-2 mb-2'>
                            <Info className='size-4' />
                            <span className='font-medium'>
                                Навигация недоступна
                            </span>
                        </div>
                        <p>Для доступа к меню сначала добавьте компанию</p>
                    </div>
                )}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}

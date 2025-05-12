'use client'

import { Building, ChevronsUpDown } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'

import { ICompanyWithRole } from '@/features/company/types'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/shared/components/ui/sidebar'
import { useUserCompanies } from '@/shared/hooks/useUserCompanies'

import { AddCompanyDialog } from './add-company-dialog'

export function TeamSwitcher() {
    const { isMobile } = useSidebar()
    const router = useRouter()
    const pathname = usePathname()
    const { data: companies, isLoading } = useUserCompanies()
    const [activeCompany, setActiveCompany] =
        React.useState<ICompanyWithRole | null>(null)

    React.useEffect(() => {
        if (companies && companies.length > 0 && !activeCompany) {
            setActiveCompany(companies[0])
        }
    }, [companies, activeCompany])

    const handleCompanySwitch = React.useCallback(
        (company: ICompanyWithRole) => {
            setActiveCompany(company)

            if (pathname) {
                const newPath = pathname.replace(
                    /\/dashboard\/([^\/]+)/,
                    `/dashboard/${company.id}`
                )
                router.push(newPath)
            } else {
                router.push(`/dashboard/${company.id}`)
            }
        },
        [router, pathname]
    )

    if (isLoading) {
        return null
    }

    const hasCompanies = companies && companies.length > 0

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                {hasCompanies && activeCompany ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size='lg'
                                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                            >
                                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                    <Building className='size-4' />
                                </div>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-semibold'>
                                        {activeCompany.name}
                                    </span>
                                    <span className='truncate text-xs'>
                                        {activeCompany.role}
                                    </span>
                                </div>
                                <ChevronsUpDown className='ml-auto' />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                            align='start'
                            side={isMobile ? 'bottom' : 'right'}
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className='text-xs text-muted-foreground'>
                                Компании
                            </DropdownMenuLabel>
                            {companies.map(company => (
                                <DropdownMenuItem
                                    key={company.id}
                                    onClick={() => handleCompanySwitch(company)}
                                    className='gap-2 p-2'
                                >
                                    <div className='flex size-6 items-center justify-center rounded-sm border'>
                                        <Building className='size-4 shrink-0' />
                                    </div>
                                    {company.name}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className='p-0'>
                                <AddCompanyDialog />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <AddCompanyDialog />
                )}
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

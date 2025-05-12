'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import * as React from 'react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/shared/components/ui/collapsible'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/shared/components/ui/sidebar'

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const pathname = usePathname()
    const { companyId } = useParams()

    const processedItems = React.useMemo(() => {
        if (!companyId) return items

        return items.map(item => ({
            ...item,
            url: item.url.replace('/dashboard/', `/dashboard/${companyId}/`),
            items: item.items?.map(subItem => ({
                ...subItem,
                url: subItem.url.replace(
                    '/dashboard/',
                    `/dashboard/${companyId}/`
                ),
            })),
        }))
    }, [items, companyId])

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Платформа</SidebarGroupLabel>
            <SidebarMenu>
                {processedItems.map(item => {
                    const isActive =
                        pathname === item.url || pathname.startsWith(item.url)

                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={isActive || item.isActive}
                            className='group/collapsible'
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map(subItem => {
                                            const isSubActive =
                                                pathname === subItem.url

                                            return (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        className={
                                                            isSubActive
                                                                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                                                : undefined
                                                        }
                                                    >
                                                        <Link
                                                            href={subItem.url}
                                                        >
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            )
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}

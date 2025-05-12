import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar'

import { AppSidebar } from './_components/app-sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    )
}

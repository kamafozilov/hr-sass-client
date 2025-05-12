'use client'

import { PropsWithChildren } from 'react'

import { TanstackQueryProvider } from './tanstack-query.provider'
import { ToastProvider } from './toast.provider'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
    return (
        <TanstackQueryProvider>
            <ToastProvider />
            {children}
        </TanstackQueryProvider>
    )
}

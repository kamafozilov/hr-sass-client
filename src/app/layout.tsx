import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { MainProvider } from '@/shared/providers'

import './globals.css'

const roboto = Roboto({
    subsets: ['cyrillic'],
})

export const metadata: Metadata = {
    title: {
        default: 'HR SASS',
        template: '%s - HR SASS',
    },
    description: 'HR SASS',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='ru'>
            <body className={`${roboto.className} antialiased`}>
                <MainProvider>{children}</MainProvider>
            </body>
        </html>
    )
}

import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
    const { url, cookies } = request

    const session = cookies.get('session')?.value

    if (url.endsWith('/') && session) {
        return NextResponse.redirect(new URL('/dashboard', url))
    }

    if (url.includes('/dashboard') && !session) {
        return NextResponse.redirect(new URL('/', url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/dashboard/:path*'],
}

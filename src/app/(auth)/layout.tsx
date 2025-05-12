export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='grid items-center justify-center min-h-screen lg:grid-cols-2'>
            <div className='flex items-center justify-center'>{children}</div>
            <div className='hidden lg:flex items-center justify-center h-screen bg-[url("/background.png")] bg-cover bg-center'></div>
        </div>
    )
}

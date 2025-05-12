import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeAuthSchema } from '../schemas'
import { authService } from '../services'
import { IUser } from '../types'

export const useAuthMutation = () => {
    const router = useRouter()

    const { mutate: login, isPending: isLoadingLogin } = useMutation({
        mutationKey: ['login'],
        mutationFn: (values: TypeAuthSchema) =>
            authService.login(values) as Promise<IUser | { message: string }>,
        onSuccess(data) {
            if ('message' in data) {
                toast.error(data.message)
            } else {
                toast.success('Вы успешно вошли в систему')
                router.push('/dashboard')
            }
        },
        onError(error) {
            toastMessageHandler(error)
        },
    })

    return {
        login,
        isLoadingLogin,
    }
}

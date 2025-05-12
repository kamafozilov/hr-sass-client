import { useQuery } from '@tanstack/react-query'

import { authService } from '@/features/auth/services'
import { IUser } from '@/features/auth/types'

import { useAuthStatus } from './useAuthStatus'

export function useProfile() {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuthStatus()

    return useQuery<IUser>({
        queryKey: ['profile'],
        queryFn: async () => {
            return await authService.getMe()
        },
        enabled: isAuthenticated && !isAuthLoading,
    })
}

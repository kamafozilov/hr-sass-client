import { useQuery } from '@tanstack/react-query'

import { api } from '@/shared/api'

export function useAuthStatus() {
    const { data, isLoading } = useQuery({
        queryKey: ['auth-status'],
        queryFn: () => api.get<{ isAuthenticated: boolean }>('auth/me'),
    })

    return {
        isAuthenticated: data?.isAuthenticated ?? false,
        isLoading,
    }
}

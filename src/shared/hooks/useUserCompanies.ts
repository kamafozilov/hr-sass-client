import { useQuery } from '@tanstack/react-query'

import { companyService } from '@/features/company/services'
import { ICompanyWithRole } from '@/features/company/types'

import { useAuthStatus } from './useAuthStatus'
import { useProfile } from './useProfile'

export function useUserCompanies() {
    const { isAuthenticated, isLoading: authLoading } = useAuthStatus()
    const { data: user, isLoading: profileLoading } = useProfile()

    const {
        data: userCompanyData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['userCompanies', user?.id],
        queryFn: () => companyService.getUserCompanies(user?.id as string),
        enabled:
            isAuthenticated && !authLoading && !profileLoading && !!user?.id,
    })

    const data: ICompanyWithRole[] = userCompanyData
        ? userCompanyData.map(userCompany => ({
              id: userCompany.companyId,
              name: userCompany.company?.name || 'Unnamed Company',
              role: userCompany.role,
              createdAt: userCompany.createdAt,
              updatedAt: userCompany.updatedAt,
          }))
        : []

    return {
        data,
        isLoading: authLoading || profileLoading || isLoading,
        error,
        activeCompany: data && data.length > 0 ? data[0] : null,
    }
}

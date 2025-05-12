import { useQuery } from '@tanstack/react-query'

import { companyService } from '@/features/company/services/company.service'
import { ICompany } from '@/features/company/types'

export const useCompany = (companyId: string) => {
    return useQuery<ICompany>({
        queryKey: ['company', companyId],
        queryFn: async () => {
            return await companyService.getCompanyById(companyId)
        },
        enabled: !!companyId,
    })
}

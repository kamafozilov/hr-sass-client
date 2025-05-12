import { ICompany, IUserCompany } from '@/features/company/types'

import { api } from '@/shared/api'

class CompanyService {
    public async getUserCompanies(userId: string) {
        const response = await api.get<IUserCompany[]>(
            `user-companies/by-user?userId=${userId}`
        )
        return response
    }

    public async getCompanyById(id: string) {
        const response = await api.get<ICompany>(`companies/${id}`)
        return response
    }

    public async createCompany(name: string) {
        const response = await api.post<ICompany>('companies', { name })
        return response
    }

    public async deleteCompany(id: string) {
        const response = await api.delete(`companies/${id}`)
        return response
    }

    public async createUserCompany(
        userId: string,
        companyId: string,
        role: string
    ) {
        const response = await api.post('user-companies', {
            userId,
            companyId,
            role,
        })
        return response
    }
}

export const companyService = new CompanyService()

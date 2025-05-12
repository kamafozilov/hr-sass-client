import { ICompany } from './company.type'

export interface IUserCompany {
    id: string
    userId: string
    companyId: string
    role: string
    company?: ICompany
    createdAt: string
    updatedAt: string
}

export interface ICompany {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface ICompanyWithRole extends ICompany {
    role: string
}

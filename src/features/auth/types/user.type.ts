export enum EUserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface IUser {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    userCompanies: IUserCompany[]
    createdAt: string
    updatedAt: string
}

export interface IUserCompany {
    id: string
    userId: string
    companyId: string
    role: EUserRole
    createdAt: string
    updatedAt: string
}

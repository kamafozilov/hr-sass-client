import { IUser } from '@/features/auth/types'

import { api } from '@/shared/api'

import { TypeAuthSchema } from '../schemas'

class AuthService {
    public async login(body: TypeAuthSchema) {
        const response = await api.post('auth/login', body)

        return response
    }

    public async getMe() {
        const response = await api.get<IUser>('users/profile')

        return response
    }

    public async logout() {
        const response = await api.post('auth/logout')

        return response
    }
}

export const authService = new AuthService()

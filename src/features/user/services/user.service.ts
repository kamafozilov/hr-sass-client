import { IUser } from '@/features/auth/types'

import { api } from '@/shared/api'

import { TypeUserSchema } from '../schemas'

class UserService {
    public async getUserProfile() {
        const response = await api.get<IUser>('users/profile')

        return response
    }

    public async updateUserProfile(data: TypeUserSchema) {
        const response = await api.put<IUser>('users/profile', data)

        return response
    }
}

export const userService = new UserService()

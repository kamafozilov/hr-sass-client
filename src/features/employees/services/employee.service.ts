import { IEmployee } from '@/features/employees/types'

import { api } from '@/shared/api'

class EmployeeService {
    public async getEmployeesByCompanyId(companyId: string) {
        const response = await api.get<IEmployee[]>(
            `companies/${companyId}/employees`
        )
        return response
    }

    public async getEmployeeById(id: string) {
        const response = await api.get<IEmployee>(`employees/${id}`)
        return response
    }

    public async createEmployee(
        employee: Omit<IEmployee, 'id' | 'createdAt' | 'updatedAt'>
    ) {
        const response = await api.post<IEmployee>('employees', employee)
        return response
    }

    public async updateEmployee(
        id: string,
        employee: Partial<Omit<IEmployee, 'id' | 'createdAt' | 'updatedAt'>>
    ) {
        const response = await api.put<IEmployee>(`employees/${id}`, employee)
        return response
    }

    public async deleteEmployee(id: string) {
        const response = await api.delete<IEmployee>(`employees/${id}`)
        return response
    }
}

export const employeeService = new EmployeeService()

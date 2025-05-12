import { useQuery } from '@tanstack/react-query'

import { employeeService } from '@/features/employees/services/employee.service'
import { IEmployee } from '@/features/employees/types'

export const useEmployees = (companyId: string) => {
    return useQuery<IEmployee[]>({
        queryKey: ['employees', companyId],
        queryFn: async () => {
            return await employeeService.getEmployeesByCompanyId(companyId)
        },
        enabled: !!companyId,
    })
}

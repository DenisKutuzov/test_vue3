
import httpClient from '@/utils/httpClient'

class TenantsBalanceRepository extends httpClient {
   resource = '/tenants/balance';

   async getDriverBalanceHistory (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.driverBalanceHistories ?? []
   }

   async dropDriverBalances (data) {
     const response = await this.post(`${this.resource}/zero`, data)
     return response
   }

   async getDriverBalanceDebts (params) {
     const response = await this.get(`${this.resource}/depts`, { params })
     return response?.driverBalanceDebts ?? []
   }

   async getDriverBalancesDebts (params) {
     const response = await this.get(`${this.resource}/debts`, { params })
     return response?.driverBalanceDebts ?? []
   }

   async updateDriverBalance (params) {
     const response = await this.patch(`${this.resource}`, false, { params })
     return response?.changedDriverBalance ?? {}
   }
}

export default TenantsBalanceRepository

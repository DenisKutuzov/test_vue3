
import httpClient from '@/utils/httpClient'

class TenantsDepositRepository extends httpClient {
   resource = '/tenants/deposit';

   async getDriverDeposit (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.driverDepositHistories ?? []
   }

   async getDriverDeptsReport (params) {
     const response = await this.get(`${this.resource}/depts`, { params })
     return response?.driverBalanceDebts ?? []
   }

   async updateDriverDeposit (params) {
     const response = await this.patch(`${this.resource}`, undefined, { params })
     return response?.driverDepositHistories ?? []
   }
}

export default TenantsDepositRepository


import httpClient from '@/utils/httpClient'

class TenantsTransactionsRepository extends httpClient {
   resource = '/tenants/transaction';

   async createTransaction (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.transaction ?? []
   }

   async createTransactionFromDriver (data) {
     const response = await this.post(`${this.resource}/from-driver`, data)
     return response?.transaction ?? {}
   }

   async deleteTransaction (params) {
     const response = await this.delete(`${this.resource}`, { params })
     return response ?? {}
   }
}

export default TenantsTransactionsRepository

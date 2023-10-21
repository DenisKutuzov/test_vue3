
import httpClient from '@/utils/httpClient'

class ParkManagmentInvestorsRepository extends httpClient {
   resource = '/park_management/investors';

   async getInvestors (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.investors ?? []
   }

   async getInvestorById (id) {
     const response = await this.get(`${this.resource}/${id}`)
     return response?.investor ?? {}
   }

   async deleteInvestorById (id) {
     const response = await this.delete(`${this.resource}/${id}`)
     return response?.investor ?? []
   }

   async createInvestor (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.investor ?? {}
   }

   async updateInvestor (id, data) {
     const response = await this.put(`${this.resource}/${id}`, data)
     return response?.investor ?? {}
   }
}

export default ParkManagmentInvestorsRepository

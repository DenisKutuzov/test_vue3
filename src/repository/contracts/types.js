
import httpClient from '@/utils/httpClient'

class СontractsTypesRepository extends httpClient {
   resource = '/contracts/types';

   async getContractTypes (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.contractTypes ?? []
   }

   async createContractType (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.contractType ?? []
   }

   async deleteContractType (id) {
     const response = await this.delete(`${this.resource}/${id}`)
     return response?.contractType ?? []
   }

   async updateContractType (id, data) {
     const response = await this.put(`${this.resource}/${id}`, data)
     return response?.contractType ?? []
   }
}

export default СontractsTypesRepository

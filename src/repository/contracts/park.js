
import httpClient from '@/utils/httpClient'

class СontractsParkRepository extends httpClient {
   resource = '/contracts/park';

   async getParkContractTemplates (params) {
     const response = await this.get(`${this.resource}/templates`, { params })
     return response?.parkContractTemplates ?? []
   }

   async createParkContractTamplate (data) {
     const response = await this.post(`${this.resource}/template`, data)
     return response?.parkContractTemplates ?? []
   }

   async updateParkContractTamplate (data) {
     const response = await this.put(`${this.resource}/template`, data)
     return response?.parkContractTemplates ?? []
   }

   async deleteParkContractTamplate (id) {
     const response = await this.delete(`${this.resource}/template/${id}`)
     return response
   }
}

export default СontractsParkRepository

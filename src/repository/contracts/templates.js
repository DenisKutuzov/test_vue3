
import httpClient from '@/utils/httpClient'

class СontractsTemplatesRepository extends httpClient {
   resource = '/contracts/templates';

   async getContractTemplates (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.contractTemplates ?? []
   }

   async createContractTemplate (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.contractTemplate ?? []
   }

   async getContractTemplateVariables (params) {
     const response = await this.post(`${this.resource}/variables`, { params })
     return response?.variables ?? []
   }

   async getContractTemplateById (id) {
     const response = await this.get(`${this.resource}/${id}`)
     return response?.contractTemplate ?? {}
   }

   async deleteContractTemplate (id) {
     const response = await this.delete(`${this.resource}/${id}`)
     return response?.contractTemplate ?? []
   }

   async updateContractTemplate (id, data) {
     const response = await this.put(`${this.resource}/${id}`, data)
     return response?.contractTemplate ?? []
   }
}

export default СontractsTemplatesRepository

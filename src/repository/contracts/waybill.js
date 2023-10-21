
import httpClient from '@/utils/httpClient'

class СontractsTemplatesWaybillRepository extends httpClient {
   resource = '/contracts/waybill/template';

   async getWaybillTemplate (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response
   }

   async getWaybillTemplatePrint (params) {
     const response = await this.get(`${this.resource}/print`, { params })
     return response
   }

   async updateCreateWaybillTemplate (data) {
     const response = await this.post(`${this.resource}/update`, data)
     return response
   }

   async generateWaybill (data) {
     const response = await this.post('/contracts/waybill/generate', data)
     return response
   }
}

export default СontractsTemplatesWaybillRepository


import httpClient from '@/utils/httpClient'
import СontractsTemplatesRepository from './templates'
import СontractsTypesRepository from './types'
import СontractsParkRepository from './park'
import СontractsTemplatesWaybillRepository from './waybill'
class СontractsRepository extends httpClient {
   resource = '/contracts';

   async getContracts (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.contracts ?? {}
   }

   async getPaymentOrder (params) {
     const response = await this.get(`${this.resource}/payment_order`, { params })
     return response?.driversDebts ?? []
   }
}

const СontractsRepositoryes = {
  index: new СontractsRepository(),
  templates: new СontractsTemplatesRepository(),
  types: new СontractsTypesRepository(),
  park: new СontractsParkRepository(),
  waybill: new СontractsTemplatesWaybillRepository()

}
export default СontractsRepositoryes

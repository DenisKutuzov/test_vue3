
import httpClient from '@/utils/httpClient'

class TenantsFormulasRepository extends httpClient {
   resource = '/park_management/settings/formulas';

   async getFormulas (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response ?? {}
   }

   async updateFormulas (params) {
     const response = await this.patch(`${this.resource}`, undefined, { params })
     return response ?? {}
   }

   async getConfiguratorInspector (data, config) {
     const response = await this.post(`${this.resource}/configurator-inspector`, data, config)
     return response ?? {}
   }
}

export default TenantsFormulasRepository

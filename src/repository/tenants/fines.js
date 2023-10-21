
import httpClient from '@/utils/httpClient'

class TenantsFinesRepository extends httpClient {
   resource = '/tenants/fines';

   async getFineById (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.fine ?? {}
   }

   async deleteFine (params) {
     const response = await this.delete(`${this.resource}`, { params })
     return response ?? {}
   }

   async changeDriver (data) {
     const response = await this.post(`${this.resource}`, data)
     return response ?? {}
   }

   async acceptFine (data) {
     const response = await this.post(`${this.resource}/accept`, data)
     return response ?? {}
   }

   async changeCompanyPayment (params) {
     const response = await this.patch(`${this.resource}/change`, undefined, { params })
     return response ?? {}
   }

   async acceptToFindFine (params) {
     const response = await this.get(`${this.resource}/find`, { params })
     return response ?? {}
   }

   async getFines (params) {
     const response = await this.get(`${this.resource}/all`, { params })
     return response?.fines ?? []
   }
}

export default TenantsFinesRepository

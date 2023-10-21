
import httpClient from '@/utils/httpClient'

class MaintenanceSparePartRepository extends httpClient {
   resource = '/maintenance/spare-part';

   async getSpareParts (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response.spareParts
   }

   async getSparePartsByCategory (categoryId) {
     const response = await this.get(`${this.resource}/category`, { params: { categoryId } })
     return response.sparePart
   }

   async deleteSparePart (params) {
     const response = await this.delete(`${this.resource}`, { params })
     return response?.sparePart ?? {}
   }

   async createSparePart (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.sparePart ?? {}
   }

   async updateSparePart (data) {
     const response = await this.put(`${this.resource}`, data)
     return response?.sparePart ?? {}
   }
}

export default MaintenanceSparePartRepository

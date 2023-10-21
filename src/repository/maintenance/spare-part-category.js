
import httpClient from '@/utils/httpClient'

class MaintenanceSparePartCategoryRepository extends httpClient {
   resource = '/maintenance/spare-part-category';

   async getSparePartCategories (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response.sparePartCategories
   }

   async deleteSparePartCategory (params) {
     const response = await this.delete(`${this.resource}`, { params })
     return response?.sparePartCategory ?? {}
   }

   async createSparePartCategory (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.sparePartCategory ?? {}
   }

   async updateSparePartCategory (data) {
     const response = await this.put(`${this.resource}`, data)
     return response?.sparePartCategory ?? {}
   }
}

export default MaintenanceSparePartCategoryRepository

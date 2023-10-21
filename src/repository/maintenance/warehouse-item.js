
import httpClient from '@/utils/httpClient'

class MaintenanceWarehouseItemRepository extends httpClient {
   resource = '/maintenance/ware-house-item';

   async getWarehouseItems (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response.wareHouses
   }

   async deleteWarehouseItem (id) {
     const response = await this.delete(`${this.resource}`, { params: { id } })
     return response?.wareHouse ?? {}
   }

   async createWarehouseItem (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.wareHouse ?? {}
   }

   async warehouseItemMove (data) {
     const response = await this.post(`${this.resource}/move`, {}, { params: data })
     return response?.wareHouse ?? {}
   }

   async updateWarehouseItem (data) {
     const response = await this.put(`${this.resource}`, data)
     return response?.wareHouse ?? {}
   }
}

export default MaintenanceWarehouseItemRepository

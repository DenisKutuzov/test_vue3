
import httpClient from '@/utils/httpClient'

class MaintenanceWarehouseRepository extends httpClient {
   resource = '/maintenance/warehouse';

   async getWarehouses (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response.warehouses
   }

   async deleteWarehouse (params) {
     const response = await this.delete(`${this.resource}`, { params })
     return response?.warehouse ?? {}
   }

   async createWarehouse (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.warehouse ?? {}
   }

   async updateWarehouse (data) {
     const response = await this.put(`${this.resource}`, data)
     return response?.warehouse ?? {}
   }
}

export default MaintenanceWarehouseRepository


import httpClient from '@/utils/httpClient'

class MaintenanceSupplierRepository extends httpClient {
   resource = '/maintenance/supplier';

   async getSuppliers (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response.suppliers
   }

   async getSupplierById (supplierId) {
     const response = await this.get(`${this.resource}/id`, { params: { supplierId } })
     return response.supplier
   }

   async deleteSupplier (params) {
     const response = await this.delete(`${this.resource}`, { params })
     return response ?? {}
   }

   async createSupplier (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.supplier ?? {}
   }

   async updateSupplier (data) {
     const response = await this.put(`${this.resource}`, data)
     return response?.supplier ?? {}
   }
}

export default MaintenanceSupplierRepository

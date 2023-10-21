
import httpClient from '@/utils/httpClient'

class MaintenanceOrderRepository extends httpClient {
   resource = '/maintenance/order';

   async getOrders (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response.orders
   }

   async acceptOrder (orderId) {
     const response = await this.post(`${this.resource}/accept`, { orderId })
     return response.order
   }

   async getOrderById (orderId) {
     const response = await this.get(`${this.resource}/id`, { params: { orderId } })
     return response.order
   }

   async deleteOrder (orderId) {
     const response = await this.delete(`${this.resource}`, { params: { orderId } })
     return response?.order ?? {}
   }

   async createOrder (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.order ?? {}
   }

   async updateOrder (data) {
     const response = await this.put(`${this.resource}`, data)
     return response?.order ?? {}
   }
//    async updateSupplier (data) {
//      const response = await this.put(`${this.resource}`, data)
//      return response?.supplier ?? {}
//    }
}

export default MaintenanceOrderRepository

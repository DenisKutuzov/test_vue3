
import httpClient from '@/utils/httpClient'

class MaintenanceMovementRepository extends httpClient {
   resource = '/maintenance/ware-house/movement';

   async getMovementHistory (params) {
     const response = await this.get(`${this.resource}/history`, { params })
     return response.movementHistories
   }

   async getMovementHistoryByWarehouseItemId (params) {
     const response = await this.get(`${this.resource}/history/by-warehouse-item`, { params })
     return response.warehouseItemMovementHistorys
   }

   async getScrappedHistory (params) {
     const response = await this.get(`${this.resource}/scrapped`, { params })
     return response.scrappedHistories
   }

   async getScrappedHistoryByWarehouseItemId (params) {
     const response = await this.get(`${this.resource}/scrapped/by-warehouse-item`, { params })
     return response.warehouseItemScrappedHistories
   }
  //  async deleteTransfer (params) {
  //    const response = await this.delete(`${this.resource}`, { params })
  //    return response?.transferRequest ?? {}
  //  }

  //  async createTransfer (data) {
  //    const response = await this.post(`${this.resource}`, data)
  //    return response?.transferRequest ?? {}
  //  }

  //  async updateTransfer (data) {
  //    const response = await this.put(`${this.resource}`, data)
  //    return response?.supplier ?? {}
  //  }
}

export default MaintenanceMovementRepository

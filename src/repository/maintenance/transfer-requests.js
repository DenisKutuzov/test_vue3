
import httpClient from '@/utils/httpClient'

class MaintenanceTransferReqsRepository extends httpClient {
   resource = '/maintenance/transfer-request';

   async getTransfers (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response.transferRequests
   }

   async deleteTransfer (params) {
     const response = await this.delete(`${this.resource}`, { params })
     return response?.transferRequest ?? {}
   }

   async createTransfer (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.transferRequest ?? {}
   }

   async updateTransfer (data) {
     const response = await this.put(`${this.resource}`, data)
     return response?.supplier ?? {}
   }

   async approveTransfer (id) {
     const response = await this.patch(`${this.resource}/${id}`)
     return response?.supplier ?? {}
   }
}

export default MaintenanceTransferReqsRepository

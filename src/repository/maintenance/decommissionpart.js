
import httpClient from '@/utils/httpClient'

class MaintenanceDecommissionPartRepository extends httpClient {
   resource = '/maintenance/decommissionpart';

   async getDecommissionParts (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response.decommissionParts
   }

   async deleteDecommissionPart (decommissionPartId) {
     const response = await this.delete(`${this.resource}`, { params: { decommissionPartId } })
     return response ?? {}
   }

   async createDecommissionPart (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.decommissionPart ?? {}
   }
}

export default MaintenanceDecommissionPartRepository

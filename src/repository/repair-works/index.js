
import httpClient from '@/utils/httpClient'

class RepairWorksRepository extends httpClient {
   resource = '/maintenance/repair-works';
   resourcePrice = '/maintenance/repair-price';

   async getRepairWorks (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.repairWorks ?? []
   }

   async getRepairWorkById (id) {
     const response = await this.get(`${this.resource}/${id}`)
     return response?.repairWork ?? []
   }

   async deleteRepairWorkById (id) {
     const response = await this.delete(`${this.resource}/${id}`)
     return response?.repairWork ?? []
   }

   async createRepairWorks (data) {
     const response = await this.post(`${this.resource}`, data)
     return response ?? []
   }

   async updateRepairWorks (id, data) {
     const response = await this.put(`${this.resource}/${id}`, data)
     return response ?? []
   }

   async createRepairPrice (data) {
     const response = await this.post(`${this.resourcePrice}`, data)
     return response ?? []
   }

   async getRepairPriceById (id) {
     const response = await this.get(`${this.resourcePrice}/${id}`)
     return response ?? []
   }

   async deleteRepairPrice (id) {
     const response = await this.delete(`${this.resourcePrice}/${id}`)
     return response ?? []
   }

   async updateRepairPrice (id, data) {
     const response = await this.put(`${this.resourcePrice}/${id}`, data)
     return response ?? []
   }
}

export default RepairWorksRepository


import httpClient from '@/utils/httpClient'

class ParkManagmentDriversRepository extends httpClient {
   resource = '/park_management/drivers';

   async getDrivers (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response
   }

   async getDriverById (params) {
     const response = await this.get(`${this.resource}/id`, { params })
     return response?.driver ?? {}
   }

   async updateDriver (data) {
     const response = await this.put(`${this.resource}`, data)
     return response
   }

   async uploadPhotosDriver (driverId, data) {
     const response = await this.post(`${this.resource}/${driverId}/photos`, data)
     return response
   }

   async deletePhotosDriver (driverId, params) {
     const response = await this.delete(`${this.resource}/${driverId}/photos`, { params })
     return response
   }

   async saveDriversFromAggregator () {
     const response = await this.post(`${this.resource}/from-aggregator`)
     return response
   }

   async changeDriverRikStatus (data) {
     const response = await this.put(`${this.resource}/change-rik-status`, data)
     return response?.driver
   }
}

export default ParkManagmentDriversRepository

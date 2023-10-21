
import httpClient from '@/utils/httpClient'

class ScheduleRegionParkRepository extends httpClient {
   resource = '/schedule/region-park';

   async getRegionParks (params) {
     const response = await this.get(`${this.resource}/all`, { params })
     return response?.regionParks ?? {}
   }

   async deleteRegionParkById (id) {
     const response = await this.delete(`${this.resource}/${id}`)
     return response?.regionPark ?? {}
   }

   async getRegionParkById (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.regionPark ?? {}
   }

   async driverUnbind (data) {
     const response = await this.post(`${this.resource}/unbind`, data)
     return response
   }

   async driverBind (data) {
     const response = await this.post(`${this.resource}/bind`, data)
     return response
   }

   async createRegionPark (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.regionPark ?? {}
   }

   async updateRegionPark (data) {
     const response = await this.put(`${this.resource}`, data)
     return response?.regionPark ?? {}
   }
}

export default ScheduleRegionParkRepository

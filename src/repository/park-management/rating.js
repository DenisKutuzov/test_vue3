
import httpClient from '@/utils/httpClient'

class ParkManagmentRatingRepository extends httpClient {
   resource = '/park_management/rating';

   async getDriverRating (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.ratings ?? []
   }

   async createDriverRating (data) {
     const response = await this.post(`${this.resource}`, data)
     return response?.driverRating ?? {}
   }
}

export default ParkManagmentRatingRepository


import httpClient from '@/utils/httpClient'

class ParkManagmentCarConditionsRepository extends httpClient {
   resource = '/park_management/car_conditions';

   async getCarConditions (params) {
     const response = await this.get(`${this.resource}/get_car_conditions`, { params })
     return response?.carConditions ?? {}
   }

   async updateCarCondition (data) {
     const response = await this.put(`${this.resource}/update_car_condition`, data)
     return response?.carCondition ?? {}
   }

   async deleteCarCondition (params) {
     const response = await this.delete(`${this.resource}/delete_car_condition`, { params })
     return response?.carCondition ?? {}
   }

   async createCarCondition (data) {
     const response = await this.post(`${this.resource}/create_car_condition`, data)
     return response?.carCondition ?? {}
   }
}

export default ParkManagmentCarConditionsRepository

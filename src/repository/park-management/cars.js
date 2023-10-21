
import httpClient from '@/utils/httpClient'
import cars from '@/mock/cars'

class ParkManagmentCarsRepository extends httpClient {
   resource = '/park_management/cars';

   async getCars (params) {
     // const response = await this.get(`${this.resource}`, { params })
     const response = cars
     return response ?? {}
   }

   async getCarModels (params) {
     const response = await this.get('/park_management/car_models', { params })
     return response ?? {}
   }

   async getCarById (id) {
     // const response = await this.get(`${this.resource}/${id}`)
     const response = cars.cars.find(cur => cur.id === id)
     return response ?? {}
   }

   async getCarsShort (params) {
     const response = await this.get(`${this.resource}/list`, { params })
     return response?.cars ?? {}
   }

   async saveTaxiCarsFromYandex () {
     const response = await this.post(`${this.resource}/save_from_aggregator`)
     return response
   }

   async updateCarSettings (data) {
     const response = await this.put(`${this.resource}/update_settings`, data)
     return response
   }

   async useTransferRegionPark (data) {
     const response = await this.post(`${this.resource}/transfer_region_park`, data)
     return response
   }
}

export default ParkManagmentCarsRepository


import httpClient from '../utils/httpClient'

class WorkersRepository extends httpClient {
   resource = '/worker';

   async updateScheduleTask (data) {
     const response = await this.post(`${this.resource}/updateScheduleTask`, data)
     return response
   }

   async updateScheduleForDriverTask (data) {
     const response = await this.post(`${this.resource}/updateScheduleForDriverTask`, data)
     return response
   }
}

export default WorkersRepository

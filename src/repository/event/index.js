
import httpClient from '@/utils/httpClient'
class EventRepository extends httpClient {
   resource = '/event';

   async getEvents (params) {
     const response = await this.get(`${this.resource}/all`, { params })
     return response ?? {}
   }
}

export default EventRepository

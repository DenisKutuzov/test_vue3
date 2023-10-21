
import httpClient from '@/utils/httpClient'

class ScheduleStatisticRepository extends httpClient {
   resource = '/reports/shift-statistic';

   async getStatistic (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response
   }

   async getStatisticExel (params) {
     const response = await this.get(`${this.resource}/exel`, { params })
     return response?.exelString ?? {}
   }
}

export default ScheduleStatisticRepository

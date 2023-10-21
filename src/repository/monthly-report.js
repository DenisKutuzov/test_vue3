
import httpClient from '../utils/httpClient'

class MonthlyPerortRepository extends httpClient {
   resource = '/reports/monthly';

   async getMonthlyReport (params) {
     const response = await this.get(`${this.resource}/finance`, { params })
     return response?.monthlyReports ?? {}
   }

   async getTotalDriverDeposit (params) {
     const response = await this.get('/reports/driver/total-sum', { params })
     return response?.totalSum ?? 0
   }
}

export default MonthlyPerortRepository

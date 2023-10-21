
import httpClient from '../utils/httpClient'

class MonthlyMaintenancePeportRepository extends httpClient {
   resource = '/reports/monthly-maintenance';

   async getMonthlyMaintenanceReport (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.monthlyReports ?? {}
   }
}

export default MonthlyMaintenancePeportRepository

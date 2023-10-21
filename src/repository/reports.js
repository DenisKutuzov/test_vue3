
import httpClient from '../utils/httpClient'

class ReportGlobalRepository extends httpClient {
   resource = '/reports';

   async getReportDriver (data) {
     const response = await this.post(`${this.resource}/driver/excel`, data)
     return response?.excelString ?? {}
   }
}

export default ReportGlobalRepository


import httpClient from '../utils/httpClient'

class DashbordRepository extends httpClient {
   resource = '/reports/dashbord';

   async getFinance (params) {
     const response = await this.get(`${this.resource}/finance`, { params })
     return response?.dashboardFinances ?? {}
   }

   async getCarLoad (params) {
     const response = await this.get(`${this.resource}/car-load`, { params })
     return response?.dashboardCarLoad ?? {}
   }

   async getTenantsIncome (params) {
     const response = await this.get(`${this.resource}/tenants-income`, { params })
     return response?.dashboardTenantsIncome ?? {}
   }

   async getFines (params) {
     const response = await this.get(`${this.resource}/fines`, { params })
     return response?.dashboardFines ?? {}
   }

   async getDepts (params) {
     const response = await this.get(`${this.resource}/depts`, { params })
     return response?.dashboardDebts ?? {}
   }

   async getMaintenance (params) {
     const response = await this.get(`${this.resource}/maintenance`, { params })
     return response?.dashboardMaintenance ?? {}
   }

   async getMaintenanceExpense (params) {
     const response = await this.get(`${this.resource}/maintenance-expense`, { params })
     return response?.dashboardMaintenanceExpense ?? {}
   }
}

export default DashbordRepository

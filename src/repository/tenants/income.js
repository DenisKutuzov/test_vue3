
import httpClient from '@/utils/httpClient'

class TenantsIncomeRepository extends httpClient {
   resource = '/tenants/income';

   async getTenantsIncomeHistory (params) {
     const response = await this.get(`${this.resource}/all`, { params })
     return response?.tenantsIncomes ?? []
   }

   async getTenantsIncomeDetails (shiftId) {
     const response = await this.get(`${this.resource}/${shiftId}/retention-details`)
     return response
   }

   async getTenantsIncomeById (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response?.personalIncome ?? {}
   }

   async transferTransactionsToNextSchedule (shiftId) {
     const response = await this.post(`${this.resource}/transfer-transaction/${shiftId}`)
     return response ?? {}
   }

   async approveDriverCalculationBalance (shiftId, data) {
     const response = await this.post(`${this.resource}/${shiftId}/approve-calc-balance`, data)
     return response ?? {}
   }

   async approveDriverCalculationRegistry (shiftId, data) {
     const response = await this.post(`${this.resource}/${shiftId}/approve-calc-registry`, data)
     return response ?? {}
   }

   async generateIncomeExel (data) {
     const response = await this.post(`${this.resource}/generate-income-exel`, data)
     return response?.exelString ?? ''
   }

   async changeShiftPercent (data) {
     const response = await this.post(`${this.resource}/change-shift-percent`, data)
     return response ?? {}
   }

   async setSurcharge (data) {
     const response = await this.post(`${this.resource}/set-surcharge`, data)
     return response ?? {}
   }

   async getHistoryChangeSettings (data) {
     const response = await this.get(`${this.resource}/history-settings`, data)
     return response?.historySettings ?? {}
   }

   async defrayTransaction (id, data) {
     const response = await this.post(`${this.resource}/defray-transaction/${id}`, data)
     return response ?? {}
   }

   async deleteTenantIncome (params) {
     const response = await this.delete(`${this.resource}`, { params })
     return response ?? {}
   }
}

export default TenantsIncomeRepository

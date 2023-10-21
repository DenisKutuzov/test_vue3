
import httpClient from '@/utils/httpClient'

class ParkManagmentSettingsRepository extends httpClient {
   resource = '/park_management/settings';

   async getAllSettings (params) {
     const response = await this.get(`${this.resource}`, { params })
     return response ?? {}
   }

   async getDriverWorkRules (params) {
     const response = await this.get(`${this.resource}/driver_work_rules`, { params })
     return response?.driverWorkRules ?? {}
   }

   async updateDriverWorkRules (data) {
     const response = await this.put(`${this.resource}/driver_work_rules`, data)
     return response?.driverWorkRule ?? {}
   }

   async updateSettingsRent (data) {
     const response = await this.put(`${this.resource}/rent_settings`, data)
     return response ?? {}
   }

   async regionParkUseCommonSettings (params) {
     const response = await this.post(`${this.resource}/region_park_use_common_settings`, null, { params })
     return response
   }

   async regionParkUseOwnSettings (params) {
     const response = await this.post(`${this.resource}/region_park_use_own_settings`, null, { params })
     return response
   }

   async getDriversPercents (params) {
     const response = await this.get(`${this.resource}/drivers_percents`, { params })
     return response ?? ''
   }

   async updateDriversPercents (data) {
     const response = await this.put(`${this.resource}/drivers_percents`, data)
     return response?.driversPercents ?? ''
   }

   async updateFines (data) {
     const response = await this.put(`${this.resource}/fines`, data)
     return response?.fines ?? ''
   }

   async updateMyavoAPICredentials (data) {
     const response = await this.put(`${this.resource}/myavo_api_credentials`, data)
     return response ?? {}
   }

   async updateFinesServiceKey (data) {
     const response = await this.put(`${this.resource}/fines_service_key`, data)
     return response ?? {}
   }

   async updateYandexTaxiAPICredentials (data) {
     const response = await this.put(`${this.resource}/yandex_taxi_api_credentials`, data)
     return response ?? {}
   }

   async updateTimeZone (data) {
     const response = await this.put(`${this.resource}/time_zone`, data)
     return response ?? {}
   }

   async updateCommonSettings (data) {
     const response = await this.put(`${this.resource}/common_settings`, data)
     return response ?? {}
   }

   //  retention_borders
   async updateRetentionBorders (data) {
     const response = await this.put(`${this.resource}/retention_borders`, data)
     return response ?? {}
   }
}

export default ParkManagmentSettingsRepository

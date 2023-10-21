
import httpClient from '@/utils/httpClient'
import ScheduleRegionParkRepository from '@/repository/schedule/region-park'
import ScheduleStatisticRepository from '@/repository/schedule/statistic'
class ScheduleRepository extends httpClient {
   resource = '/schedule';

   async getSchedule (params) {
     const response = await this.get(`${this.resource}/all`, { params })
     return response?.scheduleEntries ?? {}
   }

   async getScheduleDrivers (params) {
     const response = await this.get(`${this.resource}/drivers`, { params })
     return response
   }

   async getDriversInChange (params) {
     const response = await this.get(`${this.resource}/drivers_in_change`, { params })
     return response?.drivers ?? []
   }

   async getScheduleRecordInfo (id) {
     const response = await this.get(`${this.resource}/info/${id}`)
     return response
   }

   async сreateScheduleRecord (data) {
     const response = await this.post(`${this.resource}`, data)
     return response
   }

   async editScheduleRecord (data) {
     const response = await this.put(`${this.resource}`, data)
     return response
   }

   async setCashFieldOnScheduleRecord (id, data) {
     const response = await this.post(`${this.resource}/change_cash/${id}`, data)
     return response
   }

   async getSchedulesNotCalculated (params) {
     const response = await this.get(`${this.resource}/not_calculated`, { params })
     return response?.schedules ?? []
   }

   async deleteScheduleRecord (id) {
     const response = await this.delete(`${this.resource}/${id}`)
     return response ?? {}
   }

   async transplantDriverOtherCar (data) {
     const response = await this.post(`${this.resource}/transplant_driver`, data)
     return response ?? {}
   }
}
/**
   * Exstends in ScheduleRepository
   *
   * @statistic
   * @regionPark
   * @index
   */
const ScheduleRepositoryes = {
  statistic: new ScheduleStatisticRepository(),
  regionPark: new ScheduleRegionParkRepository(),
  index: new ScheduleRepository()
}
export default ScheduleRepositoryes

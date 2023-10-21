<template>
  <div class="schedule-card">
  <template v-if="schedule.fullDay">
    <ScheduleDropdown
    :driver="schedule.fullDay"
    isFullDay
    :is-remove-button="showRemoveButton(schedule.fullDay.scheduleId)"
    :driver-date-is-current="driverDateIsCurrentDate()"
    class="schedule-card__button"
    @removeSchedule="handleRemoveSchedule(schedule.fullDay.scheduleId)"
    @createContracts="handleCreateContracts(schedule.fullDay.driverId)"
    @showMore="handleShowMore(schedule.fullDay, 'fullDay')"
    @waybill="generateWaybill({shiftId: schedule.fullDay.scheduleId, date })"
    @taxometr="redirectToTaxometr('fullDay')"
    @showMoreAboutDriver="handleShowMoreAboutDriver(schedule.fullDay.driverId)"
    @changeStatus="handleChangeStatus(schedule.fullDay)"
    @ignoreDriverWorking="handleIgnoreDriverWorking(schedule.fullDay, 'fullDay')"
    @changeDriver="handleChangeDriver({ schedule: schedule.fullDay, timesDay: 'fullDay', mode: 'change'})"
    @moveTransplantDriver="moveTransplantDriver('fullDay',schedule.fullDay.driverId,schedule,schedule.fullDay.scheduleId)"

    />
  </template>

  <template v-else>
    <ScheduleDropdown
      class="schedule-card__button"
      v-if="schedule.day"
      :driver="schedule.day"
      :is-remove-button="showRemoveButton(schedule.day.scheduleId)"
      :driver-date-is-current="driverDateIsCurrentDate()"

      @moveTransplantDriver="moveTransplantDriver('morning',schedule.day.driverId,schedule,schedule.day.scheduleId)"
      @createContracts="handleCreateContracts(schedule.day.driverId)"
      @showMore="handleShowMore(schedule.day, 'day')"
      @waybill="generateWaybill({shiftId: schedule.day.scheduleId, date })"
      @taxometr="redirectToTaxometr('day')"
      @showMoreAboutDriver="handleShowMoreAboutDriver(schedule.day.driverId)"
      @removeSchedule="handleRemoveSchedule(schedule.day.scheduleId)"
      @changeStatus="handleChangeStatus(schedule.day)"
      @ignoreDriverWorking="handleIgnoreDriverWorking(schedule.day, 'day')"
      @changeDriver="handleChangeDriver({ schedule: schedule.day, timesDay: 'day', mode: 'change'})" />

    <AddDriverButton
      v-else
      :isFullDay="parkType === 'fullday'"
      @addDriver="handleChangeDriver({ timesDay: 'day', mode: 'add' })"/>

    <template v-if="parkType !=='fullday'">
      <ScheduleDropdown
        class="schedule-card__button"
        v-if="schedule.night"
        :driver="schedule.night"
        :is-remove-button="showRemoveButton()"
        :driver-date-is-current="driverDateIsCurrentDate()"

        @moveTransplantDriver="moveTransplantDriver('night', schedule.night.driverId,schedule, schedule.night.scheduleId,)"
        @createContracts="handleCreateContracts(schedule.night.driverId)"
        @showMore="handleShowMore(schedule.night, 'night')"
        @taxometr="redirectToTaxometr('night')"
        @waybill="generateWaybill({shiftId: schedule.night.scheduleId, date })"
        @showMoreAboutDriver="handleShowMoreAboutDriver(schedule.night.driverId)"
        @removeSchedule="handleRemoveSchedule(schedule.night.scheduleId)"
        @changeStatus="handleChangeStatus(schedule.night)"
        @ignoreDriverWorking="handleIgnoreDriverWorking(schedule.night, 'night')"
        @changeDriver="handleChangeDriver({ schedule: schedule.night, timesDay: 'night', mode: 'change'})" />

      <AddDriverButton
        v-else
        @addDriver="handleChangeDriver({ timesDay: 'night', mode: 'add' })"/>

    </template>

  </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const AddDriverButton = () => import('@/components/AppScheduleAddDriverButton')
const ScheduleDropdown = () => import('@/components/schedule/ScheduleDropdown')

export default {
  name: 'ScheduleCard',

  props: {
    schedule: {
      type: Object,
      default: () => {}
    },

    date: {
      type: String,
      default: ''
    },

    carId: {
      type: [String, Number],
      required: true
    },

    carNumber: {
      type: String,
      default: ''
    },
    parkType: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('settings', ['getTaxometrLinkOrders'])
  },
  components: {
    ScheduleDropdown,
    AddDriverButton
  },

  methods: {
    ...mapActions('schedule', {
      fetchAvailableDrivers: 'fetchAvailableDrivers',
      fetchCurrentSchedule: 'fetchCurrentSchedule',
      changeDialogVisible: 'changeDialogVisible',
      setCurrentSchedule: 'setCurrentSchedule',
      setCurrentDriverInfo: 'setCurrentDriverInfo',
      fetchRatings: 'fetchRatings',
      removeSchedule: 'removeSchedule',
      transplantDriver: 'transplantDriver',
      openCarDialog: 'openCarDialog',
      setIgnoringDriverWorking: 'setIgnoringDriverWorking',
      generateWaybill: 'generateWaybill'
    }),
    ...mapActions('tenantsInfo', [
      'getDriverById'
    ]),
    ...mapActions('tenantsInfo', ['getDriverById']),
    ...mapActions('contracts', ['createContracts']),

    showRemoveButton () {
      return !this.$moment(this.date).isBefore(this.$moment().add(-1, 'day'))
    },
    async  redirectToTaxometr (change) {
      const { taxiServiceId } = await this.getDriverById(this.schedule[change].driverId)
      const getLinkRedirect = this.getTaxometrLinkOrders(taxiServiceId)
      window.open(getLinkRedirect, '_blank')
    },
    async  moveTransplantDriver (change, driver_id, schedule, current_schedule_id) {
      this.openCarDialog({ change, driver_id, schedule, date: this.date, car_id: this.carId, current_schedule_id })
      // await this.transplantDriver({ change, date: this.date, car_id: this.carId, driver_id })
    },
    /**
      * @param driver Информация о водителе (база).
      * @param timesDay Тип смены (дневная / ночная)
    */
    handleIgnoreDriverWorking (driver, timesDay) {
      console.log(driver)
      // console.log(this.$moment().format('LT'))
      // console.log(this.$moment().add(30, 'minutes').format('LT'))
      // const mins30 = '18:59'
      // console.log(this.$moment().isAfter((this.$moment(mins30, 'LT'))))
      this.setIgnoringDriverWorking({
        driverId: driver.driverId,
        expirationDate: this.$moment().add(30, 'minutes')
      })
    },
    driverDateIsCurrentDate () {
      // return this.$moment(this.date).isSame(this.$moment(), 'day')
      return this.$moment(this.date).isSameOrAfter(this.$moment(), 'day')
    },
    async handleShowMore (schedule, timesDay) {
      console.log('handleShowMore', schedule, timesDay)
      await this.fetchCurrentSchedule(schedule.scheduleId)
      console.log(123, schedule)
      await this.fetchRatings(schedule.driverId)

      this.setCurrentSchedule({
        ...schedule,
        timesDay,
        carNumber: this.carNumber,
        parkType: this.parkType
      })

      this.changeDialogVisible({
        dialogName: 'showMoreAboutScheduleDialog',
        value: true
      })
    },

    async handleCreateContracts (driver) {
      try {
        const responce = await this.createContracts({ car: this.carId, driver })

        if (responce.success) {
          this.$router.push('contracts')
        }

        this.$message({
          type: responce.success ? 'success' : 'error',
          message: responce.message
        })
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async handleShowMoreAboutDriver (driverId) {
      const driverInfo = await this.getDriverById(driverId)

      this.setCurrentDriverInfo(driverInfo)

      this.changeDialogVisible({
        dialogName: 'showMoreAboutDriverDialog',
        value: true
      })
    },

    handleChangeStatus (schedule) {
      this.setCurrentSchedule({
        ...schedule,
        date: this.date,
        carId: this.carId,
        parkType: this.parkType
      })

      this.changeDialogVisible({
        dialogName: 'driverStatusChangingDialog',
        value: true
      })
    },

    handleRemoveSchedule (scheduleId) {
      this.$confirm(
        'Вы уверены, что хотите убрать водителя со смены ?',
        'Внимание',
        {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        }
      ).then(() => {
        this.removeSchedule(scheduleId)
      })
    },

    handleChangeDriver ({ schedule, timesDay, mode }) {
      if (!this.$isUserGranted(this.$accesses.shedule.change_driver_btn)) return
      // this.fetchAvailableDrivers({ timesDay, date: this.date })
      this.setCurrentSchedule({
        ...schedule,
        date: this.date,
        carId: Number(this.carId),
        timesDay,
        parkType: this.parkType,
        mode
      })

      this.changeDialogVisible({
        dialogName: 'chooseDriverDialog',
        value: true
      })
    }
  }
}
</script>

<style lang="scss">
.schedule-card {
  max-height: 110px;
  min-height: 110px;
  min-width: 200px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f8f7;
  border: none;
  padding: 0 10px;
  margin: 0 5px;

  > * {
    margin: 3px !important;
  }
}
</style>

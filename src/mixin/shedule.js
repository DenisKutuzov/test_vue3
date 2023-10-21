import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('schedule')

const computed = {
  ...mapState({
    $_sheduleData: 'scheduleData',
    $_currentSheduleInfo: 'currentScheduleInfo',
    $_avaliableDrivers: 'availableDrivers',
    $_ratingsListData: 'ratingsListData'
  }),
  ...mapGetters({
    $_getFilteredShedule: 'getFilteredSchedule',
    $_getFilteredDrivers: 'getFilteredDrivers'
  })
}

const methods = {
  ...mapActions({
    $_fetchShedule: 'fetch',
    $_addShedule: 'addDriverSchedule',
    $_filterShedule: 'filter',
    $_filterDrivers: 'filterDrivers',
    $_removeDriverFromShedule: 'removeDriverFromSchedule',
    $_changeDriverFromShedule: 'changeDriverFromSchedule',
    $_fetchCurrentShedule: 'fetchCurrentSchedule',
    $_fetchAvaliableDrivers: 'fetchAvailableDrivers',
    $_changeDriverRating: 'changeDriverRating',
    $_fetchRatings: 'fetchRatings'
  })
}

export default {
  computed,
  methods
}

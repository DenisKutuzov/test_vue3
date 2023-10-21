<template>
  <div class="schedule-table" v-loading-custom="isLoading">
    <ChangeDriverStatusDialog />
    <ChooseDriverDialog />
    <ShowMoreAboutDriverDialog />
    <ShowMoreAboutScheduleDialog />
    <AboutCarDialog />
    <ChooceCarDialog/>

    <!-- ref="car-column" -->
    <CarColumn class="schedule-table__car-column" :cars="schedule" />
    <div
    @scroll="handleScroll"
      class="schedule-table__table"
      ref="schedule-table"
      v-if="schedule.length > 0"
    >
      <!-- TODO: Фиксировать и проматывать при скролле таблицы -->
      <FixedScrollComponent shedule isDisableWrapperHeight full_blur :top="0" :left="210" :right="20" :activateY="210" @active="v=> FixedScrollComponentStatus = v">
        <TableTopDates   ref="date-bar"  :style="`transform: translate(${FixedScrollComponentStatus ? fixedCOmponentLeftScrolling : 0}px);`"/>
      </FixedScrollComponent>
      <div class="schedule-table__table-body" >
        <div
          class="schedule-table__row"
          v-for="car in schedule.slice(0, 10)"
          :key="car.number"
        >
          <ScheduleCard
            v-for="(scheduleItem, date) in car.dates"
            :key="date"
            :schedule="scheduleItem"
            :date="date"
            :carId="car.carId"
            :carNumber="car.carNumber"
            :parkType="car.regionParkType"
          />
        </div>

        <template v-if="showOther">
          <div
            class="schedule-table__row"
            v-for="car in schedule.slice(10, schedule.length)"
            :key="car.number"
          >
            <ScheduleCard
              v-for="(scheduleItem, date) in car.dates"
              :key="date"
              :schedule="scheduleItem"
              :date="date"
              :carId="car.carId"
              :carNumber="car.carNumber"
              :parkType="car.regionParkType"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import getTimeMixin from '@/mixin/getTimeMixin'
const FixedScrollComponent = () => import('@/components/fixedScrollComponent.vue')
// dialogs
const ChangeDriverStatusDialog = () =>
  import('@/components/schedule/dialogs/ChangeDriverStatusDialog')
const ChooseDriverDialog = () =>
  import('@/components/schedule/dialogs/ChooseDriverDialog')
const ShowMoreAboutDriverDialog = () =>
  import('@/components/schedule/dialogs/ShowMoreAboutDriverDialog')
const ShowMoreAboutScheduleDialog = () =>
  import('@/components/schedule/dialogs/ShowMoreAboutScheduleDialog')
const AboutCarDialog = () =>
  import('@/components/schedule/dialogs/AboutCarDialog')
const ChooceCarDialog = () =>
  import('@/components/dialogs/shedule/chooceCarDialog')
// components
const CarColumn = () => import('@/components/schedule/CarColumn')
const TableTopDates = () => import('@/components/schedule/TableTopDates')
const ScheduleCard = () => import('@/components/schedule/ScheduleCard')
export default {
  name: 'ScheduleTable',

  mixins: [getTimeMixin],

  components: {
    // dialogs
    ChangeDriverStatusDialog,
    FixedScrollComponent,
    ChooseDriverDialog,
    ShowMoreAboutDriverDialog,
    ShowMoreAboutScheduleDialog,
    AboutCarDialog,
    ChooceCarDialog,

    CarColumn,
    TableTopDates,
    ScheduleCard
  },

  data () {
    return {
      showOther: false,
      fixedCOmponentLeftScrolling: 0,
      FixedScrollComponentStatus: false
    }
  },

  computed: {
    ...mapState('schedule', {
      isLoading: 'isLoading',
      filterShedule: 'filter',
      currentRegionParkID: 'currentRegionParkID'
    }),

    ...mapGetters('schedule', {
      schedule: 'filteredSchedule'
    })
  },

  methods: {
    ...mapActions('schedule', {
      fetchSchedule: 'fetchSchedule',
      fetchCurrentSchedule: 'fetchCurrentSchedule',
      fetchStatistic: 'fetchStatistic'
    }),
    handleScroll (e) {
      if (!this.FixedScrollComponentStatus) {
        this.fixedCOmponentLeftScrolling = 0
        return
      }
      this.fixedCOmponentLeftScrolling = -e.target.scrollLeft
    },
    async getSchedule () {
      try {
        const { dateTime } = this.filterShedule
        const { start, end } = this.getThisWeekDate()
        const startOptions = dateTime && dateTime.length > 0 ? dateTime[0] : start
        const endOptions = dateTime && dateTime.length > 0 ? dateTime[1] : end
        await this.fetchSchedule({
          startDate: startOptions,
          endDate: endOptions
        })
      } catch (err) {
        return Promise.reject(err)
      }
    },

    scheduleTableScrollListener (e) {
      this.$refs['date-bar'].$el.scrollLeft = e.target.scrollLeft
    },

    changeDateBarPosOnScroll () {
      const dateBar = this.$refs['date-bar']

      if (dateBar) {
        if (window) {
          if (window.scrollY > 210) {
            // dateBar.$el.classList.add('date-bar--fix')
          } else {
            // dateBar.$el.classList.remove('date-bar--fix')
          }
        }
      }
    }
  },
  watch: {
    currentRegionParkID: {
      handler: function (currentID, oldID) {
        if (currentID !== oldID) {
          this.getSchedule()
        }
      },
      deep: false,
      immediate: false
    }
  },
  async mounted () {
    await this.getSchedule()
    this.$refs['schedule-table'].addEventListener(
      'scroll',
      this.scheduleTableScrollListener
    )

    if (document) {
      document.addEventListener('scroll', this.changeDateBarPosOnScroll)
    }

    setTimeout(() => {
      this.showOther = true
    }, 150)
  },

  beforeDestroy () {
    this.$refs['schedule-table'].removeEventListener(
      'scroll',
      this.scheduleTableScrollListener
    )
    if (document) {
      document.removeEventListener('scroll', this.changeDateBarPosOnScroll)
    }
  }
}
</script>

<style lang="scss">
.schedule-table {
  display: flex;
  min-height: 70vh;

  &__car-column {
    margin-top: 50px;
  }

  &__table {
    position: relative;
    overflow-y: auto;
    white-space: nowrap;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__table-body {
    margin-top: 50px;
  }

  &__row {
    display: flex;
    flex-direction: row;
    height: 111px;
    border-bottom: 1px solid #f1f0ed;

    &:nth-child(3) {
      color: red;

      .schedule__card {
        border-radius: 8px 8px 0 0;
      }
    }

    &:last-child {
      .schedule__card {
        border-radius: 0 0 8px 8px;
      }
    }
  }

  .date-bar {
    position: absolute;
    z-index: 1000;
  }
}
</style>

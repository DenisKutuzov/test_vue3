<template>
  <div class="schedule-filters">
    <el-row class="el-row_margin-10">
      <el-col :span="21">
        <el-input
          @change="search"
          class="el-input_width-200 el-input_margin-right-10"
          placeholder="Модель"
          v-model="searchForm.model"
        />

        <el-input
          @change="search"
          class="el-input_width-200 el-input_margin-right-10"
          placeholder="Позывной"
          v-model="searchForm.callSign"
        />
        <el-select
          @change="search"
          v-model="searchForm.FIO"
          auto-complete
          clearable
          class="el-input_width-200 el-input_margin-right-10"
          filterable
          placeholder="Водитель" >

          <el-option
            v-for="item in getFirstMiddleLastNames"
            :key="item"
            :label="item"
            :value="item" />
        </el-select>
        <el-input
          @change="search"
          class="el-input_width-200 el-input_margin-right-10"
          placeholder="Гос.Номер"
          v-model="searchForm.stateNumber"
        />

        <el-popover
          class="el-popover_margin-10"
          placement="top-start"
          width="300"
          trigger="hover"
          content="Отсортировать по загруженности"
        >
          <el-switch @change="search" slot="reference" v-model="searchForm.loadSort" />
        </el-popover>

        <el-popover
          class="el-popover_margin-10"
          placement="top-start"
          width="300"
          trigger="hover"
          content="Отсортировать по марке автомобиля"
        >
          <el-switch @change="search" slot="reference" v-model="searchForm.modelSort" />
        </el-popover>
        <el-popover
          class="el-popover_margin-10"
          placement="top-end"
          width="300"
          trigger="hover"
          content="Отсортировать по индикатору"
        >
        <el-radio-group class="margin-10-right" slot="reference"  v-model="local_indicators.is_working">
          <el-radio-button :label="false" @click.native="handleChangeIndicator(false)">
            Нет транзакций
          </el-radio-button>

          <el-radio-button label="all" @click.native="handleChangeIndicator('all')">
            Все
          </el-radio-button>

          <el-radio-button :label="true"  @click.native="handleChangeIndicator(true)">
            Есть транзакции
          </el-radio-button>
        </el-radio-group>

          <!-- <el-switch @change="search" slot="reference" v-model="searchForm.indicators.is_working" /> -->
        </el-popover>
      </el-col>
      <div class="d-flex column gap10">
        <AppCreateExelComponent action-type="scheduleReport" />
      </div>
    </el-row>
    <!--Недели-->
    <el-row class="el-row_margin-10">
      <el-col :span="21">
        <el-radio-group class="margin-10-right" v-model="searchForm.week">
          <el-radio-button label="1">
            <i class="el-icon-arrow-left" />
            Предыдущая неделя
          </el-radio-button>

          <el-radio-button label="2">
            Текущая неделя
          </el-radio-button>

          <el-radio-button label="3">
            Следующая неделя
            <i class="el-icon-arrow-right" />
          </el-radio-button>
        </el-radio-group>

        <!-- Календарь -->
        <date-picker-new
          format="dd.MM.yyyy"
          :picker-options="{ firstDayOfWeek: 1 }"
          @change="updateSchedule()"
          type="daterange"
          v-model="searchForm.dateTime"
          start-placeholder="Начальная дата"
          end-placeholder="Конечная дата"
        />

        <el-divider direction="vertical"></el-divider>
        <el-popover placement="bottom-start" width="300" trigger="hover">
          <date-picker-new
            slot="reference"
            @change="getStatisticByUserPickDate"
            v-model="dateMonthStatistic"
            type="month"
            placeholder="Pick a month"
          >
          </date-picker-new>
          <el-row type="flex" justify="space-between" align="middle">
            <span>Удачных смен:</span>
            <div>
              <el-tag>
                {{ changesStatistics.fortunateChangesCount }}
              </el-tag>
            </div>
          </el-row>
          <el-row type="flex" justify="space-between"  style="margin-top: 5px;">
            <span>Возможных смен:</span>
            <div>
              <el-tag>
                {{ changesStatistics.possibleChangesCount }}
              </el-tag>
            </div>
          </el-row>
          <el-row type="flex" justify="space-between"  style="margin-top: 5px;">
            <span>Количество прошедших смен:</span>
            <div>
              <el-tag>
                {{ changesStatistics.pastChangesCount }}
              </el-tag>
            </div>
          </el-row>
        </el-popover>

      </el-col>

      <el-button round type="primary" @click="downloadWaybill">Скачать шаблон ПЛ</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import getTimeMixin from '@/mixin/getTimeMixin'
const AppCreateExelComponent = () => import('@/components/AppCreateExelComponent')

export default {
  name: 'ScheduleFilters',

  mixins: [getTimeMixin],

  components: {
    AppCreateExelComponent
  },

  data () {
    return {
      dateMonthStatistic: new Date(),
      local_indicators: {
        is_working: 'all'
      },
      searchForm: {
        week: '',
        callSign: '',
        FIO: '',
        stateNumber: '',
        model: '',
        dateTime: [this.getThisWeekDate().start, this.getThisWeekDate().end],
        loadSort: false,
        modelSort: false,
        indicators: {
          is_working: undefined
        }
      }
    }
  },
  computed: {
    ...mapState('schedule', {
      changesStatistics: 'changesStatistics',
      currentRegionParkID: 'currentRegionParkID'
    }),
    ...mapGetters('schedule', {
      getFirstMiddleLastNames: 'getFirstMiddleLastNames'
    })
  },
  watch: {
    currentRegionParkID: {
      handler: function (NewSomeID, OldSomeID) {
        if (!OldSomeID && !NewSomeID) return
        this.getStatisticByUserPickDate()
      },
      deep: false,
      immediate: false
    },
    'searchForm.week': {
      handler: function (NewSomeID, OldSomeID) {
        switch (NewSomeID) {
          case '1':
            this.getLastWeek()
            break
          case '2':
            this.getThisWeek()
            break
          case '3':
            this.getNextWeek()
            break

          default:
            this.getLastWeek()
            break
        }
      },
      deep: false,
      immediate: false
    }
  },
  methods: {
    ...mapActions('schedule', {
      fetchSchedule: 'fetchSchedule',
      filterSchedule: 'filterSchedule',
      fetchStatistic: 'fetchStatistic',
      getWaybillTemplatePrint: 'getWaybillTemplatePrint'
    }),
    async  downloadWaybill () {
      await this.getWaybillTemplatePrint()
      // window.open(this.getRootStaticUrl(data?.file))
    },
    getStatisticByUserPickDate () {
      const start_date = this.$moment(this.dateMonthStatistic)
        .startOf('month')
        .format('YYYY-MM-DD')
      const end_date = this.$moment(this.dateMonthStatistic)
        .endOf('month')
        .format('YYYY-MM-DD')
      this.fetchStatistic({ start_date, end_date })
    },
    getLastWeek () {
      this.fetchSchedule({
        startDate: this.getLastWeekDate(),
        endDate: this.getTodayDate()
      })
    },

    getNextWeek () {
      this.fetchSchedule({
        startDate: this.getTodayDate(),
        endDate: this.getNextWeekDate()
      })
    },

    getThisWeek () {
      const { start, end } = this.getThisWeekDate()

      this.fetchSchedule({
        startDate: start,
        endDate: end
      })
    },
    handleChangeIndicator (value) {
      if (value === 'all') {
        this.searchForm.indicators.is_working = undefined
      } else {
        this.searchForm.indicators.is_working = value
      }
      this.search()
    },
    updateSchedule () {
      this.search()
      if (!this.searchForm.dateTime) {
        this.searchForm.dateTime = [
          this.getThisWeekDate().start,
          this.getThisWeekDate().end
        ]
      }
      const startDate = this.$moment(this.searchForm.dateTime[0]).format('yyyy-MM-DD')
      const endDate = this.$moment(this.searchForm.dateTime[1]).format('yyyy-MM-DD')
      this.fetchSchedule({
        startDate,
        endDate
      })
    },

    search () {
      const dateTimeFormat = this.searchForm.dateTime
        ? [
            this.$moment(this.searchForm.dateTime[0]).format('yyyy-MM-DD'),
            this.$moment(this.searchForm.dateTime[1]).format('yyyy-MM-DD')
          ]
        : null
      this.filterSchedule({
        carCallsign: this.searchForm.callSign,
        carNumber: this.searchForm.stateNumber,
        carModel: this.searchForm.model,
        loadSort: this.searchForm.loadSort,
        dateTime: dateTimeFormat,
        FIO: this.searchForm.FIO,
        indicators: this.searchForm.indicators,
        modelSort: this.searchForm.modelSort

      })
    }
  },
  mounted () {
    this.getStatisticByUserPickDate()
  }
}
</script>

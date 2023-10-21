<template>
  <div>
    <el-dialog
      title="Отчёт"
      :visible.sync="reportVisible"
      width="940px"
      append-to-body
    >
      <TechInspectionHistoryReportDialog :maintenanceId="maintenanceId" />
    </el-dialog>
    <div v-loading-custom="isLoading">
      <h4>История по машине</h4>

      <div class="details-block__table-wrapper max-height_table">
        <table
          class="table order-to-account__parts-table table table_last-auto-width"
        >
          <thead>
            <tr>
              <td>Пробег</td>
              <td>Дата начала</td>
              <td>Дата окончания</td>
              <td>Тип</td>
              <td>Название</td>
              <td>Категория ремонта</td>
              <td></td>
            </tr>
          </thead>

          <tbody v-if="carHistory.length > 0">
            <tr v-for="(historyItem, index) in carHistory" :key="index">
              <td>{{ historyItem.millage }}</td>
              <td>{{ getDateFromUtc(historyItem.startDate) }}</td>
              <td>{{ getDateFromUtc(historyItem.endDate) }}</td>
              <td>{{ getCategoryNameByTypeId(historyItem.type) }}</td>
              <td>{{ historyItem.name || "..." }}</td>
              <td>
                {{
                  TechInspectionCategoriesEnumTranslate[historyItem.category]
                }}
              </td>
              <td>
                <el-button
              size="mini"
              type="warning"
              @click="handleShowReport(historyItem)"
              round >
              Отчёт
            </el-button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="carHistory.length < 1" class="no-data">Нет данных</div>
      </div>
    </div>
  </div>
</template>

<script>
import { TechInspectionCategoriesEnumTranslate } from '@/enums/techInspection/TechInspectionCategories'
import { mapActions, mapState } from 'vuex'
const TechInspectionHistoryReportDialog = () =>
  import(
    '@/components/techInspection/dialogs/TechInspectionHistoryReportDialog'
  )

export default {
  name: 'TechInspectionHistoryCarOnly',
  props: {
    carId: {
      type: [Number, String],
      default: null
    }
  },
  components: { TechInspectionHistoryReportDialog },
  data () {
    return {
      isLoading: false,
      reportVisible: false,
      carHistory: [],
      maintenanceId: null,
      TechInspectionCategoriesEnumTranslate
    }
  },
  async mounted () {
    await this.loadingHistoryAddCarInfo()
    if (this.maintenanceTypes.length === 0) {
      await this.fetchMaintenanceTypes()
    }
  },
  watch: {
    // whenever question changes, this function will run
    carId (newCarId, oldCarId) {
      if (newCarId) {
        this.loadingHistoryAddCarInfo()
      }
    }
  },
  computed: {
    ...mapState('techInspection', {
      maintenanceTypes: 'maintenanceTypes'
    })
  },
  methods: {
    ...mapActions('techInspection', {
      fetchMaintenanceHistoryById: 'fetchMaintenanceHistoryById',
      fetchMaintenanceTypes: 'fetchMaintenanceTypes'
    }),
    handleShowReport (data) {
      this.maintenanceId = data.maintenanceId
      this.reportVisible = !this.reportVisible
    },
    getCategoryNameByTypeId (id) {
      return (
        this.maintenanceTypes.find((x) => x.maintenanceTypeId === id)?.alias ??
        '..'
      )
    },
    async loadingHistoryAddCarInfo () {
      this.isLoading = true
      this.carHistory = await this.fetchMaintenanceHistoryById(this.carId)
      this.isLoading = false
    }
  }
}
</script>

<style></style>

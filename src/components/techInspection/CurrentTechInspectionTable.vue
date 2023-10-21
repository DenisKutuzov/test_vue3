<template>
  <div class="current-tech-inspection-table">
    <el-dialog
      :before-close="$handleCloseDialog"
      title="Отправить автомобиль на Т.О"
      :visible.sync="techInspectionCreatingDialogVisible" >
      <TechInspectionCreatingDialog
        :key="currentRecord.maintenanceId || ''"
        :record-id="currentRecord.maintenanceId"
        :car-id="currentRecord.carId"
        @submit="closeTechInspectionCreatingDialog" />
    </el-dialog>
    <el-dialog
      title="История состояний автомобиля"
      :visible.sync="carHistoryDialogVisible"
      width="940px"
      append-to-body>

      <CarDetailsHistoryDialog :car-id="simpleCarId"/>
    </el-dialog>

    <h2 v-if="title">
      {{ title }}
    </h2>
    <el-table
      class="table"
      :data="sortedDataByFilter(data)"
      max-height="400" >

      <el-table-column
        label="Гос. номер"
        prop="carNumber"
        min-width="100" />

      <el-table-column
        label="Дата начала ремонта"
        min-width="120" >

        <template slot-scope="scope">
          {{  getDateFromUtc(scope.row.startDate) }}
        </template>
      </el-table-column>
        <el-table-column
          label="Дата поступления заявки"
          min-width="120">

          <template slot-scope="scope">
            {{ getDateFromUtc(scope.row.createdAt) }}
          </template>
        </el-table-column>
      <el-table-column
        label="Дата окончания"
        min-width="120">

        <template slot-scope="scope">
          {{ getDateFromUtc(scope.row.endDate) }}
        </template>
      </el-table-column>

      <el-table-column
        label="Пробег"
        prop="millage"
        min-width="100" >

        <template slot-scope="scope">
          <p>
            {{ smartRound(scope.row.millage) }} км
          </p>
        </template>
      </el-table-column>
      <el-table-column label="Название ремонта" min-width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span >{{scope.row.name || '...'  }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Коментарий" min-width="100">
        <template #default="scope">
            <el-popover
              v-if="scope.row.comment"
              placement="bottom"
              title="Коментарий"
              trigger="hover"
              :content="scope.row.comment">
                <el-button slot="reference">{{scope.row.comment.slice(0, 10)}}...</el-button>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column :width="320" >
        <template slot-scope="scope">
          <div class="table__row_no-wrap">
            <el-button-group>
              <el-button
              size="mini"
              type="success"
              @click="handleAccept(scope.row)"
              round >

              Принять
            </el-button>

            <el-button
              size="mini"
              v-access="$accesses.techInspection.update_techInspection_btn"
              type="warning"
              @click="handleShowMore(scope.row)"
              round >

              История
            </el-button>

            <el-button
              size="mini"
              type="primary"
              @click="openTechInspectionCreatingDialog(scope.row)"
              round >

              Изменить
            </el-button>
            </el-button-group>

          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import formatter from '@/mixin/formatter'
import {
  showErrorMessage,
  showSuccessMessage
} from '@/utils/createMessage'
import { mapActions, mapGetters } from 'vuex'
const TechInspectionCreatingDialog = () => import('@/components/techInspection/dialogs/TechInspectionCreatingDialog')
const CarDetailsHistoryDialog = () => import('@/components/techInspection/dialogs/TechInspectionHistoryCarDialog')

export default {
  name: 'TechInspectionHistoryTable',

  mixins: [formatter],

  components: {
    TechInspectionCreatingDialog,
    CarDetailsHistoryDialog
  },

  props: {
    title: {
      type: String,
      defalut: null
    },

    data: {
      type: Array,
      defalut: () => []
    }
  },

  data () {
    return {
      currentRecord: {},
      techInspectionCreatingDialogVisible: false,
      carHistoryDialogVisible: false,
      simpleCarId: null
    }
  },
  computed: {
    ...mapGetters('techInspection', [
      'sortedDataByFilter',
      'getHistoryNameById'
    ])
  },
  methods: {
    ...mapActions('techInspection', {
      acceptMaintenance: 'acceptMaintenance',
      compliteMaintenance: 'compliteMaintenance',
      returnCarToOnline: 'returnCarToOnline'
    }),

    openTechInspectionCreatingDialog (record) {
      this.currentRecord = record
      this.techInspectionCreatingDialogVisible = true
    },

    closeTechInspectionCreatingDialog () {
      this.currentRecord = {}
      this.techInspectionCreatingDialogVisible = false
    },

    async handleAccept (record) {
      try {
        console.log(record)
        await this.$prompt(`Принять авто (${record.carNumber})?`, 'Внимание', {
          confirmButtonText: 'Да',
          inputValue: record.millage || 0,
          cancelButtonText: 'Отмена',
          inputPattern: /^[0-9]*$/,
          inputType: 'number',
          inputErrorMessage: 'Неверное значение пробега'
        })
          .then(async ({ value }) => {
            value = parseInt(value)
            await this.acceptMaintenance({ maintenanceId: record.maintenanceId, millage: value })
            await this.compliteMaintenance(record.maintenanceId)
            showSuccessMessage(`Машина принята (${record.carNumber})`)
          })

        try {
          if (!record.offLine) return

          await this.$confirm(
          `Автомобиль необходимо вернуть на линию? (${record.carNumber})`,
          'Внимание',
          {
            type: 'warning',
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет'
          }
          )
          await this.returnCarToOnline(record.carId)
          showSuccessMessage(`Автомобиль возвращен на линию (${record.carNumber})`)
        } catch (err) {
          showErrorMessage('Возврат автомобиля на линию отмененно')
        }
      } catch (err) {
        showErrorMessage('Принятие отмененно')
      }
    },

    handleShowMore (data) {
      this.simpleCarId = data.carId
      this.carHistoryDialogVisible = !this.carHistoryDialogVisible
    }
  }
}
</script>

<template>
  <div class="tech-inspection-history-table">
    <el-dialog
      title="История состояний автомобиля"
      :visible.sync="carHistoryDialogVisible"
      width="940px"
      append-to-body>

      <CarDetailsHistoryDialog :car-id="simpleCarId"/>
    </el-dialog>
    <el-dialog
      title="Отчёт"
      :visible.sync="reportVisible"
      width="940px"
      append-to-body>

      <TechInspectionHistoryReportDialog :maintenanceId="maintenanceId"/>
    </el-dialog>
    <h2 v-if="title">
      {{ title }}
    </h2>

    <ScrollingTable class="table table_last-auto-width table_low" >
      <template #thead>
        <tr>
          <td>Гос. номер</td>
          <td>Дата начала</td>
          <td>Дата окончания</td>
          <td>Пробег</td>
          <td>Название ремонта</td>
          <td>Коментарий</td>
          <td></td>
        </tr>
      </template>

      <template #tbody>
        <tr
          v-for="element in getFiltredData"
          :key="element.id" >

          <td>{{ element.carNumber }}</td>
          <td>{{ getDateFromUtc(element.startDate) }}</td>
          <td>{{ getDateFromUtc(element.endDate) }}</td>
          <td>{{ smartRound(element.millage) }} км</td>
          <td>{{element.name || '...' }}</td>
          <td>
            <el-popover
              v-if="element.comment"
              placement="bottom"
              title="Коментарий"
              trigger="hover"
              :content="element.comment">
                <el-button slot="reference">{{element.comment.slice(0, 10)}}...</el-button>
            </el-popover>
          </td>
          <td>
            <el-button-group>
              <el-button
              size="mini"
              type="warning"
              @click="handleShowMore(element)"
              round >
              История
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleShowReport(element)"
              round >
              Отчёт
            </el-button>
            </el-button-group>

          </td>
        </tr>
      </template>
    </ScrollingTable>

    <div
      v-if="getFiltredData.length < 1"
      class="no-data no-data_no-border-top">

      Нет данных
    </div>
    <!-- <el-table
      class="table"
      :data="sortedDataByFilterHistory(data)"
      max-height="400" >

      <el-table-column
        label="Гос. номер"
        prop="car_number"
        min-width="100" />

      <el-table-column
        label="Дата начала"
        prop="start_date"
        min-width="120" />

      <el-table-column
        label="Дата окончания"
        prop="end_date"
        min-width="120" />

      <el-table-column
        label="Пробег"
        prop="car_millage"
        min-width="100" >

        <template slot-scope="scope">
          <p>
            {{ smartRound(scope.row.car_millage) }} км
          </p>
        </template>
      </el-table-column>
      <el-table-column label="Название ремонта" min-width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span >{{getHistoryNameById(scope.row.type)  }}</span>
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
      <el-table-column :width="120" >
        <template slot-scope="scope">
          <div class="table__row_no-wrap">
            <el-button
              size="mini"
              type="warning"
              @click="handleShowMore(scope.row)"
              round >

              История
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import formatter from '@/mixin/formatter'
import { mapGetters } from 'vuex'
const ScrollingTable = () => import('@/components/ScrollingTable')
const CarDetailsHistoryDialog = () => import('@/components/techInspection/dialogs/TechInspectionHistoryCarDialog')
const TechInspectionHistoryReportDialog = () => import('@/components/techInspection/dialogs/TechInspectionHistoryReportDialog')
export default {
  name: 'TechInspectionHistoryTable',

  mixins: [formatter],

  components: {
    CarDetailsHistoryDialog,
    TechInspectionHistoryReportDialog,
    ScrollingTable
  },

  data () {
    return {
      carHistoryDialogVisible: false,
      reportVisible: false,
      simpleCarId: null,
      maintenanceId: null
    }
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
  watch: {
    getFiltredData (_oldV, _newV) {
      console.log('textRender', _oldV, _newV)
      // this.isGetNotAllRecors = false
    }
  },
  async updated () {
    const dfd = await this.data.length
    console.log(dfd)
  },
  computed: {
    ...mapGetters('techInspection', {
      getHistoryNameById: 'getHistoryNameById',
      sortedDataByFilterHistory: 'sortedDataByFilterHistory'
    }),
    getFiltredData () {
      return this.sortedDataByFilterHistory(this.data)
    }
  },
  methods: {
    handleShowMore (data) {
      this.simpleCarId = data.carId
      this.carHistoryDialogVisible = !this.carHistoryDialogVisible
    },
    handleShowReport (data) {
      this.maintenanceId = data.maintenanceId
      this.reportVisible = !this.reportVisible
    }
  }
}
</script>
<style>
  .virtual-list /deep/ ul {
  list-style: none;
}
</style>

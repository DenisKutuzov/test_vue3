<template>
  <div class="tech-inspection-requests-table">
    <h2 v-if="title">
      {{ title }}
    </h2>
    <el-table
      class="table parts-page__orders-table"
      :data="sortedDataByFilter(data)"
      max-height="400" >

      <slot :row="data">
        <el-table-column
          label="Гос. номер автомобиля"
          prop="carNumber"
          min-width="100" />

        <el-table-column
          label="Дата поступления заявки"
          min-width="120">

          <template slot-scope="scope">
            {{ getDateFromUtc(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column
          label="Дата начала ремонта"
          min-width="120">

          <template slot-scope="scope">
            {{  getDateFromUtc(scope.row.startDate)  }}
          </template>
        </el-table-column>
        <el-table-column label="Название ремонта" min-width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span >{{scope.row.name || '...' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Тип" min-width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span >{{getHistoryNameById(scope.row.type)  }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :width="350" >
          <template slot-scope="scope">
            <div class="table__row_no-wrap">
              <el-button-group>
                <el-button
                size="mini"
                type="success"
                v-access="$accesses.techInspection.send_techInspection_btn"
                @click="$emit('send', scope.row)"
                round >

                Отправить
              </el-button>

              <el-button
                size="mini"
                type="warning"
                @click="$emit('showMore', scope.row.carId)"
                round >

                Подробнее
              </el-button>

              <el-button
                size="mini"
                v-access="$accesses.techInspection.delete_techInspection_btn"
                type="danger"
                @click="$emit('delete', scope.row)"
                round >

                Удалить
              </el-button>
              </el-button-group>

            </div>
          </template>
        </el-table-column>
      </slot>
    </el-table>
  </div>
</template>

<script>
import formatter from '@/mixin/formatter'
import { mapGetters } from 'vuex'
export default {
  name: 'TechInspectionRequestsTable',

  mixins: [formatter],

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
  computed: {
    ...mapGetters('techInspection', {
      getHistoryNameById: 'getHistoryNameById',
      sortedDataByFilter: 'sortedDataByFilter'
    })
  }
}
</script>

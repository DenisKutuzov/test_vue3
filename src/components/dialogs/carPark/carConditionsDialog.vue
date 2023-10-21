<template>
  <div>
    <el-dialog
      append-to-body
      title="Добавить состояние"



      width="600px"
    >
<!--      <add-car-condition-dialog :cur-car-id="curCarId" />-->
    </el-dialog>

    <el-dialog
      append-to-body
      title="Добавить состояние"

      width="600px"
    >
<!--      <change-car-condition-dialog-->
<!--        @close="closeCondition"-->
<!--        :car-condition-form="-->
<!--          $_carsConditionsData.find((cur) => cur.conditionId === curConditionId)-->
<!--        "-->
<!--      />-->
    </el-dialog>
    <el-row class="el-row_margin-20 el-row_items-center-vertical">
      <el-col :span="22">
        <el-table :data="$_carsConditionsData" style="width: 100%">
          <el-table-column label="Дата" prop="date" min-width="90">
<!--            <template slot-scope="scope">-->
<!--&lt;!&ndash;              <span>{{ getDateFromUtc(scope.row.date) }}</span>&ndash;&gt;-->
<!--            </template>-->
          </el-table-column>
          <el-table-column
            label="Описание"
            prop="description"
            min-width="200"
          ></el-table-column>
          <el-table-column label="Пробег" prop="mileage" min-width="70">
<!--            <template slot-scope="scope">-->
<!--              <span>{{ row.mileage }} км</span>-->
<!--            </template>-->
          </el-table-column>
          <el-table-column label="Действия" min-width="180">
<!--            <template v-slot="{ row }">-->
<!--              <el-button-->
<!--                size="mini"-->
<!--                @click="editCondition(scope.row.conditionId)"-->
<!--                >Редактировать</el-button-->
<!--              >-->
<!--              &lt;!&ndash; <el-button-->
<!--                v-access="$accesses.carpark.delete_condition_btn"-->
<!--                size="mini"-->
<!--                @click="removeCondition(scope.row.conditionId)"-->
<!--                >Удалить</el-button-->
<!--              > &ndash;&gt;-->
<!--            </template>-->
          </el-table-column>
          <el-table-column min-width="60">
<!--            <template slot="header">-->
<!--              <el-popover-->

<!--                class="el-popover_margin-10"-->
<!--                placement="top-start"-->
<!--                trigger="hover"-->
<!--                content="Добавить состояние"-->
<!--              >-->
<!--                <el-button-->
<!--                  slot="reference"-->
<!--                  circle-->
<!--                  type="default"-->
<!--                  icon="el-icon-plus"-->
<!--                ></el-button>-->
<!--              </el-popover>-->
<!--            </template>-->
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- <TechInspectionHistoryCarOnly :carId="curCarId"/> -->
  </div>
</template>

<script>
// import carsConditions from '@/mixin/carsConditions'
// import addCarConditionDialog from '@/components/dialogs/carPark/addCarConditionDialog'
// import changeCarConditionDialog from '@/components/dialogs/carPark/changeCarConditionDialog'
// import { createNamespacedHelpers } from 'vuex'
// // const TechInspectionHistoryCarOnly = () => import('@/components/techInspection/TechInspectionHistoryCarOnly')
// const { mapActions, mapState } = createNamespacedHelpers('dialogs')
// export default {
//   name: 'carConditionsDialog',
//   components: {
//     addCarConditionDialog,
//     changeCarConditionDialog
//     // TechInspectionHistoryCarOnly
//   },
//   mixins: [carsConditions],
//   props: {
//     curCarId: {
//       type: [String, Number],
//       required: true
//     }
//   },
//   watch: {
//     curCarId: {
//       async handler (newVal) {
//         console.log(123)
//         this.$_fetchCarsConditions(newVal)
//       },
//       deep: true,
//       immediate: true
//     }
//   },
//   data () {
//     return {
//       curConditionId: null,
//       changeCarConditionDialogVisible: false
//     }
//   },
//   computed: {
//     ...mapState({
//       addCarConditionDialog: 'addCarConditionDialog'
//     })
//   },
//   methods: {
//     ...mapActions({
//       toggleAddCarCondition: 'toggleAddCarCondition'
//     }),
//     addCarCondition () {
//       this.toggleAddCarCondition()
//     },
//     removeCondition (id) {
//       this.$confirm(
//         'Вы уверены, что хотите удалить состояние из истории ?',
//         'Внимание',
//         {
//           confirmButtonText: 'Да',
//           cancelButtonText: 'Отмена',
//           type: 'warning'
//         }
//       ).then(() => {
//         this.$_removeCarCondition(id)
//       })
//     },
//     editCondition (id) {
//       this.curConditionId = id
//       this.changeCarConditionDialogVisible = true
//     },
//     closeCondition () {
//       this.changeCarConditionDialogVisible = false
//     }
//   }
// }
</script>

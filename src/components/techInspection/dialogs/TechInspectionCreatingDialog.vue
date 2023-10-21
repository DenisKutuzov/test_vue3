<template>
    <div class="tech-inspection-creating" v-loading-custom="isLoading">
        <el-dialog
                title="Выберете автомобиль"
                v-model="filterCurSelectDialogVisible"
                width="1360px"
                append-to-body
        >
            <carsFilterDialog
                    :id="techInspectionDto.car_id"
                    @close="(v) => toggleDialogFalse(v)"
            />
        </el-dialog>


        <!--    <el-dialog-->
        <!--      title="Выберете работы сервиса"-->
        <!--      :visible.sync="repairWorksDialogVisible"-->
        <!--      width="950px"-->
        <!--      append-to-body-->
        <!--    >-->
        <!--&lt;!&ndash;      <TechInspectionRepairWorksDialog v-model="selectedServiceWorksIds" />&ndash;&gt;-->
        <!--    </el-dialog>-->
        <!--    <el-dialog-->
        <!--      :destroyOnClose="true"-->
        <!--      title="Запчасть контр-агента"-->
        <!--      :visible.sync="maintenanceAgentDialogVisible"-->
        <!--      width="800px"-->
        <!--      @close="handleCloseAgentElementDialog"-->
        <!--      append-to-body-->
        <!--    >-->
        <!--&lt;!&ndash;      <MaintenanceAgentDialog&ndash;&gt;-->
        <!--&lt;!&ndash;        @close="handleCloseAgentElementDialog"&ndash;&gt;-->
        <!--&lt;!&ndash;        @change="(v) => handleChangeAgentElement(v)"&ndash;&gt;-->
        <!--&lt;!&ndash;        :temp="temp_maintenance_agent_element"&ndash;&gt;-->
        <!--&lt;!&ndash;      />&ndash;&gt;-->
        <!--    </el-dialog>-->
        <!--    <el-dialog-->
        <!--      :destroyOnClose="true"-->
        <!--      title="Запчасти"-->
        <!--      :visible.sync="warehouseItemsSelectDialog"-->
        <!--      width="1000px"-->
        <!--      @close="handleCloseAgentElementDialog"-->
        <!--      append-to-body-->
        <!--    >-->
        <!--&lt;!&ndash;      <TechInspectionSelectItemsDialog :ids="getWareHouseItemsIds" @eventIds="getEventWarehouseItemsSelected"/>&ndash;&gt;-->
        <!--    </el-dialog>-->
        <!--    <el-form ref="form" inline :model="techInspectionDto">-->
        <!--      <el-form-item class="w100" prop="name" label="Наименование ТО">-->
        <!--        <el-input-->
        <!--          class="w100"-->
        <!--          placeholder="Наименование ТО"-->
        <!--          v-model="techInspectionDto.name"-->
        <!--        />-->
        <!--      </el-form-item>-->
        <!--      <el-form-item class="w100" prop="warehouseId" label="Место ремонта">-->
        <!--        <el-select-->
        <!--          placeholder="Место ремонта"-->
        <!--          class="w100"-->
        <!--          v-model="techInspectionDto.warehouseId"-->
        <!--        >-->
        <!--          <el-option-->
        <!--            v-for="item in warehouse"-->
        <!--            :key="item.id"-->
        <!--            :label="item.name"-->
        <!--            :value="item.id"-->
        <!--          >-->
        <!--          </el-option>-->
        <!--        </el-select>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item class="form__item" prop="car_id" label="Автомобиль">-->
        <!--        <el-row type="flex">-->
        <!--          <el-select-->
        <!--            v-model="techInspectionDto.car_id"-->
        <!--            filterable-->
        <!--            :disabled="!!carId || !!recordId"-->
        <!--            placeholder="Автомобиль"-->
        <!--          >-->
        <!--            <el-option-->
        <!--              v-for="car in cars"-->
        <!--              :key="car.carId"-->
        <!--              :label="`${car.brand} ${car.model} — ${car.number} — ${car.callsign}`"-->
        <!--              :value="car.carId"-->
        <!--            />-->
        <!--          </el-select>-->
        <!--          <el-button-->
        <!--            size="mini"-->
        <!--            class="margin-10-left"-->
        <!--            type="primary"-->
        <!--            round-->
        <!--            :disabled="!!carId || !!recordId"-->
        <!--            @click="toggleDialogTrue()"-->
        <!--          >-->
        <!--            <i class="el-icon-more"></i>-->
        <!--          </el-button>-->
        <!--        </el-row>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item class="form__item" prop="type" label="Тип обслуживания">-->
        <!--        <el-select-->
        <!--          v-model="techInspectionDto.type"-->
        <!--          filterable-->
        <!--          placeholder="Тип обслуживания"-->
        <!--        >-->
        <!--          <el-option-->
        <!--            v-for="type in maintenanceTypes"-->
        <!--            :key="type.maintenanceTypeId"-->
        <!--            :label="`${type.alias}`"-->
        <!--            :value="type.maintenanceTypeId"-->
        <!--          />-->
        <!--        </el-select>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item-->
        <!--        class="form__item"-->
        <!--        prop="category"-->
        <!--        label="Запчасть котнр-агента"-->
        <!--      >-->
        <!--        <el-button-->
        <!--          @click="-->
        <!--            maintenanceAgentDialogVisible = !maintenanceAgentDialogVisible-->
        <!--          "-->
        <!--          type="primary"-->
        <!--          round-->
        <!--          class="w100"-->
        <!--        >-->
        <!--          <i class="el-icon-plus"></i>-->
        <!--        </el-button>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item-->
        <!--        class="form__item"-->
        <!--        prop="category"-->
        <!--        label="Категория ремонта"-->
        <!--      >-->
        <!--        <el-select-->
        <!--          v-model="techInspectionDto.category"-->
        <!--          filterable-->
        <!--          placeholder="Категория ремонта"-->
        <!--        >-->
        <!--          <el-option-->
        <!--            v-for="category in TechInspectionCategoriesEnum"-->
        <!--            :key="category"-->
        <!--            :label="`${TechInspectionCategoriesEnumTranslate[category]}`"-->
        <!--            :value="category"-->
        <!--          />-->
        <!--        </el-select>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item-->
        <!--        v-if="techInspectionDto.type === '315bc934-52a4-47bf-9c9a-1f64246bd1ad'"-->
        <!--        class="form__item"-->
        <!--        prop="driver_id"-->
        <!--        label="Виновник"-->
        <!--      >-->
        <!--        <el-select-->
        <!--          v-model="techInspectionDto.driver_id"-->
        <!--          filterable-->
        <!--          clearable-->
        <!--          placeholder="Виновник"-->
        <!--        >-->
        <!--          <el-option-->
        <!--            v-for="driver in tenantsInfoData"-->
        <!--            :key="driver.driverId"-->
        <!--            :label="`${driver.first_name} ${driver.second_name || ''} ${-->
        <!--              driver.last_name-->
        <!--            }`"-->
        <!--            :value="driver.driverId"-->
        <!--          />-->
        <!--        </el-select>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item-->
        <!--        class="form__item"-->
        <!--        prop="start_date"-->
        <!--        label="Дата начала ремонта"-->
        <!--      >-->
        <!--&lt;!&ndash;        <date-picker-new&ndash;&gt;-->
        <!--&lt;!&ndash;          :picker-options="{ firstDayOfWeek: 1 }"&ndash;&gt;-->
        <!--&lt;!&ndash;          v-model="techInspectionDto.start_date"&ndash;&gt;-->
        <!--&lt;!&ndash;          placeholder="Дата начала ремонта"&ndash;&gt;-->
        <!--&lt;!&ndash;          format="dd.MM.yyyy"&ndash;&gt;-->
        <!--&lt;!&ndash;        />&ndash;&gt;-->
        <!--      </el-form-item>-->

        <!--      <el-form-item-->
        <!--        class="form__item"-->
        <!--        prop="end_date"-->
        <!--        label="Дата окончания ремонта"-->
        <!--      >-->
        <!--&lt;!&ndash;        <date-picker-new&ndash;&gt;-->
        <!--&lt;!&ndash;          :picker-options="{ firstDayOfWeek: 1 }"&ndash;&gt;-->
        <!--&lt;!&ndash;          v-model="techInspectionDto.end_date"&ndash;&gt;-->
        <!--&lt;!&ndash;          placeholder="Дата окончания ремонта"&ndash;&gt;-->
        <!--&lt;!&ndash;          format="dd.MM.yyyy"&ndash;&gt;-->
        <!--&lt;!&ndash;        />&ndash;&gt;-->
        <!--      </el-form-item>-->

        <!--      <el-form-item class="form__item" prop="offLine" label=" ">-->
        <!--        <el-checkbox-->
        <!--          label="Убрать авто с линии"-->
        <!--          v-model="techInspectionDto.offLine"-->
        <!--        />-->
        <!--      </el-form-item>-->

        <!--      <el-form-item class="form__item" prop="end_date" label="Пробег">-->
        <!--        <el-input-->
        <!--          type="number"-->
        <!--          v-model="techInspectionDto.millage"-->
        <!--          autocomplete="off"-->
        <!--        ></el-input>-->
        <!--      </el-form-item>-->

        <!--      <el-form-item class="form__item" prop="change" label="Смена">-->
        <!--        <el-select-->
        <!--          v-model="techInspectionDto.change"-->
        <!--          filterable-->
        <!--          placeholder="Смена"-->
        <!--        >-->
        <!--          <el-option-->
        <!--            v-for="change in changes"-->
        <!--            :key="change.value"-->
        <!--            :label="change.name"-->
        <!--            :value="change.value"-->
        <!--          />-->
        <!--        </el-select>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item-->
        <!--        class="form__item el-form-item_max-width"-->
        <!--        prop="comment"-->
        <!--        lable="Комментарий"-->
        <!--      >-->
        <!--        <el-input-->
        <!--          v-model="techInspectionDto.comment"-->
        <!--          type="textarea"-->
        <!--          maxlength="300"-->
        <!--          placeholder="Комментарий"-->
        <!--        />-->
        <!--      </el-form-item>-->
        <!--    </el-form>-->
        <!--    <div>-->
        <!--      <el-button-->
        <!--        class="w100"-->
        <!--        type="ptimary"-->
        <!--        @click="handleOpenWarehouseItemDialog()"-->
        <!--        >Добавить запчасти со склада</el-button-->
        <!--      >-->
        <!--    </div>-->

        <!--    <el-button-->
        <!--      class="w100 margin-top-20"-->
        <!--      type="ptimary"-->
        <!--      @click="handleOpenRepairWorksDialog()"-->
        <!--      v-access="$accesses.techInspection.add_service_works_btn"-->
        <!--      >Добавить работы сервиса</el-button-->
        <!--    >-->
        <!--    <h3>Запчасть со склада</h3>-->
        <!--    <div class="part-order-creating__table max-height_table">-->
        <!--      <table class="table table_last-auto-width">-->
        <!--        <thead>-->
        <!--          <tr>-->
        <!--            <td>Запчасть</td>-->
        <!--            <td>Артикул</td>-->
        <!--            <td>Склад</td>-->
        <!--            <td>Количество</td>-->
        <!--            <td>Стоимость</td>-->
        <!--            <td></td>-->
        <!--          </tr>-->
        <!--        </thead>-->
        <!--        <tbody v-if="tempWarehouseItems.length > 0">-->
        <!--          <tr-->
        <!--            v-for="(part, index) in tempWarehouseItems"-->
        <!--            :key="part.maintenanceElementId"-->
        <!--          >-->
        <!--            <td>-->
        <!--              {{ part.sparePartName }}-->
        <!--            </td>-->

        <!--            <td>-->
        <!--              {{ part.sparePartVendorCode || "-" }}-->
        <!--            </td>-->
        <!--            <td>-->
        <!--              {{ getWarehouseItemById(part.warehouseId).name || "-" }}-->
        <!--            </td>-->
        <!--            <td>-->
        <!--            {{ part.maxQuantity }}-->
        <!--              <el-input-number-->
        <!--                v-model="part.orderQuantity"-->
        <!--                :min="1"-->
        <!--                :max="getMaxItem(part)"-->
        <!--                size="mini"-->
        <!--              />-->
        <!--            </td>-->
        <!--            <td>-->
        <!--              {{ toNumFormat(part.priceUnit * part.orderQuantity) }}-->
        <!--            </td>-->
        <!--            <td>-->
        <!--              <el-button-->
        <!--                type="danger"-->
        <!--                circle-->
        <!--                size="small"-->
        <!--                @click="handleRemovePart(index)"-->
        <!--                icon="el-icon-close"-->
        <!--              />-->
        <!--            </td>-->
        <!--          </tr>-->
        <!--        </tbody>-->
        <!--      </table>-->

        <!--      <div-->
        <!--        v-if="tempWarehouseItems.length < 1"-->
        <!--        class="no-data no-data_no-border-top"-->
        <!--      >-->
        <!--        Запчасть не выбрана-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <el-tag>Сумма: {{ toNumFormat(getTotalSummTempItems) }} </el-tag>-->
        <!--    <h3>Запчасть контр-агента</h3>-->
        <!--    <div class="part-order-creating__table max-height_table">-->
        <!--      <table class="table table_last-auto-width">-->
        <!--        <thead>-->
        <!--          <tr>-->
        <!--            <td>Запчасть</td>-->
        <!--            <td>Артикул</td>-->
        <!--            <td>Количество</td>-->
        <!--            <td>Стоимость</td>-->
        <!--            <td></td>-->
        <!--          </tr>-->
        <!--        </thead>-->
        <!--        <tbody>-->
        <!--          <tr-->
        <!--            v-for="(-->
        <!--              maintenance_agent, index-->
        <!--            ) in techInspectionDto.maintenance_agent_elements"-->
        <!--            :key="index + 'maintenance_agent_elements'"-->
        <!--          >-->
        <!--            <td>-->
        <!--              {{ maintenance_agent.name || "-" }}-->
        <!--            </td>-->

        <!--            <td>-->
        <!--              {{ maintenance_agent.vendor_code || "-" }}-->
        <!--            </td>-->

        <!--            <td>-->
        <!--              <el-input-number-->
        <!--                v-model="maintenance_agent.quantity"-->
        <!--                :min="1"-->
        <!--                size="mini"-->
        <!--              />-->
        <!--            </td>-->
        <!--            <td>-->
        <!--              {{-->
        <!--                toNumFormat(-->
        <!--                  maintenance_agent.price_unit * maintenance_agent.quantity-->
        <!--                ) || "-"-->
        <!--              }}-->
        <!--            </td>-->
        <!--            <td>-->
        <!--              <el-button-->
        <!--                type="danger"-->
        <!--                circle-->
        <!--                size="small"-->
        <!--                @click="handleRemoveMaintenancePart(index)"-->
        <!--                icon="el-icon-close"-->
        <!--              />-->
        <!--              <el-button-->
        <!--                type="primary"-->
        <!--                circle-->
        <!--                size="small"-->
        <!--                @click="handleEditMaintenancePart(index)"-->
        <!--                icon="el-icon-edit"-->
        <!--              />-->
        <!--            </td>-->
        <!--          </tr>-->
        <!--        </tbody>-->
        <!--      </table>-->
        <!--    </div>-->
        <!--    <el-tag>Сумма: {{ toNumFormat(getTotalSummTempAgentItems) }} </el-tag>-->
        <!--    <h3>Работы сервиса</h3>-->
        <!--    <div class="part-order-creating__table max-height_table">-->
        <!--      <table class="table table_last-auto-width">-->
        <!--        <thead>-->
        <!--          <tr>-->
        <!--            <td>Название</td>-->
        <!--            <td>Стоимость</td>-->
        <!--            <td></td>-->
        <!--          </tr>-->
        <!--        </thead>-->
        <!--        <tbody>-->
        <!--          <tr-->
        <!--            v-for="(work, index) in maintenancesRepairPrice"-->
        <!--            :key="index + 'work'"-->
        <!--          >-->
        <!--            <td class="w100">-->
        <!--            <span v-if="work.name">-->
        <!--            {{ work.name }}-->
        <!--            </span>-->
        <!--            <span v-else>-->
        <!--              {{getRepairWorkById(work?.repairId).name  || "-" }}-->
        <!--            </span>-->
        <!--            </td>-->
        <!--            <td>-->
        <!--              <el-input-number-->
        <!--                v-model="work.price"-->
        <!--                :min="1"-->
        <!--                size="mini"-->
        <!--              />-->
        <!--            </td>-->
        <!--            <td>-->
        <!--              <el-button-->
        <!--                type="danger"-->
        <!--                circle-->
        <!--                size="small"-->
        <!--                @click="handleRemoveWork(work)"-->
        <!--                icon="el-icon-close"-->
        <!--              />-->
        <!--            </td>-->
        <!--          </tr>-->
        <!--        </tbody>-->
        <!--      </table>-->
        <!--    </div>-->
        <!--    <el-tag>Сумма: {{ toNumFormat(getTotalSummTempServiceWorks) }} </el-tag>-->
        <!--    <el-button-->
        <!--      @click="handleSubmit"-->
        <!--      class="success-button tech-inspection-creating__submit"-->
        <!--    >-->
        <!--      {{ sendCar ? "Отправить" : !!recordId ? "Изменить" : "Создать" }}-->
        <!--    </el-button>-->
    </div>
</template>

<script setup lang="ts">
import carsFilterDialog from '@/components/dialogs/carsFilterDialog'

import {ref} from "vue";

const filterCurSelectDialogVisible = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const techInspectionDto = ref({
    name: null,
    warehouseId: null,
    car_id: 10518,
    type: '',
    category: '',
    change: '',
    comment: '',
    start_date: null,
    end_date: null,
    offLine: false,
    driver_id: null,
    parts: [],
    maintenance_agent_elements: [],
    maintenanceElements: [],
    millage: null
})


const toggleDialogFalse = (id: number) => {
    if (id) {
        techInspectionDto.value.car_id = id
    }
    filterCurSelectDialogVisible.value = true
}
// import { mapActions, mapState, mapGetters } from 'vuex'
// import {
//   TechInspectionCategoriesEnum,
//   TechInspectionCategoriesEnumTranslate
// } from '@/enums/techInspection/TechInspectionCategories'
// import { showErrorMessage } from '@/utils/createMessage'
// import formatter from '@/mixin/formatter'
// const carsFilterDialog = () => import('@/components/dialogs/carsFilterDialog')
//
// const TechInspectionSelectItemsDialog = () =>
//   import('@/components/techInspection/dialogs/TechInspectionSelectItemsDialog')
//
// const MaintenanceAgentDialog = () =>
//   import('@/components/techInspection/dialogs/MaintenanceAgentDialog')
// const TechInspectionRepairWorksDialog = () =>
//   import('@/components/techInspection/dialogs/TechInspectionRepairWorksDialog')
//
// export default {
//   name: 'techInspectionCreatingDialog',
//
//   mixins: [formatter],
//
//   props: {
//     carId: {
//       type: [Number, String],
//       defalut: null
//     },
//     sendCar: {
//       type: Boolean,
//       defalut: false
//     },
//     recordId: {
//       type: [Number, String],
//       default: ''
//     }
//   },
//   components: {
//     carsFilterDialog,
//     MaintenanceAgentDialog,
//     TechInspectionSelectItemsDialog,
//     TechInspectionRepairWorksDialog
//   },
//   data () {
//     return {
//       isLoading: false,
//       warehouseItemsSelectDialog: false,
//       filterCurSelectDialogVisible: false,
//       maintenanceAgentDialogVisible: false,
//       repairWorksDialogVisible: false,
//       currentParts: [],
//       tempWarehouseItems: [],
//       copyCurrentParts: [],
//       addedParts: [],
//       lastCurrentPartsLength: null,
//       temp_maintenance_agent_element: {},
//       selectedServiceWorksIds: [],
//       maintenancesRepairPrice: [],
//       techInspectionDto: {
//         name: null,
//         warehouseId: null,
//         car_id: 10518,
//         type: '',
//         category: '',
//         change: '',
//         comment: '',
//         start_date: null,
//         end_date: null,
//         offLine: false,
//         driver_id: null,
//         parts: [],
//         maintenance_agent_elements: [],
//         maintenanceElements: [],
//         millage: null
//       },
//       changes: [
//         {
//           name: 'Дневная',
//           value: 'morning'
//         },
//         {
//           name: 'Ночная',
//           value: 'night'
//         },
//         {
//           name: 'Сутки',
//           value: 'fullday'
//         }
//       ],
//       rules: {
//         car_id: [
//           {
//             required: true,
//             message: 'Выберите автомобиль',
//             trigger: 'change'
//           }
//         ],
//         type: [
//           {
//             required: true,
//             message: 'Выберите тип обслуживания',
//             trigger: 'change'
//           }
//         ],
//         category: [
//           {
//             required: true,
//             message: 'Выберите категорию ремонта',
//             trigger: 'change'
//           }
//         ],
//         comment: [
//           {
//             required: true,
//             message: 'Введите причину ремонта',
//             trigger: 'blur'
//           }
//         ]
//       },
//       TechInspectionCategoriesEnum,
//       TechInspectionCategoriesEnumTranslate
//     }
//   },
//   watch: {
//     selectedServiceWorksIds: function (someIds) {
//       this.maintenancesRepairPrice = this.getNewWorksByIds(someIds)
//     }
//   },
//   async mounted () {
//     this.isLoading = true
//     this.fetchWarehouse()
//     // await this.fetchDecommissionParts()
//     if (this.maintenanceTypes < 1) {
//       this.fetchMaintenanceTypes()
//     }
//     if (this.parts.length < 1) {
//       this.fetchParts()
//     }
//     if (this.cars.length < 1) {
//       await this.fetchCarPark()
//     }
//
//     if (this.tenantsInfoData.length < 1) {
//       await this.fetchTenantsInfo()
//     }
//
//     this.techInspectionDto.car_id = this.carId
//
//     if (this.recordId) {
//       await this.setRecordData(this.recordId)
//     }
//
//     const nowDate = this.$moment().format('DD.MM.YYYY')
//     const nowTime = this.$moment().format('HH:mm:ss')
//     //   ? 'morning'
//     //   : 'night'
//     const getChanged = (nowDate, nowTime) => {
//       const date = `${nowDate} ${nowTime}`
//       const hours = parseInt(date.split(' ')[1].split(':')[0])
//       if (hours >= 19 && hours <= 23) {
//         const new_date = this.$moment(date.split(' ')[0], 'DD.MM.YYYY')
//         new_date.add(1, 'd')
//         return {
//           date: this.$moment(new_date).format('DD.MM.YYYY'),
//           change: 'morning'
//         }
//       }
//       if (hours >= 0 && hours < 7) {
//         return {
//           date: date.split(' ')[0],
//           change: 'morning'
//         }
//       }
//       if (hours >= 7 && hours < 19) {
//         return {
//           date: date.split(' ')[0],
//           change: 'night'
//         }
//       }
//     }
//     const resultChange = getChanged(nowDate, nowTime)
//     if (!this.recordId) {
//       this.techInspectionDto.change = resultChange.change
//       this.techInspectionDto.start_date = this.$moment(
//         resultChange.date,
//         'DD.MM.YYYY'
//       ).utc()
//     }
//
//     this.isLoading = false
//   },
//
//   computed: {
//     ...mapState('carPark', {
//       cars: 'carParkData'
//     }),
//     ...mapState('schedule', {
//       schedule: 'schedule'
//     }),
//     ...mapState('parts', {
//       warehouse: 'warehouse',
//       parts: 'parts',
//       decommissionParts: 'decommissionParts'
//     }),
//
//     ...mapState('tenantsInfo', {
//       tenantsInfoData: 'tenantsInfoData'
//     }),
//
//     ...mapState('techInspection', {
//       maintenanceTypes: 'maintenanceTypes'
//     }),
//     getWareHouseItemsIds () {
//       return this.tempWarehouseItems.map(x => {
//         return {
//           maintenanceElementId: x.maintenanceElementId,
//           warehouseId: x.warehouseId
//         }
//       })
//     },
//     // ...mapGetters('tenantsInfo', {
//     //   sortedDataByFilter: 'sortedDataByFilter'
//     // }),
//     ...mapGetters('carPark', {
//       GREAT_NAME_BY_ID: 'GREAT_NAME_BY_ID'
//     }),
//     ...mapGetters('techInspection', {
//       getRepairWorkById: 'getRepairWorkById'
//     }),
//     ...mapGetters('parts', {
//       getWarehouseItemById: 'getWarehouseItemById'
//     }),
//     getTotalSummTempItems () {
//       return this.tempWarehouseItems.reduce((acc, value) => {
//         const curr = value.priceUnit * value.orderQuantity
//         return acc + curr
//       }, 0)
//     },
//     getTotalSummTempAgentItems () {
//       return this.techInspectionDto.maintenance_agent_elements.reduce(
//         (acc, value) => {
//           const curr = value.price_unit * value.quantity
//           return acc + curr
//         },
//         0
//       )
//     },
//     getTotalSummTempServiceWorks () {
//       return this.maintenancesRepairPrice?.reduce(
//         (acc, value) => {
//           const curr = value?.price || 0
//           return acc + curr
//         },
//         0
//       )
//     }
//   },
//
//   methods: {
//     ...mapActions('carPark', {
//       fetchCarPark: 'fetchCarParkShort',
//       fetchCarParkCommon: 'fetchCarParkCommon'
//     }),
//     ...mapActions('schedule', {
//       removeScheduleByCarId: 'removeScheduleByCarId'
//     }),
//     ...mapActions('parts', {
//       fetchWarehouse: 'fetchWarehouse',
//       decommissionPart: 'decommissionPart',
//       fetchParts: 'fetchParts',
//       fetchDecommissionParts: 'fetchDecommissionParts',
//       fetchWarehouseItemsIds: 'fetchWarehouseItemsIds'
//     }),
//
//     ...mapActions('tenantsInfo', {
//       fetchTenantsInfo: 'fetchTenantsInfoV1All'
//     }),
//
//     ...mapActions('schedule', {
//       fetchSchedule: 'fetchSchedule'
//     }),
//     ...mapActions('techInspection', {
//       fetchMaintenanceTypes: 'fetchMaintenanceTypes',
//       fetchMaintenanceWorkById: 'fetchMaintenanceWorkById',
//       createMaintenanceWork: 'createMaintenanceWork',
//       updateMaintenanceWork: 'updateMaintenanceWork',
//       createRequestMaintenance: 'createRequestMaintenance',
//       toActualCarMaintenance: 'toActualCarMaintenance',
//       createRepairPrice: 'createRepairPrice',
//       deleteRepairPrice: 'deleteRepairPrice',
//       updateRepairPrice: 'updateRepairPrice',
//       fromActual: 'fromActual'
//     }),
//     toggleDialogTrue () {
//       this.filterCurSelectDialogVisible = true
//     },
//     getMaxItem (item) {
//       if (item?.maxQuantity) return item?.maxQuantity
//       return item?.quantity
//     },
//     handleOpenWarehouseItemDialog () {
//       this.warehouseItemsSelectDialog = true
//     },
//     async handleRemoveWork (work) {
//       if (work?.priceId) {
//         await this.deleteRepairPrice(work?.priceId)
//         this.selectedServiceWorksIds = this.selectedServiceWorksIds.filter(x => x !== work?.workId)
//         return false
//       }
//       this.selectedServiceWorksIds = this.selectedServiceWorksIds.filter(x => x !== work?.repairId)
//     },
//     getNewWorksByIds (ids) {
//       const getWorksDta = this.maintenancesRepairPrice
//       const getWorkResult = ids.reduce((acc, val) => {
//         const isSetInDta = getWorksDta.filter(x => (x?.repairId || x?.workId) === val)
//         if (isSetInDta?.length > 0) {
//           acc = [...acc, isSetInDta[0]]
//         }
//         if (isSetInDta?.length === 0) {
//           acc = [...acc, {
//             price: 0,
//             repairId: val,
//             maintenanceId: null
//           }]
//         }
//
//         return acc
//       }, [])
//       return getWorkResult
//     },
//     handleChangeAgentElement (element) {
//       console.log(element)
//       if (typeof element?.index === 'number') {
//         this.techInspectionDto.maintenance_agent_elements[element?.index] =
//           element
//         return true
//       }
//       this.techInspectionDto.maintenance_agent_elements.push(element)
//     },
//     handleCloseAgentElementDialog () {
//       this.maintenanceAgentDialogVisible = false
//       this.temp_maintenance_agent_element = null
//     },
//     handleOpenRepairWorksDialog () {
//       this.repairWorksDialogVisible = true
//     },
//     async handleEditMaintenancePart (index) {
//       this.temp_maintenance_agent_element = {
//         ...this.techInspectionDto.maintenance_agent_elements[index],
//         index
//       }
//       await this.$nextTick()
//       this.maintenanceAgentDialogVisible = true
//     },
//     toggleDialogFalse (id) {
//       if (id) {
//         this.techInspectionDto.car_id = id
//       }
//       this.filterCurSelectDialogVisible = false
//     },
//     async getEventWarehouseItemsSelected (eventData) {
//       console.log({ eventData })
//       const getEventIds = eventData
//       if (getEventIds.length === 0) return
//       const getWarehouseItemsByIds = await this.fetchWarehouseItemsIds({
//         item_ids: getEventIds,
//         isZero: true
//       })
//       await this.$nextTick()
//       const getFormatedItemToMaintenance = getWarehouseItemsByIds.map((x) => {
//         return {
//           maintenanceElementId: x.id,
//           quantity: x.quantity,
//           orderQuantity: 0,
//           warehouseId: x.warehouseId,
//           priceUnit: x.priceUnit,
//           sparePartName: x.sparePartName,
//           sparePartVendorCode: x.sparePartVendorCode
//         }
//       })
//       await this.$nextTick()
//
//       this.$nextTick(() => {
//         this.tempWarehouseItems = getFormatedItemToMaintenance
//         return true
//       })
//     },
//     async setRecordData (recordId) {
//       const { maintenance } = await this.fetchMaintenanceWorkById(recordId)
//       const partsIds = []
//       const currentParts = []
//
//       for (const index in maintenance.maintenanceElements) {
//         const e = maintenance.maintenanceElements[index]
//         partsIds.push(e.maintenanceElementId)
//         currentParts.push({
//           ...e
//         })
//       }
//       this.currentParts = currentParts
//       // this.tempWarehouseItems = maintenance.maintenanceElements
//       await this.getEventWarehouseItemsSelected(
//         maintenance.maintenanceElements.map((x) => x.maintenanceElementId)
//       )
//       this.tempWarehouseItems = this.tempWarehouseItems.map((x) => {
//         const orderQuantity = maintenance.maintenanceElements.find(
//           (y) => y.maintenanceElementId === x.maintenanceElementId
//         )?.quantity
//         const getMaxQuantity = () => {
//           const getResult = orderQuantity + x.quantity
//           if (this.sendCar) {
//             return x.quantity
//           }
//
//           return getResult
//           // console.log(x)
//           // const getResult = orderQuantity + x.quantity
//           // console.log(getResult, orderQuantity, orderQuantity + (getResult - orderQuantity), x.quantity)
//           // if (getResult > orderQuantity) return orderQuantity + (getResult - orderQuantity)
//           // return getResult
//         }
//         return {
//           ...x,
//           maxQuantity: getMaxQuantity(),
//           orderQuantity
//         }
//       })
//       this.copyCurrentParts = currentParts
//       this.techInspectionDto = {
//         name: maintenance.name,
//         warehouseId: maintenance.warehouseId,
//         change: maintenance.change,
//         type: maintenance.type,
//         parts: partsIds,
//         millage: maintenance.millage,
//         car_id: maintenance.carId,
//         category: maintenance.category,
//         comment: maintenance.comment || '',
//         start_date: maintenance.startDate,
//         on_request: false,
//         end_date: maintenance.endDate,
//         offLine: maintenance.offLine,
//         driver_id: maintenance.driverId,
//         maintenanceId: maintenance.maintenanceId,
//         maintenance_agent_elements: maintenance?.maintenanceAgentElements.map(
//           (x) => {
//             return {
//               price_unit: x.priceUnit,
//               quantity: x.quantity,
//               name: x.name,
//               vendor_code: x.vendorCode,
//               unit_measure: x.unitMeasure,
//               category: x.category,
//               maintenanceId: x.maintenanceId,
//               id: x.id
//             }
//           }
//         )
//       }
//
//       this.maintenancesRepairPrice = maintenance?.repairs ?? []
//
//       this.selectedServiceWorksIds = maintenance?.repairs?.map(x => x?.workId)
//     },
//
//     async handlePartsChange (partIds) {
//       console.log(partIds)
//       if (
//         this.lastCurrentPartsLength === null ||
//         this.lastCurrentPartsLength < partIds.length
//       ) {
//         this.addedParts.push(partIds[partIds.length - 1])
//       }
//       if (this.lastCurrentPartsLength > partIds.length) {
//         this.addedParts.pop()
//       }
//
//       this.lastCurrentPartsLength = partIds.length === 0 ? 0 : partIds.length
//       this.currentParts = this.parts
//         .filter((part) => partIds.includes(part.sparePartId))
//         .map((part) => {
//           let decommission_part_id = null
//           const decommission_part = this.copyCurrentParts.filter(
//             (part_c) => part_c.sparePartId === part.sparePartId
//           )
//           if (decommission_part.length > 0) {
//             decommission_part_id = decommission_part[0].decommission_part_id
//           }
//           return {
//             quantity: 1,
//             decommission_part_id,
//             warehouse_id: part.id,
//             ware_house_id: part.id,
//             vendor_code: part.spare_part_vendor_code,
//             name: part.spare_part_name
//           }
//         })
//     },
//
//     handleRemovePart (index) {
//       this.tempWarehouseItems.splice(index, 1)
//       // this.techInspectionDto.parts.splice(index, 1)
//     },
//     handleRemoveMaintenancePart (index) {
//       this.techInspectionDto.maintenance_agent_elements.splice(index, 1)
//     },
//     clearDto () {
//       this.lastCurrentPartsLength = null
//       this.addedParts = []
//       this.currentParts = []
//       this.tempWarehouseItems = []
//       this.techInspectionDto = {
//         name: null,
//         warehouseId: null,
//         car_id: null,
//         type: '',
//         category: '',
//         change: '',
//         comment: '',
//         start_date: null,
//         end_date: null,
//         offLine: false,
//         driver_id: null,
//         parts: [],
//         maintenance_agent_elements: [],
//         maintenanceElements: [],
//         millage: null
//       }
//     },
//
//     async handleSubmit () {
//       try {
//         await this.$refs.form.validate()
//         const maintenanceAgentElements =
//           this.techInspectionDto.maintenance_agent_elements.map((x) => {
//             return {
//               name: x.name,
//               vendorCode: x.vendor_code,
//               unitMeasure: x.unit_measure,
//               category: x.category,
//               priceUnit: x.price_unit,
//               quantity: x.quantity
//             }
//           })
//         const {
//           name,
//           warehouseId,
//           category,
//           change,
//           comment,
//           millage = 0,
//           offLine,
//           type,
//           maintenanceId = null
//         } = this.techInspectionDto
//
//         const maintenanceElements = this.tempWarehouseItems.map((x) => {
//           return {
//             ...x,
//             orderQuantity: x.quantity,
//             quantity: x.orderQuantity
//           }
//         })
//         const {
//           end_date: endDate,
//           start_date: startDate,
//           car_id: carId
//         } = this.techInspectionDto
//         const getNormalizeDto = {
//           carId: Number(carId),
//           category,
//           change,
//           comment,
//           driverId: null,
//           endDate,
//           maintenanceAgentElements,
//           maintenanceElements,
//           name,
//           millage: parseInt(millage),
//           offLine,
//           sparePartsSum: 0,
//           startDate,
//           type,
//           onRequest: offLine,
//           warehouseId,
//           maintenanceId
//         }
//         console.log(getNormalizeDto)
//         let getMaintenanceId = maintenanceId
//
//         if (!this.sendCar && this.recordId) {
//           await this.fromActual(this.recordId)
//         }
//         if (this.recordId) {
//           await this.updateMaintenanceWork(getNormalizeDto)
//         } else {
//           getMaintenanceId = await this.createRequestMaintenance(getNormalizeDto)
//         }
//
//         if (this.sendCar) {
//           await this.toActualCarMaintenance(getNormalizeDto.maintenanceId)
//         }
//
//         if (this.maintenancesRepairPrice.length) {
//           await this.maintenancesRepairPrice.forEach(async (x) => {
//             if (x?.priceId) {
//               console.log('ipd')
//               await this.updateRepairPrice(
//                 {
//                   id: x?.priceId,
//                   data: {
//                     repairId: x?.workId,
//                     price: x.price
//                   }
//                 }
//               )
//             } else {
//               await this.createRepairPrice({
//                 ...x,
//                 maintenanceId: getMaintenanceId
//               })
//             }
//             return true
//           })
//         }
//         this.clearDto()
//         if (this.$route.name === 'schedule' && getNormalizeDto?.offLine) {
//           await this.fetchSchedule({})
//         }
//         if (this.$route.name === 'CarPark' && getNormalizeDto?.offLine) {
//           this.fetchCarParkCommon()
//         }
//         this.$emit('submit')
//       } catch (err) {
//         showErrorMessage('Не все поля заполнены')
//         return Promise.reject(err)
//       } finally {
//         this.isLoading = false
//       }
//     }
//   }
// }
</script>

<style lang="scss">
.tech-inspection-creating {
  &__submit {
    margin-top: 40px;
  }
}
</style>

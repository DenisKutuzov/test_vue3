<template>
  <div
    class="tech-inspection-creating"
    v-loading-custom="isLoading" >
    <el-dialog
      title="Выберете автомобиль"
      :visible.sync="filterCurSelectDialogVisible"
      width="1360px"
      append-to-body>
        <carsFilterDialog :id="techInspectionDto.car_id" @close="v=> toggleDialogFalse(v)"/>
    </el-dialog>
    <el-dialog
    :destroyOnClose="true"
      title="Запчасть контр-агента"
      :visible.sync="maintenanceAgentDialogVisible"
      width="800px"
      @close="handleCloseAgentElementDialog"
      append-to-body>
        <MaintenanceAgentDialog @close="handleCloseAgentElementDialog" @change="v => handleChangeAgentElement(v)" :temp="temp_maintenance_agent_element"/>
    </el-dialog>
    <el-form
      ref="form"
      inline
      :model="techInspectionDto"
       >
       <el-form-item
        class="w100"
        prop="name"
        label="Наименование ТО" >
          <el-input class="w100" placeholder="Наименование ТО" v-model="techInspectionDto.name"/>
      </el-form-item>
      <el-form-item
        class="w100"
        prop="warehouseId"
        label="Место ремонта" >
        <el-select placeholder="Место ремонта" class="w100" v-model="techInspectionDto.warehouseId">
      <el-option
              v-for="item in warehouse"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
    </el-select>
      </el-form-item>
      <el-form-item
        class="form__item"
        prop="car_id"
        label="Автомобиль" >
        <el-row type="flex">
          <el-select
            v-model="techInspectionDto.car_id"
            filterable
            :disabled="!!carId || !!recordId"
            placeholder="Автомобиль" >

            <el-option
              v-for="car in cars"
              :key="car.carId"
              :label="`${car.brand} ${car.model} — ${car.number} — ${car.callsign}`"
              :value="car.carId" />
          </el-select>
          <el-button size="mini" class="margin-10-left"  type="primary" round :disabled="!!carId || !!recordId" @click="toggleDialogTrue()">
            <i class="el-icon-more"></i>
          </el-button>
        </el-row>
      </el-form-item>

      <el-form-item
        class="form__item"
        prop="type"
        label="Тип обслуживания" >

        <el-select
          v-model="techInspectionDto.type"
          filterable
          placeholder="Тип обслуживания" >

          <el-option
            v-for="type in maintenanceTypes"
            :key="type.id"
            :label="`${type.name}`"
            :value="type.id" />
        </el-select>
      </el-form-item>
      <el-form-item
        class="form__item"
        prop="category"
        label="Запчасть котнр-агента" >

          <el-button @click="maintenanceAgentDialogVisible = !maintenanceAgentDialogVisible" type="primary" round class="w100">
            <i class="el-icon-plus"></i>
          </el-button>

      </el-form-item>
      <el-form-item
        class="form__item"
        prop="category"
        label="Категория ремонта" >

        <el-select
          v-model="techInspectionDto.category"
          filterable
          placeholder="Категория ремонта" >

          <el-option
            v-for="category in TechInspectionCategoriesEnum"
            :key="category"
            :label="`${TechInspectionCategoriesEnumTranslate[category]}`"
            :value="category" />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="techInspectionDto.type === '315bc934-52a4-47bf-9c9a-1f64246bd1ad'"
        class="form__item"
        prop="driverId"
        label="Виновник" >

        <el-select
          v-model="techInspectionDto.driverId"
          filterable
          clearable
          placeholder="Виновник" >

          <el-option
            v-for="driver in tenantsInfoData"
            :key="driver.driverId"
            :label="`${driver.first_name} ${driver.second_name || ''} ${driver.last_name}`"
            :value="driver.driverId" />
        </el-select>
      </el-form-item>
      <el-form-item
        class="form__item"
        prop="parts"
        label="Запчасть">

        <el-select
          multiple
          collapse-tags
          filterable
          v-model="techInspectionDto.parts"
          @change="handlePartsChange"
          placeholder="Запчасть" >

          <el-option
            v-for="part in parts"
            :key="part.sparePartId"
            :label="`${part.name} (${part.unitMeasureName})`"
            :value="part.sparePartId" />
        </el-select>
      </el-form-item>
      <el-form-item
        class="form__item"
        prop="start_date"
        label="Дата начала ремонта" >

        <el-date-picker
         :picker-options="{ firstDayOfWeek: 1 }"
          v-model="techInspectionDto.start_date"
          placeholder="Дата начала ремонта"
          format="dd.MM.yyyy"
          value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-form-item
        class="form__item"
        prop="end_date"
        label="Дата окончания ремонта" >

        <el-date-picker
         :picker-options="{ firstDayOfWeek: 1 }"
          v-model="techInspectionDto.end_date"
          placeholder="Дата окончания ремонта"
          format="dd.MM.yyyy"
          value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-form-item
        class="form__item" prop="offline" label=" " >
        <el-checkbox
          label="Убрать авто с линии"
          v-model="techInspectionDto.offline" />
      </el-form-item>

      <el-form-item
        class="form__item"
        prop="end_date"
        label="Пробег" >
        <el-input type="number"  v-model="techInspectionDto.millage" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item
        class="form__item" prop="change"  label="Смена">
        <el-select
          v-model="techInspectionDto.change"
          filterable
          placeholder="Смена" >

          <el-option
            v-for="change in changes"
            :key="change.value"
            :label="change.name"
            :value="change.value" />
        </el-select>
      </el-form-item>
      <el-form-item
        class="form__item el-form-item_max-width"
        prop="comment"
        lable="Комментарий" >

        <el-input
          v-model="techInspectionDto.comment"
          type="textarea"
          maxlength="300"
          placeholder="Комментарий" />
      </el-form-item>
    </el-form>
    {{ currentParts }}
    <h3>Запчасть со склада</h3>
    <div class="part-order-creating__table max-height_table">
      <table class="table table_last-auto-width">
        <thead>
          <tr>
            <td>Запчасть</td>
            <td>Артикул</td>
            <td>Количество</td>
            <td></td>
          </tr>
        </thead>
        <tbody v-if="currentParts.length > 0">
          <tr
            v-for="(part,index) in currentParts"
            :key="part.id" >
            <td>
              {{ part.name }}
            </td>

            <td>
              {{ part.vendor_code || '-' }}
            </td>

            <td>
              <el-input-number
                v-model="part.quantity"
                :min="1"
                :max="part.ware_house_quantity"
                size="mini" />
            </td>

            <td>
              <el-button
                type="danger"
                circle
                size="small"
                @click="handleRemovePart(part.decommission_part_id,index)"
                icon="el-icon-close" />
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="currentParts.length < 1"
        class="no-data no-data_no-border-top" >

        Запчасть не выбрана
      </div>
    </div>
    <h3>Запчасть котнр-агента</h3>
    <div class="part-order-creating__table max-height_table">
      <table class="table table_last-auto-width">
        <thead>
          <tr>
            <td>Запчасть</td>
            <td>Артикул</td>
            <td>Количество</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(maintenance_agent,index) in techInspectionDto.maintenance_agent_elements"
            :key="index + 'maintenance_agent_elements'" >
            <td>
              {{ maintenance_agent.name  || '-'}}
            </td>

            <td>
              {{ maintenance_agent.vendor_code || '-' }}
            </td>

            <td>
              <el-input-number
                v-model="maintenance_agent.quantity"
                :min="1"
                size="mini" />
            </td>

            <td>
              <el-button
                type="danger"
                circle
                size="small"
                @click="handleRemoveMaintenancePart(index)"
                icon="el-icon-close" />
                <el-button
                type="primary"
                circle
                size="small"
                @click="handleEditMaintenancePart(index)"
                icon="el-icon-edit" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-button
      @click="handleSubmit"
      class="success-button tech-inspection-creating__submit">

      {{ sendCar ? "Отправить" : !!recordId ? 'Изменить' : 'Создать' }}
    </el-button>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { TechInspectionCategoriesEnum, TechInspectionCategoriesEnumTranslate } from '@/enums/techInspection/TechInspectionCategories'
import { showErrorMessage } from '@/utils/createMessage'
import formatter from '@/mixin/formatter'
const carsFilterDialog = () => import('@/components/dialogs/carsFilterDialog')
const MaintenanceAgentDialog = () => import('@/components/techInspection/dialogs/MaintenanceAgentDialog')
export default {
  name: 'techInspectionCreatingDialog',

  mixins: [formatter],

  props: {
    carId: {
      type: [Number, String],
      defalut: null
    },
    sendCar: {
      type: Boolean,
      defalut: false
    },
    recordId: {
      type: String,
      default: ''
    }
  },
  components: { carsFilterDialog, MaintenanceAgentDialog },
  data () {
    return {
      isLoading: false,
      filterCurSelectDialogVisible: false,
      maintenanceAgentDialogVisible: false,
      currentParts: [],
      copyCurrentParts: [],
      addedParts: [],
      lastCurrentPartsLength: null,
      temp_maintenance_agent_element: {},
      techInspectionDto: {
        name: null,
        warehouseId: null,
        car_id: null,
        type: '',
        category: '',
        change: '',
        comment: '',
        start_date: null,
        end_date: null,
        offline: false,
        driverId: 1,
        parts: [],
        maintenance_agent_elements: [],
        millage: null
      },
      changes: [{
        name: 'Дневная', value: 'morning'
      }, {
        name: 'Ночная', value: 'night'
      }],
      rules: {
        car_id: [
          {
            required: true,
            message: 'Выберите автомобиль',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: 'Выберите тип обслуживания',
            trigger: 'change'
          }
        ],
        category: [
          {
            required: true,
            message: 'Выберите категорию ремонта',
            trigger: 'change'
          }
        ],
        comment: [
          {
            required: true,
            message: 'Введите причину ремонта',
            trigger: 'blur'
          }
        ]

      },
      TechInspectionCategoriesEnum,
      TechInspectionCategoriesEnumTranslate
    }
  },

  async mounted () {
    this.isLoading = true
    this.fetchWarehouse()
    // await this.fetchDecommissionParts()
    if (this.maintenanceTypes < 1) {
      this.fetchMaintenanceTypes()
    }
    if (this.parts.length < 1) {
      this.fetchParts()
    }
    if (this.cars.length < 1) {
      await this.fetchCarPark()
    }

    if (this.tenantsInfoData.length < 1) {
      await this.fetchTenantsInfo()
    }

    this.techInspectionDto.car_id = this.carId

    if (this.recordId) {
      await this.setRecordData(this.recordId)
    }

    const nowDate = this.$moment().format('DD.MM.YYYY')
    const nowTime = this.$moment().format('HH:mm:ss')
    //   ? 'morning'
    //   : 'night'
    const getChanged = (nowDate, nowTime) => {
      const date = `${nowDate} ${nowTime}`
      const hours = parseInt(date.split(' ')[1].split(':')[0])
      if (hours >= 19 && hours <= 23) {
        const new_date = this.$moment(date.split(' ')[0], 'DD.MM.YYYY')
        new_date.add(1, 'd')
        return {
          date: this.$moment(new_date).format('DD.MM.YYYY'),
          change: 'morning'
        }
      }
      if (hours >= 0 && hours < 7) {
        return {
          date: date.split(' ')[0],
          change: 'morning'
        }
      }
      if (hours >= 7 && hours < 19) {
        return {
          date: date.split(' ')[0],
          change: 'night'
        }
      }
    }
    console.log(123, this.techInspectionDto.change)
    const resultChange = getChanged(nowDate, nowTime)
    if (!this.techInspectionDto.change) {
      this.techInspectionDto.change = resultChange.change
    }
    this.techInspectionDto.start_date = this.$moment(resultChange.date, 'DD.MM.YYYY').format('YYYY-MM-DD')
    this.isLoading = false
  },

  computed: {
    ...mapState('carPark', {
      cars: 'carParkData'
    }),
    ...mapState('schedule', {
      schedule: 'schedule'
    }),
    ...mapState('parts', {
      warehouse: 'warehouse',
      parts: 'parts',
      decommissionParts: 'decommissionParts'
    }),

    ...mapState('tenantsInfo', {
      tenantsInfoData: 'tenantsInfoData'
    }),

    ...mapState('techInspection', {
      maintenanceTypes: 'maintenanceTypes'
    }),
    // ...mapGetters('tenantsInfo', {
    //   sortedDataByFilter: 'sortedDataByFilter'
    // }),
    ...mapGetters('carPark', {
      GREAT_NAME_BY_ID: 'GREAT_NAME_BY_ID'
    })
  },

  methods: {
    ...mapActions('carPark', {
      fetchCarPark: 'fetchCarParkShort'
    }),
    ...mapActions('schedule', {
      removeScheduleByCarId: 'removeScheduleByCarId'
    }),
    ...mapActions('parts', {
      fetchWarehouse: 'fetchWarehouse',
      decommissionPart: 'decommissionPart',
      fetchParts: 'fetchParts',
      fetchDecommissionParts: 'fetchDecommissionParts'
    }),

    ...mapActions('tenantsInfo', {
      fetchTenantsInfo: 'fetchTenantsInfoV1All',
      toActualCarMaintenance: 'toActualCarMaintenance'
    }),

    ...mapActions('techInspection', {
      fetchMaintenanceTypes: 'fetchMaintenanceTypes',
      fetchMaintenanceWorkById: 'fetchMaintenanceWorkById',
      createMaintenanceWork: 'createMaintenanceWork',
      updateMaintenanceWork: 'updateMaintenanceWork'
    }),
    toggleDialogTrue () {
      this.filterCurSelectDialogVisible = true
    },
    handleChangeAgentElement (element) {
      console.log(element)
      if (typeof element?.index === 'number') {
        console.log(123123123)
        this.techInspectionDto.maintenance_agent_elements[element?.index] = element
        return true
      }
      this.techInspectionDto.maintenance_agent_elements.push(element)
    },
    handleCloseAgentElementDialog () {
      this.maintenanceAgentDialogVisible = false
      this.temp_maintenance_agent_element = null
    },
    async handleEditMaintenancePart (index) {
      this.temp_maintenance_agent_element = { ...this.techInspectionDto.maintenance_agent_elements[index], index }
      await this.$nextTick()
      this.maintenanceAgentDialogVisible = true
    },
    toggleDialogFalse (id) {
      if (id) { this.techInspectionDto.car_id = id }
      this.filterCurSelectDialogVisible = false
    },
    async setRecordData (recordId) {
      const data = await this.fetchMaintenanceWorkById(recordId)
      const typeId = this.maintenanceTypes.find(e => e.id === data.type).id
      console.log(data.change)
      const startDate = this.validateDate(data.start_date)
      const endDate = this.validateDate(data.end_date)

      const partsIds = []
      const currentParts = []

      for (const index in data.maintenance_elements) {
        const e = data.maintenance_elements[index]
        partsIds.push(e.ware_house_id)
        currentParts.push({
          ...e
        })
      }
      this.currentParts = currentParts
      this.copyCurrentParts = currentParts
      this.techInspectionDto = {
        type: typeId,
        parts: partsIds,
        id: data.id,
        change: data.change,
        millage: data.car_millage,
        car_id: data.car_id,
        category: data.category,
        comment: data.comment || '',
        start_date: startDate,
        on_request: false,
        end_date: endDate,
        offline: data.offline,
        driverId: data.driverId === -1 ? null : data.driverId,
        maintenance_agent_elements: data?.maintenance_agent_elements ?? []
      }
    },

    async handlePartsChange (partIds) {
      console.log(partIds)
      if (this.lastCurrentPartsLength === null || this.lastCurrentPartsLength < partIds.length) {
        this.addedParts.push(partIds[partIds.length - 1])
      }
      if (this.lastCurrentPartsLength > partIds.length) {
        this.addedParts.pop()
      }

      this.lastCurrentPartsLength = partIds.length === 0 ? 0 : partIds.length
      this.currentParts = this.parts
        .filter(part => partIds.includes(part.sparePartId))
        .map(part => {
          let decommission_part_id = null
          const decommission_part = this.copyCurrentParts.filter(part_c => part_c.sparePartId === part.sparePartId)
          if (decommission_part.length > 0) {
            decommission_part_id = decommission_part[0].decommission_part_id
          }
          return {
            quantity: 1,
            decommission_part_id,
            warehouse_id: part.id,
            ware_house_id: part.id,
            vendor_code: part.spare_part_vendor_code,
            name: part.spare_part_name
          }
        })
    },

    handleRemovePart (partId, index) {
      this.currentParts.splice(index, 1)
      this.techInspectionDto.parts.splice(index, 1)
    },
    handleRemoveMaintenancePart (index) {
      this.techInspectionDto.maintenance_agent_elements.splice(index, 1)
    },
    clearDto () {
      this.lastCurrentPartsLength = null
      this.addedParts = []
      this.currentParts = []
      this.techInspectionDto = {
        car_id: null,
        type: '',
        change: '',
        category: '',
        comment: '',
        start_date: null,
        end_date: null,
        offline: false,
        driverId: null,
        parts: [],
        millage: null
      }
    },

    async handleSubmit () {
      try {
        await this.$refs.form.validate()

        this.isLoading = true

        const dto = this.techInspectionDto
        delete dto.parts
        if (dto.millage) {
          dto.millage = parseInt(dto.millage)
        }
        dto.spare_parts_sum = 0
        dto.on_request = dto.offline

        dto.maintenance_elements = this.currentParts.map(e => {
          dto.spare_parts_sum += e.price_unit * e.requestQuantity

          return {
            quantity: e.quantity,
            ware_house_id: e.warehouse_id,
            decommission_part_id: e.decommission_part_id
          }
        })
        this.recordId
          ? await this.updateMaintenanceWork(dto)
          : await this.createMaintenanceWork(dto)
        if (this.schedule.length > 0 && dto.car_id) {
          this.removeScheduleByCarId(dto.car_id)
        }
        if (this.sendCar) {
          await this.toActualCarMaintenance(dto.maintenanceId)
        }
        this.clearDto()
        this.$emit('submit')
      } catch (err) {
        showErrorMessage('Не все поля заполнены')
        return Promise.reject(err)
      } finally {
        this.isLoading = false
      }
    },
    async addDecommissionPart (maintenance_elements) {
      await maintenance_elements.forEach(async (main_el, index) => {
        await this.addedParts.forEach(async addedElement => {
          if (main_el.warehouse_id === addedElement) {
            const { id } = await this.decommissionPart(main_el)

            maintenance_elements[index].decommission_part_id = id
          }
        })
      })
      return maintenance_elements
    }

  }

}
</script>

<style lang="scss">
.tech-inspection-creating {
  &__submit {
    margin-top: 40px;
  }
}
</style>

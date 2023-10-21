<template>
  <div
    class="tech-inspection-creating"
    v-loading-custom="isLoading" >
    <el-form
      ref="form"
      inline
      :model="techInspectionDto"
      :rules="rules" >

      <el-form-item
        class="form__item"
        prop="car_id"
        label="Автомобиль" >

        <el-select
          v-model="techInspectionDto.car_id"
          filterable
          :disabled="!!carId || !!recordId"
          placeholder="Автомобиль" >

          <el-option
            v-for="car in cars"
            :key="car.id"
            :label="`${car.brand} ${car.model} — ${car.number} — ${car.callsign}`"
            :value="car.id" />
        </el-select>
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

      <!-- <el-form-item
        class="form__item"
        prop="driver_id"
        label="Виновник" >

        <el-select
          v-model="techInspectionDto.driver_id"
          filterable
          clearable
          placeholder="Виновник" >

          <el-option
            v-for="driver in tenantsInfoData"
            :key="driver.id"
            :label="`${driver.first_name} ${driver.second_name || ''} ${driver.last_name}`"
            :value="driver.id" />
        </el-select>
      </el-form-item> -->

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
            v-for="part in warehouse"
            :key="part.id"
            :label="`${part.spare_part_name} (${part.unit_measure_name}) — кол: ${part.quantity}/${part.order_quantity} — ${part.price_unit} ₽`"
            :value="part.id" />
        </el-select>
      </el-form-item>

      <el-form-item
        class="form__item"
        prop="repair_sum"
        label="Стоимость ремонта" >

        <el-input-number
          v-model="techInspectionDto.repair_sum"
          placeholder="Стоимость ремонта" />
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
        class="form__item"
        prop="end_date"
        label="Пробег" >
        <el-input type="number"  v-model="techInspectionDto.millage" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item
        class="form__item" prop="offline" >
        <el-checkbox
          label="Убрать авто с линии"
          v-model="techInspectionDto.offline" />
      </el-form-item>

      <el-form-item
        class="form__item el-form-item_max-width"
        prop="comment"
        lable="Причина ремонта" >

        <el-input
          v-model="techInspectionDto.comment"
          type="textarea"
          maxlength="300"
          placeholder="Комментарий" />
      </el-form-item>
    </el-form>
<pre>{{currentParts}}</pre>
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
            v-for="part in currentParts"
            :key="part.id" >
            <td>
              {{ part.spare_part_name }}
            </td>

            <td>
              {{ part.spare_part_vendor_code || '-' }}
            </td>

            <td>
              <el-input-number
                v-model="part.requestQuantity"
                :min="1"
                :max="part.quantity"
                size="mini" />
            </td>

            <td>
              <el-button
                type="danger"
                circle
                size="small"
                @click="handleRemovePart(part.id)"
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

    <el-button
      @click="handleSubmit"
      class="success-button tech-inspection-creating__submit">

      {{ sendCar ? "Отправить" : !!recordId ? 'Изменить' : 'Создать' }}
    </el-button>
  </div>
</template>

<script>
// car_id: 1 car_millage: 287355 driver_id: 1  maintenance_elements on_request
import { mapActions, mapState } from 'vuex'
import { TechInspectionCategoriesEnum, TechInspectionCategoriesEnumTranslate } from '@/enums/techInspection/TechInspectionCategories'
import { showErrorMessage } from '@/utils/createMessage'
import formatter from '@/mixin/formatter'

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

  data () {
    return {
      isLoading: false,
      currentParts: [],
      techInspectionDto: {
        car_id: null,
        type: '',
        category: '',
        comment: '',
        start_date: null,
        end_date: null,
        repair_sum: 0,
        offline: false,
        driver_id: null,
        parts: [],
        millage: null
      },
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

    await this.fetchWarehouse()

    if (this.maintenanceTypes < 1) {
      await this.fetchMaintenanceTypes()
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

    this.isLoading = false
  },

  computed: {
    ...mapState('carPark', {
      cars: 'carParkData'
    }),

    ...mapState('parts', {
      warehouse: 'warehouse'
    }),

    ...mapState('tenantsInfo', {
      tenantsInfoData: 'tenantsInfoData'
    }),

    ...mapState('techInspection', {
      maintenanceTypes: 'maintenanceTypes'
    })
  },

  methods: {
    ...mapActions('carPark', {
      fetchCarPark: 'fetchCarPark'
    }),

    ...mapActions('parts', {
      fetchWarehouse: 'fetchWarehouse',
      decommissionPart: 'decommissionPart'
    }),

    ...mapActions('tenantsInfo', {
      fetchTenantsInfo: 'fetchTenantsInfo'
    }),

    ...mapActions('techInspection', {
      fetchMaintenanceTypes: 'fetchMaintenanceTypes',
      fetchMaintenanceWorkById: 'fetchMaintenanceWorkById',
      createMaintenanceWork: 'createMaintenanceWork',
      updateMaintenanceWork: 'updateMaintenanceWork'
    }),

    async setRecordData (recordId) {
      const data = await this.fetchMaintenanceWorkById(recordId)

      const typeId = this.maintenanceTypes.find(e => e.id === data.type).id

      const startDate = this.validateDate(data.start_date)
      const endDate = this.validateDate(data.end_date)

      const partsIds = []
      const currentParts = []

      for (const index in data.maintenance_elements) {
        const e = data.maintenance_elements[index]
        console.log(e)
        partsIds.push(e.decommission_part_id)
        console.log(this.warehouse)
        const part = this.warehouse.find(item => item.id === e.decommission_part_id)
        console.log('🚀 ~ file: TechInspectionCreatingDialog.vue ~ line 389 ~ setRecordData ~ part', part)
        currentParts.push({
          ...part,
          requestQuantity: e.quantity
        })
      }

      this.currentParts = currentParts

      this.techInspectionDto = {
        type: typeId,
        parts: partsIds,
        id: data.id,
        millage: data.car_millage,
        car_id: data.car_id,
        category: data.category,
        comment: data.comment || '',
        start_date: startDate,
        on_request: false,
        end_date: endDate,
        repair_sum: data.repair_sum,
        offline: data.offline,
        driver_id: data.driver_id === -1 ? null : data.driver_id
      }
    },

    handlePartsChange (partIds) {
      this.currentParts = this.warehouse
        .filter(part => partIds.includes(part.id))
        .map(part => {
          part.requestQuantity = 1
          return part
        })
    },

    handleRemovePart (partId) {
      console.log(this.techInspectionDto.parts)
      // this.techInspectionDto.parts = this.techInspectionDto.parts.filter(e => e !== partId)
      // this.currentParts = this.currentParts.filter(e => e.id !== partId)
    },

    clearDto () {
      this.currentParts = []
      this.techInspectionDto = {
        car_id: null,
        type: '',
        category: '',
        comment: '',
        start_date: null,
        end_date: null,
        repair_sum: 0,
        offline: false,
        driver_id: null,
        parts: []
      }
    },

    async handleSubmit () {
      try {
        await this.$refs.form.validate()

        this.isLoading = true

        const dto = this.techInspectionDto
        delete dto.parts

        dto.spare_parts_sum = 0
        dto.on_request = false
        dto.driver_id = +dto.driver_id

        dto.maintenance_elements = this.currentParts.map(e => {
          dto.spare_parts_sum += e.price_unit * e.requestQuantity
          console.log(e)
          return {
            decommission_part_id: e.id,
            warehouse_id: e.id,
            maintenance_id: this.recordId,
            quantity: e.requestQuantity,
            comment: this.techInspectionDto.comment
          }
        })
        console.log(dto)
        dto.maintenance_elements.forEach(async e => {
          await this.decommissionPart(e)
        })
        this.recordId
          ? await this.updateMaintenanceWork(dto)
          : await this.createMaintenanceWork(dto)

        this.clearDto()
        this.$emit('submit')
      } catch (err) {
        showErrorMessage('Не все поля заполнены')
        return Promise.reject(err)
      } finally {
        this.isLoading = false
      }
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

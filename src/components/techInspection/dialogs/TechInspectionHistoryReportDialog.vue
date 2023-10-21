<template>

  <div
    v-loading-custom="isLoading"
    class="card-table card-table_primitive car-details-dialog"
  >
    <table class="table-mini"  v-if="getVisibleData.cummon">
      <tbody>
        <tr class="table-mini__row-head">
          <td>Детали</td>
          <td></td>
        </tr>
        <tr>
          <td>Категория:</td>
          <td>
            {{
              TechInspectionCategoriesEnumTranslate[data.maintenance.category]
            }}
          </td>
        </tr>
        <tr>
          <td>Дата начала:</td>
          <td>{{ getDateFromUtc(data.maintenance.startDate, true) || "..." }}</td>
        </tr>
        <tr>
          <td>Комментарий:</td>
          <td>{{ data.maintenance.comment || "..." }}</td>
        </tr>
        <tr>
          <td>Дата окончания:</td>
          <td>{{ getDateFromUtc(data.maintenance.endDate, true) || "..." }}</td>
        </tr>
        <tr>
          <td>Пробег:</td>
          <td>{{ toNumFormat(data.maintenance.millage) || "..." }}</td>
        </tr>
        <tr>
          <td>Название ремонта:</td>
          <td>{{ data.maintenance.name || "..." }}</td>
        </tr>
        <tr>
          <td>Тип:</td>
          <td>{{ data.typeName || "..." }}</td>
        </tr>
        <tr>
          <td>Стоимость ремонта:</td>
          <td>{{ toNumFormat(data.maintenance.repairSum) || 0 }}</td>
        </tr>
        <tr>
          <td>Стоимость запчастей:</td>
          <td>{{ toNumFormat(data.maintenance.sparePartsSum) || 0 }}</td>
        </tr>
        <tr v-if="data.maintenance.driverFullName">
          <td>Водитель:</td>
          <td>{{ toNumFormat(data.maintenance.driverFullName) || 0 }}</td>
        </tr>
        <tr v-if="data.maintenance.warehouseId">
          <td>Склад:</td>
          <td>
            {{ getWarehouseItemById(data.maintenance.warehouseId).name || 0 }}
          </td>
        </tr>
        <tr v-if="data.maintenance.carNumber">
          <td>Гос номер авто:</td>
          <td>{{ data.maintenance.carNumber || 0 }}</td>
        </tr>
        <tr v-if="data.maintenance.carCallSign">
          <td>Позывной авто:</td>
          <td>{{ data.maintenance.carCallSign || 0 }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="getVisibleData.maintenanceElements">
      <h3>Запчаcти</h3>
      <div
        v-for="dt in data.maintenance.maintenanceElements"
        :key="dt.maintenanceElementId"
      >
        <el-button type="info" class="w100 margin-top-20">
          Количество: {{ dt.quantity || 0 }} <br />
          Название: {{ dt.data.sparePartName || "" }}<br />
          Вендор: {{ dt.data.sparePartVendorCode || "" }}<br />
          Цена за шт: {{ dt.data.priceUnit || "" }}<br />
          Сумма: {{ toNumFormat(dt.quantity * dt.data.priceUnit) }}<br />
          Склад: {{ getWarehouseItemById(dt.data.warehouseId).name || ""
          }}<br />
        </el-button>
      </div>
    </div>
    <div  v-if="getVisibleData.maintenanceAgentElements">
    <h3>Запчаcти контр-агента</h3>
      <div v-for="dt in data.maintenance.maintenanceAgentElements" :key="dt.id">
        <el-button type="info" class="w100 margin-top-20">
          Количество: {{ dt.quantity || 0 }} {{ dt.unitMeasure || "" }} <br />
          Название: {{ dt.name || "" }}<br />
          Вендор: {{ dt.vendorCode || "" }}<br />
          Категория: {{ dt.category || "" }}<br />
          цена за шт: {{ dt.priceUnit || "" }}<br />
          Сумма: {{ toNumFormat(dt.totalSum) || "" }}<br />
        </el-button>
      </div>
    </div>

    <div v-if="getVisibleData.repairs" >
    <h3>Ремонты</h3>
      <div v-for="dt in data.maintenance.repairs" :key="dt.workId">
        <el-button type="info" class="w100 margin-top-20">
          Название: {{ dt.name || "" }}<br />
          Цена: {{ dt.price || "" }}<br />
        </el-button>
      </div>
    </div>

  </div>

</template>

<script>
import {
  TechInspectionCategoriesEnum,
  TechInspectionCategoriesEnumTranslate
} from '@/enums/techInspection/TechInspectionCategories'

import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'carDetailsDialog',
  props: {
    maintenanceId: {
      type: String,
      default: null
    }
  },
  async mounted () {
    if (!this.warehouse?.length) {
      this.fetchWarehouse()
    }
  },
  data () {
    return {
      isLoading: false,
      data: null,
      featchResult: null,
      TechInspectionCategoriesEnum,
      TechInspectionCategoriesEnumTranslate
    }
  },

  watch: {
    // whenever question changes, this function will run -yes yes yes yes
    maintenanceId: {
      async  handler (newID) {
        if (newID) {
          this.data = await this.loadingData()
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState('parts', {
      warehouse: 'warehouse'
    }),
    ...mapGetters('parts', {
      getWarehouseItemById: 'getWarehouseItemById'
    }),
    getVisibleData () {
      console.log(this.data)
      return {
        cummon: this?.data?.typeName,
        maintenanceElements:
          this?.data?.maintenance?.maintenanceElements?.length > 0,
        maintenanceAgentElements:
          this?.data?.maintenance?.maintenanceAgentElements.length > 0,
        repairs: this?.data?.maintenance?.repairs.length > 0
      }
    }
  },
  methods: {
    ...mapActions('techInspection', {
      fetchMaintenanceWorkById: 'fetchMaintenanceWorkById'
    }),
    ...mapActions('parts', {
      fetchWarehouse: 'fetchWarehouse',
      fetchWarehouseItemsIds: 'fetchWarehouseItemsIds'
    }),
    async loadingData () {
      let state
      this.isLoading = true
      state = await this.fetchMaintenanceWorkById(this.maintenanceId)
      const getIds = state?.maintenance?.maintenanceElements?.map((x) => x?.maintenanceElementId)
      const getFeatchedItems = await this.fetchWarehouseItemsIds({
        item_ids: getIds,
        isZero: true
      })
      const getMappedMaintanceElems = state?.maintenance?.maintenanceElements?.map((x) => {
        return {
          ...x,
          data: getFeatchedItems.find((y) => y?.id === x?.maintenanceElementId)
        }
      })
      state = {
        ...state,
        maintenance: {
          ...state?.maintenance,
          maintenanceElements: getMappedMaintanceElems
        }
      }
      this.isLoading = false
      return state
    }
  }
}
</script>

<style lang="scss">
.car-details-dialog {
  font-size: 16px;

  &__buttons {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
}
</style>

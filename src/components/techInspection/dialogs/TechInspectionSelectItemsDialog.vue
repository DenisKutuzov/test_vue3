<template>
  <div>
    <el-select placeholder="Запчасть" class="w100 margin-top-20" filterable  clearable  v-model="filter.sparePartId">
      <el-option
        v-for="(item, idx) in warehouseItems"
        :key="item.sparePartId + idx + '__option'"
        :label="`${item.sparePartName}|${item.invoiceNumber}|${item.sparePartVendorCode}`"
        :value="item.sparePartId"
      >
      </el-option>
    </el-select>
    <el-select placeholder="Склад" class="w100 margin-top-20" v-model="warehouseIdModel">
      <el-option
        v-for="item in warehouse"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <table class="table table_last-auto-width">
      <thead>
        <tr>
          <td>Запчасть</td>
          <td>№ накладной</td>
          <td>Артикул</td>
          <td>Цена за единицу</td>
          <td>Количество</td>
          <td>Ед. измерения</td>
          <td>Сумма</td>
          <td>Действия</td>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(part, index) in getWarehouseItems"
          :key="part.sparePartId + part.sparePartVendorCode + index"
          class="parts__table-el"
        >
          <td>{{ part.sparePartName }}</td>
          <td>{{ part.invoiceNumber }}</td>
          <td>{{ part.sparePartVendorCode }}</td>
          <td>{{ part.priceUnit.toFixed(2) || 0 }} ₽</td>
          <td>{{ part.quantity }}</td>
          <td>{{ part.unitMeasureName }}</td>
          <td>{{ part.totalSum.toFixed(2) || 0 }} ₽</td>
          <td>
            <el-button
              type="primary"
              circle
              size="small"
              @click="handleAddItemToSelected(index)"
              icon="el-icon-plus"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="warehouseItems.length < 1" class="no-data no-data_no-border-top">
      Нет данных
    </div>
    <h2>Выбранные</h2>
    <ScrollingTable class="table table_last-auto-width table_low">
      <template #thead>
        <tr>
          <td>Запчасть</td>
          <td>№ накладной</td>
          <td>Артикул</td>
          <td>Цена за единицу</td>
          <td>Количество</td>
          <td>Склад</td>
          <td>Сумма</td>
        </tr>
      </template>

      <template #tbody>
        <tr
          v-for="(part, index) in getSelectedItems"
          :key="part.sparePartId + part.sparePartVendorCode + index"
          class="parts__table-el"
        >
          <td>{{ part.sparePartName }}</td>
          <td>{{ part.invoiceNumber }}</td>
          <td>{{ part.sparePartVendorCode }}</td>
          <td>{{ part.priceUnit.toFixed(2) || 0 }} ₽</td>
          <td>{{ part.quantity }} {{ part.unitMeasureName }}</td>
          <td>{{ getWarehouseItemById( part.warehouseId ).name}}</td>
          <td>{{ part.totalSum.toFixed(2) || 0 }} ₽</td>
        </tr>
      </template>
    </ScrollingTable>

    <div v-if="selectedItems.length < 1" class="no-data no-data_no-border-top">
      Нет данных
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions, mapGetters } from 'vuex'
// const ScrollingTable = () => import('@/components/ScrollingTable')
// export default {
//   name: 'TechInspectionSelectItemsDialog',
//   components: { ScrollingTable },
//   props: {
//     ids: {
//       type: Array
//     }
//   },
//   data () {
//     return {
//       selectedItemsIds: [],
//       selectedItems: [],
//       filter: {
//         sparePartId: null
//       }
//     }
//   },
//   watch: {
//     ids: {
//       async handler (newVal) {
//         console.log(123, newVal)
//         this.selectedItemsIds = newVal
//         if (Array.isArray(newVal) && newVal.length === 0) {
//           this.selectedItems = []
//           return true
//         }
//         await this.$nextTick()
//         this.handleAddItemToSelected(false)
//       },
//       deep: true,
//       immediate: true
//     }
//   },
//   mounted () {
//     this.fetchWarehouseItems()
//   },
//   computed: {
//     ...mapState('parts', {
//       warehouse: 'warehouse',
//       warehouseItems: 'warehouseItems',
//       warehouseId: 'warehouseId'
//     }),
//     ...mapGetters('parts', {
//       parts: 'filtredWarehouseItems',
//       getWarehouseItemById: 'getWarehouseItemById'
//     }),
//     getWarehouseItems () {
//       const items = this.warehouseItems.filter(x => !this.getDublicate(x.id, x.warehouseId))
//       if (this.filter.sparePartId) {
//         return items.filter(y => y.sparePartId === this.filter.sparePartId)
//       }
//       return items
//     },
//     getSelectedItems () {
//       const items = this.selectedItems
//       if (this.filter.sparePartId) {
//         return items.filter(y => y.sparePartId === this.filter.sparePartId)
//       }
//       return items
//     },
//     warehouseIdModel: {
//       get () {
//         return this.warehouseId
//       },
//       set (newValue) {
//         this.setWarehouseId(newValue)
//         this.fetchWarehouseItems()
//       }
//     }
//   },
//   destroyed () {
//     console.log(123)
//   },
//   methods: {
//     ...mapActions('parts', {
//       setWarehouseId: 'setWarehouseId',
//       fetchWarehouseItems: 'fetchWarehouseItems',
//       fetchWarehouseItemsIds: 'fetchWarehouseItemsIds'
//     }),
//     getDublicate (maintenanceElementId, warehouseId) {
//       return this.selectedItemsIds.some(x => x.maintenanceElementId === maintenanceElementId)
//     },
//
//     async handleAddItemToSelected (index) {
//       if (index !== false) {
//         const { id: maintenanceElementId, warehouseId } = this.getWarehouseItems[index]
//         await this.$nextTick()
//         if (this.getDublicate(maintenanceElementId, warehouseId)) return false
//         this.selectedItemsIds.push({
//           maintenanceElementId,
//           warehouseId
//         })
//       }
//       await this.$nextTick()
//       const getItemsIds = this.selectedItemsIds.map((x) => x.maintenanceElementId)
//       this.selectedItems = await this.fetchWarehouseItemsIds({
//         item_ids: getItemsIds,
//         isZero: true
//       })
//       await this.$nextTick()
//       if (index !== false) {
//         this.$emit('eventIds', getItemsIds)
//       }
//     }
//   }
// }
</script>

<style lang="scss"></style>

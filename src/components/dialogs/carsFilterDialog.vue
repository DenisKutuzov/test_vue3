<template>
  <div class="tech-inspection-filters" v-loading-custom="isLoading">
    <div class="tech-inspection-filters__content">
      <div class="tech-inspection-filters__filters">
        <el-select
         class="el-input_margin-right-10"
          @change="search"
          filterable
          v-model="searchForm.brand"
          placeholder="Бренд" >

          <el-option
            v-for="item in carsModels.brands"
            :key="item"
            :label="item"
            :value="item" />
        </el-select>
        <el-select
        class="el-input_margin-right-10"
          @change="search"
          filterable
          v-model="searchForm.model"
          placeholder="Модель" >

          <el-option
            v-for="item in carsModels.models"
            :key="item"
            :label="item"
            :value="item" />
        </el-select>
        <el-select
        class="el-input_margin-right-10"
          @change="search"
          v-model="searchForm.number"
          filterable
          placeholder="Номер" >

          <el-option
            v-for="item in carsModels.numbers"
            :key="item"
            :label="item"
            :value="item" />
        </el-select>
        <el-select
        class="el-input_margin-right-10"
          @change="search"
          v-model="searchForm.callsign"
          filterable
          placeholder="Позывной" >

          <el-option
            v-for="item in carsModels.callsigns"
            :key="item"
            :label="item"
            :value="item" />
        </el-select>
        <el-select
          @change="search"
          v-model="searchForm.year"
          filterable
          placeholder="Год" >

          <el-option
            v-for="item in carsModels.years"
            :key="item"
            :label="item"
            :value="item" />
        </el-select>
        <el-popover
          class="el-popover_margin-10"
          placement="top-start"
          trigger="hover"
          content="Очистить фильтры" >

          <el-button
            @click="clearFilters"
            circle
            type="default"
            icon="el-icon-delete" />
        </el-popover>
      </div>
    </div>
    <h2>Выбранные</h2>
    <div class="part-order-creating__table max-height_table" v-if="multiple">
      <table class="table table_last-auto-width">
        <thead>
          <tr>
            <td>Бренд</td>
            <td>Модель</td>
            <td>Номер</td>
            <td>Цвет</td>
            <td>Собственник</td>
            <td>Пробег</td>
            <td></td>
          </tr>
        </thead>
        <tbody v-if="selectedCars.length > 0">
          <tr
            v-for="(item,index) in selectedCars"
            :key="index" >
            <td>
              {{ item.brand || '-' }}
            </td>

            <td>
              {{ item.model || '-' }}
            </td>

            <td>
                {{item.number  || '-'}}
            </td>
            <td>
                {{item.color  || '-'}}
            </td>
            <td>
                {{item.investor  || '-'}}
            </td>
            <td>
                {{item.mileage  || '-'}}
            </td>
            <td>
              <el-button
                type="danger"
                circle
                size="small"
                @click="handleRemoveSelectedCarByIndex(index)"
                icon="el-icon-minus" />
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="selectedCars.length < 1"
        class="no-data no-data_no-border-top" >

       Выбранные отсутствуют
      </div>
    </div>
    <div class="part-order-creating__table max-height_table">
      <table class="table table_last-auto-width">
        <thead>
          <tr>
            <td>Бренд</td>
            <td>Модель</td>
            <td>Номер</td>
            <td>Цвет</td>
            <td>Собственик</td>
            <td>Пробег</td>
            <td></td>
          </tr>
        </thead>
        <tbody v-if="sortedDataByFilter.length > 0">
          <tr
            v-for="(item) in sortedDataByFilter"
            :key="item.id" >
            <td>
              {{ item.brand  || '-' }}
            </td>

            <td>
              {{ item.model || '-' }}
            </td>

            <td>
                {{item.number  || '-'}}
            </td>
            <td>
                {{item.color  || '-'}}
            </td>
            <td>
                {{item.investor  || '-'}}
            </td>
            <td>
                {{item.mileage  || '-'}}
            </td>
            <td>
              <el-button
               type="primary"
                circle
                :disabled="carIsAddedToSelected(item)"
                size="small"
                @click="handleSelectedCar(item)"
                icon="el-icon-plus" />
            </td>
          </tr>
        </tbody>
      </table>

      <div>

<!--        v-if="sortedDataByFilter.length < 1"-->
        class="no-data no-data_no-border-top" >

       Результаты отсутствуют
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps} from "vue";

interface  IProps {
    id: number | null
    multiple? : boolean
    multiple_ids : []
}

defineProps<IProps>()
// import { mapGetters, mapActions, mapState } from 'vuex'
// export default {
//   name: 'TechInspectionFilters',
//   props: {
//     id: {
//       type: Number,
//       default: null
//     },
//     multiple: {
//       type: Boolean,
//       default: false
//     },
//     multiple_ids: {
//       type: Array,
//       default: () => []
//     }
//   },
//   data () {
//     return {
//       selectedCars: [],
//       searchForm: {
//         brand: '',
//         model: '',
//         number: '',
//         year: '',
//         callsign: ''
//       }
//     }
//   },
//   async mounted () {
//     await this.fetchCarPark()
//     await this.getCarModels()
//     if (this.id) {
//       const { brand, model, number, year, callsign } = this.get_car_by_id(this.id)
//       this.searchForm = {
//         brand, model, number, year, callsign
//       }
//       this.setFilters(this.searchForm)
//     }
//     if (this.multiple_ids.length > 0) {
//       this.multiple_ids.forEach(car_id => {
//         // const someCar = this.get_car_by_id(car_id)
//         // if (!someCar) return
//         this.selectedCars.push(car_id)
//       })
//     }
//   },
//   unmounted () {
//     this.clearFilters()
//   },
//   computed: {
//     ...mapState('carPark', {
//       cars: 'carParkData',
//       filters: 'filters',
//       isLoading: 'isLoading',
//       carsModels: 'carsModels'
//     }),
//     ...mapGetters('carPark', {
//       sortedDataByFilter: 'sortedDataByFilter',
//       get_car_by_id: 'GET_CAR_BY_ID'
//     })
//   },
//   methods: {
//     ...mapActions('carPark', {
//       setFilters: 'setFilters',
//       fetchCarPark: 'fetchCarParkCommon',
//       getCarModels: 'getCarModels',
//       fetchCarParkCommon: 'fetchCarParkCommon'
//     }),
//     carIsAddedToSelected (item) {
//       const getId = item?.carId ?? item?.id
//       return this.selectedCars.some(value => (value?.carId ?? value?.id) === getId)
//     },
//     search () {
//       this.setFilters({ ...this.searchForm, status: null, isValidate: null })
//       this.fetchCarParkCommon()
//     },
//     handleSelectedCar (selectedItem) {
//       console.log(selectedItem)
//       if (this.multiple) {
//         this.selectedCars.push(selectedItem)
//         // const only_ids_on_selected_cars = this.selectedCars.map(value => value.carId)
//         this.$emit('multiply', this.selectedCars)
//       } else {
//         this.$emit('close', selectedItem?.carId ?? selectedItem?.id)
//       }
//     },
//     handleRemoveSelectedCarByIndex (indexselectedCarsIds) {
//       this.selectedCars.splice(indexselectedCarsIds, 1)
//     },
//     clearFilters () {
//       this.searchForm = {
//         brand: '',
//         model: '',
//         number: '',
//         year: '',
//         callsign: ''
//       }
//       this.search()
//     }
//
//   }
// }
</script>

<style lang="scss">
.tech-inspection-filters {
  &__content {
    display: flex;
    justify-content: space-between;
  }
}
</style>

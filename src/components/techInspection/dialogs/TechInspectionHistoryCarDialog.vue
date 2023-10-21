<template>
  <div
    v-loading-custom="isLoading"
    class="card-table card-table_primitive car-details-dialog">
    <table class="table-mini">
      <tbody>
        <tr class="table-mini__row-head">
          <td>Детали по машине</td>
          <td></td>
        </tr>

        <tr>
          <td>Собственник:</td>
          <td>{{ carInfo.investor || '...' }}</td>
        </tr>

        <tr>
          <td>Марка:</td>
          <td>{{ carInfo.brand || '...' }}</td>
        </tr>

        <tr>
          <td>Год:</td>
          <td>{{ carInfo.year || '...' }}</td>
        </tr>

        <tr>
          <td>Модель:</td>
          <td>{{ carInfo.model || '...' }}</td>
        </tr>

        <tr>
          <td>Гос.Номер:</td>
          <td>{{ carInfo.number || '...' }}</td>
        </tr>

        <tr>
          <td>VIN:</td>
          <td>{{ carInfo.vin || '...' }}</td>
        </tr>

        <tr>
          <td>СТС:</td>
          <td>{{ carInfo.registration_cert || '...' }}</td>
        </tr>
      </tbody>
    </table>

    <div class="car-features">
      <h2 class="car-features__title">Удобства</h2>

      <ul class="car-features__list">
        <li class="car-features__item" v-for="val in this.carInfo.amenities" :key="val">
          <el-button class="no-event" type="no" size="mini">
            {{ val || '...' }}
          </el-button>
        </li>
      </ul>
    </div>
    <TechInspectionHistoryCarOnly :carId="carId" />
  </div>
</template>

<script>
import carsConditions from '@/mixin/carsConditions'
import { mapActions } from 'vuex'
const TechInspectionHistoryCarOnly = () => import('@/components/techInspection/TechInspectionHistoryCarOnly')

export default {
  name: 'carDetailsDialog',
  components: { TechInspectionHistoryCarOnly },
  mixins: [
    carsConditions
  ],

  props: {
    carId: {
      type: [Number, String],
      default: null
    }

    // carHistory: {
    //   id: Number,
    //   brand: String,
    //   model: String,
    //   year: Number,
    //   number: String,
    //   vin: String,
    //   registration_cert: String,
    //   amenities: Array,
    //   status: String
    // }
  },
  async mounted () {
    await this.loadingHistoryAddCarInfo()
  },
  data () {
    return {
      isLoading: false,
      carInfo: {},
      carConditionsDialogVisible: false,
      techInspectionCreatingDialogVisible: false
    }
  },

  watch: {
    // whenever question changes, this function will run
    carId (newCarId, oldCarId) {
      if (newCarId) {
        this.loadingHistoryAddCarInfo()
      }
    }
  },
  methods: {
    ...mapActions('carPark', {
      getCarById: 'getCarById'
    }),
    openCarConditions () {
      this.carConditionsDialogVisible = true
      // this.$_fetchCarsConditions(this.carId)
    },

    openTechInspectionCreatingDialog () {
      this.techInspectionCreatingDialogVisible = true
    },

    closeTechInspectionCreatingDialog () {
      this.techInspectionCreatingDialogVisible = false
    },
    async loadingHistoryAddCarInfo () {
      this.isLoading = true
      this.carInfo = await this.getCarById(this.carId)
      this.isLoading = false
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

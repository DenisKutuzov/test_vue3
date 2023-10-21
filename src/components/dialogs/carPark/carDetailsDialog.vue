<template>
    <div
        class="card-table card-table_primitive car-details-dialog">
            <el-dialog
              title="История состояний автомобиля"
              v-model="carConditionsDialogVisible"
              width="940px"
              append-to-body>

              <CarConditionsDialog :cur-car-id="carId"/>
            </el-dialog>

            <el-dialog
              title="Отправить автомобиль на Т.О"
              v-model="techInspectionCreatingDialogVisible"
              append-to-body >

              <TechInspectionCreatingDialog
                :key="carId"
                :car-id="carId"/>
            </el-dialog>
            <el-dialog
              title="Добавить перемещение авто на другой парк"
              v-model="modulOpen"
              append-to-body >
              <ScheduleTransferRegionParkDialog  :currentRegionParkId="carInfo.regionParkId" :carId="carId"/>
            </el-dialog>
        <table class="table-mini">
            <tbody>
            <tr class="table-mini__row-head">
                <td>Детали по машине</td>
                <td></td>
            </tr>

            <tr>
                <td>Собственник:</td>
                <td>{{ carInfo.investorFullName || '...' }}</td>
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
                <td>{{ carInfo.registrationCert || '...' }}</td>
            </tr>
            </tbody>
        </table>

        <!--    <div class="car-features">-->
        <!--      <h2 class="car-features__title">Удобства</h2>-->

        <!--      <ul class="car-features__list">-->
        <!--        <li class="car-features__item" v-for="val in this.carInfo.amenities" :key="val">-->
        <!--          <el-button class="no-event" type="no" size="mini">-->
        <!--            {{ val || '...' }}-->
        <!--          </el-button>-->
        <!--        </li>-->
        <!--      </ul>-->
        <!--    </div>-->
        <!--    <div class="car-features" v-if="carInfo.regionParkId">-->
        <!--      <h2 class="car-features__title">Парк</h2>-->

        <!--      <ul class="car-features__list">-->
        <!--        <li class="car-features__item">-->
        <!--          <el-button class="no-event" type="no" size="mini">-->
        <!--            {{getRegionalCarParkByID(carInfo.regionParkId).name || '...' }}-->
        <!--          </el-button>-->
        <!--        </li>-->
        <!--      </ul>-->
        <!--    </div>-->
        <!--    <TechInspectionHistoryCarOnly :carId="carId" />-->
        <div class="car-details-dialog__buttons">
            <el-button
                type="danger" @click="openAnotherPark">
                Переместить в другой парк

            </el-button>
            <el-button
                    type="primary"
                    @click="openCarConditions">
                История состояний автомобиля
            </el-button>

            <el-button
                    type="warning"
                    @click="openTechInspectionCreatingDialog"
            >


                Отправить на Т.О.
            </el-button>
        </div>

    </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from 'vue';
import {ICarData} from "@/types";
import ScheduleTransferRegionParkDialog from '@/components/schedule/transferRegionParkDialog'
// import TechInspectionHistoryCarOnly from '@/components/techInspection/TechInspectionHistoryCarOnly'
import TechInspectionCreatingDialog from '@/components/techInspection/dialogs/TechInspectionCreatingDialog'
import CarConditionsDialog from '@/components/dialogs/carPark/carConditionsDialog'
interface IProps {
    carId: string
    carDetailsDialogVisible: boolean
    carInfo: ICarData
}

defineProps<IProps>()


const modulOpen = ref<boolean>(false)
const techInspectionCreatingDialogVisible = ref<boolean>(false)
const carConditionsDialogVisible = ref<boolean>(false)


const openCarConditions = () => {
    carConditionsDialogVisible.value = true
}
const openAnotherPark = () => {
    modulOpen.value = true
}

const openTechInspectionCreatingDialog =  () => {
    techInspectionCreatingDialogVisible.value = true
}
// import carsConditions from '@/mixin/carsConditions'
// import CarConditionsDialog from '@/components/dialogs/carPark/carConditionsDialog'
// import { mapActions, mapGetters, mapState } from 'vuex'
// const TechInspectionCreatingDialog = () => import('@/components/techInspection/dialogs/TechInspectionCreatingDialog')
// const TechInspectionHistoryCarOnly = () => import('@/components/techInspection/TechInspectionHistoryCarOnly')
// const ScheduleTransferRegionParkDialog = () => import('@/components/schedule/transferRegionParkDialog')
//
// export default {
//   name: 'carDetailsDialog',
//
//   components: {
//     CarConditionsDialog,
//     TechInspectionCreatingDialog,
//     TechInspectionHistoryCarOnly,
//     ScheduleTransferRegionParkDialog
//   },
//
//   mixins: [
//     carsConditions
//   ],
//
//   props: {
//     hideMaintenanceWorkButton: {
//       type: Boolean,
//       defalut: false
//     },
//
//     carId: {
//       type: [Number, String],
//       default: null
//     }
//
//     // carInfo: {
//     //   id: Number,
//     //   brand: String,
//     //   model: String,
//     //   year: Number,
//     //   number: String,
//     //   vin: String,
//     //   registration_cert: String,
//     //   amenities: Array,
//     //   status: String
//     // }
//   },
//
//   data () {
//     return {
//       isLoading: false,
//       carInfo: {},
//       carConditionsDialogVisible: false,
//       techInspectionCreatingDialogVisible: false,
//       ScheduleTransferRegionParkDialogVisible: false
//     }
//   },
//
//   async mounted () {
//     this.isLoading = true
//     this.carInfo = await this.getCarById(this.carId)
//     this.isLoading = false
//     if (this.regionPark.length === 0) {
//       this.fetchRegionPark()
//     }
//   },
//   computed: {
//     ...mapGetters('regionPark', {
//       getRegionalCarParkByID: 'getRegionalCarParkByID'
//     }),
//     ...mapState('regionPark', {
//       regionPark: 'regionPark'
//     })
//   },
//
//   methods: {
//     ...mapActions('carPark', {
//       getCarById: 'getCarById'
//     }),
//     ...mapActions('regionPark', {
//       fetchRegionPark: 'fetchRegionPark'
//     }),
//     openCarConditions () {
//       this.carConditionsDialogVisible = true
//       // this.$_fetchCarsConditions(this.carId)
//     },
//
//     openTechInspectionCreatingDialog () {
//       this.techInspectionCreatingDialogVisible = true
//     },
//
//     closeTechInspectionCreatingDialog () {
//       this.techInspectionCreatingDialogVisible = false
//       if (this.$route.name === 'schedule') this.$emit('close')
//     }
//   }
// }
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

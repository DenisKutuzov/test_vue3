<template>
    <div>
        <el-select style="width: 100%" v-model="regionParkId">
          <el-option :label="itm.name" :value="itm.regionParkId" v-for="(itm, idx) in regionPark" :key="idx" :disabled="itm.regionParkId === currentRegionParkId"/>
        </el-select>
        <el-button @click="handleSumbit" type="primary" class="w100 margin-top-20">Переместить</el-button>
    </div>
</template>

<script setup lang="ts">

import {defineProps, ref} from 'vue';
import {ICarData} from "@/types";


interface IProps {
    carId: string
    currentRegionParkId: string

}

defineProps<IProps>()

const regionParkId = ref(null)
const handleSumbit = () => {
//
}
// import { mapActions, mapState } from 'vuex'
// export default {
//   props: {
//     currentRegionParkId: {
//       type: String
//     },
//     carId: {
//       type: String
//     }
//   },
//   data () {
//     return {
//       regionParkId: null
//     }
//   },
//   computed: {
//     ...mapState('regionPark', ['regionPark'])
//   },
//   methods: {
//     ...mapActions('schedule', {
//       useTransferRegionPark: 'useTransferRegionPark',
//       fetchSchedule: 'fetchSchedule'
//     }),
//     async  handleSumbit () {
//       if (!this.regionParkId) return false
//       await this.useTransferRegionPark({
//         regionParkId: this.regionParkId,
//         carId: this.carId
//       })
//       await this.fetchSchedule({})
//       this.$emit('close')
//     }
//   }
// }
</script>

<style lang="scss" scoped>

</style>

<template>
    <el-row>
        <el-col>
            <el-checkbox v-model="is_allow_report">Учитывать в отчете</el-checkbox>
        </el-col>
        <el-col>
            <el-checkbox v-model="is_show_schedule">Показывать в расписании</el-checkbox>
        </el-col>
        <el-col>
            <el-checkbox v-model="is_allow_fines">Учитывать в штрафах</el-checkbox>
        </el-col>
        <el-col>
            <el-button class="margin-top-20 w100" type="primary" @click="handleClickBtn">Применить изменения</el-button>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
interface IProps {
    carID: string,
    allow_report: boolean
    show_schedule: boolean
    allow_fines: boolean
}
defineProps<IProps>()
import {ElMessageBox, ElMessage} from 'element-plus';
import {defineProps} from "vue/dist/vue";
import {ref} from 'vue'

import {useCarsParkStore} from '@/stores/modules/carsPark'

const carsParkStore = useCarsParkStore()



const is_show_schedule = ref<boolean>(false)
const is_allow_report = ref<boolean>(false)
const is_allow_fines = ref<boolean>(false)

const handleClickBtn = () => {
    carsParkStore.putTaxiCar({ data: { isShowSchedule: is_show_schedule, isAllowReport: is_allow_report, isAllowFines: is_allow_fines, } })
    ElMessage({
        type: 'success',
        message: `Успешно сохранено`,
    })
}


</script>

<style>

</style>

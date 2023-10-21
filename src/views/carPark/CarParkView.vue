<template>
    <div class="carpark">
        <el-dialog title="Подробнее" v-model="carDetailsDialogVisible" width="900px" :before-close="handleClose">
            <CarDetailsDialog :key="curCarId" :car-id="curCarId" :carDetailsDialogVisible="carDetailsDialogVisible"
                              :carInfo="carsParkStore.carParkData[Number(curCarId)]"/>
        </el-dialog>
        <el-dialog title="Редактирование" v-model="carEditVisible" destroy-on-close
                   width="400px">
            <carEditDialog :carID="curCarId" :allow_report="curAllowReport" :show_schedule="curShowSchedule"
                           :allow_fines="curAllowFines"/>
        </el-dialog>
        <el-row>
            <el-col :span="24">
                <FixedScrollComponent full_blur :top="0" padding="15px" :left="0" :activateY="105">
                    <el-row type="flex" style="align-items: center; gap: 30px">
                        <app-update-list-button @click="carsParkStore.getParkData()"
                                                :title="'Получить автомобили'"/>
                        <el-switch v-model="switchFilter" active-text="Машины в ремонте" inactive-text="Все машины"
                                   active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                        <el-switch v-model="validFilter" active-text="Валидные автомобили"
                                   inactive-text="Не валидыне автомобили"
                                   active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                        <el-input v-model="searchText" size="small" placeholder="Поиск"
                                  style="max-width: 300px;"></el-input>

                    </el-row>
                    <ScheduleTabs class="margin-top-20"/>
                    <HeaderPagination class="margin-top-20" :total="carsParkStore.carParkData.length"
                                      @change="e => handlePage(e)"/>
                </FixedScrollComponent>
                <el-row class="el-row_margin-30">
                    <el-col :span="24">
                        <el-table :data="handlePageChange" v-loading-custom="isLoading"
                                  style="width: 100%; min-height: 600px"
                        >
                            <el-table-column label="Статус" prop="status" min-width="120">
                                <template v-slot="scope">
                                    <el-button class="no-event" v-if="scope.row.status === 'working'" type="success"
                                               round size="small">
                                        Работает
                                    </el-button>
                                    <el-button class="no-event" v-else-if="scope.row.status === 'highjacked'"
                                               type="danger" round size="small">
                                        Украден
                                    </el-button>
                                    <el-button class="no-event" v-else-if="scope.row.status === 'in_garage'"
                                               type="primary" round size="small">
                                        В гараже
                                    </el-button>
                                    <el-button class="no-event" v-else-if="scope.row.status === 'repairing'"
                                               type="warning" round size="small">
                                        На ремонте
                                    </el-button>
                                    <el-button class="no-event" v-else-if="scope.row.status === 'tech_inspection'" round
                                               size="small">
                                        На ТО
                                    </el-button>
                                    <el-button class="no-event" v-else-if="scope.row.status === 'not_working'"
                                               type="info" round size="small">
                                        Не работает
                                    </el-button>
                                    <el-button class="no-event" v-else-if="scope.row.status === 'unknown'" type="info"
                                               round size="small">
                                        Неизвестный
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="Позывной" prop="callsign" min-width="100"></el-table-column>
                            <el-table-column label="Бренд" prop="brand" min-width="100"></el-table-column>
                            <el-table-column label="Модель" prop="model" min-width="100"></el-table-column>
                            <el-table-column label="Гос.номер" prop="number" min-width="130"></el-table-column>
                            <el-table-column label="Пробег" prop="mileage" min-width="150">
                                <template v-slot="{ row }">
                                    {{ (row.mileage) || 0 }} км
                                </template>
                            </el-table-column>
                            <el-table-column label="Валидация" prop="validate" min-width="150">
                                <template v-slot="{ row }">
                                    {{ row.validate ? "Да" : row.validateReason }}
                                </template>
                            </el-table-column>
                            <el-table-column label="Действия" min-width="250">
                                <template v-slot="{ row }">
                                    <el-button-group>
                                        <el-button round size="small" type="info" @click="openCarDetails(row.carId)">
                                            Подробнее
                                        </el-button>
                                        <el-button round size="small" type="warning">
                                            История состояний
                                        </el-button>
                                        <el-button round

                                                   size="small" type="primary" @click="
                  openCarEdit(
                    row.carId,
                    row.isShowSchedule,
                    row.isAllowReport,
                    row.isAllowFines
                  )"> Изменить
                                        </el-button>

                                        <el-button round size="small" type="danger"
                                                   @click="handleAccept(row)">Вернуть на линию
                                        </el-button>
                                    </el-button-group>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import type {Action} from 'element-plus'
import AppUpdateListButton from '@/components/AppUpdateListButton'
import CarDetailsDialog from '@/components/dialogs/carPark/carDetailsDialog'
import HeaderPagination from "@/components/HeaderPagination.vue";
import FixedScrollComponent from "@/components/fixedScrollComponent.vue";
import ScheduleTabs from '@/components/schedule/ScheduleTabs.vue'
import {ElMessageBox, ElMessage} from 'element-plus';
import CarEditDialog from "@/components/dialogs/carPark/carEditDialog.vue";
import {ICarData} from "@/types";
import {ref, computed} from "vue";



const carEditVisible = ref<boolean>(false)
const curCarId = ref<string>('')
const carDetailsDialogVisible = ref<boolean>(false)
const switchFilter = ref<boolean>(false)
const validFilter = ref<boolean>(false)
const curAllowReport = ref<boolean>(false)
const curShowSchedule = ref<boolean>(false)
const curAllowFines = ref<boolean>(false)
const isLoading = ref(true)
const countOnPage = ref<number>(40)
const searchText = ref('');

import {useCarsParkStore} from '@/stores/modules/carsPark'


const carsParkStore = useCarsParkStore()


const filteredCarParkData = computed(() => {
    return carsParkStore.carParkData.filter(item => item.number.toLowerCase().includes(searchText.value.toLowerCase()));
});

const handlePageChange = computed(() => {
    return filteredCarParkData.value.slice(0, countOnPage.value);
});

const openCarDetails = (id: string) => {
    curCarId.value = id
    carDetailsDialogVisible.value = true
}

const handlePage = (e : { limit: number, offset: number }) => {
    countOnPage.value = e.limit
 }




const handleAccept = (record: ICarData) => {
    ElMessageBox.confirm(
        `Автомобиль необходимо вернуть на линию? (${record.callsign})`,
        'Внимание',
        {
            type: 'warning',
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет'
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: `Автомобиль возвращен на линию (${record.callsign})`,
            })
        })
        .catch((action: Action) => {
            ElMessage({
                type: 'error',
                message: 'Возврат автомобиля на линию отмененно',
            })
        })
}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}


const openCarEdit = (id: string, is_show_schedule: boolean, is_allow_report: boolean, is_allow_fines: boolean) => {
    curCarId.value = id
    // this.curShowSchedule = is_show_schedule
    // this.curAllowFines = is_allow_fines
    // this.curAllowReport = is_allow_report
    carEditVisible.value = true
}


</script>
<style scoped>
.validation-failed {
    background-color: red;
}

.dialog-footer button:first-child {
    margin-right: 30px;
}


</style>

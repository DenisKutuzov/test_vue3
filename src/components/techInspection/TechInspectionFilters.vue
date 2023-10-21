<template>
  <div class="tech-inspection-filters">
    <el-dialog
      :before-close="$handleCloseDialog"
      title="Отправить автомобиль на Т.О"
      :visible.sync="techInspectionCreatingDialogVisible" >

      <TechInspectionCreatingDialog @submit="closeTechInspectionCreatingDialog" />
    </el-dialog>
    <div class="tech-inspection-filters__content">
      <div class="tech-inspection-filters__filters">
        <el-input
          @change="search"
          clearable
          class="el-input_width-200 el-input_margin-right-10"
          placeholder="Гос.Номер"
          v-model="searchForm.stateNumber" />

        <el-select
          class="el-input_width-200 el-input_margin-right-10"
          @change="search"
          clearable
          v-model="searchForm.serviceTypeId"
          placeholder="Тип обслуживания" >

          <el-option
            v-for="item in getMaintenanceTypesNames"
            :key="item.maintenanceTypeId"
            :label="item.alias"
            :value="item.maintenanceTypeId" />
        </el-select>
        <!-- <el-select
          @change="search"
          clearable
          v-model="searchForm.sortiong"
          placeholder="Сортировка" >

          <el-option
            label="Сначала новые"
            value="new" />
            <el-option
            label="Сначала старые"
            value="old" />
        </el-select> -->

        <el-popover
          class="el-popover_margin-10"
          placement="top-start"
          trigger="hover"
          content="Очистить фильтры" >

          <el-button
            @click="clearFilters"
            slot="reference"
            circle
            type="default"
            icon="el-icon-delete" />
        </el-popover>
      </div>
      <el-button
        type="success"
        v-access="$accesses.techInspection.send_to_techInspection_btn"
        @click="openTechInspectionCreatingDialog()"
        round >

        Отправить на Т.О
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
const TechInspectionCreatingDialog = () => import('@/components/techInspection/dialogs/TechInspectionCreatingDialog')
export default {
  name: 'TechInspectionFilters',

  components: {
    TechInspectionCreatingDialog
  },

  data () {
    return {
      techInspectionCreatingDialogVisible: false,
      searchForm: {
        stateNumber: '',
        serviceTypeId: '',
        sortiong: null
      }
    }
  },
  computed: {
    ...mapGetters('techInspection', [
      'getMaintenanceTypesNames'
    ]),
    ...mapState('techInspection', {
      filters: 'filters'
    })
  },
  methods: {
    ...mapActions('techInspection', {
      setFilters: 'setFilters'
    }),
    openChangeDialog (id) {
      this.curId = id
      this.toggleChangeMaintenance()
    },

    openAddDialog () {
      this.toggleAddMaintenance()
    },

    openAcceptDialog (id) {
      this.curId = id
      this.toggleAcceptMaintenance()
    },

    search () {
      setTimeout(() => { this.setFilters(this.searchForm) }, 350)
    },

    clearFilters () {
      this.searchForm.stateNumber = ''
      this.searchForm.serviceTypeId = ''
      this.searchForm.sortiong = null
      this.setFilters(this.searchForm)
    },

    openHistoryDialog (carId) {
      this.carId = carId
      this.historyTechInspectionDialogVisible = true
    },

    openTechInspectionCreatingDialog () {
      this.techInspectionCreatingDialogVisible = true
    },

    closeTechInspectionCreatingDialog () {
      this.techInspectionCreatingDialogVisible = false
    }
  }
}
</script>

<style lang="scss">
.tech-inspection-filters {
  &__content {
    display: flex;
    justify-content: space-between;
  }
}
</style>

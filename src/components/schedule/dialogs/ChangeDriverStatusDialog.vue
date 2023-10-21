<template>
  <el-dialog
    :title="'Изменить статус водителя'"
    :visible="visible"
    width="70%"
    center
    @close="handleClose">

    <AppModalScheduleDriverRikStatus
      :driver-obj="schedule"
      @editDriver="updateDriverRikStatus" />
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppModalScheduleDriverRikStatus from '@/components/AppDialogs/AppModalScheduleDriverRikStatus'

export default {
  name: 'ChangeDriverStatusDialog',

  components: {
    AppModalScheduleDriverRikStatus
  },

  computed: {
    ...mapState('schedule', {
      visible: 'driverStatusChangingDialog',
      schedule: 'currentSchedule'
    })
  },

  methods: {
    ...mapActions('schedule', {
      fetchSchedule: 'fetchSchedule',
      changeDialogVisible: 'changeDialogVisible'
    }),

    ...mapActions('tenantsInfo', ['editDriver', 'changeDriverRikStatus']),

    async updateDriverRikStatus (rikStatusDto) {
      try {
        await this.changeDriverRikStatus(rikStatusDto)

        this.handleClose()

        await this.fetchSchedule({})
      } catch (err) {
        return Promise.reject(err)
      }
    },

    handleClose () {
      this.changeDialogVisible({
        dialogName: 'driverStatusChangingDialog',
        value: false
      })
    }
  }
}
</script>

<template>
  <el-dialog
    :title="schedule.last_name"
    :visible="visible"
    width="800px"
    class="driver-info-wrapper"
    @close="handleClose">

    <DriverShiftInfoDialog
      :change="schedule.timesDay"
      :number="schedule.carNumber"
      :driverId="schedule.id"
      :driver="currentScheduleInfo"
      :ratings="ratings" />
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const DriverShiftInfoDialog = () => import('@/components/dialogs/shedule/driverShiftInfoDialog')

export default {
  name: 'ShowMoreAboutScheduleDialog',

  components: {
    DriverShiftInfoDialog
  },

  computed: {
    ...mapState('schedule', {
      schedule: 'currentSchedule',
      visible: 'showMoreAboutScheduleDialog',
      currentScheduleInfo: 'currentScheduleInfo',
      ratings: 'ratings'
    })
  },

  methods: {
    ...mapActions('schedule', {
      changeDialogVisible: 'changeDialogVisible'
    }),

    handleClose () {
      this.changeDialogVisible({
        dialogName: 'showMoreAboutScheduleDialog',
        value: false
      })
    }
  }
}
</script>

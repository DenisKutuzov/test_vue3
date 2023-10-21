<template>
  <el-dialog
    title="Выберите водителя"
    :visible="visible"
    width="940px"
    @close="handleClose">
    <ChooseDriverDialogComponent
      :mode="currentSchedule.mode"
      :change="currentSchedule.timesDay"
      :current-car="currentSchedule.carId"
      :current-day="currentSchedule.date"
      :schedule-id="currentSchedule.scheduleId"
      :park-type="currentSchedule.parkType "
      @close="handleClose" />
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChooseDriverDialogComponent from '@/components/dialogs/shedule/chooseDriverDialog'

export default {
  name: 'ChooseDriverDialog',

  components: {
    ChooseDriverDialogComponent
  },

  computed: {
    ...mapState('schedule', {
      visible: 'chooseDriverDialog',
      currentSchedule: 'currentSchedule'
    })
  },

  methods: {
    ...mapActions('schedule', {
      changeDialogVisible: 'changeDialogVisible'
    }),

    handleClose () {
      this.changeDialogVisible({
        dialogName: 'chooseDriverDialog',
        value: false
      })
    }
  }
}
</script>

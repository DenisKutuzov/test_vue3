<template>
  <el-dialog
  title="Подробнее"
  :visible="visible"
  width="1000px"
  @close="handleClose">
  <CarDetailsDialog
    :key="currentCar + 'CarDetailsDialog'"
    @close="handleClose"
    :car-id="currentCar" />
</el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const CarDetailsDialog = () => import('@/components/dialogs/carPark/carDetailsDialog')

export default {
  name: 'AboutCarDialog',

  components: {
    CarDetailsDialog
  },

  computed: {
    ...mapState('schedule', {
      visible: 'aboutCarDialog',
      currentCar: 'currentCar'
    })
  },

  methods: {
    ...mapActions('schedule', {
      changeDialogVisible: 'changeDialogVisible'
    }),

    handleClose () {
      this.changeDialogVisible({
        dialogName: 'aboutCarDialog',
        value: false
      })
    }
  }
}
</script>

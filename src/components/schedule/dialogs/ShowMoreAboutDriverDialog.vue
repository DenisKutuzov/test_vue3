<template>
  <el-dialog
    title="Подробнее"
    :visible="visible"
    width="700px"
    @close="handleClose">

    <TaximetrDialog :taximetr-info="currentDriverInfo"/>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TaximetrDialog from '@/components/dialogs/taximetrDialog.vue'

export default {
  name: 'ShowMoreAboutScheduleDialog',

  components: {
    TaximetrDialog
  },

  computed: {
    ...mapState('schedule', {
      currentDriverInfo: 'currentDriverInfo',
      visible: 'showMoreAboutDriverDialog'
    })
  },

  methods: {
    ...mapActions('schedule', {
      changeDialogVisible: 'changeDialogVisible'
    }),

    handleClose () {
      this.changeDialogVisible({
        dialogName: 'showMoreAboutDriverDialog',
        value: false
      })
    }
  }
}
</script>

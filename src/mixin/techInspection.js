import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('techInspection')

const computed = {
  ...mapState({
    $_techInspectionData: 'techInspectionData'
  })
}

export default {
  computed
}

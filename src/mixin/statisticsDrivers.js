import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('statisticsDrivers')

const computed = {
  ...mapState({
    $_statisticsDrivers: 'statisticsDrivers'
  })
}

export default {
  computed
}

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('statisticsCars')

const computed = {
  ...mapState({
    $_statisticsCars: 'statisticsCars'
  })
}

export default {
  computed
}

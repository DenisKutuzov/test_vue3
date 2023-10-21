import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('driversStatistic')

const computed = {
  ...mapState({
    $_driversStatisticData: 'data'
  })
}

const methods = {
  ...mapActions({
    $_fetchDriversStatistic: 'fetchDriversStatistic'
  })
}

export default {
  computed,
  methods
}

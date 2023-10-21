import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('parkStatistic')

const computed = {
  ...mapState({
    $_parkStatisticData: 'consolidatedCars'
  })
}

const methods = {
  ...mapActions({
    $_fetchParkStatistic: 'fetchConsolidatedCars'
  })
}

export default {
  computed,
  methods
}

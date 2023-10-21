import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('parts')

const computed = {
  ...mapState({
    $_ordersData: 'ordersData',
    $_providersData: 'providersData',
    $_stockData: 'stockData'
  })
}

export default {
  computed
}

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('tenantIncome')

const computed = {
  ...mapState({
    $_incomeData: 'incomeData'
  })
}

export default {
  computed
}

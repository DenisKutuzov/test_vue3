import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('tenantsIncome')

const computed = {
  ...mapState({
    $_tenantsIncomeData: 'tenantsIncomeData'
  })
}

export default {
  computed
}

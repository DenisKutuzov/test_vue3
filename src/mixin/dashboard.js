import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('dashboard')

const computed = {
  ...mapState({
    $_carsLoad: 'carsLoad',
    $_finPerformanceList: 'finPerformanceList',
    $_finPerformanceChart: 'finPerformanceChart',
    $_driversIncomes: 'driversIncomes',
    $_patrolFines: 'patrolFines',
    $_driversDebts: 'driversDebts'
  })
}

export default {
  computed
}

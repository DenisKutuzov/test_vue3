import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('carsLoad')

const computed = {
  ...mapState({
    $_carsLoadData: 'carsLoadData',
    $_carsLoadChartData: 'carsLoadChartData',
    $_driversIncomeData: 'driversIncomeData',
    $_finesData: 'finesData',
    $_generalFinanceData: 'generalFinanceData',
    $_generalFinanceChartData: 'generalFinanceChartData',
    $_driversDebtsData: 'driversDebtsData'
  })
}

const methods = {
  ...mapActions({
    $_fetchDashboard: 'fetchDashboard'
  })
}

export default {
  computed,
  methods
}

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('driversIncome')

const computed = {
  ...mapState({
    $_actualDriversIncome: 'actualDriversIncome',
    $_driversIncomeHistory: 'driversIncomeHistory',
    $_actualCurrentDriverIncome: 'actualCurrentDriverIncome',
    $_changeTransactionParams: 'changeTransactionParams',
    $_surcharges: 'surcharges'
  })
}

const methods = {
  ...mapActions({
    $_fetchActualDriversIncome: 'fetchActualDriversIncome',
    $_fetchDriversIncomeHistory: 'fetchDriversIncomeHistory',
    $_fetchCurrentDriverIncomes: 'fetchCurrentDriverIncomes',
    $_createTransaction: 'createTransaction',
    $_calculateDriver: 'calculateDriver',
    $_setChangeTransactionParams: 'setChangeTransactionParams',
    $_changeTransaction: 'changeTransaction',
    $_removeElementFromSurcharge: 'removeElementFromSurcharge'
  })
}

export default {
  computed,
  methods
}

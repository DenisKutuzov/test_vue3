import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('carsConditions')

const computed = {
  ...mapState({
    $_carsConditionsData: 'data'
  })
}

const methods = {
  ...mapActions({
    $_fetchCarsConditions: 'fetch',
    $_addCarCondition: 'add',
    $_changeCarCondition: 'changeCarCondition',
    $_removeCarCondition: 'removeCarCondition'
  })
}

export default {
  computed,
  methods
}

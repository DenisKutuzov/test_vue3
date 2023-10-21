import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('settings')

const computed = {
  ...mapState({
    $_settingsData: 'data',
    $_parksData: 'parks'
  }),
  ...mapGetters({
    $_getDefaultParkName: 'getDefaultParkName'
  }),
  getActiveParkID () {
    if (!this.$_parksData.length) return null
    return this.$_parksData.filter(parks => parks.is_active === true)[0].id || null
  }
}

const methods = {
  ...mapActions({
    $_fetchSettings: 'getCrmSettings',
    $_selectPark: 'selectPark',
    $_removePark: 'removePark',
    $_addPark: 'addPark',
    $_addSettings: 'createCrmSettings'
  })
}

export default {
  computed,
  methods
}

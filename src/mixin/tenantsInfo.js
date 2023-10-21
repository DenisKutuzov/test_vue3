import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('tenantsInfo')

const computed = {
  ...mapState({
    $_tenantsInfoData: 'tenantsInfoData'
  }),
  ...mapGetters({
    $_getTenantById: 'GET_BY_ID',
    $_getCandidates: 'getCandidates',
    $_getTrial: 'getTrial',
    $_getDrivers: 'getDrivers',
    $_getSheduleDrivers: 'getSheduleDrivers'
  })
}

const methods = {
  ...mapActions({
    $_fetchTenantsInfo: 'fetchTenantsInfo',
    $_addTenant: 'addTenant',
    $_changeTenant: 'changeTenant',
    $_removeTenant: 'removeTenant'
  })
}

export default {
  computed,
  methods
}

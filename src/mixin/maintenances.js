import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('maintenances')

const computed = {
  ...mapState({
    $_maintenancesData: 'maintenancesData'
  }),
  ...mapGetters({
    $_filteredMaintenances: 'filteredMaintenances'
  })
}

const methods = {
  ...mapActions({
    $_fetchMaintenances: 'fetchMaintenances',
    $_addMaintenance: 'addMaintenance',
    $_changeMaintenance: 'changeMaintenance',
    $_filterMaintenances: 'filter',
    $_acceptMaintenance: 'acceptMaintenance'
  })
}

export default {
  computed,
  methods
}

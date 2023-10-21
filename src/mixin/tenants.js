import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('tenants')

const computed = {
  ...mapState({
    $_tenantsData: 'tenantsData'
  })
}

export default {
  computed
}

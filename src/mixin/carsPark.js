import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('carsPark')

const computed = {
  ...mapState({
    $_carsParkData: 'carsParkData'
  })
}

export default {
  computed
}

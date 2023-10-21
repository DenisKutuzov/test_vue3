import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('tenantCandidates')

const computed = {
  ...mapState({
    $_candidatesData: 'candidatesData',
    $_onProbationData: 'onProbationData'
  })
}

export default {
  computed
}

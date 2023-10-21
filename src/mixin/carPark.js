// import {createNamespacedHelpers} from 'vuex'
// const { mapState } = createNamespacedHelpers('carPark');
//
// const computed = {
//   ...mapState({
//     $_carParkData : 'carParkData'
//   })
// }
//
// export default {
//   computed
// }

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('carPark')

const computed = {
  ...mapState({
    $_carParkData: 'carParkData'
  }),
  ...mapGetters({
    $_getCarById: 'GET_BY_ID'
  })
}

const methods = {
  ...mapActions({
    $_fetchCarPark: 'fetchCarPark'
  })
}

export default {
  computed,
  methods
}

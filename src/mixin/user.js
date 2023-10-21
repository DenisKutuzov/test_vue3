import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('user')

const computed = {
  ...mapState({
    $_token: 'token',
    $_refreshToken: 'refreshToken',
    $_userEmail: 'userEmailData'
  }),
  ...mapGetters({
    $_getToken: 'GET_TOKEN',
    $_getRefreshToken: 'GET_REFRESH_TOKEN'
  })
}

const methods = {
  ...mapActions({
    $_login: 'login',
    $_logout: 'logout'
  })
}

export default {
  computed,
  methods
}

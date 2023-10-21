import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('admins')

const computed = {
  ...mapState({
    $_adminsData: 'data'
  })
}

const methods = {
  ...mapActions({
    $_fetchAdmins: 'fetch',
    $_removeAdmin: 'remove',
    $_changeAdmin: 'change',
    $_addAdmin: 'add'
  })
}

export default {
  computed,
  methods
}

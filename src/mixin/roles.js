import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('roles')

const computed = {
  ...mapState({
    $_rolesData: 'data'
  })
}

const methods = {
  ...mapActions({
    $_fetchRoles: 'fetch',
    $_removeRole: 'remove',
    $_changeRole: 'change',
    $_addRole: 'add'
  })
}

export default {
  computed,
  methods
}

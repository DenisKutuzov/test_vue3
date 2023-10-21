
import store from '@/store/index'
const isUserGranted = (value) => {
  const [getUserRolesAccsesses, isUserFullAdmin] = [store.getters['user/getUserRolesAccsesses'], store.getters['user/isUserFullAdmin']]
  if (isUserFullAdmin) return true
  if (Array.isArray(value)) {
    console.log(getUserRolesAccsesses.filter(x => value.some(y => y === x)))
    return getUserRolesAccsesses.some(x => value.some(y => y === x))
  }
  return false
}

export default isUserGranted


import store from '@/store/index'
// import { getAccessesByFullPatch } from '@/constants/accesses'
const isUserGranted = (value) => {
  const [getUserRolesAccsesses, isUserFullAdmin] = [store.getters['user/getUserRolesAccsesses'], store.getters['user/isUserFullAdmin']]
  if (isUserFullAdmin) return true
  // const getAccesses = getAccessesByFullPatch(value)
  // console.log(value)
  if (Array.isArray(value)) {
    console.log(getUserRolesAccsesses.filter(x => value.some(y => y === x)))
    return getUserRolesAccsesses.some(x => value.some(y => y === x))
  }
  return false
  // return getUserRolesAccsesses.includes(value)
}

const access = () => (el, binding, vnode) => {
  if (!isUserGranted(binding.value)) {
    const comment = document.createComment(' ')
    Object.defineProperty(comment, 'setAttribute', {
      value: () => undefined
    })
    vnode.elm = comment
    vnode.text = ' '
    vnode.isComment = true
    el.style.display = 'none'
    vnode.context = undefined
    vnode.tag = undefined
    vnode.data.directives = undefined
    if (vnode.componentInstance) {
      vnode.componentInstance.$el = comment
    }

    if (el.parentNode) {
      el.parentNode.replaceChild(comment, el)
    }
  }
}

export default access
// const isUserGranted = (value) => {
//   const [getUserRolesAccsesses, isUserFullAdmin] = [store.getters['user/getUserRolesAccsesses'], store.getters['user/isUserFullAdmin']]
//   if (isUserFullAdmin) return true
//   if (Array.isArray(value)) {
//     return getUserRolesAccsesses.some(x => value.some(y => y === x))
//   }
//   return getUserRolesAccsesses.includes(value)
// }

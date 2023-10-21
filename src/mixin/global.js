
import moment from 'moment-timezone'
import store from '@/store/index'
import { ROOT_CONFIG } from '@/utils/config'
import { isString } from 'lodash'
const methods = {
  toNumFormat (number) {
    if (typeof number === 'string') {
      number = Number(number)
    }
    return new Intl.NumberFormat('ru-RU').format(number?.toFixed(2)) || 0
  },
  getUtcFromDate (date = moment()) {
    const utcResult = moment.parseZone(date).format('YYYY-MM-DDT00:00:00[Z]')
    return utcResult === 'Invalid date' ? undefined : utcResult
  },
  getDateFromUtc (dateString, isTimeFormat = false, isAddSeconds = false) {
    if (!dateString) return
    const date = moment.parseZone(dateString).tz(store.getters['settings/getTimeZone'])
    return date.format(`DD-MM-YYYY ${!isTimeFormat ? '' : 'HH:mm'}${!isAddSeconds ? '' : ':ss'}`)
  },
  getRootConfig () {
    console.log(ROOT_CONFIG)
    return ROOT_CONFIG
  },
  getRootStaticUrl (url) {
    return ROOT_CONFIG?.static_url + url
  },
  getChangeTransform (change) {
    if (change === 'day') return 'morning'
    if (change === 'fullday') return 'fullDay'
    return change
  },
  transformToUnderCase (str) {
    return str.toLowerCase()
  },
  getChangeTranslate (change) {
    if (!isString(change)) return '...'
    if (change?.startsWith('day') || change?.startsWith('morning')) return 'Дневная'
    if (change?.startsWith('fullday') || change?.startsWith('fullDay')) return 'Суточная'
    if (change?.includes('night')) return 'Ночная'
    return change
  }

}

export default {
  methods
}


const methods = {
  smartRound (num, afterPointNum = 2) {
    return num.toLocaleString('fi-FI', {
      minimumFractionDigits: 0,
      maximumFractionDigits: afterPointNum
    })
  },

  formatPhone (phone) {
    // Оставляем только цифры
    let newphone = phone.replace(/\D/g, '')

    // Исключаем +7 и гругие, оставляем только последние 10 цифр
    if (newphone.length > 10) newphone = newphone.slice(-10, newphone.length)

    // Форматируем их
    return newphone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4')
  },

  formatObjectToString (object) {
    // FROM => [{ "3500": [40,40,true] }, { "4500": [42,42,true] }, { "5500": [43,43,true] }]
    // TO => {3500:[40,40,True]} {4500:[42,42,True]} {5500:[43,43,True]}

    let string = JSON.stringify(object)

    string = string.replace(/},/g, '} ')
    string = string.replace(/"/g, '\'')
    string = string.replace(/'(-?[0-9]+\.{0,1}[0-9]*)'/g, '$1')
    string = string.replace(/true/g, 'True')
    string = string.replace(/false/g, 'False')
    string = string.replace(/^\[/, '')
    string = string.replace(/\]$/, '')

    return string
  },

  formatDate (date) {
    return date.split('-').reverse().join('-')
  },

  validateDate (date) {
    return new Date('1970-01-02') < new Date(date) ? date : null
  }
}

export default {
  methods
}

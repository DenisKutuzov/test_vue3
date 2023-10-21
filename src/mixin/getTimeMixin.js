import moment from 'moment'

const methods = {
  getTodayDate () {
    return new Date().toISOString().slice(0, 10)
  },
  getYesterdayDate () {
    const today = new Date()
    let yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday = yesterday.toISOString().slice(0, 10)
    return yesterday
  },
  getBeforeYesterdayDate () {
    const today = new Date()
    let beforeYesterday = new Date(today)
    beforeYesterday.setDate(beforeYesterday.getDate() - 2)
    beforeYesterday = beforeYesterday.toISOString().slice(0, 10)
    return beforeYesterday
  },
  getNextWeekDate () {
    const today = new Date()
    let weekLater = new Date(today)
    weekLater.setDate(weekLater.getDate() + 6)
    weekLater = weekLater.toISOString().slice(0, 10)
    return weekLater
  },
  getLastWeekDate () {
    const today = new Date()
    let weekEarlier = new Date(today)
    weekEarlier.setDate(weekEarlier.getDate() - 6)
    weekEarlier = weekEarlier.toISOString().slice(0, 10)
    return weekEarlier
  },

  getTodayAndLastWeekDates () {
    let start = new Date()
    start.setDate(start.getDate() - 7)
    start = start.toISOString().slice(0, 10)

    let end = new Date()
    end = end.toISOString().slice(0, 10)

    return { start, end }
  },
  getThisWeekDate () {
    let start = new Date()
    let end = new Date(start)
    start.setDate(start.getDate() - 3)
    end.setDate(end.getDate() + 3)
    start = start.toISOString().slice(0, 10)
    end = end.toISOString().slice(0, 10)
    return {
      start,
      end
    }
  },
  getThisMonthDate () {
    let start = new Date()
    let end = new Date(start)
    start.setDate(start.getDate() - 15)
    end.setDate(end.getDate() + 15)
    start = start.toISOString().slice(0, 10)
    end = end.toISOString().slice(0, 10)
    return {
      start,
      end
    }
  },
  getNextMonthDate () {
    const today = new Date()
    let monthLater = new Date(today)
    monthLater.setDate(monthLater.getDate() + 30)
    monthLater = monthLater.toISOString().slice(0, 10)
    return monthLater
  },
  getRusLangDateString (inputString) {
    const date = new Date(inputString)
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return date.toLocaleString('ru-RU', options)
  },
  getUtcFromDate (date) {
    return moment.utc(date).format('YYYY-MM-DD[T]HH:mm:ss[Z]')
  }
}

export default {
  methods
}


const methods = {
  calculateSecondsByDays (days) {
    return days * 24 * 60 * 60
  },
  calculateDaysBySeconds (seconds) {
    return seconds / 24 / 60 / 60
  }

}

export default {
  methods
}

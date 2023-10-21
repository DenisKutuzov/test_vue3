const methods = {
  async showWarrning (message) {
    return await this.$confirm(message, 'Внимание', {
      confirmButtonText: 'Да',
      cancelButtonText: 'Отмена',
      type: 'warning'
    })
  }
}

export default {
  methods
}

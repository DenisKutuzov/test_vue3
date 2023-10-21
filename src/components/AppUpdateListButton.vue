<template>
<div ref="update-list-btn" class="update-list-btn">
  <el-button
    ref="update-list-btn"
    type="primary"
    round
    size="medium"
    icon="el-icon-refresh"
    @click="updateButtonClick"
    :loading="isLoading"
  >
    {{ title }}
  </el-button>
</div>

</template>

<script>
export default {
  name: 'AppUpdateListButton',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Получить список'
    }
  },
  mounted () {
    // this.$refs['update-list-btn'].addEventListener('scroll', this.listBtnListener)

    // if (document) {
    //   document.addEventListener('scroll', this.changlistBtnPosOnScroll)
    // }
  },
  //   beforeUnmount () {
  //   this.$refs['update-list-btn'].removeEventListener('scroll', this.listBtnListener)
  //
  //   if (document) {
  //     document.removeEventListener('scroll', this.changlistBtnPosOnScroll)
  //   }
  // },
  methods: {
    updateButtonClick () {
      this.$emit('updateButtonClick')
    },
    listBtnListener (e) {
      this.$refs['update-list-btn'].$el.scrollLeft = e.target.scrollLeft
    },
    changlistBtnPosOnScroll () {
      const dateBar = this.$refs['update-list-btn']
      if (dateBar) {
        if (window) {
          if (window.scrollY > 105) {
            dateBar.classList.add('update-list--fix')
          } else {
            dateBar.classList.remove('update-list--fix')
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.update-list{
    &--fix{
        margin: 5px;
        position: fixed;
        left: 85px;
        top: 15px;
        width: inherit;
        overflow-x: hidden;
        z-index: 1000;

    }
}
</style>

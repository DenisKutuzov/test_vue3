<template>
  <div ref="fixed-indeficator-wrapper" :class="getClassWrapper()">
    <div  ref="fixed-indeficator-wrapper__blur">
        <div :ref="`${mid}_fixed-indeficator-component`" class="fixed-indeficator-component">
            <slot/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppUpdateListButton',
  props: {
    activateY: {
      type: Number,
      default: 105
    },
    backgroundActive: {
      type: String,
      default: null
    },
    padding: {
      type: String,
      default: null
    },
    top: {
      type: Number,
      default: 15
    },
    isTabs: {
      type: Boolean,
      default: false
    },
    isTabs2: {
      type: Boolean,
      default: false
    },
    right: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 85
    },
    isDisableWrapperHeight: {
      type: Boolean,
      default: false
    },
    isMaxBlur: {
      type: Boolean,
      default: true
    },
    mid: {
      type: String,
      default: 'defoultMid'
    },
    full_blur: {
      type: Boolean,
      default: false
    },
    shedule: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$refs[`${this.mid}_fixed-indeficator-component`].addEventListener('scroll', this.listBtnListener)

    if (document) {
      document.addEventListener('scroll', this.changlistBtnPosOnScroll)
    }
    if (this.shedule) {
      this.changlistBtnPosOnScroll()
    }
  },
    beforeUnmount () {
    this.$refs[`${this.mid}_fixed-indeficator-component`].removeEventListener('scroll', this.listBtnListener)

    if (document) {
      document.removeEventListener('scroll', this.changlistBtnPosOnScroll)
    }
  },
  methods: {
    getClassWrapper () {
      return {
        'state-component-on-scroll': !this.isTabs,
        'state-component-on-scroll-tabs': this.isTabs
      }
    },
    getClassFixed () {
      if (!this.isTabs) {
        return 'state-component-on-scroll--fix'
      }
      if (this.isTabs) {
        return 'state-component-on-scroll-tabs--fix'
      }
    },
    listBtnListener (e) {
      this.$refs[`${this.mid}_fixed-indeficator-component`].$el.scrollLeft = e.target.scrollLeft
    },
    changlistBtnPosOnScroll () {
      const dateBar = this.$refs[`${this.mid}_fixed-indeficator-component`]
      const wrapper = this.$refs['fixed-indeficator-wrapper']
      const blurWrapper = this.$refs['fixed-indeficator-wrapper__blur']
      if (dateBar) {
        if (window) {
          if (window.scrollY > this.activateY) {
            this.$emit('active', true)
            dateBar.style.backgroundColor = this.backgroundActive
            if (!this.full_blur) {
              dateBar.style.top = this.top + 'px'
            }
            dateBar.style.left = this.left + 'px'
            dateBar.style.right = this.right + 'px'
            if (!this.isDisableWrapperHeight) {
              wrapper.style.height = wrapper.clientHeight + 'px'
            }
            dateBar.classList.add(this.getClassFixed())
            if (this.padding) {
              dateBar.style.padding = this.padding
            }
            //
            if (this.isTabs2) {
              dateBar.classList.add('custom-tabs-stylesheet')
            }
            // shedule
            if (this.shedule) {
              dateBar.style.position = null
            }
            // BlurWrapper
            if (this.full_blur) {
              blurWrapper.classList.add('state-component-on-scroll__blur')
              blurWrapper.classList.add('baseBlur')
              blurWrapper.style.height = dateBar.clientHeight + 'px'
              blurWrapper.style.top = this.top + 'px'
              if (this.isMaxBlur) {
                blurWrapper.style.width = '97%'
              }
            } else {
              dateBar.classList.add('baseBlur')
            }
          } else {
            this.$emit('active', false)
            if (this.padding) {
              dateBar.style.padding = null
            }
            // shedule
            if (this.shedule) {
              dateBar.style.position = 'absolute'
              wrapper.style.height = null
              blurWrapper.style.height = null
              dateBar.style.left = null
              dateBar.style.right = null
            }
            dateBar.style.backgroundColor = null
            dateBar.classList.remove(this.getClassFixed())
            // BlurWrapper
            if (this.full_blur) {
              blurWrapper.classList.remove('state-component-on-scroll__blur')
              blurWrapper.classList.remove('baseBlur')
              blurWrapper.style.top = null
              if (this.isMaxBlur) {
                blurWrapper.style.width = null
              }
            } else {
              dateBar.classList.remove('baseBlur')
            }
          }
        }
      }
    }
  }
}
</script>
<style>
.el-tabs__header{
  margin: 0 !important;
}
</style>
<style scoped lang="scss">
.state-component-on-scroll{
    transition:all 0.3s;
    &--fix{
        position: fixed;
        width: inherit;
        overflow-x: hidden;
        z-index: 1000;
        transition: all 0.3s;
    }
    &__blur{
      transition:all 0.3s;
      z-index: 1000;
      position: fixed;
      left: 70px;
      // width: 100%;
    }
}
.baseBlur{
  backdrop-filter: blur(10px);
}
.custom-tabs-stylesheet{
   :not(.el-tabs__header .is-top) {
            margin: 5px;
            position: fixed;
            // left: 276px;
            // right: 20px;
            width: inherit;
            overflow-x: hidden;
            z-index: 1000;

        }
        .el-tabs__item{
            background-color:rgb(255, 255, 255);
        }
        .el-tabs__header{
            border-bottom: unset;
        }
}
.state-component-on-scroll-tabs{
    transition:0.3s;
    &--fix{
        :not(.el-tabs__header .is-top) {
            margin: 5px;
            position: fixed;
            // left: 276px;
            // right: 20px;
            width: inherit;
            overflow-x: hidden;
            z-index: 1000;

        }
        .el-tabs__item{
            background-color:rgb(255, 255, 255);
        }
        .el-tabs__header{
            border-bottom: unset;
        }
    }
}
</style>

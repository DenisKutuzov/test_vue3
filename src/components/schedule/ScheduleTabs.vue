<template>
  <div ref="tabs-shedule" class="tabs-shedule">
    <el-tabs
      class="parts-page__tabs"
      type="card"
      v-model="activeTable"
    >
      <el-tab-pane
        lazy
        label="Все парки"
        name="all"/>
      <el-tab-pane
        lazy
        v-for="rpark in regionPark"
        :key="rpark.regionParkId"
        :label="rpark.name"
        :name="rpark.regionParkId"/>
    </el-tabs>
  </div>
</template>

<script>
// import { mapActions, mapGetters, mapState } from 'vuex'
// import settings from '@/mixin/settings'

// export default {
//   name: 'ScheduleTabs',
//   mixins: [
//     settings
//   ],
//   data () {
//     return {
//       activeTable: 'all'
//     }
//   },
//
//   props: {
//     scroll: {
//       type: Boolean,
//       default: true
//     }
//   },
//   computed: {
//     ...mapState('regionPark', {
//       regionPark: 'regionPark',
//       isLoading: 'isLoading'
//     }),
//     ...mapGetters('regionPark', ['getSettingsIdByParkId'])
//   },
//   methods: {
//     ...mapActions('schedule', {
//       setCurrentRegionParkShedlueID: 'setCurrentRegionParkID',
//       setCurrentRegionParkSettingsId: 'setCurrentRegionParkSettingsId'
//     }),
//     ...mapActions('regionPark', {
//       fetchRegionPark: 'fetchRegionPark'
//     }),
//     setCurrentRegionParkID (id) {
//       this.$emit('update', id)
//       this.setCurrentRegionParkShedlueID(id)
//     },
//     setRegionParkIdToRouteQuery (newRegionParkId) {
//       const { query } = this.$route
//       const { regionParkId: oldRegionParkId } = query
//
//       // if is the same region park id, do nothing
//       if (newRegionParkId === oldRegionParkId) return
//
//       const newSettingsId = this.getSettingsIdByParkId(newRegionParkId)
//       const getType = this.regionPark?.find(x => x.regionParkId === newRegionParkId)?.type
//       // set current region park in store
//       this.setCurrentRegionParkID(newRegionParkId === 'all' ? undefined : newRegionParkId)
//       this.setCurrentRegionParkSettingsId(newSettingsId)
//
//       // set current region park in query
//       this.$router.replace({
//         query: {
//           ...query,
//           region_id: newRegionParkId === 'all' ? undefined : newRegionParkId,
//           settings_id: newSettingsId,
//           type: getType
//         }
//       })
//     },
//     scheduleTableScrollListener (e) {
//       this.$refs['tabs-shedule'].$el.scrollLeft = e.target.scrollLeft
//     },
//     changeDateBarPosOnScroll () {
//       const dateBar = this.$refs['tabs-shedule']
//       if (dateBar) {
//         if (window) {
//           if (window.scrollY > 210) {
//             dateBar.classList.add('tabs-shedule--fix')
//           } else {
//             dateBar.classList.remove('tabs-shedule--fix')
//           }
//         }
//       }
//     },
//     setRegionParkIdFromQuery () {
//       const { query } = this.$route
//       const {
//         region_id: regionParkId,
//         settings_id: settingsId
//       } = query
//
//       if (!regionParkId) {
//         this.activeTable = 'all'
//         return
//       }
//       console.log('setRegionParkIdFromQuery')
//       this.setCurrentRegionParkID(regionParkId)
//       if (settingsId) this.setCurrentRegionParkSettingsId(settingsId)
//       this.activeTable = regionParkId
//     }
//   },
//
//   created () {
//     this.setRegionParkIdFromQuery()
//     if (this.regionPark.length === 0) {
//       this.fetchRegionPark()
//     }
//     // if (!this.scroll) return
//     // this.$refs['tabs-shedule'].addEventListener('scroll', this.scheduleTableScrollListener)
//
//     // if (document && this.scroll) {
//     //   document.addEventListener('scroll', this.changeDateBarPosOnScroll)
//     // }
//   },
//   beforeDestroy () {
//     if (!this.scroll) return
//     this.$refs['tabs-shedule'].removeEventListener('scroll', this.scheduleTableScrollListener)
//
//     if (document) {
//       document.removeEventListener('scroll', this.changeDateBarPosOnScroll)
//     }
//   },
//   destroyed () {
//     this.setCurrentRegionParkID(null)
//   },
//   watch: {
//     activeTable: {
//       handler: function (someRouteName) {
//         this.setRegionParkIdToRouteQuery(someRouteName)
//       },
//       deep: false,
//       immediate: false
//     }
//   }
// }
</script>

<style lang="scss">
.el-tabs__item {
  background-color: white
}

.tabs-shedule {
  &--fix {
    :not(.el-tabs__header .is-top) {
      margin: 5px;
      position: fixed;
      left: 276px;
      right: 20px;
      top: 50px;
      width: inherit;
      overflow-x: hidden;
      z-index: 1000;

    }

    .el-tabs__item {
      background-color: rgb(255, 255, 255);
    }

    .el-tabs__header {
      border-bottom: unset;
    }
  }
}
</style>

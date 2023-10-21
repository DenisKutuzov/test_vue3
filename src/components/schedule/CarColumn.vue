<template>
  <div class="car-column">
    <div
      class="car-column__list"
      v-for="car in cars"
      :key="car.carId">

      <CarColumnItem
        :car="car"
        @click="handleClick(car.carId)"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CarColumnItem from '@/components/schedule/CarColumnItem'

export default {
  name: 'CarColumn',
  props: {
    cars: {
      type: Array,
      required: true
    }
  },

  components: {
    CarColumnItem
  },

  methods: {
    ...mapActions('carPark', ['getCarById']),

    ...mapActions('schedule', {
      setCurrentCar: 'setCurrentCar',
      changeDialogVisible: 'changeDialogVisible'
    }),

    handleClick (carId) {
      if (!this.$isUserGranted(this.$accesses.shedule.about_driver_btn)) return
      this.setCurrentCar(carId)

      this.changeDialogVisible({
        dialogName: 'aboutCarDialog',
        value: true
      })
    }
  }
}
</script>

<style lang="scss">
.car-column {
  &__list {
    display: flex;
    border-bottom: 1px solid #f1f0ed;

    &:hover {
      cursor: pointer;
    }

    .el-card__body {
      padding: 5px;
    }
  }
}
</style>

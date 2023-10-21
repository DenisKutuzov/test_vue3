<template functional>
  <div
    class="car-column-item"
    @click="listeners['click']">

    <div class="car-column-item__car-info">
      <h2 class="car-column-item__text">
        {{ props.car.carModel }}
      </h2>

      <p class="car-column-item__text">
        {{ props.car.carNumber }}
      </p>

      <p class="car-column-item__text">
        {{ props.car.carCallSign }}
      </p>
    </div>

    <div class="car-column-item__times">
      <i class="car-column-item__times-icon el-icon-sunny" />
      <i class="car-column-item__times-icon el-icon-moon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarColumnItem',

  props: {
    car: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.car-column-item {
  display: flex;

  &__car-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 110px;
    min-height: 110px;
    min-width: 150px;
    max-width: 150px;
    padding: 0 10px;
  }

  &__text {
    margin: 5px;
  }

  &__times {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__times-icon {
    margin: 10px;
  }
}
</style>

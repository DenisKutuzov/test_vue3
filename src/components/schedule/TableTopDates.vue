<template>
  <!-- TODO: Сделать компонент функциональным -->
  <div class="table-top-dates">
    <div
      class="table-top-dates__item"
      v-for="(date, index) in dates"
      :key="index">

      {{ $moment(date).format('DD.MM.yyyy dd') }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TableTopDates',

  computed: {
    ...mapState('schedule', {
      dates: 'currentWeek'
    })
  }
}
</script>

<style lang="scss">
.table-top-dates {
  display: flex;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    min-width: 200px;
    background-color: #fff;
    margin: 5px;
    border: 1px solid rgba(210, 208, 204, 0.5);
  }
}
</style>

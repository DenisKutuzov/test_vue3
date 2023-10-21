<template>
  <div class="sorting">
    <div class="sorting__container">
      <el-input v-model="callsign" placeholder="Позывной" clearable class="custom-el-input"></el-input>
      <el-input v-model="stateNumber" placeholder="Гос.Номер" clearable class="custom-el-input"></el-input>
      <el-select v-model="value" clearable >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'techInspectionSort',
  data () {
    return {
      callsign: '',
      stateNumber: '',
      options: [{
        value: 'Плановое',
        label: 'Плановое'
      }, {
        value: 'Внеплановое',
        label: 'Внеплановое'
      }],
      value: ''
    }
  }
}
</script>

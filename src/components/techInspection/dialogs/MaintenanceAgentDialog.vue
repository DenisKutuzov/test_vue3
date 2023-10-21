<!--<template>-->
<!--  <div>-->
<!--    <el-form ref="form" :rules="rules" inline :model="maintenance_agent_element">-->
<!--      <el-form-item class="form__item" prop="name" label="Название">-->
<!--        <el-input-->
<!--          v-model="maintenance_agent_element.name"-->
<!--          placeholder="Название" />-->
<!--      </el-form-item>-->
<!--      <el-form-item class="form__item" prop="vendor_code" label="Артикул">-->
<!--        <el-input-->
<!--          v-model="maintenance_agent_element.vendor_code"-->
<!--          placeholder="Артикул" />-->
<!--      </el-form-item>-->
<!--      <el-form-item class="form__item" prop="unit_measure" label="Единица измерения">-->
<!--        <el-input-->
<!--          v-model="maintenance_agent_element.unit_measure"-->
<!--          placeholder="Единица измерения" />-->
<!--      </el-form-item>-->
<!--      <el-form-item class="form__item" prop="category" label="Категория">-->
<!--        <el-input-->
<!--          v-model="maintenance_agent_element.category"-->
<!--          placeholder="Категория" />-->
<!--      </el-form-item>-->
<!--      <el-form-item class="form__item" prop="price_unit" label="Цена">-->
<!--        <el-input-number-->
<!--          v-model="maintenance_agent_element.price_unit"-->
<!--          placeholder="Цена" />-->
<!--      </el-form-item>-->
<!--      <el-form-item class="form__item" prop="quantity" label="Количество">-->
<!--        <el-input-number-->
<!--          v-model="maintenance_agent_element.quantity"-->
<!--          placeholder="Количество" />-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--    <el-button @click="handleSubmit" class="margin-top-20 w100">Сохранить</el-button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'MaintenanceAgentDialog',-->
<!--  props: {-->
<!--    temp: {-->
<!--      type: Object,-->
<!--      default: null-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    if (this.temp) {-->
<!--      this.maintenance_agent_element = this.temp-->
<!--    }-->
<!--  },-->
<!--  watch: {-->
<!--    temp (newV) {-->
<!--      this.maintenance_agent_element = newV-->
<!--    }-->
<!--  },-->
<!--  destroyed () {-->
<!--    this.maintenance_agent_element = {-->
<!--      name: null,-->
<!--      vendor_code: null,-->
<!--      unit_measure: null,-->
<!--      category: null,-->
<!--      price_unit: null,-->
<!--      quantity: null-->
<!--    }-->
<!--  },-->
<!--  data () {-->
<!--    return {-->
<!--      maintenance_agent_element: {-->
<!--        name: '',-->
<!--        vendor_code: '',-->
<!--        unit_measure: '',-->
<!--        category: '',-->
<!--        price_unit: 0,-->
<!--        quantity: 0-->
<!--      },-->
<!--      rules: {-->
<!--        name: [-->
<!--          {-->
<!--            required: true,-->
<!--            message: 'Обязательное поле!',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ],-->
<!--        vendor_code: [-->
<!--          {-->
<!--            required: true,-->
<!--            message: 'Обязательное поле!',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ],-->
<!--        unit_measure: [-->
<!--          {-->
<!--            required: true,-->
<!--            message: 'Обязательное поле!',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ],-->
<!--        category: [-->
<!--          {-->
<!--            required: true,-->
<!--            message: 'Обязательное поле!',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ],-->
<!--        price_unit: [-->
<!--          {-->
<!--            required: true,-->
<!--            message: 'Обязательное поле!',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ],-->
<!--        quantity: [-->
<!--          {-->
<!--            required: true,-->
<!--            message: 'Обязательное поле!',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ]-->

<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async handleSubmit () {-->
<!--      let isValid = true-->
<!--      await this.$refs.form.validate((valid) => {-->
<!--        if (valid) {-->
<!--          console.log('valid submit!!')-->
<!--          isValid = true-->
<!--          return true-->
<!--        } else {-->
<!--          console.log('error submit!!')-->
<!--          isValid = false-->
<!--          return false-->
<!--        }-->
<!--      })-->
<!--      if (!isValid) {-->
<!--        return this.$message({-->
<!--          type: 'error',-->
<!--          message: 'Не все поля заполненны!'-->
<!--        })-->
<!--      }-->
<!--      this.maintenance_agent_element = {-->
<!--        ...this.maintenance_agent_element,-->
<!--        price_unit: Number(this.maintenance_agent_element?.price_unit),-->
<!--        quantity: Number(this.maintenance_agent_element?.quantity)-->
<!--      }-->
<!--      this.$emit('change', this.maintenance_agent_element)-->
<!--      this.$emit('close')-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss"></style>-->

<template>
  <div class="details__container">
    <div class="details__header">
      <p>Редактировать/Добавить Т.О</p>
    </div>
    <div class="details__main">
      <div class="main__row">
        <el-select v-model="stateNumber" placeholder="Автомобиль">
          <el-option label="С239КН39" value="С239КН39"> </el-option>
          <el-option label="С219КВ39" value="С219КВ39"> </el-option>
        </el-select>
        <el-select v-model="scheduledType" placeholder="Тип обслуживания">
          <el-option label="Плановое" value="scheduled"> </el-option>
          <el-option label="Внеплановое" value="unscheduled"> </el-option>
        </el-select>
      </div>
      <div class="main__row">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Причина ремонта"
          v-model="textarea">
        </el-input>
      </div>
      <div class="main__row">
        <date-picker-new
          v-model="dateTime"
          type="datetime"
          placeholder="Время окончания Т.О"
          :picker-options="pickerOptions">
        </date-picker-new>
      </div>
      <p>Запчасти и расходники</p>
      <el-table :data="$_techStoryDetailsData.table" style="width: 100%;">
        <el-table-column label="Категория" prop="category"></el-table-column>
        <el-table-column label="Артикул" prop="vendorCode"></el-table-column>
        <el-table-column label="Поставщик" prop="provider"></el-table-column>
        <el-table-column >
          <template slot="header" slot-scope="scope">
            <div class="add-tenant">
              <el-button icon="el-icon-plus" circle></el-button>
              <p>Добавить запчасть</p>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button type="danger">Удалить</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="main__row" style="justify-content: flex-end; margin-top: 10px">
        <el-button>Отмена</el-button>
        <el-button type="primary">Применить</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import techInspection from '@/mixin/techInspection'
export default {
  name: 'giveCarModal',
  mixins: [techInspection],
  data () {
    return {
      stateNumber: '',
      scheduledType: '',
      textarea: '',
      dateTime: ''
    }
  }
}
</script>

<style scoped>

</style>

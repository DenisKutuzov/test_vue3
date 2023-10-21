<template>
  <div class="details__container">
    <div class="details__header">
      <p>Подтвердить окончание обслуживания</p>
    </div>
    <div class="details__main">
      <div class="main__row">
        <text-field :text="$_techStoryDetailsData.car" title="Автомобиль" width="150px" height="34px"/>
        <text-field :text="$_techStoryDetailsData.type" title="Тип обслуживания" width="150px" height="34px"/>
      </div>
      <div class="main__row">
        <text-field :text="$_techStoryDetailsData.reason" title="Причина ремонта" width="250px" height="100px"/>
      </div>
      <div class="main__row">
        <text-field :text="$_techStoryDetailsData.endDate" title="Дата окончания Т.О" width="150px" height="34px"/>
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
    </div>
  </div>
</template>

<script>
import textField from '@/components/textField'
import techInspection from '@/mixin/techInspection'
export default {
  name: 'getCarModal.vue',
  components: {
    textField
  },
  mixins: [techInspection]
}
</script>

<style scoped>

</style>

<!--<template>-->
<!--  <div>-->
<!--    <el-dialog-->
<!--      title=""-->
<!--      :visible.sync="creatingDialogVisible"-->
<!--      width="940px"-->
<!--      append-to-body-->
<!--    >-->
<!--      <apiKeysUpdateDIalog-->
<!--        :key_crm="tempData.key"-->
<!--        placeholder="Наименование работ"-->
<!--        :d_value="tempData.value"-->
<!--        @change="(x) => updateDataByKey(x.key_crm, x.value)"-->
<!--      />-->
<!--    </el-dialog>-->
<!--    <el-button-->
<!--      type="primary"-->
<!--      v-access="$accesses.techInspection.create_service_works_btn"-->
<!--      size="mini"-->
<!--      class="w100"-->
<!--      @click="handleOpenWorkDialog"-->
<!--      >Создать</el-button-->
<!--    >-->
<!--    <ScrollingTable class="table table_last-auto-width table_low">-->
<!--      <template #thead>-->
<!--        <tr>-->
<!--          <td></td>-->
<!--          <td>Название</td>-->
<!--          <td></td>-->
<!--        </tr>-->
<!--      </template>-->

<!--      <template #tbody>-->
<!--        <tr v-for="(data, index) in repairWorks" :key="index">-->
<!--          <td>-->
<!--            <el-button-->
<!--              type="primary"-->
<!--              size="mini"-->
<!--              :icon="!isHasInSelected(data.id) ? 'el-icon-plus' : 'el-icon-minus' "-->
<!--              circle-->
<!--              @click="handleSelectedManaged(data.id)"-->
<!--            ></el-button>-->
<!--          </td>-->
<!--          <td>{{ data.name || "..." }}</td>-->
<!--          <td>-->
<!--            <el-button-->
<!--              type="primary"-->
<!--              icon="el-icon-edit"-->
<!--              circle-->
<!--              @click="handleEditWorkDialog(data)"-->
<!--            ></el-button>-->
<!--            <el-button-->
<!--              type="danger"-->
<!--              icon="el-icon-delete"-->
<!--              circle-->
<!--              @click="deleteRepairWorks(data.id)"-->
<!--            ></el-button>-->
<!--          </td>-->
<!--        </tr>-->
<!--      </template>-->
<!--    </ScrollingTable>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { mapActions, mapState } from 'vuex'-->
<!--import apiKeysUpdateDIalog from '@/components/dialogs/crm/keysUpdateDialog'-->
<!--const ScrollingTable = () => import('@/components/ScrollingTable')-->
<!--export default {-->
<!--  components: { ScrollingTable, apiKeysUpdateDIalog },-->
<!--  props: {-->
<!--    value: Array-->
<!--  },-->
<!--  name: 'yaZaeblasiBliatEbatEgoRot',-->
<!--  data () {-->
<!--    return {-->
<!--      creatingDialogVisible: false,-->
<!--      selectedIds: [],-->
<!--      tempData: {-->
<!--        key: '',-->
<!--        value: ''-->
<!--      }-->
<!--    }-->
<!--  },-->

<!--  computed: {-->
<!--    ...mapState('techInspection', {-->
<!--      repairWorks: 'repairWorks'-->
<!--    }),-->
<!--    modelValue: {-->
<!--      get () {-->
<!--        return this.value-->
<!--      },-->
<!--      set (value) {-->
<!--        this.$emit('input', value)-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    this.fetchRepairWorks()-->
<!--  },-->
<!--  watch: {-->
<!--    modelValue: async function (value) {-->
<!--      this.selectedIds = value-->
<!--    }-->
<!--  },-->

<!--  methods: {-->
<!--    ...mapActions('techInspection', {-->
<!--      fetchRepairWorks: 'fetchRepairWorks',-->
<!--      createRepairWorks: 'createRepairWorks',-->
<!--      deleteRepairWorks: 'deleteRepairWorks',-->
<!--      updateRepairWorks: 'updateRepairWorks'-->
<!--    }),-->
<!--    isHasInSelected (id) {-->
<!--      return this.selectedIds.findIndex(x => x === id) !== -1-->
<!--    },-->
<!--    handleSelectedManaged (id) {-->
<!--      const isSelected = this.isHasInSelected(id)-->
<!--      if (isSelected) {-->
<!--        this.selectedIds = this.selectedIds.filter(x => x !== id)-->
<!--      }-->
<!--      if (!isSelected) {-->
<!--        this.selectedIds.push(id)-->
<!--      }-->
<!--      this.valueModel = this.selectedIds-->
<!--      this.modelValue = this.selectedIds-->
<!--    },-->
<!--    handleOpenWorkDialog () {-->
<!--      this.creatingDialogVisible = true-->
<!--    },-->
<!--    handleEditWorkDialog (data) {-->
<!--      this.creatingDialogVisible = true-->
<!--      this.tempData = {-->
<!--        key: data.id,-->
<!--        value: data.name-->
<!--      }-->
<!--    },-->
<!--    async updateDataByKey (key, value) {-->
<!--      if (!this.tempData.key) {-->
<!--        await this.createRepairWorks({ repairWork: { name: value } })-->
<!--        this.tempData = {-->
<!--          key: '',-->
<!--          value: ''-->
<!--        }-->
<!--        this.creatingDialogVisible = false-->
<!--        return false-->
<!--      }-->
<!--      await this.updateRepairWorks({ id: key, data: { repairWork: { name: value } } })-->
<!--      this.creatingDialogVisible = false-->
<!--      this.tempData = {-->
<!--        key: '',-->
<!--        value: ''-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.w100 {-->
<!--  width: 100% !important;-->
<!--}-->
<!--</style>-->

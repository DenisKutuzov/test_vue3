<template>
  <div :class="['schedule-dropdown', {'schedule-dropdown_notice': !driver.documentExists,'schedule-dropdown_notice--dot-blink': !driver.isWorking}]">
    <button
      v-if="isFake"
      :class="['el-button', 'schedule-dropdown__button', 'el-button--medium', `el-button--${statusConfig.tagType || 'default'}`, { 'schedule-dropdown__fullday': isFullDay}, classes,]"
      @mouseover="handleMouseover"
      @focus="handleFocus"
      @blur="handleFocusLeave"
      @mouseleave="handleFocusLeave">
      {{ fullName }}
    </button>

    <el-dropdown
      v-else
      :class="['schedule-dropdown__dropdown', classes]"
      :show-timeout="100"
      size="mini">

      <el-button
        class="schedule-dropdown__button"
        size="medium"
        ref="button"
        :class="[{ 'schedule-dropdown__fullday': isFullDay}]"

        :type="statusConfig.tagType"

        >
        <!-- @click="clickOpenDriverInfo" -->
         {{ fullName }}
      </el-button>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          disabled>
          <!-- @click.native="clickOpenDriverInfo" -->

          {{ fullName }}
        </el-dropdown-item>

        <el-dropdown-item
          icon="el-icon-document"
          v-access="$accesses.shedule.about_change_btn"
          @click.native="$emit('showMore')"
          divided>

          Подробнее о смене
        </el-dropdown-item>

        <el-dropdown-item
          icon="el-icon-document"
          v-access="$accesses.shedule.about_driver_btn"
          @click.native="$emit('showMoreAboutDriver')">

          Подробнее о водителе
        </el-dropdown-item>
        <!-- <el-dropdown-item
          v-if="!driver.is_documents_exists"
          icon="el-icon-document-add"
          divided
          @click.native="$emit('createContracts')">

          Создать договоры
        </el-dropdown-item> -->
        <el-dropdown-item
          v-if="driverDateIsCurrent"
          v-access="$accesses.shedule.transplant_driver_btn"
          icon="el-icon-caret-right"
          divided
          @click.native="$emit('moveTransplantDriver')">
          Пересадить водителя на другое авто
        </el-dropdown-item>
        <el-dropdown-item
          icon="el-icon-caret-right"
          divided
          @click.native="$emit('taxometr')">
          Перейти в диспечерскую
        </el-dropdown-item>
        <el-dropdown-item
          icon="el-icon-suitcase"
          v-access="$accesses.global.change_status_driver"
          @click.native="$emit('changeStatus')"
          divided>

          Изменить статус
        </el-dropdown-item>
        <el-dropdown-item
          icon="el-icon-suitcase"
          @click.native="$emit('waybill')"
          divided>

          Скачать путевые листы
        </el-dropdown-item>
        <el-dropdown-item
          icon="el-icon-minus"
          @click.native="$emit('ignoreDriverWorking')"
          divided>

          Игнорировать индикатор
        </el-dropdown-item>
        <el-dropdown-item
          v-if="isRemoveButton"
          v-access="$accesses.shedule.delete_driver_btn"
          icon="el-icon-delete"
          @click.native="$emit('removeSchedule')"
          >
          <!-- v-if="isShowRemoveBtn" -->
          <!-- @click.native="clickDeleteDriverInfo" -->

          Убрать со смены
        </el-dropdown-item>

        <el-dropdown-item
          v-access="$accesses.shedule.change_driver_btn"
          icon="el-icon-edit"
          @click.native="$emit('changeDriver')">

          Заменить водителя
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getRikDriverStatusConfig } from '@/utils/getEnumConfig'
import { getCssDropDownDiverRikStatus } from '@/utils/style'

export default {
  name: 'ScheduleDropdown',

  props: {
    driver: {
      type: Object,
      default: () => {}
    },
    isFullDay: {
      type: Boolean,
      default: false
    },
    isRemoveButton: {
      type: Boolean,
      default: true
    },
    driverDateIsCurrent: {
      type: Boolean,
      default: true
    }

  },

  data () {
    return {
      timer: null,
      isFake: true
    }
  },

  computed: {
    fullName () {
      const fullName = [this.driver.driverFirstName, this.driver.driverLastName, this.driver.driverMiddleName].join(' ')

      return fullName
    },

    statusConfig () {
      return this.getRikDriverStatusConfig(this.driver.driverRikStatus)
    },

    classes () {
      return getCssDropDownDiverRikStatus(this.statusConfig?.tagType ?? 'info')
    }
  },

  methods: {
    getRikDriverStatusConfig,
    getCssDropDownDiverRikStatus,

    handleMouseover () {
      this.timer = setTimeout(() => {
        this.isFake = false
      }, 50)
    },
    driverDateIsCurrentDate () {
      return this.driver
    },
    handleFocus () {
      this.timer = setTimeout(() => {
        this.isFake = false

        this.$nextTick(() => {
          this.$refs.button.$el.focus()
        })
      }, 200)
    },

    handleFocusLeave () {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="scss">
@keyframes blink{
  0% {
    background: transparent;
  }
  100% {
    background: rgb(0, 255, 153);
  }
}
@-webkit-keyframes blink{
  0% {
    background: transparent;
  }
  100% {
    background: rgb(0, 255, 153);
  }
}
.schedule-dropdown {
  width: 100%;
  position: relative;
  &_notice {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: 14%;
      right: 3%;
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 50%;
    }
    &--dot-blink {
      &:before {
        content: '';
        position: absolute;
        z-index: 2000;
        bottom: 14%;
        right: 3%;
        display: inline-block;
        width: 8px;
        height: 8px;
        animation: blink 2s infinite ease-in-out;
        // background-color: rgb(115, 111, 176);
        border-radius: 50%;
    }
    }
  }

  &__dropdown {
    width: inherit;
  }
  &__fullday{
    height: 78px;
  }
  &__button {
    width: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    transition: none;
  }
}
</style>

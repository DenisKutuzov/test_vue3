<template>
  <el-menu
    class="side-menu"
    :default-active="this.$route.meta.id"
    :collapse="true">

      <div class="side-menu__logo">
        <img src="@/assets/svg/RIK Root.svg" alt="Logo">
      </div>
      <span
        :class="{ 'side-menu__item_margin': r.meta.marginTop }"
        v-for="r in getRoutes"
        :key="r.meta.id">

        <router-link :is="!getAvaliableRedirect(r.meta) ? 'span' : 'router-link'" :to="r.path" v-if="!r.children[1]">
          <el-menu-item class="side-menu__item-icon-wrapper" :index="r.meta.id">
              <el-tooltip class="item" effect="dark" :open-delay="200" :content="r.meta.title" placement="right">
                <div class="side-menu__item-icon">
                  <fa-icon v-if="r.meta.icon" :icon="r.meta.icon"/>
                   <img v-else class="icon_sqware" :src="getCustomIcon(r.meta.custom_icon)" alt="Icon Rik SIde Menu">
                </div>
              </el-tooltip>
          </el-menu-item>
        </router-link>
        <!-- v-if="!!r.children[1]" -->
        <el-submenu class="side-menu__item-icon-wrapper" v-else :index="r.meta.id">
          <template>
              <!-- <router-link :is="!getAllowedRouts(r) ? 'span' : 'router-link'" :to="{name:r.name}"> -->
                <!-- <div class="side-menu__item-icon"> -->
                  <router-link :is="!getAvaliableRedirect(r.meta) ? 'div' : 'router-link'" :to="r.path"  class="side-menu__item-icon">
                    <fa-icon v-if="r.meta.icon" :icon="r.meta.icon"/>
                    <img v-else  class="icon_sqware" :src="getCustomIcon(r.meta.custom_icon)" alt="Icon Rik SIde Menu">
                  </router-link>
                <!-- </div> -->
              <!-- </router-link> -->
          </template>
          <!-- <template v-if="!r.meta.disableChildrens"> -->
            <router-link v-for="c in getChildrendOrAllowedRouts(r)" :key="c.meta.id" :to="{name:c.name}">
              <el-menu-item :index="c.meta.id">
                <!-- <i :class="c.meta.icon"></i> -->
                <div class="side-menu__subitem-icon">
                  <!-- <fa-icon :icon="c.meta.icon"/> -->
                  <span>{{ c.meta.title }}</span>
                </div>
              </el-menu-item>
            </router-link>
          <!-- </template> -->
        </el-submenu>
      </span>
  </el-menu>

</template>

<script>
import { routes } from '@/router'
export default {
  computed: {
    getRoutes () {
      return routes.filter(cur => (cur.meta.layout === 'main-layout' || 'mainLayout') && cur.meta.visible !== false)
    }
  },
  methods: {
    getCustomIcon (url) {
      return require(`@/assets/svg/${url}`)
    },
    getAvaliableRedirect (meta) {
      return meta?.clickable ?? true
    },
    getAllowedRouts (route) {
      const { allowedRouts } = route.meta
      if (!allowedRouts) return false
      return route.children.filter(cur => allowedRouts.includes(cur.name))
    },
    getChildrendOrAllowedRouts (route) {
      const isAllowed = this.getAllowedRouts(route)
      return isAllowed.length ? isAllowed : route.children
    }
  }
}
</script>

<style lang="scss">
.icon_sqware{
      width: 30px;
      height: 30px;
}
.side-menu {
  &__logo {
    width: 100%;
    padding: 15px 10px 5px 15px;

    img {
      width: 100%;
    }
  }
}

.el-menu .side-menu {
  display: flex;
  flex-direction: column;
  background-color: #f1f0ed;
  padding-bottom: 20px;
  border: none;

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 20px 0 0;
  }

  &::before {
    background-color: #f1f0ed;
    border-radius: 0;
  }
}

.el-menu-item {
  height: 50px !important;
}

.el-menu .side-menu {
  &__item {
    &_margin {
      margin-top: auto;
    }
  }

  &__item-icon-wrapper .el-submenu__title,
  &__item-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 !important;

    &.is-active,
    &:hover {
      background-color: transparent;

      .side-menu__item-icon {
        background-color: rgba(0,0,0,.06);
      }
    }
  }

  &__item-icon {
    font-size: 16px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #9e9b98;
    border-radius: 16px;

    * {
      margin-right: 0 !important;
    }
  }

  &__subitem-icon svg {
    display: inline-block;
    font-size: 14px;
    // color: #9e9b98;
    color: rgba(0,0,0,.7);
    margin-right: 10px;
  }
}
</style>

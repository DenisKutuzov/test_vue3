<template>
    <el-container>
        <el-aside style="width: 70px; height: 100vh; overflow: visible; position: fixed; z-index: 50;">
            <side-menu/>
        </el-aside>
        <el-container style="margin-left: 70px;">
            <el-header>
<!--                <app-header :header-title="title"></app-header>-->
            </el-header>
            <el-main style="overflow: visible;">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue'
import { useRoute } from 'vue-router'

const title = useRoute().meta.title
</script>

<style scoped>

</style>

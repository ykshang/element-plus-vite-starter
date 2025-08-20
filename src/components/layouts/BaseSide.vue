<script lang="ts" setup>
import { ref } from 'vue'
import menuData from './menu-data'

const isCollapse = ref(false)
</script>

<template>
  <el-menu router class="main_menu" default-active="2-1" :collapse="isCollapse">
    <el-sub-menu v-for="menu1 in menuData" :key="menu1.index" :index="menu1.index">
      <template #title>
        <component :is="menu1.icon" class="menu_icon" />
        <span class="menu_title">{{ menu1.title }}</span>
      </template>
      <el-menu-item v-for="menu2 in menu1.subMenu" :key="menu2.index" :index="menu2.index">
        <component :is="menu2.icon" class="menu_icon" />
        <span class="menu_title w-40 text-align-left">{{ menu2.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style lang="scss" scoped>
.menu_icon {
  width: 18px;
  height: auto;
  margin-right: 5px;
}

.menu_title {
  font-size: 16px;
  font-weight: 400;
}
</style>

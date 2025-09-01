<script setup lang="ts">
</script>

<template>
  <el-config-provider namespace="ep">
    <base-layout-header />
    <div class="main-container flex">
      <base-layout-aside />
      <div w="full" py="4">
        <RouterView />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}
</style>

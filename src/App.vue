<script setup lang="ts">
</script>

<template>
  <el-config-provider namespace="ep">
    <BaseSide />
    <div class="main-container flex flex-1 flex-col">
      <BaseHeader />
      <div w="full" py="4">
        <RouterView />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
  display: flex;
  height: 100vh;
}
</style>

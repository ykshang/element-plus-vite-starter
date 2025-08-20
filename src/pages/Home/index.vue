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

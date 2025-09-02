<script lang="ts" setup>
import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'
import { ref } from 'vue'
import emitter from '~/config/emitter'

const refreshKey = ref(0)

emitter.on('refreshPage', () => {
  ElNotification.success({
    title: '通知',
    message: '刷新成功',
  })
  NProgress.start() // 手动启动进度条
  refreshKey.value++
  NProgress.done() // 手动完成进度条
})
</script>

<template>
  <el-config-provider namespace="ep">
    <base-layout-side />
    <div class="main-container flex flex-1 flex-col overflow-hidden bg-[--ep-bg-color-page]">
      <base-layout-header />
      <!-- 把属性挪到外层，修复一些 Vue 警告信息 -->
      <div class="mx-20px flex flex-1 flex-col overflow-x-hidden overflow-y-auto bg-[--ep-bg-color-page]">
        <router-view :key="refreshKey" mt-20px />
        <base-layout-footer class="mt-2px min-h-80px bg-[--ep-bg-color]" />
      </div>
    </div>
  </el-config-provider>
</template>

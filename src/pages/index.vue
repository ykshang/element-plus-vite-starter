<script lang="ts" setup>
import { ElNotification } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import NProgress from 'nprogress'
import { reactive, ref, watch } from 'vue'
import emitter from '~/config/emitter'
import { isDark } from '~/config/toggleDarkTheme'

const refreshKey = ref(0)

emitter.on('refreshPage', () => {
  window.scrollTo(0, 0)
  ElNotification.success({
    title: '通知',
    message: '刷新成功',
  })
  NProgress.start() // 手动启动进度条
  refreshKey.value++
  NProgress.done() // 手动完成进度条
})
// 水印字体
const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})
const waterMarkContent = ref<string[]>([])
// 水印文字颜色
watch(
  isDark,
  (newVal) => {
    // console.log('isDark', newVal)
    font.color = newVal
      ? 'rgba(255, 255, 255, .15)'
      : 'rgba(0, 0, 0, .15)'
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <el-config-provider namespace="ep" :locale="zhCn">
    <el-watermark :font="font" :content="waterMarkContent" :z-index="999999" h-full w-full flex>
      <base-layout-side />
      <div class="main-container flex flex-1 flex-col overflow-hidden bg-[--ep-bg-color-page]">
        <base-layout-header />
        <!-- 把属性挪到外层，修复一些 Vue 警告信息 -->
        <div class="mx-10px mt-10px flex flex-1 flex-col overflow-x-hidden overflow-y-auto bg-[--ep-bg-color-page]">
          <router-view :key="refreshKey" />
          <base-layout-footer class="mt-2px min-h-80px bg-[--ep-bg-color]" />
        </div>
      </div>
    </el-watermark>
  </el-config-provider>
</template>

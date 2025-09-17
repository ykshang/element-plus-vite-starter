<script lang="ts" setup>
import { reactive } from 'vue'

import { useThemeConfigStore } from '~/stores/useThemeStroe'

const { toggleWaterMark } = useThemeConfigStore()

// do not use same name with ref
const formData = reactive({
  showWatermark: false,
})
function toggleWatermark(val: boolean) {
  toggleWaterMark(val)
}
</script>

<template>
  <el-card mb-10px header="全局水印" body-class="flex">
    <el-form :model="formData" label-position="left" label-suffix="：" label-width="150px">
      <el-form-item label="是否显示全局水印">
        <el-switch v-model="formData.showWatermark" @change="toggleWatermark" />
      </el-form-item>
    </el-form>
  </el-card>
  <el-card mb-10px flex-1 header="局部水印">
    2
  </el-card>
</template>

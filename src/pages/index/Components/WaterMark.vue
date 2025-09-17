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
interface WaterMarkConfig {
  content: string
  font: {
    fontSize: number
    color: string
  }
  zIndex: number
  rotate: number
  gap: [number, number]
  offset: [number, number]
}

const waterMarkConfig = reactive<WaterMarkConfig>({
  content: 'Vue Admin',
  font: {
    fontSize: 16,
    color: 'rgba(153, 150, 150, 0.63)',
  },
  zIndex: -1,
  rotate: -22,
  gap: [100, 100],
  offset: [] as unknown as [number, number],
})
</script>

<template>
  <el-card mb-10px header="全局水印" body-class="flex">
    <el-form :model="formData" label-position="left" label-suffix="：" label-width="150px">
      <el-form-item label="是否显示全局水印">
        <el-switch v-model="formData.showWatermark" @change="toggleWatermark" />
      </el-form-item>
    </el-form>
  </el-card>
  <el-card header="局部水印" mb-10px flex flex-1 flex-col body-class="flex flex-1">
    <el-watermark
      class="flex-1 border border-gray-200 border-solid p-20px"
      :content="waterMarkConfig.content"
      :font="waterMarkConfig.font"
      :z-index="waterMarkConfig.zIndex"
      :rotate="waterMarkConfig.rotate"
      :gap="waterMarkConfig.gap"
      :offset="waterMarkConfig.offset"
    >
      <div>
        <h1 class="color-[--ep-text-color-regular]">
          Vue Admin
        </h1>
        <h2 class="color-[--ep-text-color-secondary]">
          这是一个基于 Vue 3 + Element Plus + Pinia + UnoCSS 的后台管理系统
        </h2>
      </div>
    </el-watermark>
    <el-form
      :model="waterMarkConfig"
      label-position="left"
      label-width="150px"
      class="mx-50px w-400px"
    >
      <el-form-item label="内容">
        <el-input v-model="waterMarkConfig.content" />
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-color-picker v-model="waterMarkConfig.font.color" show-alpha />
      </el-form-item>
      <el-form-item label="字体大小">
        <el-slider v-model="waterMarkConfig.font.fontSize" />
      </el-form-item>
      <el-form-item label="z-index">
        <el-slider v-model="waterMarkConfig.zIndex" />
      </el-form-item>
      <el-form-item label="旋转角度">
        <el-slider v-model="waterMarkConfig.rotate" :min="-180" :max="180" />
      </el-form-item>
      <el-form-item label="间距">
        <el-space>
          <el-input-number v-model="waterMarkConfig.gap[0]" controls-position="right" />
          <el-input-number v-model="waterMarkConfig.gap[1]" controls-position="right" />
        </el-space>
      </el-form-item>
      <el-form-item label="Offset">
        <el-space>
          <el-input-number
            v-model="waterMarkConfig.offset[0]"
            placeholder="offsetLeft"
            controls-position="right"
          />
          <el-input-number
            v-model="waterMarkConfig.offset[1]"
            placeholder="offsetTop"
            controls-position="right"
          />
        </el-space>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
</style>

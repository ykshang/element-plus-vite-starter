<!-- eslint-disable no-console -->
<script setup lang="ts">
import * as ri from '@iconify-json/ri'

import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'

const iconKeys = Object.keys(ri.icons.icons)
console.log(iconKeys)
// 选择的图标
const selectedIcon = ref('')
selectedIcon.value = iconKeys[0]
const dynamicIcon = computed(() => `ri:${selectedIcon.value}`)
</script>

<template>
  <el-select v-model="selectedIcon" filterable placeholder="请选择">
    <el-option
      v-for="item in iconKeys"
      :key="item"
      :label="item"
      :value="item"
    />
    <template #prefix>
      <Icon :icon="dynamicIcon" />
    </template>
  </el-select>
</template>

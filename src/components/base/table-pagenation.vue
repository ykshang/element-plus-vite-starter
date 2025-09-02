<script lang="ts" setup>
import type { ComponentSize } from 'element-plus'
import { ref } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  background: true,
  layout: 'sizes, prev, pager, next, jumper, total',
  size: '',
  pageSizes: () => [5, 10, 20, 50],
  total: 1000,
  pagenation: () => ({
    pageNum: 1,
    pageSize: 10,
    total: 1000,
  }),
})

const emit = defineEmits<{
  (e: 'change', value: { pageNum: number, pageSize: number }): void
}>()

interface Props {
  background?: boolean
  layout?: string
  size?: '' | 'small' | 'default' | 'large'
  pageSizes?: number[]
  pagenation?: Pagenation
}
// 本地另存一份数据，防止分页组件无法自动计算分页数据
const pageNumRef = ref(props.pagenation.pageNum)
const sizeRef = ref<ComponentSize>(props.size)
const backgroundRef = ref(props.background)
const pageSizeRef = ref(props.pagenation.pageSize)
const pageSizesRef = ref<number[]>(props.pageSizes)
const layoutRef = ref(props.layout)
// 抛出分页数据
function handlePagenationChange(pageNum: number, pageSize: number) {
  emit('change', {
    pageNum,
    pageSize,
  })
}
</script>

<template>
  <div flex items-center justify-between>
    <el-pagination
      v-model:current-page="pageNumRef"
      v-model:page-size="pageSizeRef"
      :background="backgroundRef"
      :total="props.pagenation.total"
      :page-sizes="pageSizesRef"
      :size="sizeRef"
      :layout="layoutRef"
      @change="handlePagenationChange"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>

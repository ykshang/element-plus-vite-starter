<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

interface IOriginData {
  title: string
  date: number
  dateLabel?: string
}
const originData = ref<IOriginData[]>([
  {
    date: 1757764435124,
    title: '瑞金医院联合华为开源RuiPath病理模型，加速行业智能化落地',
  },
  {
    date: 1757764435124,
    title: '华为携手云南交投正式发布“绿美通道·交通大模型',
  },
  {
    date: 1757764435124,
    title: '华为携手产业达成移动AI基础网共识，加速5G-A体验变现',
  },
  {
    date: 1757764435124,
    title: '激发体验经营心动时刻，加速5G-A商业成功',
  },
  {
    date: 1757764435124,
    title: '北京联通携手华为拥抱AI技术革命，加速迈入智能时代',
  },
  {
    date: 1757764435124,
    title: '共筑F5G-A全光网产业繁荣，共赢AI时代新增长',
  },
  {
    date: 1757764435124,
    title: '5G-A与AI深度融合，共绘通信产业新图景',
  },
])
const tableData = ref<IOriginData[]>([])
tableData.value = originData.value.map((item) => {
  item.dateLabel = dayjs(item.date).format('MM-DD')
  return item
})
function formateDate(date: number) {
  return dayjs(date).format('YYYY-MM-DD')
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div flex>
        <div flex-1>
          新闻动态
        </div>
        <el-link type="primary">
          更多
        </el-link>
      </div>
    </template>
    <el-table :data="tableData" :show-header="false" :border="false" height="230" :scrollbar-always-on="true" :stripe="true">
      <el-table-column prop="date" label="Date" width="120">
        <template #default="{ row }">
          {{ formateDate(row.date) }}
        </template>
      </el-table-column>
      <el-table-column prop="title" show-overflow-tooltip label="Title">
        <template #default="{ row }">
          <el-link type="primary" class="news-link" title="查看">
            {{ row.title }}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped>
.news-link {
  color: var(--ep-text-color-regular);
  &:hover {
    color: var(--ep-color-primary);
  }
}
</style>

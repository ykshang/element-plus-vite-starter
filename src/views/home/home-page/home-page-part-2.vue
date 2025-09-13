<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

interface IOriginData {
  title: string
  detail: string
  date: number
  status: number
  dateLabel?: string
  statusText?: string
}

const originData = ref<IOriginData[]>([
  {
    date: 1757764435124,
    title: '人事调动',
    status: 0,
    detail: '关于湖北代表处李国胜人事调动',
  },
  {
    date: 1755664435124,
    title: '订单处理',
    status: 0,
    detail: '北方科技公司-汽配零件订单 order-20230810001 ',
  },
  {
    date: 1755564435124,
    title: '人事调动',
    status: 1,
    detail: '关于辽宁代表处象牙山村赵国强人事调动',
  },
  {
    date: 1755464435124,
    title: '设备采购',
    status: 1,
    detail: '地区部办公室采购惠普打印机',
  },
])
const statusText = ref(['待处理', '已完成'])
const tableData = ref<IOriginData[]>([])
tableData.value = originData.value.map((item) => {
  item.dateLabel = dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')
  item.statusText = statusText.value[Number(item.status)]
  return item
})
</script>

<template>
  <el-card shadow="never" flex-1>
    <template #header>
      待办事项
    </template>
    <el-table :data="tableData" :show-header="false" :border="false" height="230" :scrollbar-always-on="true" :stripe="true">
      <el-table-column prop="title" label="待办项" width="120" />
      <el-table-column prop="statusText" show-overflow-tooltip label="状态" width="120">
        <template #default="{ row }">
          <el-tag :type="row.status === 0 ? 'primary' : 'info'">
            {{ row.statusText }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="detail" show-overflow-tooltip label="详情">
        <template #default="scope">
          <el-link type="primary" class="news-link" title="处理">
            {{ scope.row.detail }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="dateLabel" label="日期" width="180" />
      <el-table-column prop="operation" show-overflow-tooltip label="操作" width="80">
        <template #default>
          <el-button type="text" width="60">
            处理
          </el-button>
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

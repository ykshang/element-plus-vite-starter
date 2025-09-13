<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
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
const dropdwonText = ref('全部')
const statusText = ref(['待处理', '已完成'])
const tableData = ref<IOriginData[]>([])
tableData.value = originData.value.map((item) => {
  item.dateLabel = dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')
  item.statusText = statusText.value[Number(item.status)]
  return item
})
const commandList = ref([
  { command: 'all', text: '全部' },
  { command: '0', text: '待处理' },
  { command: '1', text: '已处理' },
])
function handleCommand(command: any) {
  const obj = commandList.value.find(item => item.command === command)
  dropdwonText.value = obj?.text || '全部'
  tableData.value = originData.value.filter((item) => {
    return command === 'all' ? true : item.status === Number(command)
  }).map((item) => {
    item.dateLabel = dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')
    item.statusText = statusText.value[Number(item.status)]
    return item
  })
}
</script>

<template>
  <el-card shadow="never" flex-1>
    <template #header>
      <div flex>
        <div flex-1>
          待办事项
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-link :underline="false" type="primary" title="更多">
              {{ dropdwonText }}
              <el-icon ml-5px class="el-icon--right">
                <ArrowDown />
              </el-icon>
            </el-link>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in commandList" :key="item.command" :command="item.command">
                {{ item.text }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
    <el-table :data="tableData" :show-header="false" :border="false" height="230" :scrollbar-always-on="true" :stripe="true">
      <el-table-column prop="title" label="待办项" width="120" />
      <el-table-column prop="statusText" show-overflow-tooltip label="状态" width="90">
        <template #default="{ row }">
          <el-tag :type="row.status === 0 ? 'primary' : 'info'">
            {{ row.statusText }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="detail" show-overflow-tooltip label="详情">
        <template #default="{ row }">
          <el-link type="primary" class="news-link" title="处理">
            {{ row.detail }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="dateLabel" label="日期" width="180" />
      <el-table-column prop="operation" show-overflow-tooltip label="操作" width="80">
        <template #default="{ row }">
          <el-button v-if="row.status === 0" type="text" width="60">
            <span class="font-size-14px font-400">
              处理
            </span>
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

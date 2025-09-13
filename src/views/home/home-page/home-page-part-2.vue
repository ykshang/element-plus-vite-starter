<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
  },
])
</script>

<template>
  <el-card shadow="never" flex-1>
    <template #header>
      待办事项
    </template>
    <el-table :data="tableData" :show-header="false" :border="false" height="230" :scrollbar-always-on="true" :stripe="true">
      <el-table-column prop="name" label="待办项" width="180" />
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="address" show-overflow-tooltip label="Address" />
    </el-table>
  </el-card>
</template>

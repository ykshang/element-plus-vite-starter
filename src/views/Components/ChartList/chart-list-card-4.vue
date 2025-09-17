<script setup lang="ts">
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

const optionData = ref({
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'bar',
    },
    {
      data: [120, 180, 124, 118, 195, 187, 200],
      type: 'bar',
    },
  ],
})
const myChartRef = ref()
onMounted(() => {
  const myChart = echarts.init(myChartRef.value)
  myChart.setOption(optionData.value)
})
</script>

<template>
  <el-card shadow="never" header="柱状图 2" flex flex-1 flex-col body-class="flex flex-1">
    <div ref="myChartRef" class="flex-1" />
  </el-card>
</template>

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
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'bar',
    },
  ],
})
const myChart = ref()
onMounted(() => {
  const mychart = echarts.init(myChart.value)
  mychart.setOption(optionData.value)
})
</script>

<template>
  <el-card header="折线图" h-300px flex flex-col body-class="flex flex-1">
    <div ref="myChart" class="flex-1" />
  </el-card>
</template>

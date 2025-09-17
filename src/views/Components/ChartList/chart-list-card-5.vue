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
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 10,
      data: [
        [9.0, 5.04],
        [7.07, 9.95],
        [4.0, 8.58],
        [10.05, 4.81],
        [2.0, 9.33],
        [3.0, 7.66],
        [12.4, 3.81],
        [14.0, 8.33],
        [12.0, 9.96],
        [13.5, 10.82],
        [6.15, 9.2],
        [9.5, 8.2],
        [2.03, 9.23],
        [1.2, 5.83],
        [3.02, 6.47],
        [6.05, 9.33],
        [7.05, 6.96],
        [7.03, 10.24],
        [2.0, 9.26],
        [1.0, 4.84],
        [9.08, 5.82],
        [8.02, 9.68],
      ],
      type: 'scatter',
    },
    {
      symbolSize: 10,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68],
      ],
      type: 'scatter',
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

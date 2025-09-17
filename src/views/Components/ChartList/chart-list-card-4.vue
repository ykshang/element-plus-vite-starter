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
    data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'],
  },
  yAxis: {},
  series: [
    {
      type: 'candlestick',
      data: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42],
      ],
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
  <el-card header="K线图" h-300px flex flex-col body-class="flex flex-1">
    <div ref="myChart" class="flex-1" />
  </el-card>
</template>

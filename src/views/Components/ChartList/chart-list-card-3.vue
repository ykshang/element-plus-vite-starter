<script setup lang="ts">
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

const optionData = ref({
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '80%'],
      avoidLabelOverlap: false,
      padAngle: 3,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: false,
        position: 'center',
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
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
  <el-card header="折线图" h-300px flex flex-col body-class="flex flex-1">
    <div ref="myChart" class="flex-1" />
  </el-card>
</template>

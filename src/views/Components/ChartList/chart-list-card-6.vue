<script setup lang="ts">
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

const optionData = ref()
optionData.value = {
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tooltip: {
    show: true,
  },
  radar: {
    radius: '80%',
    nameGap: '3',
    indicator: [
      { name: '领导力', max: 10 },
      { name: '亲和力', max: 10 },
      { name: '业务能力', max: 10 },
      { name: '客户服务', max: 10 },
      { name: '开发', max: 10 },
      { name: '营销', max: 10 },
    ],
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4, 3, 2, 5, 5, 8],
          name: '专家 Json',
        },
        {
          value: [5, 4, 8, 6, 4, 6],
          name: '专家 Alex',
        },
      ],
    },
  ],
}
const myChart = ref()
onMounted(() => {
  const mychart = echarts.init(myChart.value)
  mychart.setOption(optionData.value)
})
</script>

<template>
  <el-card header="雷达图" h-300px flex flex-col body-class="flex flex-1">
    <div ref="myChart" class="flex-1" />
  </el-card>
</template>

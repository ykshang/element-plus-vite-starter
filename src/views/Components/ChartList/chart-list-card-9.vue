<script setup lang="ts">
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

const optionData = ref()
optionData.value = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%',
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      radius: '100%', // 占容器尺寸的80%
      center: ['50%', '57%'], // 水平居中，垂直偏下
      detail: {
        formatter: '{value}',
        valueAnimation: true,
        fontSize: 20,
        offsetCenter: [0, '55%'],
      },
      data: [
        {
          value: 50,
          name: 'SCORE',
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
  <el-card shadow="never" header="漏斗图" h-300px flex flex-col body-class="flex flex-1">
    <div ref="myChart" class="flex-1" />
  </el-card>
</template>

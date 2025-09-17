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
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%',
  },
  legend: {
    top: 0,
    data: ['初筛', '笔试', '面试', '谈薪', '入职'],
  },
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      top: 35,
      bottom: 0,
      left: '10%',
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 1,
      label: {
        show: true,
        position: 'inside',
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid',
        },
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
      },
      emphasis: {
        label: {
          fontSize: 14,
        },
      },
      data: [
        { value: 100, name: '初筛' },
        { value: 50, name: '笔试' },
        { value: 40, name: '面试' },
        { value: 20, name: '谈薪' },
        { value: 10, name: '入职' },
      ],
    },
  ],
}
const myChartRef = ref()
onMounted(() => {
  const myChart = echarts.init(myChartRef.value)
  myChart.setOption(optionData.value)
})
</script>

<template>
  <el-card shadow="never" header="漏斗图" flex flex-1 flex-col body-class="flex flex-1">
    <div ref="myChartRef" class="flex-1" />
  </el-card>
</template>

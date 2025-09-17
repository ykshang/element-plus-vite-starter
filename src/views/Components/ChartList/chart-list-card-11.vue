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
    data: ['超出预期', '完全胜任', '基本胜任', '未胜任（一项指标）', '未胜任（多项指标）'],
  },
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      top: 55,
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
        { value: 100, name: '超出预期' },
        { value: 90, name: '完全胜任' },
        { value: 70, name: '基本胜任' },
        { value: 30, name: '未胜任（一项指标）' },
        { value: 10, name: '未胜任（多项指标）' },
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

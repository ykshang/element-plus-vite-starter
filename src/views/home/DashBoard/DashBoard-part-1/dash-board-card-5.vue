<script setup lang="ts">
import type DateSource from '~/types/dash-board-part-1'
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

interface Props {
  dataSource: DateSource
}
const props = defineProps<Props>()
const satisfaction = ref('')
const myChart = ref()
const optionData = ref({
  tooltip: {
    trigger: 'axis',
    formatter: (params: any) => {
      const date1 = params[0].name
      const value1 = params[0].value
      const value2 = params[1].value
      return `${date1}<br/>满意度: ${(value1 * 100).toFixed(2)}% <br/>差评单据数: ${value2}`
    },
  },
  grid: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  xAxis: {
    show: false,
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: [
    { show: false, type: 'value', name: '折线图数值', min: 0.5, max: 1.1 }, // 折线图轴
    { show: false, type: 'value', name: '柱状图数值', min: 0, max: 10 }, // 柱状图轴
  ],
  series: [
    {
      type: 'line',
      yAxisIndex: 0,
      showSymbol: false,
      lineStyle: {
        normal: {
          color: 'rgb(121, 187, 255)',
          width: 3,
          type: 'dashed',
        },
      },
      data: [120, 200, 150, 80, 70, 110, 130],
    },
    {
      type: 'bar',
      yAxisIndex: 1,
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.1)',
      },
      itemStyle: {
        color: 'rgb(249, 184, 142)',
        barBorderRadius: 5,
        barWidth: '50%',
      },
      data: [120, 200, 150, 80, 70, 110, 130],
    },
  ],
})
const compareLastDay = ref('')
const compareLastClass = ref('')
const compareLastShowUp = ref(true)

onMounted(() => {
  const dataSource = props.dataSource
  const xAxisData: string[] = []
  const seriesData: number[] = []
  const seriesData1: number[] = []
  dataSource.data.forEach((item) => {
    xAxisData.push(item.date)
    seriesData.push(item.satisfaction)
    seriesData1.push(item.negativeNum)
  })
  // 较昨日
  const [lastDay, today] = seriesData.slice(-2)
  compareLastShowUp.value = today >= lastDay
  compareLastDay.value = `${Math.abs((today - lastDay) * 100).toFixed(2)}%`
  compareLastClass.value = compareLastShowUp.value ? 'color-green font-bold' : 'color-red font-bold'
  // 满意度
  satisfaction.value = `${(dataSource.totalSatisfaction * 100).toFixed(2)}%`
  // 渲染图表
  optionData.value.xAxis.data = xAxisData
  optionData.value.series[0].data = seriesData
  optionData.value.series[1].data = seriesData1
  const mychart = echarts.init(myChart.value)
  mychart.setOption(optionData.value)
})
</script>

<template>
  <div class="card-item card-info">
    <div class="left">
      <div class="card-item-title">
        满意度
      </div>
      <div class="card-item-num1">
        {{ satisfaction }}
      </div>
      <div class="card-item-num2">
        较昨日 <span :class="compareLastClass">{{ compareLastDay }}
          <div v-if="compareLastShowUp" inline-flex font-size-10px class="i-ri:arrow-up-long-line" />
          <div v-else inline-flex font-size-10px class="i-ri:arrow-down-long-line" />
        </span>
      </div>
    </div>
    <div class="mx-10px mt-10px flex flex-1">
      <div ref="myChart" class="flex-1" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-item {
  height: 100px;
  padding: 15px;
  display: flex;

  .left {
    width: 110px;
    display: flex;
    flex-direction: column;
    color: var(--ep-text-color-regular);

    .card-item-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .card-item-num1 {
      font-size: 26px;
      flex: 1;
      display: flex;
      align-items: center;
    }

    .card-item-num2 {
      font-size: 12px;
      color: var(--ep-text-color-regular);
    }
  }
}

.card-info {
  background: linear-gradient(var(--ep-color-info-light-9), var(--ep-color-info-light-8));
}
</style>

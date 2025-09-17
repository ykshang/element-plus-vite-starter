<script setup lang="ts">
import type DateSource from '~/types/dash-board-part-1'
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

interface Props {
  dataSource: DateSource
}
const props = defineProps<Props>()
const totalNum = ref(0)
const myChartRef = ref()
const optionData = ref({
  tooltip: {
    trigger: 'axis',
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
  yAxis: {
    show: false,
  },
  series: [
    {
      type: 'line',
      showSymbol: false,
      lineStyle: {
        normal: {
          color: 'rgb(144, 221, 162)',
          width: 3,
          type: 'dashed',
        },
      },
      itemStyle: {
        color: 'rgb(144, 221, 162)',
      },
      data: [120, 200, 150, 80, 70, 110, 130],
    },
  ],
})
const compareLastDay = ref(0)
const compareLastClass = ref('')
const compareLastShowUp = ref(true)

onMounted(() => {
  const dataSource = props.dataSource
  const xAxisData: string[] = []
  const seriesData: number[] = []
  dataSource.data.forEach((item) => {
    xAxisData.push(item.date)
    seriesData.push(item.closeNum)
  })
  // 较昨日
  const [lastDay, today] = seriesData.slice(-2)
  compareLastShowUp.value = today >= lastDay
  compareLastDay.value = Math.abs(today - lastDay)
  compareLastClass.value = compareLastShowUp.value ? 'color-green font-bold' : 'color-red font-bold'
  // 总数
  totalNum.value = dataSource.totalClosed
  // 渲染图表
  optionData.value.xAxis.data = xAxisData
  optionData.value.series[0].data = seriesData
  const myChart = echarts.init(myChartRef.value)
  myChart.setOption(optionData.value)
})
</script>

<template>
  <div class="card-item card-success">
    <div class="left">
      <div class="card-item-title">
        已关闭
      </div>
      <div class="card-item-num1">
        {{ totalNum }}
      </div>
      <div class="card-item-num2">
        较昨日 <span :class="compareLastClass">{{ compareLastDay }}
          <div v-if="compareLastShowUp" inline-flex font-size-10px class="i-ri:arrow-up-long-line" />
          <div v-else inline-flex font-size-10px class="i-ri:arrow-down-long-line" />
        </span>
      </div>
    </div>
    <div class="mx-10px mt-10px flex flex-1">
      <div ref="myChartRef" class="flex-1" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-item {
  height: 150px;
  padding: 15px;
  display: flex;

  .left {
    width: 110px;
    display: flex;
    flex-direction: column;
    color: var(--ep-text-color-regular);

    .card-item-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .card-item-num1 {
      font-size: 24px;
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

.card-success {
  background: linear-gradient(var(--ep-color-success-light-9), var(--ep-color-success-light-8));
}
</style>

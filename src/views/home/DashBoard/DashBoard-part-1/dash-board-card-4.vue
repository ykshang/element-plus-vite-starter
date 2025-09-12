<script setup lang="ts">
import type DateSource from '~/types/dash-board-part-1'
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

interface Props {
  dataSource: DateSource
}
const props = defineProps<Props>()
const totalSlaNum = ref(0)
const myChart = ref()
const optionData = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
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
  yAxis: {
    show: false,
    max: 10,
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.1)',
      },
      itemStyle: {
        color: 'rgb(246, 156, 96)',
        barBorderRadius: 5,
        barWidth: '50%',
      },
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
    seriesData.push(item.slaNum)
  })
  // 较昨日
  const [lastDay, today] = seriesData.slice(-2)
  compareLastShowUp.value = today > lastDay
  compareLastDay.value = Math.abs(today - lastDay)
  compareLastClass.value = compareLastShowUp.value ? 'color-red font-bold' : 'color-green font-bold'
  // 总数
  totalSlaNum.value = dataSource.totalSlaNum
  // 渲染图表
  optionData.value.xAxis.data = xAxisData
  optionData.value.series[0].data = seriesData
  const mychart = echarts.init(myChart.value)
  mychart.setOption(optionData.value)
})
</script>

<template>
  <div class="card-item card-error">
    <div class="left">
      <div class="card-item-title">
        超时工单
      </div>
      <div class="card-item-num1">
        {{ totalSlaNum }}
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

.card-error {
  background: linear-gradient(var(--ep-color-error-light-9), var(--ep-color-error-light-8));
}
</style>

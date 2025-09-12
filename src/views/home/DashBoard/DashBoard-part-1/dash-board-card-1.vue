<script setup lang="ts">
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

// 组装 card1 模块测试数据
interface tickerType {
  date: string // 日期
  createNum: number // 当日新增问题单
  closeNum: number // 当日关闭问题单
  slaNum: number // 当日SLA超时问题单
  negativeNum: number // 当日不满意问题单
  satisfaction: number // 当日满意度
}
interface DateSource {
  data: tickerType[]
  totalNum: number // 问题单总数
  totalClosed: number // 关闭问题单总数
  totalOpened: number // 打开问题单总数
  totalNegativeNum: number // 不满意问题单总数
  totalSlaNum: number // SLA超时问题单总数
}

interface Props {
  dataSource: DateSource
}
const props = defineProps<Props>()
const totalNum = ref(0)
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
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        color: 'rgb(121, 187, 255)',
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
    seriesData.push(item.createNum)
  })
  // 较昨日
  const [lastDay, today] = seriesData.slice(-2)
  compareLastShowUp.value = today > lastDay
  compareLastDay.value = Math.abs(today - lastDay)
  compareLastClass.value = today - lastDay > 0 ? 'color-red font-bold' : 'color-green font-bold'
  // 总数
  totalNum.value = dataSource.totalNum
  // 渲染图表
  optionData.value.xAxis.data = xAxisData
  optionData.value.series[0].data = seriesData
  const mychart = echarts.init(myChart.value)
  mychart.setOption(optionData.value)
})
</script>

<template>
  <div class="card-item card-primary">
    <div class="left">
      <div class="card-item-title">
        工单总量
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

.card-primary {
  background: linear-gradient(var(--ep-color-primary-light-9), var(--ep-color-primary-light-8));
}
</style>

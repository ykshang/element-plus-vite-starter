<script setup lang="ts">
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

interface dataSourceType1 {
  date: string
  createNum: number
  closeNum: number
}
interface Props {
  dataSource: dataSourceType1[]
}
const props = defineProps<Props>()
const totalNum = ref(0)
const createdNum = ref(0)
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
onMounted(() => {
  // console.log(myChart.value)
  const dataSource = props.dataSource
  const xAxisData: string[] = []
  const seriesData: number[] = []
  dataSource.forEach((item) => {
    totalNum.value += item.createNum
    xAxisData.push(item.date)
    seriesData.push(item.createNum)
  })
  createdNum.value = dataSource[dataSource.length - 1].createNum

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
        较昨日 <span class="color-red font-bold">{{ createdNum }}
          <div inline-flex font-size-10px class="i-ri:arrow-up-long-line" />
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

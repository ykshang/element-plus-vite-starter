<script setup lang="ts">
import type DateSource from '~/types/dash-board-part-1'
import { onMounted, ref, watchEffect } from 'vue'
import echarts from '~/config/echarts'

interface Props {
  dataSource: DateSource
}
const props = defineProps<Props>()
const totalNum = ref(0)
const myChart = ref()
const optionData = ref({
  tooltip: {
    trigger: 'item',
  },
  grid: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  series: [
    {
      name: '问题单数量',
      type: 'pie',
      radius: ['50%', '75%'],
      center: ['50%', '50%'],
      width: '100%',
      height: '100%',
      padAngle: 2,
      itemStyle: {
        borderRadius: '10%',
        borderWidth: 2,
      },
      data: [
        { value: 484, name: '办公设备' },
        { value: 735, name: '权限相关' },
        { value: 1048, name: '会议支持' },
        { value: 484, name: '办公网络' },
        { value: 300, name: '其他' },
      ],
    },
  ],
})
const compareLastDay = ref(0)
const compareLastClass = ref('')
const compareLastShowUp = ref(true)

onMounted(() => {
  const mychart = echarts.init(myChart.value)
  const seriesData: number[] = []
  let tempNum = props.dataSource.totalNum
  // 将总单数随机分配给五种类型
  let count = 1
  while (count < 5) {
    const val = Math.floor(Math.random() * tempNum)
    seriesData.push(val)
    tempNum = tempNum - val
    count++
  }
  seriesData.push(tempNum)
  optionData.value.series[0].data.forEach((item, index) => {
    item.value = seriesData[index]
  })
  mychart.setOption(optionData.value)
  watchEffect(() => {
    const dataSource = props.dataSource
    // 总数
    totalNum.value = dataSource.totalNum
    // 较昨日
    const [lastDay, today] = dataSource.data.slice(-2)
    compareLastShowUp.value = today.createNum >= lastDay.createNum
    compareLastDay.value = Math.abs(today.createNum - lastDay.createNum)
    compareLastClass.value = compareLastShowUp.value ? 'color-green font-bold' : 'color-red font-bold'
  })
})
</script>

<template>
  <div class="card-item card-info">
    <div class="left">
      <div class="card-item-title">
        类型分布
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
  .right {
    flex: 1;
  }
}
.card-info {
  background: linear-gradient(var(--ep-color-info-light-9), var(--ep-color-info-light-8));
}
</style>

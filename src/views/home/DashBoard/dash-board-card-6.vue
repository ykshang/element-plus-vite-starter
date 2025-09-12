<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
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
    trigger: 'item',
  },
  grid: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: '问题单数量',
      type: 'pie',
      radius: ['50%', '100%'],
      center: ['50%', '50%'],
      width: '100%',
      height: '200%',
      // adjust the start and end angle
      startAngle: 180,
      endAngle: 360,
      itemStyle: {
        borderRadius: '10%',
        borderWidth: 2,
      },
      data: [
        { value: 484, name: '办公设备' },
        { value: 735, name: '办公网络、权限' },
        { value: 1048, name: '会议支持' },
        { value: 484, name: '办公用品' },
        { value: 300, name: '其他' },
      ],
    },
  ],
})
onMounted(() => {
  const mychart = echarts.init(myChart.value)
  watchEffect(() => {
    const dataSource = props.dataSource
    dataSource.forEach((item) => {
      totalNum.value += item.createNum
    })
    createdNum.value = dataSource[dataSource.length - 1].createNum
    mychart.setOption(optionData.value)
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
        较昨日 <span class="color-red font-bold">{{ createdNum }}<div inline-flex font-size-10px class="i-ri:arrow-up-long-line" /></span>
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
  .right {
    flex: 1;
  }
}
.card-info {
  background: linear-gradient(var(--ep-color-info-light-9), var(--ep-color-info-light-8));
}
</style>

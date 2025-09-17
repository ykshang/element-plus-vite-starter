<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

import echarts from '~/config/echarts'

const myChartRef = ref()
const xAxisData = [
  '北京',
  '天津',
  '河北',
  '山西',
  '内蒙古',
  '辽宁',
  '吉林',
  '黑龙江',
  '上海',
  '江苏',
  '浙江',
  '安徽',
  '福建',
  '江西',
  '山东',
  '河南',
  '湖北',
  '湖南',
  '广东',
  '广西',
  '海南',
  '重庆',
  '四川',
  '贵州',
  '云南',
  '西藏',
  '陕西',
  '甘肃',
  '青海',
  '宁夏',
  '新疆',
  '港澳台',
]
const xAxisDataLenght = xAxisData.length
const seriesData1 = []
const seriesData2 = []
const totalNum = ref(0)
for (let i = 0; i < xAxisDataLenght; i++) {
  const total = 200 + Math.floor(Math.random() * 50)
  totalNum.value += total
  const num1 = Math.floor(Math.random() * 10) < 2 ? 0 : Math.floor(Math.random() * 20)
  const num2 = total - num1
  seriesData1.push(num2)
  seriesData2.push(num1)
}
const optionData = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    left: '50%',
    top: 0,
  },
  grid: {
    top: 40,
    bottom: 20,
    left: 20,
    right: 20,
  },
  // 修改xAxis数据部分
  xAxis: {
    type: 'category',
    data: xAxisData,
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: '#888',
      rotate: 45,
    },
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      name: '已巡检设备',
      data: seriesData1,
      type: 'bar',
      stack: 'total',
      barWidth: '50%',
      label: {
        show: true,
        color: '#444',
      },
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: 'rgb(121, 187, 255)',
      },
    },
    {
      name: '未巡检设备',
      data: seriesData2,
      type: 'bar',
      stack: 'total',
      barWidth: '50%',
      label: {
        show: true,
        color: '#444',
      },
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: 'rgb(160, 207, 255)',
      },
    },
  ],
})
const dattitl = dayjs().format('YYYY-MM-DD')
onMounted(() => {
  // 总数
  // 渲染图表
  const myChart = echarts.init(myChartRef.value)
  myChart.setOption(optionData.value)
})
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex">
        巡检数据
        <div class="flex-1 text-right font-size-12px color-[--ep-text-color-secondary]">
          更新日期：{{ dattitl }}
        </div>
      </div>
    </template>
    <div class="card-item card-primary">
      <div class="left">
        <div class="card-item-title">
          巡检覆盖
        </div>
        <div class="card-item-num1">
          {{ totalNum }}
        </div>
      </div>
      <div class="mx-10px mt-10px flex flex-1">
        <div ref="myChartRef" class="flex-1" />
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
  .card-item {
  height: 250px;
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

.card-primary {
  background: linear-gradient(var(--ep-color-primary-light-9), var(--ep-color-primary-light-8));
}
</style>

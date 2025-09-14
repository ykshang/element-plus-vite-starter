<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

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
      type: 'pie',
      radius: ['40%', '75%'],
      center: ['50%', '50%'],
      width: '100%',
      height: '100%',
      avoidLabelOverlap: false,
      padAngle: 2,
      // adjust the start and end angle
      itemStyle: {
        borderRadius: '10%',
        borderWidth: 2,
      },
      data: [
        { value: 484, name: '直接研发' },
        { value: 735, name: '间接研发' },
        { value: 1048, name: '辅助支持' },
        { value: 484, name: '培训与学习' },
        { value: 300, name: '其他' },
      ],
    },
  ],
})
onMounted(() => {
  const mychart = echarts.init(myChart.value)
  const seriesData: number[] = []
  // 将总单数随机分配给五种类型
  let tempNum = 240
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
})
</script>

<template>
  <el-card shadow="never">
    <template #header>
      工时投入
    </template>
    <div h-350px flex>
      <div ref="myChart" class="flex-1" />
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
</style>

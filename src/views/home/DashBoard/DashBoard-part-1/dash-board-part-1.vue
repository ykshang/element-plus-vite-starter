<script setup lang="ts">
import dayjs from 'dayjs'
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

const dataSource: DateSource = {
  data: [],
  totalNum: 0,
  totalClosed: 0,
  totalOpened: 0,
  totalNegativeNum: 0,
  totalSlaNum: 0,
}
function getSpecifiedNum() {
  return Math.floor(Math.random() * 10) > 2 ? 0 : Math.floor(Math.random() * 5)
}
function generateNum() {
  return {
    createNums: 50 + Math.floor(Math.random() * 50),
    closeNums: 50 + Math.floor(Math.random() * 50),
  }
}
let totalNum = 0
let totalClosed = 0
let totalNegativeNum = 0
let totalSlaNum = 0
while (dataSource.data.length < 30) {
  const length = dataSource.data.length
  const dateString = dayjs().subtract(30 - length, 'day').format('YYYY-MM-DD')
  const slaNums = getSpecifiedNum()
  const negativeNums = getSpecifiedNum()
  let breakFlag = true
  // 保证只塞入一次
  while (breakFlag) {
    const { createNums, closeNums } = generateNum()
    // 确保总数量 >= 关闭数量
    if ((totalNum + createNums) >= (totalClosed + closeNums)) {
      totalNum += createNums
      totalClosed += closeNums
      totalNegativeNum += negativeNums
      totalSlaNum += slaNums
      const satisfaction = Math.floor((1 - negativeNums / closeNums) * 100)
      dataSource.data.push({
        date: dateString,
        createNum: createNums,
        closeNum: closeNums,
        slaNum: slaNums,
        negativeNum: negativeNums,
        satisfaction,
      })
      breakFlag = false
    }
  }
}
dataSource.totalNum = totalNum
dataSource.totalClosed = totalClosed
dataSource.totalOpened = totalNum - totalClosed
dataSource.totalNegativeNum = totalNegativeNum
dataSource.totalSlaNum = totalSlaNum
// eslint-disable-next-line no-console
console.log(dataSource)
</script>

<template>
  <div class="card card1">
    <div class="card-title">
      工单分析
      <div class="card-title-sub">
        最近30天数据
      </div>
    </div>
    <div class="card-content">
      <dash-board-card-1 :data-source="dataSource" />
      <!-- <dash-board-card-2 :data-source="dataSource" /> -->
      <!-- <dash-board-card-3 :data-source="dataSource" /> -->
      <!-- <dash-board-card-4 :data-source="dataSource" /> -->
      <!-- <dash-board-card-5 :data-source="dataSource" /> -->
      <!-- <dash-board-card-6 :data-source="dataSource" /> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  background: var(--ep-bg-color);
  padding: 15px;
  text-align: left;
  box-sizing: border-box;
  .card-title {
    display: flex;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 25px;
    .card-title-sub {
      flex: 1;
      text-align: right;
      font-size: 12px;
      font-weight: 400;
      color: var(--ep-text-color-placeholder);
    }
  }
  .card-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
  }
}
</style>

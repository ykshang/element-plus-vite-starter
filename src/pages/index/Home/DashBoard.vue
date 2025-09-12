<script setup lang='ts'>
import dayjs from 'dayjs'
// 组装 card1 模块测试数据
interface dataSourceType1 {
  date: string
  createNum: number
  closeNum: number
  totalNum: number
  totalClosed: number
}
const dataSource4Card1: dataSourceType1[] = []

function generateNum() {
  return {
    createNums: 50 + Math.floor(Math.random() * 50),
    closeNums: 50 + Math.floor(Math.random() * 50),
  }
}
let totalNum = 0
let totalClosed = 0
while (dataSource4Card1.length < 30) {
  const length = dataSource4Card1.length
  const dateString = dayjs().subtract(30 - length, 'day').format('YYYY-MM-DD')
  let breakFlag = true
  // 保证只塞入一次
  while (breakFlag) {
    const { createNums, closeNums } = generateNum()
    // 确保总数量 >= 关闭数量
    if ((totalNum + createNums) >= (totalClosed + closeNums)) {
      totalNum += createNums
      totalClosed += closeNums
      dataSource4Card1.push({
        date: dateString,
        createNum: createNums,
        closeNum: closeNums,
        totalNum,
        totalClosed,
      })
      breakFlag = false
    }
  }
}
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
      <dash-board-card-1 :data-source="dataSource4Card1" />
      <dash-board-card-2 :data-source="dataSource4Card1" />
      <dash-board-card-3 :data-source="dataSource4Card1" />
      <dash-board-card-4 :data-source="dataSource4Card1" />
      <dash-board-card-5 :data-source="dataSource4Card1" />
      <dash-board-card-6 :data-source="dataSource4Card1" />
    </div>
  </div>
  <div class="dash-board-card-1">
    卡片1
  </div>
</template>

<style lang="scss" scoped>
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

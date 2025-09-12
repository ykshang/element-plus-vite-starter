<script setup lang="ts">
import { ref, watchEffect } from 'vue'

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
watchEffect(() => {
  const dataSource = props.dataSource
  dataSource.forEach((item) => {
    totalNum.value += item.createNum
  })
  createdNum.value = dataSource[dataSource.length - 1].createNum
})
</script>

<template>
  <div class="card-item card-success">
    <div class="left">
      <div class="card-item-title">
        已关闭工单
      </div>
      <div class="card-item-num1">
        {{ totalNum }}
      </div>
      <div class="card-item-num2">
        较昨日 <span class="color-red font-bold">{{ createdNum }}<div inline-flex font-size-10px class="i-ri:arrow-up-long-line" /></span>
      </div>
    </div>
    <div class="right">
      1
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
.card-success {
  background: linear-gradient(var(--ep-color-success-light-9), var(--ep-color-success-light-8));
}
</style>

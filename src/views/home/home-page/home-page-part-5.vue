<script lang="ts" setup>
import dayjs from 'dayjs'
import { reactive, ref } from 'vue'

const calendarContent: DataContent[] = reactive([])

class DataContent {
  constructor(
    public date: number,
    public workHour: number,
    public isToday: boolean,
    public isCurrentMonth: boolean,
    public isFuture: boolean,
    public isWeekend: boolean,
  ) {
  }
}
// 组装日历标题
const calendarTitle = ref(['日', '一', '二', '三', '四', '五', '六'])
// 获取今天的日期和月份
const todayDate = dayjs().format('YYYY-MM-DD')
const todayMonth = dayjs().month()
const calendarStart = dayjs().startOf('week').subtract(28, 'day')
let count = 0
while (count < 35) {
  // 日历日
  const thisDay = dayjs(calendarStart).add(count, 'day').endOf('day')
  calendarContent.push(new DataContent(
    thisDay.date(), // 当天的日期
    Math.floor(Math.random() * 8) + 8, // 当天投入的工时
    todayDate === thisDay.format('YYYY-MM-DD'), // 是否是当前天
    todayMonth === thisDay.month(), // 是否是当前月
    thisDay.valueOf() > dayjs().valueOf(), // 是否是未来的日期
    thisDay.day() === 0 || thisDay.day() === 6, // 是否是周末
  ))
  count++
}
function getCanlendarDateClass(item: DataContent) {
  const res = 'calendar-date'
  if (item.isToday) {
    return `${res} isToday`
  }
  if (item.isWeekend) {
    return `${res} isweekend`
  }
  return res
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      工作日历
    </template>
    <div class="grid-layout">
      <div v-for="title in calendarTitle" :key="title" class="calendar-title">
        {{ title }}
      </div>
      <div v-for="date in calendarContent" :key="date.date" :class="getCanlendarDateClass(date)">
        {{ date.date }}
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.grid-layout {
  height: 350px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 40px repeat(5, 1fr);
  border: 1px solid var(--ep-border-color);
  .calendar-title {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--ep-border-color);
    background-color: var(--ep-bg-color-page);
  }
  .calendar-date {
    border: 1px solid var(--ep-border-color);
    background-color: var(--ep-bg-color);
    padding: 5px 8px;
    color: var(--ep-text-color-secondary);
    font-size: 14px;
    &:hover {
      background-color: var(--ep-color-primary-light-8);
    }
  }
  .isweekend {
    background: var(--ep-fill-color-extra-light);
  }
  .isToday {
    background: var(--ep-color-primary-light-8);
  }
}
</style>

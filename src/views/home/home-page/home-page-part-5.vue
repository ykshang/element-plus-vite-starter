<script lang="ts" setup>
// import { ref } from 'vue'
</script>

<template>
  <el-card shadow="never">
    <template #header>
      工作日历
    </template>
    <el-scrollbar>
      <el-calendar h-300px class="calendar-card">
        <template #date-cell="{ data }">
          <div>{{ data.date.getDate() }}</div>
        </template>
      </el-calendar>
    </el-scrollbar>
  </el-card>
</template>

<style lang="scss" scoped>
</style>

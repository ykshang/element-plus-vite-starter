<script setup lang="ts">
</script>

<template>
  <div flex-1>
    <el-row>
      <el-col :span="24" mb-10px>
        <home-page-part-1 />
      </el-col>
    </el-row>
    <el-row :gutter="10" mb-10px>
      <el-col :span="16" flex>
        <home-page-part-2 />
      </el-col>
      <el-col :span="8" flex>
        <home-page-part-3 />
      </el-col>
    </el-row>
    <el-row :gutter="10" mb-10px>
      <el-col :span="8" flex>
        <home-page-part-4 flex-1 />
      </el-col>
      <el-col :span="16" flex>
        <home-page-part-5 />
      </el-col>
      <!-- <el-col :span="8" flex>
        <home-page-part-6 />
      </el-col> -->
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
</style>

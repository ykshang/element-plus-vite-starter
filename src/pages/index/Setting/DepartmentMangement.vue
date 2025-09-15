<template>
  <el-splitter class="mb-20px" h-full>
    <el-splitter-panel flex size="400px" overflow-hidden>
      <department-mangement-left />
    </el-splitter-panel>
    <el-splitter-panel flex :min="200" overflow-hidden>
      <department-mangement-right />
    </el-splitter-panel>
  </el-splitter>
</template>

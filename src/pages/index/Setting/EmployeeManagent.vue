<template>
  <el-splitter style="margin-bottom: 10px" h-full>
    <el-splitter-panel flex size="400px" overflow-hidden>
      <employee-mangement-left />
    </el-splitter-panel>
    <el-splitter-panel flex :min="200" overflow-hidden>
      <employee-mangement-right />
    </el-splitter-panel>
  </el-splitter>
</template>

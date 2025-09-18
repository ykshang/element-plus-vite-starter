<template>
  <el-splitter style="margin-bottom: 10px" h-full overflow-hidden>
    <el-splitter-panel flex size="400px" overflow-hidden>
      <employee-management-left />
    </el-splitter-panel>
    <el-splitter-panel flex :min="200" overflow-hidden>
      <employee-management-right />
    </el-splitter-panel>
  </el-splitter>
</template>

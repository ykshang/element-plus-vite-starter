<template>
  <el-splitter>
    <el-splitter-panel size="30%">
      <department-mangement-left />
    </el-splitter-panel>
    <el-splitter-panel :min="200">
      <department-mangement-right />
    </el-splitter-panel>
  </el-splitter>
</template>

<template>
  <el-splitter h-full overflow-hidden>
    <el-splitter-panel flex size="30%" overflow-hidden>
      <department-mangement-left />
    </el-splitter-panel>
    <el-splitter-panel :min="200">
      <department-mangement-right />
    </el-splitter-panel>
  </el-splitter>
</template>

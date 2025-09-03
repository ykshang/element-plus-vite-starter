<script lang="ts" setup>
import { ref } from 'vue'
// 控制弹窗显示
const dialogVisible = ref(false)
const loading = ref(false)
function handleClose() {
  dialogVisible.value = false
}
function handleOpen() {
  // console.log('2233')
  dialogVisible.value = true
}
defineExpose({
  handleOpen,
  handleClose,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" width="60%" title="字典项管理" draggable @closed="handleClose">
    <div v-loading="loading">
      1
    </div>
  </el-dialog>
</template>

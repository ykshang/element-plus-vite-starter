<script lang="ts" setup>
import type { Action } from 'element-plus'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

function open() {
  ElNotification({
    title: 'Notification',
    message: '1221131as',
  })
  ElMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}
</script>

<template>
  <el-button plain @click="open">
    Click to open the Message Box
  </el-button>
</template>

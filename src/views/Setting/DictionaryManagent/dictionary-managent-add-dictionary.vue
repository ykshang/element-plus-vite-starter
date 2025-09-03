<script setup lang="ts">
import { ElMessage, ElNotification } from 'element-plus'
import { reactive, ref, toRaw } from 'vue'

import { register } from '~/composables/services/userService'

const emit = defineEmits(['close'])
const loading = ref(false)
// 控制弹窗显示
const dialogVisible = ref(false)
// 初始化注册表单
const registerForm = reactive({
  dictionaryKey: '',
  dictionaryName: '',
  desc: '',
})
function handleRegister() {
  loading.value = true
  register(toRaw(registerForm)).then((res: any) => {
    loading.value = false
    if (res.data) {
      handleClose()
      ElNotification.success({
        title: '通知',
        message: '注册成功',
      })
    } else {
      ElMessage.error(res?.msg)
    }
  })
  // 注册成功后可关闭弹窗
}
function handleOpen() {
  // console.log('注册弹窗2233')
  dialogVisible.value = true
}
function handleClose() {
  dialogVisible.value = false
  // console.log('关闭弹窗')
  emit('close')
}
defineExpose({
  handleOpen,
  handleClose,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" v-loading="loading" width="550px" title="新增字典" draggable @closed="handleClose">
    <el-form :model="registerForm" label-suffix="：" label-width="150px" label-position="left" class="px-40px py-20px">
      <el-form-item label="字典关键词">
        <el-input v-model="registerForm.dictionaryKey" />
      </el-form-item>
      <el-form-item label="字典名称">
        <el-input v-model="registerForm.dictionaryName" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="registerForm.desc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleRegister">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>

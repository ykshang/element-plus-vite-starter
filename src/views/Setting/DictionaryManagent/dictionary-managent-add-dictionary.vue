<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { reactive, ref, toRaw } from 'vue'
import dictionaryService from '~/composables/services/dictionaryService'

const emit = defineEmits(['close'])
const loading = ref(false)
// 控制弹窗显示
const dialogVisible = ref(false)
// 初始化注册表单
const formData = reactive({
  dictionaryKey: '',
  dictionaryName: '',
  desc: '',
})
function onSubmit() {
  loading.value = true
  dictionaryService.createDictionary(toRaw(formData)).then((res: any) => {
    loading.value = false
    if (res.status === 'success') {
      ElNotification.success('操作成功')
      handleClose()
    } else {
      ElNotification.error(`操作失败：${res.msg}`)
    }
  })
}
function handleOpen() {
  // console.log('注册弹窗2233')
  dialogVisible.value = true
}
function handleClose() {
  dialogVisible.value = false
  // console.log('关闭弹窗')
  emit('close', 'init')
}
defineExpose({
  handleOpen,
  handleClose,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" v-loading="loading" width="550px" title="新增字典" draggable @closed="handleClose">
    <el-form :model="formData" label-suffix="：" label-width="150px" label-position="left" class="px-40px py-20px">
      <el-form-item label="字典关键词">
        <el-input v-model="formData.dictionaryKey" />
      </el-form-item>
      <el-form-item label="字典名称">
        <el-input v-model="formData.dictionaryName" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="formData.desc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>

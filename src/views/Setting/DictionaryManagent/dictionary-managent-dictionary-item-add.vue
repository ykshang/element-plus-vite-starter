<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { reactive, ref, toRaw } from 'vue'
import dictionaryService from '~/composables/services/dictionaryService'

interface RuleForm {
  dictionaryItemkey: string
  dictionaryItemName: string
  dictionaryKey: string
  desc?: string
}
const emit = defineEmits(['close'])
const loading = ref(false)
// 控制弹窗显示
const dialogVisible = ref(false)
// 初始化注册表单
const formData = reactive<RuleForm>({
  dictionaryItemkey: '',
  dictionaryItemName: '',
  dictionaryKey: '',
  desc: '',
})
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<RuleForm>>({
  dictionaryItemkey: [
    { required: true, message: '该字段不能为空', trigger: 'blur' },
  ],
  dictionaryItemName: [
    { required: true, message: '该字段不能为空', trigger: 'blur' },
  ],
})
async function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      // console.log('formData', formData)
      loading.value = true
      dictionaryService.createDictionaryItem(toRaw(formData)).then((res: any) => {
        loading.value = false
        if (res.status === 'success') {
          ElNotification.success('操作成功')
          handleCloseAndRefresh()
        } else {
          ElNotification.error(`操作失败：${res.msg}`)
        }
      })
    }
  })
}
function handleOpen(params: string) {
  // console.log('params', params)
  formData.dictionaryKey = params
  dialogVisible.value = true
}
function handleCloseAndRefresh() {
  dialogVisible.value = false
  emit('close', 'refresh')
}
function handleClose() {
  dialogVisible.value = false
  emit('close')
  // console.log('关闭弹窗')
}
defineExpose({
  handleOpen,
  handleClose,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" width="550px" title="新增字典项" draggable @closed="handleClose">
    <el-form
      ref="ruleFormRef"
      v-loading="loading"
      :model="formData"
      :rules="rules"
      label-suffix="："
      label-width="150px"
      label-position="left"
      class="px-40px py-20px"
    >
      <el-form-item label="字典项关键词" prop="dictionaryItemkey" required>
        <el-input v-model="formData.dictionaryItemkey" />
      </el-form-item>
      <el-form-item label="字典项名称" prop="dictionaryItemName" required>
        <el-input v-model="formData.dictionaryItemName" />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="formData.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { reactive, ref, toRaw } from 'vue'
import dictionaryService from '~/composables/services/dictionaryService'

interface RuleForm {
  _id: string
  dictionaryKey: string
  dictionaryName: string
  desc?: string
}
const emit = defineEmits(['close'])
const loading = ref(false)
// 控制弹窗显示
const dialogVisible = ref(false)
// 初始化注册表单
const formData = reactive<RuleForm>({
  _id: '',
  dictionaryKey: '',
  dictionaryName: '',
  desc: '',
})
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<RuleForm>>({
  dictionaryKey: [
    { required: true, message: '该字段不能为空', trigger: 'blur' },
  ],
  dictionaryName: [
    { required: true, message: '该字段不能为空', trigger: 'blur' },
  ],
})
async function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      dictionaryService.updateDictionary(toRaw(formData)).then((res: any) => {
        loading.value = false
        if (res.status === 'success') {
          ElNotification.success('操作成功')
          handleClose()
        } else {
          ElNotification.error(`操作失败：${res.msg}`)
        }
      })
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
  formData,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" width="550px" title="编辑字典" draggable @closed="handleClose">
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
      <el-form-item label="字典关键词" prop="dictionaryKey" required>
        <el-input v-model="formData.dictionaryKey" disabled />
      </el-form-item>
      <el-form-item label="字典名称" prop="dictionaryName" required>
        <el-input v-model="formData.dictionaryName" />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="formData.desc" />
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

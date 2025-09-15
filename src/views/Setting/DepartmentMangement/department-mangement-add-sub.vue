<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { reactive, ref, toRaw } from 'vue'
import departmentService from '~/composables/services/departmentService'

interface RuleForm {
  departmentCode: string
  departmentName: string
  departmentShortName: string
  parentDepartmentCode: string
  departmentLevel: number
  description?: string
}
const emit = defineEmits(['close'])
const loading = ref(false)
// 控制弹窗显示
const dialogVisible = ref(false)
// 初始化注册表单
const formData = reactive<RuleForm>({
  departmentName: '',
  departmentShortName: '',
  departmentCode: '',
  parentDepartmentCode: '',
  departmentLevel: 1,
  description: '',
})
const parentDepartmentName = ref('')
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<RuleForm>>({
  departmentName: [
    { required: true, message: '该字段不能为空', trigger: 'blur' },
  ],
  departmentShortName: [
    { required: true, message: '该字段不能为空', trigger: 'blur' },
  ],
})
async function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      departmentService.createDepartment(toRaw(formData)).then((res: any) => {
        loading.value = false
        if (res.success) {
          ElNotification.success('操作成功')
          handleCloseAndRefresh()
        }
      }).catch(({ error }) => {
        ElNotification.error({
          title: error.errTitle,
          message: error.errMsg,
        })
        loading.value = false
      })
    }
  })
}
function handleOpen(row: any) {
  // console.log('注册弹窗2233', row)
  formData.parentDepartmentCode = row.departmentCode
  formData.departmentLevel = row.departmentLevel + 1
  parentDepartmentName.value = row.departmentName
  dialogVisible.value = true
}
function handleClose() {
  dialogVisible.value = false
  // console.log('关闭弹窗')
  emit('close')
}
function handleCloseAndRefresh() {
  dialogVisible.value = false
  // console.log('关闭弹窗')
  emit('close', 'refresh')
}
defineExpose({
  handleOpen,
  handleClose,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" width="550px" title="新增子部门" draggable @closed="handleClose">
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
      <el-form-item label="上级部门" prop="parentDepartmentCode">
        {{ parentDepartmentName }}
      </el-form-item>
      <el-form-item label="上级编码" prop="parentDepartmentCode" required>
        {{ formData.parentDepartmentCode }}
      </el-form-item>
      <el-form-item label="部门名称" prop="departmentName" required>
        <el-input v-model="formData.departmentName" />
      </el-form-item>
      <el-form-item label="部门简称" prop="departmentShortName" required>
        <el-input v-model="formData.departmentShortName" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formData.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" />
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

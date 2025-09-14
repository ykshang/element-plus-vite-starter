<!-- eslint-disable no-console -->
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'

import type { UserInfoStore } from '~/types/User'
import { storeToRefs } from 'pinia'
import { reactive, ref, toRaw } from 'vue'

import officeData from '~/config/office-data'
import { useUserInfoStore } from '~/stores/userIfnoStroe'

// 办公室数据
const options = ref(officeData)

// 导入用户信息
const userInfoStore = useUserInfoStore()
const { currentUserInfo } = storeToRefs(userInfoStore)

// 初始化表单数据
const userInfo = toRaw(currentUserInfo.value)
const ruleForm = ref<UserInfoStore>(JSON.parse(JSON.stringify(userInfo)))

const ruleFormRef = ref<FormInstance>()

// 表单校验
const rules = reactive<FormRules<UserInfoStore>>({
  lastName: [
    { required: true, message: '请输入姓氏', trigger: 'blur' },
    { min: 1, max: 50, message: '长度不能超过50个字符', trigger: 'blur' },
  ],
  firstName: [
    { required: true, message: '请输入名字', trigger: 'blur' },
    { min: 1, max: 50, message: '长度不能超过50个字符', trigger: 'blur' },
  ],
  fullName: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 1, max: 100, message: '长度不能超过100个字符', trigger: 'blur' },
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change',
    },
  ],
  phoneNumber: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '手机号长度必须为11位', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  birthday: [
    {
      type: 'date',
      required: true,
      message: '请选择生日',
      trigger: 'change',
    },
  ],
  offices: [
    {
      required: true,
      message: '请选择办公地址',
      trigger: 'change',
    },
  ],
})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <el-card shadow="never">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="150"
      label-position="left"
      label-suffix="："
    >
      <el-form-item label="姓氏" prop="lastName" required>
        <el-input v-model="ruleForm.lastName" placeholder="请输入姓氏" />
      </el-form-item>
      <el-form-item label="名字" prop="firstName" required>
        <el-input v-model="ruleForm.firstName" placeholder="请输入名字" />
      </el-form-item>
      <el-form-item label="姓名" prop="fullName" required>
        <el-input v-model="ruleForm.fullName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别" prop="sex" required>
        <el-radio-group v-model="ruleForm.sex">
          <el-radio value="男">
            男
          </el-radio>
          <el-radio value="女">
            女
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" prop="birthday" required>
        <el-date-picker
          v-model="ruleForm.birthday"
          type="date"
          aria-label="请选择生日"
          placeholder="请选择生日"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber" required>
        <el-input v-model="ruleForm.phoneNumber" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="办公地址" prop="offices" required>
        <el-cascader v-model="ruleForm.offices" style="flex:1" :options="options" />
      </el-form-item>
      <el-form-item label="简介" prop="brief">
        <el-input v-model="ruleForm.brief" type="textarea" placeholder="请输入简介" :autosize="{ minRows: 4, maxRows: 6 }" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

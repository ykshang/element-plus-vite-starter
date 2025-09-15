// api/user.ts

import { post } from '~/config/axios'
// 获取字典列表
export async function createDepartment(params: any) {
  return await post('/api/department/createDepartment', params)
}

export async function getDepartmentList(params: any) {
  return await post('/api/department/getDepartmentList', params)
}
export default {
  createDepartment,
  getDepartmentList,
}

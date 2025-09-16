// api/user.ts

import { deleteMethod, post } from '~/config/axios'
// 获取字典列表
export async function createDepartment(params: any) {
  return await post('/api/department/createDepartment', params)
}

export async function getDepartmentList(params: any) {
  return await post('/api/department/getDepartmentList', params)
}
export async function main(params: any) {
  return await post('/api/department/main', params)
}
export async function deleteDepartment(departmentCode: string) {
  return await deleteMethod(`/api/department/${departmentCode}`)
}
export default {
  createDepartment,
  getDepartmentList,
  main,
  deleteDepartment,
}

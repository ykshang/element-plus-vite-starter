// api/user.ts

import { getMethod, postMethod } from '~/config/axios'
// 获取字典列表
export async function createDepartment(params: any) {
  return await postMethod('/api/department/createDepartment', params)
}

export async function getDepartmentList(params: any) {
  return await postMethod('/api/department/getDepartmentList', params)
}
export async function main(params: any) {
  return await postMethod('/api/department/main', params)
}
export async function deleteDepartment(departmentCode: string) {
  return await postMethod(`/api/department/delete/${departmentCode}`)
}
export async function getSubDepartments(params: any) {
  return await getMethod('/api/department/getSubDepartments', params)
}

export default {
  createDepartment,
  getDepartmentList,
  main,
  deleteDepartment,
  getSubDepartments,
}

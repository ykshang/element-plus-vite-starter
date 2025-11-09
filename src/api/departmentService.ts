// api/department

import { getMethod, postMethod } from '~/config/axios'

/**
 * 创建部门
 * @param params 部门信息
 * @returns 创建结果
 */
export async function createDepartment(params: any) {
  return await postMethod('/api/department/createDepartment', params)
}
/**
 * 获取部门列表
 * @param params 部门列表查询参数
 * @returns 部门列表
 */
export async function getDepartmentList(params: any) {
  return await postMethod('/api/department/getDepartmentList', params)
}
/**
 * 部门管理页面主表格列表方法
 * @param params 部门编码
 * @returns
 */
export async function mainSearch(params: any) {
  return await postMethod('/api/department/main', params)
}
/**
 * 删除部门
 * @param departmentCode 部门编码
 * @returns
 */
export async function deleteDepartment(departmentCode: string) {
  return await postMethod(`/api/department/delete/${departmentCode}`)
}
/**
 * 获取部门下的子部门列表
 * @param params 部门编码
 * @returns 子部门列表
 */
export async function getSubDepartments(params: string) {
  return await getMethod(`/api/department/getSubDepartments/${params}`)
}
/**
 * 获取所有部门
 * @returns 部门列表
 */
export async function getAllDepartments() {
  return await getMethod(`/api/department/all`)
}
export default {
  createDepartment,
  getDepartmentList,
  mainSearch,
  getAllDepartments,
  deleteDepartment,
  getSubDepartments,
}

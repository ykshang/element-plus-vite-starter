export interface Department {
  departmentCode: string // 部门编码
  departmentName: string // 部门名称
  departmentShortName: string // 部门简称
  parentDepartmentCode: string // 父部门编码
  departmentLevel: number // 部门层级
  description: string // 部门描述
  createdAt: Date // 创建时间
  updatedAt: Date // 更新时间
  children?: Department[]
}
export type DepartmentTree = Department[]

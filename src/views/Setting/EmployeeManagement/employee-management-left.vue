<script lang="ts" setup>
import type { FilterNodeMethodFunction, FilterValue, TreeInstance, TreeNodeData } from 'element-plus'
import type { Department, DepartmentTree } from '~/types/Department'

import { onMounted, ref, watch } from 'vue'
import departmentService from '~/composables/services/departmentService'

// 部门树实例
const departmentTreeRef = ref<TreeInstance>()
// 部门树默认属性
const defaultProps = {
  children: 'children',
  label: 'departmentName',
}
// 监听 filterText 变化，触发树的过滤
const filterText = ref('')
watch(filterText, (val) => {
  departmentTreeRef.value!.filter(val)
})

/**
 *
 * @param filterText 过滤文本
 * @param depatment 部门
 * @returns boolean 是否匹配
 */
const filterDepatmentNode: FilterNodeMethodFunction = (filterText: FilterValue, depatment: TreeNodeData): boolean => {
  if (!filterText)
    return true
  return depatment.departmentName.includes(filterText) ?? false
}
// 部门树数据
const depatmentTreeData = ref()

/**
 * 获取所有部门
 * @description 从后端获取所有部门数据，并转换为树结构
 * @return void
 */
function getAllDepartments() {
  departmentService.getAllDepartments().then((res: any) => {
    if (res.success) {
      depatmentTreeData.value = transferDepartmentListToTree(res.result, '00000000000000000000')
    }
  })
}
/**
 * 转换部门列表为部门树
 * @description 将部门列表转换为部门树结构，用于部门树组件的展示
 * @param sourceList 部门列表
 * @param parentDepartmentCode 父部门编码
 * @return 部门树
 */
function transferDepartmentListToTree(sourceList: Department[], parentDepartmentCode: string): DepartmentTree {
  const targetList: Department[] = []
  const remainList: Department[] = []
  sourceList.forEach((item) => {
    if (item.parentDepartmentCode === parentDepartmentCode) {
      targetList.push(item)
    } else {
      remainList.push(item)
    }
  })
  targetList.forEach((item) => {
    item.children = transferDepartmentListToTree(remainList, item.departmentCode)
  })
  return targetList
}
onMounted(() => {
  // 初始化部门树数据
  getAllDepartments()
})
</script>

<template>
  <el-card
    shadow="never" header="部门列表" class="mr-5px w-full flex flex-col"
    body-class="flex flex-col flex-1 overflow-hidden"
  >
    <el-input v-model="filterText" class="pb-10px" placeholder="Filter keyword" />
    <!-- <el-divider class="my-5px" /> -->
    <el-scrollbar class="flex-1 border border-1px border-[--ep-border-color-light] border-solid px-5px pt-10px">
      <el-tree
        ref="departmentTreeRef" :data="depatmentTreeData" :props="defaultProps" :default-expand-all="false"
        :filter-node-method="filterDepatmentNode"
      />
      <div pb-30px />
    </el-scrollbar>
  </el-card>
</template>

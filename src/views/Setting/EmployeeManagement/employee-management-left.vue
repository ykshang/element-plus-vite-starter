<script lang="ts" setup>
import type { FilterNodeMethodFunction, FilterValue, TreeInstance, TreeNodeData } from 'element-plus'
import type { Department, DepartmentTree } from '~/types/Department'

import { onMounted, ref, watch } from 'vue'
import departmentService from '~/composables/services/departmentService'

const filterText = ref('')
const departmentTreeRef = ref<TreeInstance>()

const defaultProps = {
  children: 'children',
  label: 'departmentName',
}

watch(filterText, (val) => {
  departmentTreeRef.value!.filter(val)
})

/**
 *
 * @param filterText 过滤文本
 * @param depatment 部门
 * @returns
 */
const filterDepatmentNode: FilterNodeMethodFunction = (filterText: FilterValue, depatment: TreeNodeData) => {
  if (!filterText)
    return true
  return depatment.departmentName.includes(filterText) ?? false
}

const depatmentData = ref()
function getAllDepartments() {
  departmentService.getAllDepartments().then((res: any) => {
    if (res.success) {
      depatmentData.value = transferDepartmentListToTree(res.result, '00000000000000000000')
    }
  })
}
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
  getAllDepartments()
})
</script>

<template>
  <el-card shadow="never" header="部门列表" class="mr-5px w-full flex flex-col" body-class="flex flex-col flex-1 overflow-hidden">
    <el-input
      v-model="filterText"
      class="pb-10px"
      placeholder="Filter keyword"
    />
    <!-- <el-divider class="my-5px" /> -->
    <el-scrollbar class="flex-1 border border-1px border-[--ep-border-color-light] border-solid px-5px pt-10px">
      <el-tree
        ref="departmentTreeRef"
        :data="depatmentData"
        :props="defaultProps"
        :default-expand-all="true"
        :filter-node-method="filterDepatmentNode"
      />
      <div pb-30px />
    </el-scrollbar>
  </el-card>
</template>

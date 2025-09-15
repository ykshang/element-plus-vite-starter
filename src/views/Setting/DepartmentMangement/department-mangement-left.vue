<script lang="ts" setup>
import type { LoadFunction } from 'element-plus'
import departmentService from '~/composables/services/departmentService'

// 初始化部门树
function getNextLevelNode(parentCode: string) {
  return departmentService.getDepartmentList({
    parentDepartmentCode: parentCode,
  })
}

const props = {
  label: 'departmentName',
  children: 'zones',
  isLeaf: 'leaf',
}

const loadNode: LoadFunction = (node, resolve) => {
  // eslint-disable-next-line no-console
  console.log(node)
  // 根节点
  if (node.parent === null && node.level === 0) {
    return getNextLevelNode('root').then((res: any) => {
      resolve(res.result)
    })
  } else {
    const parentCode = node.data.departmentCode
    return getNextLevelNode(parentCode).then((res: any) => {
      resolve(res.result)
    })
  }
}
</script>

<template>
  <el-card shadow="never" mr-5px flex-1>
    <el-tree :props="props" :load="loadNode" lazy />
  </el-card>
</template>

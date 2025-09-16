<script lang="ts" setup>
import dayjs from 'dayjs'
import { nextTick, onMounted, ref } from 'vue'
import departmentService from '~/composables/services/departmentService'

const departmentName = ref('')
const tableData = ref([])
const showAddDepartmentFlg = ref(false)
const showAddSubDepartmentFlg = ref(false)
const addDepartmentRef = ref()
const addSubDepartmentRef = ref()

showAddDepartmentFlg.value = true
// 记录节点的ID，刷新方法
const nodeMap = new Map()

function openAddDepartment() {
  showAddDepartmentFlg.value = true
  nextTick(() => {
    // console.log('AddDictionaryRef', addDepartmentRef.value)
    addDepartmentRef.value.handleOpen()
  })
}
function closeAddDepartment(refreshFlg: string) {
  showAddDepartmentFlg.value = false
  if (refreshFlg === 'refresh') {
    getTableData()
  }
}
function openAddSubDepartment(row: any) {
  showAddSubDepartmentFlg.value = true
  nextTick(() => {
    // console.log('AddDictionaryRef', addDepartmentRef.value)
    addSubDepartmentRef.value.handleOpen(row)
  })
}
function closeAddSubDepartment(refreshFlg: string, nodeCode: string) {
  showAddSubDepartmentFlg.value = false
  // console.log(nodeCode)
  if (refreshFlg === 'refresh') {
    nodeCode && refreshNode(nodeCode)
  }
}
function getTableData() {
  departmentService.main({
    departmentName: departmentName.value,
  }).then((res: any) => {
    if (res.success) {
      tableData.value = []
      nextTick(() => {
        tableData.value = res.result.map((item: any) => {
          item.hasChildren = true
          item.updatedAtLabel = dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
          item.createdAtLabel = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
          item.parentDepartmentCode = item.parentDepartmentCode === '00000000000000000000' ? '' : item.parentDepartmentCode
          return item
        })
      })
    }
  })
}
onMounted(() => {
  getTableData()
})
function loadNextLevelData(row: any, treeNode: unknown, resolve: (data: any[]) => void) {
  // console.log('loadNextLevelData', row, treeNode)
  departmentService.getDepartmentList({
    parentDepartmentCode: row.departmentCode,
  }).then((res: any) => {
    if (res.success) {
      resolve(res.result.map((item: any) => {
        item.hasChildren = true
        item.updatedAtLabel = dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        item.createdAtLabel = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        item.parentDepartmentCode = item.parentDepartmentCode === '00000000000000000000' ? '' : item.parentDepartmentCode
        return item
      }))
    }
  })
}
function refreshNode(row: any) {
  const node = nodeMap.get(row.departmentCode)
  if (node) {
    loadNextLevelData(node.row, node.treeNode, node.resolve)
  }
}
function tranferLevelToText(level: number) {
  const levelTextList = ['', '一级部门', '二级部门', '三级部门', '四级部门', '五级部门', '六级部门', '七级部门', '八级部门', '九级部门', '十级部门']
  return levelTextList[level]
}
</script>

<template>
  <el-card class="card-layout" shadow="never" mb-10px flex flex-1>
    <div mb-15px flex>
      <el-button type="primary" @click="openAddDepartment">
        创建一级部门
      </el-button>
      <div ml-a flex>
        <el-input v-model="departmentName" placeholder="请输入部门名称" clearable style="width: 300px" />
        <el-button type="primary" ml-10px w-40px @click="getTableData">
          查询
        </el-button>
      </div>
    </div>
    <el-table
      :data="tableData" style="width: 100%; height: 100%;" row-key="_id" lazy :load="loadNextLevelData"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="departmentCode" label="部门编码" min-width="280" />
      <el-table-column prop="departmentName" label="部门名称" width="260" />
      <el-table-column prop="departmentShortName" label="部门简称" width="150" />
      <el-table-column prop="departmentLevel" label="部门层级" width="100">
        <template #default="{ row }">
          {{ tranferLevelToText(row.departmentLevel) }}
        </template>
      </el-table-column>
      <el-table-column prop="parentDepartmentCode" label="父级部门编码" width="220" />
      <el-table-column prop="description" label="描述" min-width="300" />
      <el-table-column prop="createdAtLabel" label="创建时间" width="180" />
      <el-table-column prop="updatedAtLabel" label="更新时间" width="180" />
      <el-table-column prop="operation" label="操作" width="120" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" title="创建子部门" @click="openAddSubDepartment(row)">
            <div class="i-ep:circle-plus" />
          </el-button>
          <el-button link type="primary" title="编辑">
            <div class="i-ep:edit" />
          </el-button>
          <el-button link type="danger" title="删除">
            <div class="i-ep:delete" />
          </el-button>
        </template>
      </el-table-column>
      <template #append>
        <div pb-30px />
      </template>
    </el-table>
  </el-card>
  <department-mangement-add v-if="showAddDepartmentFlg" ref="addDepartmentRef" @close="closeAddDepartment" />
  <department-mangement-add-sub
    v-if="showAddSubDepartmentFlg" ref="addSubDepartmentRef"
    @close="closeAddSubDepartment"
  />
</template>

<style lang="scss" scoped>
.card-layout {
  ::v-deep(.ep-card__body) {
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
  }
}
</style>

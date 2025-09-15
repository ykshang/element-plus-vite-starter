<script lang="ts" setup>
import dayjs from 'dayjs'
import { nextTick, onMounted, ref } from 'vue'
import departmentService from '~/composables/services/departmentService'

const departmentName = ref('')
const tableData = ref([])
const showAddDepartmentFlg = ref(false)
const addDepartmentRef = ref()

showAddDepartmentFlg.value = true

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

function getTableData() {
  departmentService.main({
    departmentName: departmentName.value,
  }).then((res: any) => {
    if (res.success) {
      tableData.value = res.result.map((item: any) => {
        item.hasChildren = true
        item.updatedAtLabel = dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        item.createdAtLabel = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        return item
      })
    }
  })
}
onMounted(() => {
  getTableData()
})
interface User {
  id: number
  date: string
  name: string
  address: string
  hasChildren?: boolean
  children?: User[]
}

function load(row: User, treeNode: unknown, resolve: (data: User[]) => void) {
  setTimeout(() => {
    resolve([
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])
  }, 1000)
}
</script>

<template>
  <el-card shadow="never" mb-10px flex-1>
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
      :data="tableData" style="width: 100%; height: 100%;" row-key="_id" lazy :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="departmentCode" label="部门编码" min-width="280" />
      <el-table-column prop="departmentName" label="部门名称" width="260" />
      <el-table-column prop="departmentShortName" label="部门简称" width="150" />
      <el-table-column prop="departmentLevel" label="部门层级" width="100" />
      <el-table-column prop="parentDepartmentCode" label="父级部门编码" width="220" />
      <el-table-column prop="description" label="描述" min-width="300" />
      <el-table-column prop="createdAtLabel" label="创建时间" width="180" />
      <el-table-column prop="updatedAtLabel" label="更新时间" width="180" />
      <el-table-column prop="operation" label="操作" width="150" fixed="right">
        <template #default>
          <el-button link type="primary">
            编辑
          </el-button>
          <el-button link type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <department-mangement-add v-if="showAddDepartmentFlg" ref="addDepartmentRef" @close="closeAddDepartment" />
</template>

<script lang="ts" setup>
/**
 * TODO Fix this！
 *  将节点刷新方法的入参由code 改为row ，造成删除时刷新偶问题
 * TODO
 *  编辑场景，接口未对接，节点刷新也没更新
 */
import dayjs from 'dayjs'
import { ElMessageBox, ElNotification } from 'element-plus'
import { nextTick, onMounted, ref } from 'vue'
import departmentService from '~/composables/services/departmentService'

const departmentName = ref('') // TODO Fix this！
const tableData = ref([])
const showAddDepartmentFlg = ref(false)
const showAddSubDepartmentFlg = ref(false)
const showEditDepartmentFlg = ref(false)

const addDepartmentRef = ref()
const addSubDepartmentRef = ref()
const editDepartmentRef = ref()

const allDepartments = ref<any[]>([])

const tableRef = ref()
showAddDepartmentFlg.value = true

// 新增子部门弹窗 打开方法
function openAddDepartment() {
  showAddDepartmentFlg.value = true
  nextTick(() => {
    // console.log('AddDictionaryRef', addDepartmentRef.value)
    addDepartmentRef.value.handleOpen()
  })
}
// 新增子部门弹窗 关闭方法
function closeAddDepartment(refreshFlg: string) {
  showAddDepartmentFlg.value = false
  if (refreshFlg === 'refresh') {
    getTableData()
  }
}
// 新增子部门弹窗 打开方法
function openAddSubDepartment(row: any) {
  showAddSubDepartmentFlg.value = true
  nextTick(() => {
    // console.log('AddDictionaryRef', addDepartmentRef.value)
    addSubDepartmentRef.value.handleOpen(row)
  })
}
// 新增子部门弹窗 关闭方法
function closeAddSubDepartment(refreshFlg: string, parentRow: any) {
  showAddSubDepartmentFlg.value = false
  // console.log(nodeCode)
  if (refreshFlg === 'refresh') {
    parentRow && refreshNode(parentRow)
  }
}
// 编辑部门弹窗 打开方法
function openEditDepartment(row: any) {
  showEditDepartmentFlg.value = true
  nextTick(() => {
    editDepartmentRef.value.handleOpen(row)
  })
}
// 编辑部门弹窗 关闭方法
function closeEditDepartment(refreshFlg: string, row: any) {
  showEditDepartmentFlg.value = false
  if (refreshFlg === 'refresh') {
    if (row.departmentLevel === 1) {
      getTableData()
    } else {
      row && refreshNode(row)
    }
  }
}
// 获取主表格数据
function getTableData() {
  departmentService.mainSearch({
    departmentName: departmentName.value,
  }).then((res: any) => {
    if (res.success) {
      tableData.value = []
      nextTick(() => {
        tableData.value = res.result.map((item: any) => {
          item.hasChildren = true
          return item
        })
      })
    }
  })
}
// 获取所有部门
function getAllDepartments() {
  departmentService.getAllDepartments().then((res: any) => {
    if (res.success) {
      allDepartments.value = res.result
    }
  })
}
onMounted(() => {
  getAllDepartments()
  getTableData()
})
// 加载下一级部门数据
function loadNextLevelData(row: any, treeNode: unknown, resolve: (data: any[]) => void) {
  // console.log('loadNextLevelData', row, treeNode)
  departmentService.getSubDepartments(row.departmentCode).then((res: any) => {
    if (res.success) {
      const tempList = res.result.map((item: any) => {
        item.hasChildren = true
        return item
      })
      resolve(tempList)
    }
  })
}
// 刷新节点
function refreshNode(row: any) {
  departmentService.getDepartmentList({
    parentDepartmentCode: row.departmentCode,
  }).then((res: any) => {
    if (res.success) {
      // 刷新当前节点的子节点
      const tempList = res.result.map((item: any) => {
        item.hasChildren = true
        return item
      })
      tableRef.value.store.states.lazyTreeNodeMap.value[row.departmentCode] = tempList
    }
  })
}
// 格式化部门层级
function tranferLevelToText(level: number) {
  const levelTextList = ['', '一级部门', '二级部门', '三级部门', '四级部门', '五级部门', '六级部门', '七级部门', '八级部门', '九级部门', '十级部门']
  return levelTextList[level]
}

// 点击删除按钮
function onDeleteDepartment(row: any) {
  ElMessageBox.confirm('确定删除该部门及其子部门吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
    appendTo: 'body',
  }).then(() => {
    deleteDepartment(row)
  }).catch(() => {
    ElNotification.info('操作已取消')
  })
}
// 删除部门方法
function deleteDepartment(row: any) {
  departmentService.deleteDepartment(row.departmentCode).then((res: any) => {
    if (res.success) {
      ElNotification.success('删除成功')
      if (row.departmentLevel === 1) {
        getTableData()
      } else {
        // 刷新父节点
        refreshNode(row)
      }
      // ----清理垃圾缓存 start------
      // 页面存在垃圾数据，当存在多层节点时，删除某一级节点，数据库会删除该节点及所有子节点，但是页面缓存还在
      // 获取该部门编码对应的前缀，获取已缓存的所有子部门的编码，删除这些编码对应子列表数据，并删除这个键值
      let codeList = Object.keys(tableRef.value.store.states.lazyTreeNodeMap.value)
      let code = row.departmentCode
      while (code.endsWith('00')) {
        code = code.slice(0, -2)
      }
      codeList = codeList.filter(item => item.startsWith(code))
      codeList.forEach((item) => {
        tableRef.value.store.states.lazyTreeNodeMap.value[item] = []
        delete tableRef.value.store.states.lazyTreeNodeMap.value[item]
      })
      // ---清理垃圾缓存 end---
    }
  }).catch(({ error }) => {
    ElNotification.error({
      title: '删除失败',
      message: error.errMsg,
    })
  })
}
// 格式化父层部门的名称
function parentDepartmentName(row: any) {
  if (!row.parentDepartmentCode || row.parentDepartmentCode === '00000000000000000000') {
    return ''
  }
  const parentDepartment = allDepartments.value.find(item => item.departmentCode === row.parentDepartmentCode)
  return parentDepartment ? `${parentDepartment.departmentName}（${parentDepartment.departmentCode}）` : row.parentDepartmentCode
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
      ref="tableRef" :data="tableData" style="width: 100%; height: 100%;" row-key="departmentCode" lazy
      :load="loadNextLevelData" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="departmentName" fixed="left" label="部门名称" :show-overflow-tooltip="true" width="360" />
      <el-table-column prop="departmentShortName" label="部门简称" :show-overflow-tooltip="true" width="120" />
      <el-table-column prop="departmentCode" label="部门编码" :show-overflow-tooltip="true" min-width="200" />
      <el-table-column prop="departmentLevel" label="部门层级" width="90">
        <template #default="{ row }">
          {{ tranferLevelToText(row.departmentLevel) }}
        </template>
      </el-table-column>
      <el-table-column prop="parentDepartmentCode" label="上级部门" :show-overflow-tooltip="true" width="300">
        <template #default="{ row }">
          {{ parentDepartmentName(row) }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="parentDepartmentCode" label="上层部门编码" :show-overflow-tooltip="true" min-width="200" /> -->
      <el-table-column prop="description" label="备注" :show-overflow-tooltip="true" min-width="200" />
      <el-table-column prop="createdAt" label="创建时间" width="180">
        <template #default="{ row }">
          {{ dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="180">
        <template #default="{ row }">
          {{ dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="120" fixed="right">
        <template #default="{ row }">
          <el-button
            v-if="row.departmentLevel < 10" link type="primary" title="创建子部门"
            @click="openAddSubDepartment(row)"
          >
            <div class="i-ep:circle-plus" />
          </el-button>
          <el-button link type="primary" title="编辑" @click="openEditDepartment(row)">
            <div class="i-ep:edit" />
          </el-button>
          <el-button link type="danger" title="删除" @click="onDeleteDepartment(row)">
            <div class="i-ep:delete" />
          </el-button>
        </template>
      </el-table-column>
      <template #append>
        <!-- 滚动条会遮挡最后一行，需要在最后一行添加一个空的div，用于撑起高度 -->
        <div pb-30px />
      </template>
    </el-table>
  </el-card>
  <department-management-add v-if="showAddDepartmentFlg" ref="addDepartmentRef" @close="closeAddDepartment" />
  <department-management-edit v-if="showEditDepartmentFlg" ref="editDepartmentRef" @close="closeEditDepartment" />
  <department-management-add-sub
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
    box-sizing: border-box;
  }
}
</style>

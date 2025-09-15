<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { ElMessageBox, ElNotification } from 'element-plus'
import { nextTick, onMounted, ref } from 'vue'
import departmentService from '~/composables/services/departmentService'

// 字典列表
const tableData = ref<Dictionary[]>([])
// 表格加载状态
const tableLoading = ref(false)
const btnDisabled = ref(false)
// 获取查询结果
function initTableData() {
  btnDisabled.value = true
  tableLoading.value = true
  const requestParam = getRequestParam()
  departmentService.getDepartmentList(requestParam).then((res: any) => {
    tableLoading.value = false
    btnDisabled.value = false
    console.log('字典列表', res)
    if (res.success) {
      res.result.forEach((item: any) => {
        item.createdAtLabel = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        item.updatedAtLabel = dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      })
      tableData.value = res.result
    }
  })
}

// 初始化加载
onMounted(() => {
  initTableData()
})
// 获取查询参数
function getRequestParam() {
  return {
    parentDepartmentCode: 'root',
  }
}
// 删除选中的列
function deleteDictionary(row: any) {
  // console.log('删除', row)
  ElMessageBox.confirm('确定删除这条数据？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
    appendTo: 'body',
  }).then(() => {
    const requestParam = { _id: row._id }
    // departmentService.removeDictionary(requestParam).then((res: any) => {
    //   if (res.success) {
    //     ElNotification.success('删除成功')
    //     initTableData()
    //   }
    // }).catch(({ error }) => {
    //   ElNotification.error({
    //     title: '删除失败',
    //     message: error.errMsg,
    //   })
    // })
  }).catch(() => {
    ElNotification.info('取消操作')
  })
}
const showAddDepartmentFlg = ref(false)
const addDepartmentRef = ref()
const showEditDictionaryFlg = ref(false)
const editDictionaryRef = ref()
const showDictionaryItemFlg = ref(false)
const dictionaryItemRef = ref()

function openAddDictionary() {
  showAddDepartmentFlg.value = true
  nextTick(() => {
    // console.log('AddDictionaryRef', addDepartmentRef.value)
    addDepartmentRef.value.handleOpen()
  })
}
function closeAddDepartment(refreshFlg: string) {
  showAddDepartmentFlg.value = false
  if (refreshFlg === 'refresh') {
    initTableData()
  }
}
function closeEditDictionary(refreshFlg: string) {
  showEditDictionaryFlg.value = false
  if (refreshFlg === 'refresh') {
    initTableData()
  }
}

function openEditDictionary(row: any) {
  showEditDictionaryFlg.value = true
  nextTick(() => {
    editDictionaryRef.value.formData._id = row._id
    editDictionaryRef.value.formData.dictionaryKey = row.dictionaryKey
    editDictionaryRef.value.formData.dictionaryName = row.dictionaryName
    editDictionaryRef.value.formData.description = row.description
    editDictionaryRef.value.handleOpen()
  })
}
</script>

<template>
  <el-card shadow="never" ml-5px flex-1>
    <el-button type="primary" mb-15px :icon="Plus" @click="openAddDictionary">
      新增
    </el-button>
    <div v-loading="tableLoading" class="flex flex-1 flex-col">
      <el-table stripe :data="tableData" style="width: 100%; height: 100%;">
        <el-table-column type="index" width="50" />
        <el-table-column prop="departmentCode" label="部门编码" width="200" />
        <el-table-column prop="departmentName" label="部门名称" width="200" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createdAtLabel" label="创建时间" width="200" />
        <el-table-column prop="updatedAtLabel" label="更新时间" width="200" />
        <el-table-column prop="operation" label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" @click="openEditDictionary(scope.row)">
              编辑
            </el-button>
            <el-button link type="danger" @click="deleteDictionary(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
    </div>
    <employee-mangement-add v-if="showAddDepartmentFlg" ref="addDepartmentRef" @close="closeAddDepartment" />
    <!-- <dictionary-managent-edit-dictionary v-if="showEditDictionaryFlg" ref="editDictionaryRef" @close="closeEditDictionary" /> -->
    <!-- <dictionary-managent-dictionary-item v-if="showDictionaryItemFlg" ref="dictionaryItemRef" @close="closeDictionaryItem" /> -->
  </el-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ElMessageBox, ElNotification } from 'element-plus'
import { nextTick, onMounted, reactive, ref } from 'vue'
import dictionaryService from '~/composables/services/dictionaryService'

// 分页组件初始化数据
const pagenation: Pagenation = reactive({
  pageNum: 1,
  pageSize: 20,
  total: 1000,
})

// 字典查询条件
const formInline = reactive({
  dictionaryKey: '',
})
// 提交查询
function onClickSearch() {
  initTableData()
}
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
  dictionaryService.getDictionaryListByPage(requestParam).then((res: any) => {
    tableLoading.value = false
    btnDisabled.value = false
    // console.log('字典列表', res)
    if (res.status === 'success') {
      res.result.list.forEach((item: any) => {
        item.createdAtLabel = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        item.updatedAtLabel = dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      })
      tableData.value = res.result.list
      pagenation.total = res.result.total
    }
  })
}

// 分页变化时，重新组装分页数据
function handlePagenationChange(params: any) {
  pagenation.pageNum = params.pageNum
  pagenation.pageSize = params.pageSize
  initTableData()
}
// 初始化加载
onMounted(() => {
  initTableData()
})
// 获取查询参数
function getRequestParam() {
  return {
    dictionaryKey: formInline.dictionaryKey,
    pageNum: pagenation.pageNum,
    pageSize: pagenation.pageSize,
  }
}
// 删除选中的列
function deleteDictionary(row: any) {
  // eslint-disable-next-line no-console
  console.log('删除', row)
  ElMessageBox.confirm('确定删除这条数据？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
    appendTo: 'body',
  }).then(() => {
    const requestParam = { _id: row._id }
    dictionaryService.removeDictionary(requestParam).then((res: any) => {
      if (res.status === 'success') {
        ElNotification.success('删除成功')
        initTableData()
      } else {
        ElNotification.error('删除失败')
      }
    })
  }).catch(() => {
    ElNotification.info('取消操作')
  })
}
const showAddDictionaryFlg = ref(false)
const addDictionaryRef = ref()
const showEditDictionaryFlg = ref(false)
const editDictionaryRef = ref()
function openAddDictionary() {
  showAddDictionaryFlg.value = true
  nextTick(() => {
    // console.log('AddDictionaryRef', addDictionaryRef.value)
    addDictionaryRef.value.handleOpen()
  })
}
function closeAddDictionary(type: string) {
  showAddDictionaryFlg.value = false
  if (type === 'init') {
    initTableData()
  }
}
function closeEditDictionary(type: string) {
  showEditDictionaryFlg.value = false
  if (type === 'init') {
    initTableData()
  }
}
function openEditDictionary(row: any) {
  showEditDictionaryFlg.value = true
  nextTick(() => {
    editDictionaryRef.value.formData.id = row._id
    editDictionaryRef.value.formData.dictionaryKey = row.dictionaryKey
    editDictionaryRef.value.formData.dictionaryName = row.dictionaryName
    editDictionaryRef.value.formData.desc = row.desc
    editDictionaryRef.value.handleOpen()
  })
}
</script>

<template>
  <div class="page-container overflow-hidden">
    <div class="page-container-header">
      <div flex flex-1>
        <el-button type="primary" @click="openAddDictionary">
          新增
        </el-button>
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.dictionaryKey" placeholder="请输入字典关键词" clearable />
        </el-form-item>
        <el-form-item>
          <el-button :disabled="btnDisabled" type="primary" @click="onClickSearch">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="tableLoading" class="page-container-content flex flex-1 flex-col">
      <el-table :data="tableData" style="width: 100%; height: 100%;">
        <el-table-column type="index" width="50" />
        <el-table-column prop="dictionaryKey" label="关键字" width="200" />
        <el-table-column prop="dictionaryName" label="字典名称" width="200" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="createdAtLabel" label="创建时间" width="200" />
        <el-table-column prop="updatedAtLabel" label="更新时间" width="200" />
        <el-table-column prop="operation" label="操作" width="200">
          <template #default="scope">
            <el-button link type="primary" @click="openEditDictionary(scope.row)">
              编辑
            </el-button>
            <el-button link type="danger" @click="deleteDictionary(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-pagenation class="mt-20px" :pagenation="pagenation" @change="handlePagenationChange" />
      <dictionary-managent-add-dictionary v-if="showAddDictionaryFlg" ref="addDictionaryRef" @close="closeAddDictionary" />
      <dictionary-managent-edit-dictionary v-if="showEditDictionaryFlg" ref="editDictionaryRef" @close="closeEditDictionary" />
    </div>
  </div>
</template>

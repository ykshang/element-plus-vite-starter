<script lang="ts" setup>
import { Plus, Refresh } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { ElMessageBox, ElNotification } from 'element-plus'
import { nextTick, reactive, ref } from 'vue'
import dictionaryService from '~/composables/services/dictionaryService'

// 控制弹窗显示
const dialogVisible = ref(false)
const tableLoading = ref(false)
const tableData = ref([])
// 分页数据
const pagenation: Pagenation = reactive({
  pageNum: 1,
  pageSize: 20,
  total: 1000,
})

// 新增弹窗引用
const addDictionaryItemRef = ref()
// 控制弹窗显示隐藏
const showAddDictionaryItemFlg = ref(false)
// 当前窗口的关闭
function handleClose() {
  dialogVisible.value = false
}
const dictionaryKey = ref('')
// 当前窗口的打开
function handleOpen(params: string) {
  // console.log('params', params)
  dictionaryKey.value = params
  dialogVisible.value = true
  initTableData()
}
// 编辑按钮
// eslint-disable-next-line unused-imports/no-unused-vars
function editDictionaryItem(row: any) {
  // eslint-disable-next-line no-console
  console.log('编辑', row)
}
function getRequestParam() {
  return {
    dictionaryKey: dictionaryKey.value,
    pageNum: pagenation.pageNum,
    pageSize: pagenation.pageSize,
  }
}
// 获取查询结果
function initTableData() {
  // btnDisabled.value = true
  tableLoading.value = true
  const requestParam = getRequestParam()
  dictionaryService.getDictionaryItemListByDictionaryKeyByPage(requestParam).then((res: any) => {
    tableLoading.value = false
    // btnDisabled.value = false
    if (res.success) {
      const { data, total } = res.result
      data.forEach((item: any) => {
        item.createdAtLabel = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        item.updatedAtLabel = dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      })
      tableData.value = data
      pagenation.total = total
    }
  }).catch(({ error }) => {
    tableLoading.value = false
    ElNotification.error({
      title: error.errTitle,
      message: error.errMsg,
    })
  })
}
// 删除按钮
function deleteDictionaryItem(row: any) {
  ElMessageBox.confirm('确定删除这条数据？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
    appendTo: 'body',
  }).then(() => {
    const requestParam = { _id: row._id }
    dictionaryService.removeDictionaryItem(requestParam).then((res: any) => {
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
// 打开新增弹窗
function showAddDictionaryItem() {
  showAddDictionaryItemFlg.value = true
  nextTick(() => {
    addDictionaryItemRef.value.handleOpen(dictionaryKey.value)
  })
}
// 关闭新增弹窗
function closeAddDictionaryItem(refreshFlg: string) {
  showAddDictionaryItemFlg.value = false
  if (refreshFlg === 'refresh') {
    initTableData()
  }
}
// 编辑弹窗引用
const editDictionaryItemRef = ref()
// 控制弹窗显示隐藏
const showEditDictionaryItemFlg = ref(false)
// 关闭编辑弹窗
function closeEditDictionaryItem(refreshFlg: string) {
  showEditDictionaryItemFlg.value = false
  if (refreshFlg === 'refresh') {
    initTableData()
  }
}
// 打开编辑弹窗
// eslint-disable-next-line unused-imports/no-unused-vars
function showEditDictionaryItem(row: any) {
  // console.log(row)
  showEditDictionaryItemFlg.value = true
  nextTick(() => {
    editDictionaryItemRef.value.handleOpen(dictionaryKey.value)
  })
}

// 分页变化时，重新组装分页数据
function handlePagenationChange(params: any) {
  pagenation.pageNum = params.pageNum
  pagenation.pageSize = params.pageSize
  initTableData()
}
defineExpose({
  handleOpen,
  handleClose,
})
</script>

<template>
  <div>
    <el-dialog v-model="dialogVisible" width="70%" title="字典项管理" draggable class="mx-10px" @closed="handleClose">
      <div class="my-20px flex">
        <el-button type="primary" :icon="Plus" @click="showAddDictionaryItem">
          新增
        </el-button>
        <el-button type="primary" :icon="Refresh" @click="initTableData">
          刷新
        </el-button>
      </div>
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%; height: 400px">
        <el-table-column type="index" width="50" />
        <el-table-column prop="dictionaryItemkey" label="字典项关键字" width="200" />
        <el-table-column prop="dictionaryItemName" label="字典项名称" width="200" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createdAtLabel" label="创建时间" width="180" />
        <el-table-column prop="updatedAtLabel" label="更新时间" width="180" />
        <el-table-column prop="operation" label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" @click="showEditDictionaryItem(scope.row)">
              编辑
            </el-button>
            <el-button link type="danger" @click="deleteDictionaryItem(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <table-pagenation class="mt-20px" :pagenation="pagenation" @change="handlePagenationChange" />
      <div class="mt-20px flex justify-end">
        <el-button type="primary" @click="handleClose">
          关闭页面
        </el-button>
      </div>
    </el-dialog>
    <dictionary-managent-dictionary-item-add v-if="showAddDictionaryItemFlg" ref="addDictionaryItemRef" @close="closeAddDictionaryItem" />
    <dictionary-managent-dictionary-item-edit v-if="showEditDictionaryItemFlg" ref="editDictionaryItemRef" @close="closeEditDictionaryItem" />
  </div>
</template>

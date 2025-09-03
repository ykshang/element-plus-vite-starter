<script lang="ts" setup>
import { Plus, Refresh } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { nextTick, ref } from 'vue'
import dictionaryService from '~/composables/services/dictionaryService'

// 控制弹窗显示
const dialogVisible = ref(false)
const tableLoading = ref(false)
const tableData = ref([])
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
function editDictionaryItem(row: any) {
  // eslint-disable-next-line no-console
  console.log('编辑', row)
}
// 获取查询结果
function initTableData() {
  // btnDisabled.value = true
  tableLoading.value = true
  dictionaryService.getDictionaryItemList({
    dictionaryKey: dictionaryKey.value,
  }).then((res: any) => {
    tableLoading.value = false
    // btnDisabled.value = false
    if (res.status === 'success') {
      res.result.forEach((item: any) => {
        item.createdAtLabel = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        item.updatedAtLabel = dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      })
      tableData.value = res.result
    }
  })
}
// 删除按钮
function deleteDictionaryItem(row: any) {
  // eslint-disable-next-line no-console
  console.log('删除', row)
}
// 打开新增弹窗
function showAddDictionaryItem() {
  showAddDictionaryItemFlg.value = true
  nextTick(() => {
    addDictionaryItemRef.value.handleOpen(dictionaryKey.value)
  })
}
// 关闭新增弹窗
function closeAddDictionaryItem() {
  showAddDictionaryItemFlg.value = false
}
defineExpose({
  handleOpen,
  handleClose,
})
</script>

<template>
  <div>
    <el-dialog v-model="dialogVisible" width="70%" title="字典项管理" draggable @closed="handleClose">
      <div class="my-10px flex">
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
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="createdAtLabel" label="创建时间" width="180" />
        <el-table-column prop="updatedAtLabel" label="更新时间" width="180" />
        <el-table-column prop="operation" label="操作" width="200">
          <template #default="scope">
            <el-button link type="primary" @click="editDictionaryItem(scope.row)">
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
    </el-dialog>
    <dictionary-managent-dictionary-item-add v-if="showAddDictionaryItemFlg" ref="addDictionaryItemRef" @close="closeAddDictionaryItem" />
  </div>
</template>

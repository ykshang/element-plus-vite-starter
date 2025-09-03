<script lang="ts" setup>
import { Plus, Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'

// 控制弹窗显示
const dialogVisible = ref(false)
const loading = ref(false)
function handleClose() {
  dialogVisible.value = false
}
const tableData = ref([])
function handleOpen() {
  // console.log('2233')
  dialogVisible.value = true
}
function editDictionaryItem(row: any) {
  // eslint-disable-next-line no-console
  console.log('编辑', row)
}
function deleteDictionaryItem(row: any) {
  // eslint-disable-next-line no-console
  console.log('删除', row)
}

defineExpose({
  handleOpen,
  handleClose,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" width="70%" title="字典项管理" draggable @closed="handleClose">
    <div class="my-10px flex">
      <el-button type="primary" :icon="Plus">
        新增
      </el-button>
      <el-button type="primary" :icon="Refresh">
        刷新
      </el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%; height: 400px;">
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
</template>

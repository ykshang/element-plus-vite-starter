<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, reactive, ref } from 'vue'
import dictionaryService from '~/composables/services/dictionaryService'
// const request = {
//   dictionaryKey: 'test-31112311',
//   name: '测试字典1131214',
//   desc: '这是一个测试字典131',
// }

// dictionaryService.createDictionary(request).then((res) => {
//   console.log('字典列表', res)
//   if (res.status === 'success') {
//     console.log('字典列表', res.data)
//   } else {
//     console.log('获取字典列表失败', res.msg)
//   }
// })

// 分页组件初始化数据
const pagenation: Pagenation = reactive({
  pageNum: 1,
  pageSize: 10,
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
</script>

<template>
  <div class="page-container overflow-hidden">
    <div class="page-container-header">
      <div flex flex-1>
        <el-button type="primary">
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
        <el-table-column prop="name" label="字典名称" width="200" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="createdAtLabel" label="创建时间" width="200" />
        <el-table-column prop="updatedAtLabel" label="更新时间" width="200" />
        <el-table-column prop="operation" label="操作" width="200">
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
      <table-pagenation class="mt-20px" :pagenation="pagenation" @change="handlePagenationChange" />
    </div>
  </div>
</template>

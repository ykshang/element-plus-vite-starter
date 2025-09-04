// api/user.ts

import { post } from '~/config/axios'
// 获取字典列表
export function getDictionaryListByPage(params?: any) {
  // console.log('注册参数', params)
  return post('/api/dictionary/getDictionaryListByPage', params).then((res) => {
    // console.log('注册成功', res)
    return Promise.resolve(res)
  })
}
export function createDictionary(params: any) {
  // console.log('创建字典参数', params)
  return post('/api/dictionary/createDictionary', params).then((res) => {
    // console.log('创建字典成功', res)
    return Promise.resolve(res)
  })
}
export function updateDictionary(params: any) {
  // console.log('更新字典参数', params)
  return post('/api/dictionary/updateDictionary', params).then((res) => {
    // console.log('更新字典', res)
    return Promise.resolve(res)
  })
}
export function removeDictionary(params: any) {
  // console.log('字典参数', params)
  return post('/api/dictionary/removeDictionary', params).then((res) => {
    // console.log('删除结果', res)
    return Promise.resolve(res)
  })
}
export function createDictionaryItem(params: any) {
  // console.log('创建字典项参数', params)
  return post('/api/dictionary/createDictionaryItem', params).then((res) => {
    // console.log('创建字典项成功', res)
    return Promise.resolve(res)
  })
}
export function getDictionaryItemList(params: any) {
  // console.log('获取字典项列表参数', params)
  return post('/api/dictionary/getDictionaryItemList', params).then((res) => {
    // console.log('获取字典项列表成功', res)
    return Promise.resolve(res)
  })
}
export function removeDictionaryItem(params: any) {
  // console.log('请求体', params)
  return post('/api/dictionary/removeDictionaryItem', params).then((res) => {
    // console.log('删除字典项成功', res)
    return Promise.resolve(res)
  })
}
export default {
  getDictionaryListByPage,
  createDictionary,
  updateDictionary,
  removeDictionary,
  createDictionaryItem,
  getDictionaryItemList,
  removeDictionaryItem,
}

import axios from 'axios'
// utils/request.ts

import NProgress from 'nprogress'

const responseStatusText = {
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  409: '请求冲突，资源已存在',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
}
// 创建一个axios实例
const request = axios.create({
  baseURL: '',
  timeout: 20000,
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    NProgress.start() // 手动启动进度条
    // 请求地址携带时间戳
    const _t = new Date().getTime()
    config.url += `?${_t}`

    // 请求头携带token
    config.headers.token = localStorage.getItem('token') || ''

    // 在发送请求之前做些什么
    // console.log('我要准备请求啦------')
    // console.log(config, '请求配置')

    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    NProgress.done() // 手动完成进度条
    // 对响应数据做点什么
    // console.log('我接收到响应数据啦------')
    // console.log(response, '响应配置')
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    const errorInfo = {
      errTitle: '请求失败',
      errMsg: '请联系你的管理员',
    }
    // 对响应错误做点什么
    if (error && error.response) {
      const status = error.response.status as keyof typeof responseStatusText
      if (responseStatusText[status]) {
        error.message = responseStatusText[status]
      } else {
        error.message = `未知错误${error.response.status}`
      }
      // 后端返回的报错信息
      errorInfo.errMsg = error.response.data?.message
    } else {
      error.message = '连接到服务器失败'
    }
    error.error = errorInfo
    return Promise.reject(error)
  },
)

/*
 *  get请求:从服务器端获取数据
 *  url:请求地址
 *  params:参数
 * */
export function get(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'get',
      params,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *  post请求:向服务器端提交数据
 *  url:请求地址
 *  params:参数
 * */
export function post(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'post',
      data: params,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/*
 *  post请求:向服务器端提交数据
 *  url:请求地址
 *  params:参数
 * */
export function deleteMethod(url: string) {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'delete',
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 对外暴露请求方法
export default {
  get,
  post,
  deleteMethod,
}

// api/user.ts

import { postMethod } from '~/config/axios'

// 登录
export function login(params: any) {
  // console.log('登录参数', params)
  return postMethod('/api/user/login', params).then((res) => {
    // console.log('登录成功', res)
    return Promise.resolve(res)
  })
}
// 注册
export function register(params: any) {
  // console.log('注册参数', params)
  return postMethod('/api/user/info', params).then((res) => {
    // console.log('注册成功', res)
    return Promise.resolve(res)
  })
}
// 登录

// 获取用户信息

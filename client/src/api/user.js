import { http } from '@/utils/http'

// 用户管理 - 增
export const addUser = (params) => {
  return http.request('post', '/user/add', { params })
}

// 用户管理 - 删
export const delUser = (params) => {
  return http.request('post', '/user/del', { params })
}

// 用户管理 - 改
export const updateUser = (params) => {
  return http.request('post', '/user/update', { params })
}

// 用户管理 - 查
export const getUser = (params) => {
  return http.request('get', '/user/list', { params })
}

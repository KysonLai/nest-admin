import { http } from '@/utils/http'

/** 登录 */
export const signin = (params) => {
  return http.request('post', '/auth/signin', { params })
}

/** 注册 */
export const signup = (params) => {
  return http.request('post', '/auth/signup', { params })
}

/** 刷新token */
export const refreshTokenApi = (params) => {
  return http.request('post', '/refreshToken', { params })
}

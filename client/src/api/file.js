import { http } from '@/utils/http'

// 文件上传
export const upload = (params) => {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return http.request('post', '/file/upload', { data: params }, config)
}

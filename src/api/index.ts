import hyRequest from '@/utils/request'

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

hyRequest.request<DataType>({
  url: '',
  method: 'GET'
})

//post method= {post | put}
export function httpAction(url: string, parameter: any, method: any): Promise<DataType> {
  return hyRequest.request({
    url: url,
    method: method,
    data: parameter
  })
}

// post
export function postAction(url: string, parameter: any) {
  return hyRequest.request<DataType>({
    url: url,
    method: 'post',
    data: parameter
  })
}

// put
export function putAction(url: string, parameter: any) {
  return hyRequest.request<DataType>({
    url: url,
    method: 'put',
    data: parameter
  })
}

// get
export function getAction(url: string, parameter: any) {
  return hyRequest.request<DataType>({
    url: url,
    method: 'get',
    params: parameter
  })
}

// delete
export function deleteAction(url: string, parameter: any) {
  return hyRequest.request<DataType>({
    url: url,
    method: 'delete',
    params: parameter
  })
}

// 下载文件，用于excel导出 get
export function downFileGet(url: string, parameter: any) {
  return hyRequest.request<DataType>({
    url: url,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

// 下载文件，用于excel导出 post
export function downFilePost(url: string, parameter: any) {
  return hyRequest.request<DataType>({
    url: url,
    method: 'post',
    params: parameter,
    responseType: 'blob'
  })
}

// 文件上传
export function uploadAction(url: string, parameter: any) {
  return hyRequest.request<DataType>({
    url: url,
    data: parameter,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data' // 文件上传
    }
  })
}

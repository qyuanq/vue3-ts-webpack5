import hyRequest from '@/utils/request'
import qs from 'qs'

interface DataType<T = any> {
  result: T
  code: string | number
  success: boolean
}

// post
export function postAction(url: string, parameter: any): Promise<DataType> {
  return hyRequest.post<DataType>({
    url: url,
    data: parameter
  })
}

// put
export function putAction(url: string, parameter: any): Promise<DataType> {
  return hyRequest.put<DataType>({
    url: url,
    data: parameter
  })
}

// get
export function getAction(url: string, parameter: any): Promise<DataType> {
  return hyRequest.get<DataType>({
    url: url,
    params: parameter
  })
}

// delete
export function deleteAction(url: string, parameter: any): Promise<DataType> {
  return hyRequest.delete<DataType>({
    url: url,
    params: parameter
  })
}

// 下载文件，用于excel导出 get
export function downFileGet(url: string, parameter: any): Promise<DataType> {
  return hyRequest.get<DataType>({
    url: url,
    params: parameter,
    responseType: 'blob'
  })
}

// 下载文件，用于excel导出 post
export function downFilePost(url: string, parameter: any): Promise<DataType> {
  return hyRequest.post<DataType>({
    url: url,
    params: parameter,
    responseType: 'blob'
  })
}

// 文件上传
export function uploadAction(url: string, parameter: any): Promise<DataType> {
  return hyRequest.post<DataType>({
    url: url,
    data: parameter,
    headers: {
      'Content-Type': 'multipart/form-data' // 文件上传
    }
  })
}

//post 序列化参数
export function loginAPI(url: string, parameter: any): Promise<DataType> {
  return hyRequest.post({
    url: url,
    data: parameter,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      (data) => {
        return qs.stringify(data)
      }
    ]
  })
}

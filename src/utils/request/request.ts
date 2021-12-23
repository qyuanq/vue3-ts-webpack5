import axios from 'axios'
// 实例类型
import type { AxiosInstance } from 'axios'
// 自定义接口
import type { HYRequestInterceptors, HYRequestConfig } from './type'

import { Toast } from 'vant'

// 创建不同的axios实例
class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存信息
    this.interceptors = config.interceptors

    // 创建拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器（传参才有）
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.全局拦截器，添加所有实例拦截
    this.instance.interceptors.request.use(
      (config) => {
        // @todo添加loading
        return config
      },
      (err) => {
        // return err
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (config) => {
        // @todo移除loadinging
        const data = config.data
        if (data.success) {
          return data
        } else {
          //2. 返回200，服务器没有正常返回数据
          Toast.fail(`服务器错误 ${data.message}`)
        }
      },
      (err) => {
        // @todo移除loading
        //1. 响应失败返回错误码
        switch (err.response.status) {
          case 403:
            Toast.fail('拒绝访问')
            break
          case 404:
            Toast.fail('很抱歉资源未找到')
            break
          case 401:
            Toast.fail('未授权，请重新登录')
            break
          case 500:
            Toast.fail('服务器错误')
            break
          case 504:
            Toast.fail('网络超时')
            break
          default:
            Toast.fail(`系统提示${err.response.message}`)
            break
        }
        // return err
        return Promise.reject(err)
      }
    )
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断是否需要显示loading
      // if (config.showLoading === false) {
      //   this.showLoading = false
      // }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          //这样不会影响下一个请求
          // this.showLoading = true

          //将结果resolve
          resolve(res)
        })
        .catch((err) => {
          //这样不会影响下一个请求
          // this.showLoading = true
          reject(err)
        })
    })
  }
}
export default HYRequest

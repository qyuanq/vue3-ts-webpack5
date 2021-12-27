import axios from 'axios'
// 实例类型
import type { AxiosInstance } from 'axios'
// 自定义接口
import type { HYRequestInterceptors, HYRequestConfig } from './type'

import { Toast, Dialog } from 'vant'

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
        let message = ''
        //1. 响应失败返回错误码
        switch (err.response.status) {
          case 400:
            message = '参数不正确'
            break
          case 401:
            message = '您未登录，或者登录已经超时，请先登录！'
            break
          case 403:
            message = '拒绝访问'
            break
          case 404:
            message = '很抱歉资源未找到'
            break
          case 500:
            message = '服务器错误'
            break
          case 502:
            message = '网关错误'
            break
          case 503:
            message = '服务不可用'
            break
          case 504:
            message = '网络超时，请稍后再试！'
            break
          default:
            message = `系统提示${err.response.message}` //异常问题，请联系管理员！
            break
        }
        Toast.fail(message)
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

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  put<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}
export default HYRequest

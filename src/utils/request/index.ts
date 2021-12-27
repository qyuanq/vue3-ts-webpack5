import HYRequest from './request'
const hyRequest = new HYRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 9000,
  interceptors: {
    requestInterceptor: (config) => {
      //从localStorage获取token
      const token = '1111'
      if (token) {
        config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
        // config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (config) => {
      return config
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})
export default hyRequest

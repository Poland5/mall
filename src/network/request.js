import axios from 'axios'

// 这种导出是考虑扩展性，如果还有实例直接添加
// 因为需要给回调者使用，所以我们多传两个参数（函数），success、failure
export function request(config) {
  // 1. 创建实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: "http://152.136.185.210:7878/api/m5"
  })

  // axios拦截器 对请求拦截
  instance.interceptors.request.use(config => {
    return config; // 必须返回出去，否则在请求拦截后，外部将无法获取信息
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  // 发送真正的网络请求（这个实例方法是给回调者使用的所以必须给回调出去）
  return instance(config)
}


import { request } from './request'

export function getMultidata() {
  return request({
    url: '/home/multidata'
  })
}
// 获取商店数据 如：home/data/type=pop&page=1
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        commit(ADD_COUNT, oldProduct)
        resolve('数量加1')
      } else {
        payload.count = 1
        commit(ADD_TO_CART, payload)
        resolve('添加新的商品')
      }
    })
  }
}

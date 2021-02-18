/**
 * 安装插件，让其他页面可以直接通过this.$toast调用这个组件
 */

import Toast from './Toast.vue'

const obj = {}
obj.install = function (Vue) {
  // - 实现将组件对象添加到页面的body中
  // 1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2. 根据组件构造器，可以创建出来一个组件
  const toast = new toastContrustor
  // 3. 将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement('div'))
  // 4. toast.$el就是对应的div
  document.body.appendChild(toast.$el)

  // - 最终实现全局this.$toast
  Vue.prototype.$toast = toast
}

export default obj

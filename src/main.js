import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast/index'

Vue.config.productionTip = false

// 安装toast插件，会执行obj.install函数
Vue.use(toast)
Vue.use(VueLazyload)

// 解决移动端300ms延迟
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

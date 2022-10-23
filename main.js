import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
// 装饰器模式 模拟路由守卫
// const methodToPatch = ['navigateTo', 'redirectTo', 'switchTab', 'navigateBack']
// methodToPatch.map(item => {
//     const original = uni[item] 
//     uni[item] = function(opt = {}, needAuth) {
//          if (needAuth && !uni.getStorageInfoSync("token")) { // 需要登录且未登录
//             uni.navigateTo({
//                 url: '/pages/login/login'
//             })  
//          } else {
//              return original.call(this, opt)
//          }
//     }
// })
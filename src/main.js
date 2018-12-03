// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "@/styles/rem.js"
import "@/styles/index.less"
import store from "./store/index.js"

//导航守卫 路由拦截器,控制tabBar的显示隐藏
router.beforeEach((to,from,next) => {
  let path = to.path
  if(path === '/home' || path === '/category' || path === '/cart' || path === '/mine'){
    store.state.tabBarShow = true
  }else{
    store.state.tabBarShow = false
  }
  next()
})

//引入axios
import axios from "axios"
//引入fastclick
import fastclick from "fastclick"
fastclick.attach(document.body)

Vue.prototype.$http = axios

//按需引入swiper  mint-ui 
import { Swipe, SwipeItem, Lazyload, MessageBox } from 'mint-ui'
//全局组件
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.prototype.$msg = MessageBox

Vue.use(Lazyload)

//使用自己的插件
import addCart from "@/plugin/addCart"
Vue.use(addCart)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

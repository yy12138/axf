import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
//首页
const Home = resolve => require(['pages/Home/Home.vue'],resolve)
//闪送超市
const Category = resolve => require(['pages/Category/Category.vue'], resolve)
//购物车
const Cart = resolve => require(['pages/Cart/Cart.vue'], resolve)
//我的
const Mine = resolve => require(['pages/Mine/Mine.vue'], resolve)
//登录
const Login = resolve => require(['pages/Login/Login.vue'], resolve)
//地址页
const Address = resolve => require(['pages/Address/Address.vue'], resolve)
//编辑地址页
const EditAddress = resolve => require(['pages/EditAddress/EditAddress.vue'], resolve)
//修改地址页
const UpdateAddress = resolve => require(['pages/UpdateAddress/UpdateAddress.vue'], resolve)
//进入地图页
const Select_Site = resolve => require(['pages/Select_Site/Select_Site.vue'], resolve)
//商品详情页
const Product_Detail = resolve => require(['pages/Product_Detail/Product_Detail.vue'], resolve)
//商品收藏
const Favorite = resolve => require(['pages/Favorite/Favorite.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        notKeepAlive: false
      }
    },
    {
      path: '/category',
      component: Category,
      meta: {
        notKeepAlive: false
      }
    },
    {
      path: '/cart',
      component: Cart,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/mine',
      component: Mine,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        notKeepAlive: false
      }
    },
    {
      path: '/address',
      component: Address,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/edit-address',
      component: EditAddress,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/update-address',
      component: UpdateAddress,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/select-site',
      component: Select_Site,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/product-detail/:id',
      component: Product_Detail,
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: '/favorite',
      component: Favorite,
      meta: {
        notKeepAlive: true
      }
    }
  ]
})

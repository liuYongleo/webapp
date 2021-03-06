import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../pages/home/home'
import City from '../pages/city/city'
import Index from '../pages/index/index'
import Food from '../pages/food/food'
import Shop from '../pages/shop/shop'
import ShopDetail from '../pages/shop/components/detail'
import GoodsDetail from '../pages/shop/components/goodsDetail'
import ShopDetailSafe from '../pages/shop/components/safe'
import ShopOrder from '../pages/shop/components/ShopOrder'
import ShopOrderRemark from '../pages/shop/components/remark'
import ShopOrderInvoice from '../pages/shop/components/invoice'
import ShopOrderAddress from '../pages/shop/components/address'
import ShopOrderAddAddr from '../pages/shop/components/addAddress'
import Search from '../pages/search/search'
import Order from '../pages/order/order'
import User from '../pages/user/user'
import Login from '../pages/login'
import Register from '../pages/register'

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  mode: '',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/city',
      component: City
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/food',
      component: Food
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: 'detail',
          component: ShopDetail,
          children: [
            {
              path: 'safe',
              component: ShopDetailSafe
            }
          ]
        },
        {
          path: 'goodsDetail',
          component: GoodsDetail
        },
        {
          path: 'shopOrder',
          component: ShopOrder,
          children: [
            {
              path: 'remark',
              component: ShopOrderRemark
            },
            {
              path: 'invoice',
              component: ShopOrderInvoice
            },
            {
              path: 'address',
              component: ShopOrderAddress,
              children: [
                {
                  path: 'add',
                  component: ShopOrderAddAddr
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: 'ha',
          component: City,
        },
        {
          path: 'hb',
          component: City,
        },
      ]
    },
    {
      path: '/order',
      component: Order,
      children: [
        {
          path: 'ha',
          component: City,
        },
        {
          path: 'hb',
          component: City,
        },
      ]
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'ha',
          component: City,
        },
        {
          path: 'hb',
          component: City,
        },
      ]
    }
  ]
})

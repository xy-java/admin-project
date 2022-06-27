import VueRouter from "vue-router";
 
export const constantRouterMap = [
  {
    path: '/',
    name:'index',
    component: () => import('@/views/foreViews/index.vue'),
    hidden: true,
    children:[
      {
        path: '/personalCenter',
        name:'PersonalCenter',
        component: () => import('@/views/foreViews/personCenter/PersonalCenter.vue'),
        meta: {
          showfater: false
        },
        children:[
          {
            path: '/userSelf',
            name:'UserSelf',
            component: () => import('@/views/foreViews/userInfo/UserSelf.vue')
          },
          {
            path: '/userSelfEdit',
            name:'UserSelfEdit',
            component: () => import('@/views/foreViews/userInfo/UserSelfEdit.vue')
          },
          {
            path:'/addressInfo',
            name:'AddressInfo',
            component: () => import('@/views/foreViews/address/AddressInfo.vue')
          },
          {
            path:'/orderConfig',
            name:'OrderConfig',
            component: () => import('@/views/foreViews/orderInfo/OrderConfig.vue')
          }
        ]
      },
      {
        path: 'loginAndRegister',
        name:'LoginAndRegister',
        component: () => import('@/views/foreViews/login/LoginAndRegister.vue'),
        meta: {
          showfater: false
        }
      },
      {
        path:'searchInfo',
        name:'SearchInfo',
        component: () => import('@/views/foreViews/search/SearchInfo.vue'),
        meta: {
          showfater: false
        }
      },
      {
        path:'buyPage',
        name:'BuyPage',
        component: () => import('@/views/foreViews/buy/BuyPage.vue'),
        meta: {
          showfater: false
        }
      },
      {
        path:'cartPage',
        name:'CartPage',
        component: () => import('@/views/foreViews/cartPage/CartPage.vue'),
        meta: {
          showfater: false
        }
      },
      {
        path:'orderPage',
        name:'OrderPage',
        component: () => import('@/views/foreViews/orderInfo/OrderPage.vue'),
        meta: {
          showfater: false
        }
      }
    ],
    meta: {
      showfater: true
    }
  },
  {
    path: '/AdminLogin',
    name:'AdminLogin',
    component: () => import('@/views/backViews/AdminLogin.vue')
  },
  {
    path: '/container',
    name:'Container',
    component: () => import('@/views/backViews/container/Container.vue'),
    children:[
      {
        path: '/dataShow',
        name:'DataShow',
        component: () => import('@/views/backViews/container/dataShow/DataShow.vue')
      },
      {
        path: '/userList',
        name:'UserList',
        component: () => import('@/views/backViews/container/userModel/UserList.vue')
      },
      {
        path: '/userAdd',
        name:'UserAdd',
        component: () => import('@/views/backViews/container/userModel/UserAdd.vue')
      },
      {
        path: '/userEdit',
        name:'UserEdit',
        component: () => import('@/views/backViews/container/userModel/UserEdit.vue')
      },
      {
        path: '/rotationMain',
        name:'RotationMain',
        component: () => import('@/views/backViews/container/rotation/RotationMain.vue')
      },
      {
        path: '/skuAdd',
        name:'SkuAdd',
        component: () => import('@/views/backViews/container/skuInfo/SkuAdd.vue')
      },
      {
        path: '/skuList',
        name:'SkuList',
        component: () => import('@/views/backViews/container/skuInfo/SkuList.vue')
      },
      {
        path: '/skuEdit',
        name:'SkuEdit',
        component: () => import('@/views/backViews/container/skuInfo/SkuEdit.vue')
      }
    ]
  }
]



export default new VueRouter({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}



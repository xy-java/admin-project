import VueRouter from "vue-router";
 
export const constantRouterMap = [
  {
    path: '/',
    name:'index',
    component: () => import('@/views/foreViews/index.vue'),
    hidden: true
  },
  {
    path: '/AdminLogin',
    name:'AdminLogin',
    component: () => import('@/views/login/AdminLogin.vue')
  },
  {
    path: '/container',
    name:'Container',
    component: () => import('@/views/container/Container.vue'),
    children:[
      {
        path: '/dataShow',
        name:'DataShow',
        component: () => import('@/views/dataShow/DataShow.vue')
      },
      {
        path: '/userList',
        name:'UserList',
        component: () => import('@/views/userModel/UserList.vue')
      },
      {
        path: '/userAdd',
        name:'UserAdd',
        component: () => import('@/views/userModel/UserAdd.vue')
      },
      {
        path: '/userEdit',
        name:'UserEdit',
        component: () => import('@/views/userModel/UserEdit.vue')
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



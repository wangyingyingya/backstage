import Vue from "vue";
import Router from "vue-router";
// import Login from "../views/login/index.vue"
// 下面情况默认会导入  ../views/login 目录下的index.vue
import Login from "../views/login"
import Layout from '@/components/Layout'

import Home from '../views/home'
import Member from '../views/member'
import Supplier from '../views/supplier'
import Goods from '../views/goods'
import Staff from '../views/staff'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',  //只是路由名称
      component:Login   //组件对象
    },
    {
      path: '/',
      name: 'layout',  //只是路由名称
      component: Layout,   //组件对象
      redirect:'/home',  // 重定向到home
      children: [
        {
          path: '/home',
          component: Home,
          meta: {
            title:'首页'
          }
        },
        // {
        //   path: '/member',
        //   component: Member,
        //   meta: {
        //     title:'会员管理'
        //   }
        // },
        // {
        //   path: '/supplier',
        //   component: Supplier,
        //   meta: {
        //     title:'供应商管理'
        //   }
        // },
        // {
        //   path: '/goods',
        //   component: Goods,
        //   meta: {
        //     title:'商品管理'
        //   }
        // },
        // {
        //   path: '/staff',
        //   component: Staff,
        //   meta: {
        //     title:'员工管理'
        //   }
        // },
      ]
    },
    {
      path: '/member',
      component: Layout,
      children: [
        {
          path: '/',
          component: Member,
          meta: {
           title:'会员管理'
          }
        }
      ]
    },
    {
      path: '/supplier',
      component: Layout,
      children: [
        {
          path: '/',
          component: Supplier,
          meta: {
            title:'供应商管理'
          }
        }
      ]
    },
    {
      path: '/goods',
      component: Layout,
      children: [
        {
          path: '/',
          component: Goods,
          meta: {
            title:'商品管理'
          }
        }
      ]
    },
    {
      path: '/staff',
      component: Layout,
      children: [
        {
          path: '/',
          component: Staff,
          meta: {
            title:'员工管理'
          }
        }
      ]
    }
  ]
});

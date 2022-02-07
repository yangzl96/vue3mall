import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */'../views/home/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'../views/login/Login'),
    // 只有访问login页面之前触发
    beforeEnter (to, from, next) {
      const isLogin = localStorage.isLogin
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */'../views/cartList/CartList')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'orderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */'../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */'../views/register/Register'),
    beforeEnter (to, from, next) {
      const isLogin = localStorage.isLogin
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */'../views/shop/Shop')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})

export default router
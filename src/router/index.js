import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)
/* 静态页面路由 */
const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index/Index'),
    meta: {
      title: '思空 - 红人孵化与营销',
      auth: false
    }
  }, {
    path: '/resourcedetails',
    name: 'ResourceDetails',
    component: () => import('@/pages/index/ResourceDetails'),
    meta: {
      title: '资源矩阵',
      auth: false
    }
  },
  {
    path: '/casedetails',
    name: 'CaseDetails',
    component: () => import('@/pages/index/CaseDetails'),
    meta: {
      title: '营销案例',
      auth: false
    }
  },
  {
    path: '/reddetails',
    name: 'RedDetails',
    component: () => import('@/pages/index/RedDetails'),
    meta: {
      title: '红人招募',
      auth: false
    }
  }, {
    path: '/login',
    name: '登录',
    component: () => import('@/pages/login/LoGin'),
    meta: {
      auth: false,
    }
  },
  {
    path: '/forget',
    name: '忘记密码',
    component: () => import('@/pages/forget/Forget'),
    meta: {
      auth: false
    }
  }, {
    path: '/registered',
    name: '注册',
    component: () => import('@/pages/registered/Registered'),
    meta: {
      auth: false
    }
  },
  {
    path: '/',
    component: () => import('@/pages/layout/TheLayout'),
    name: '首页',
    icon: 'el-icon-s-home',
    menu: true,
    children: [{
      path: '/index',
      icon: 'el-icon-s-home',
      name: 'Index',
      component: () => import('@/pages/home/Index'),
      meta: {
        title: '首页',
        requiresAuth: true,
      }
    }]
  },
  {
    path: '/',
    component: () => import('@/pages/layout/TheLayout'),
    name: '官网首页内容',
    icon: 'el-icon-s-platform',
    menu: true,
    children: [{
      path: '/bannertable',
      icon: 'el-icon-s-help',
      name: 'BannerTable',
      component: () => import('@/pages/banner/BannerTable'),
      meta: {
        title: '首页轮播',
        requiresAuth: true,
      }
    }, {
      path: '/resourcematrix',
      icon: 'el-icon-s-custom',
      name: 'ResourceMatrix',
      component: () => import('@/pages/resourcematrix/ResourceMatrix'),
      meta: {
        title: '资源矩阵',
        requiresAuth: true,
      }
    }, {
      path: '/marketingcase',
      icon: 'el-icon-suitcase',
      name: 'MarketingCase',
      component: () => import('@/pages/marketingcase/MarketingCase'),
      meta: {
        title: '营销案例',
        requiresAuth: true,
      }
    }, {
      path: '/redrecruiting',
      icon: 'el-icon-s-opportunity',
      name: 'RedRecruiting',
      component: () => import('@/pages/redrecruiting/RedRecruiting'),
      meta: {
        title: '红人招募',
        requiresAuth: true,
      }
    }, {
      path: '/contanctus',
      icon: 'el-icon-s-comment',
      name: 'ContanctUs',
      component: () => import('@/pages/contanctus/ContanctUs'),
      meta: {
        title: '联系我们',
        requiresAuth: true,
      }
    }]
  },

  {
    path: '/error/401',
    name: 'AppError401',
    meta: {
      errorPage: true
    },
    component: () => import('@/pages/error/AppError401')
  }, {
    path: '*',
    name: 'AppError404',
    meta: {
      errorPage: true
    },
    component: () => import('@/pages/error/AppError404')
  }
]

//动态添加的路由


// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  if (to.matched.some(r => r.meta.requiresAuth)) { //这里的requireAuth为路由中定义的 meta:{requiresAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/',
      })
    }
  } else {
    next();
  }
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})


export default router

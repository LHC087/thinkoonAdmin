// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'babel-polyfill'

//防止提交表单暴力点击提交按钮
import './utils/plugins'


Vue.config.productionTip = false


import ElementUI from 'element-ui'; //引入Element组件
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/styles/index.scss' // global css
import '@/styles/guanwan.scss' // guanwan css

import VueScroll from 'vuescroll' //滚动组件
Vue.use(VueScroll, {
  ops: {
    bar: {
      background: '#C0C4CC'
    }
  }
})

import VueWechatTitle from 'vue-wechat-title' //动态页面标题组件
Vue.use(VueWechatTitle)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

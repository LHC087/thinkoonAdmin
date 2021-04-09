<template>
  <div id="app">
    <router-view
      v-if="isRouterAlive"
      v-wechat-title="$route.meta.title?$route.meta.title:'vue-admin-lhc'"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    //注册一个全局的方法
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      //刷新页面
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
</style>

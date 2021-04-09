<template>
  <el-main :style="mainStyle" class="page-sub-main" id="gotop">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
    <el-button
      type="primary"
      icon="el-icon-caret-top"
      circle
      size="mini"
      @click="gotoTop"
      class="topclass"
    ></el-button>
    <el-button
      type="primary"
      icon="el-icon-caret-bottom"
      circle
      size="mini"
      @click="gotoBottom"
      class="bottomclass"
    ></el-button>
  </el-main>
</template>

<script>
export default {
  name: "TheLayoutMain",
  data() {
    const win_height = window.innerHeight - 100 + "px";
    return {
      mainStyle: {
        minHeight: win_height
      }
    };
  },
  computed: {
    cachedViews() {
      if (this.$store.state.cachedViews.length == 1) {
        this.$router.push("/index"); //浏览器刷新时，默认跳回首页
      }
      return this.$store.state.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  },

  methods: {
    gotoTop() {
      document.querySelector("#gotop").scrollIntoView(true);
    },
    gotoBottom() {
      document.querySelector("#gotop").scrollIntoView(false);
    }
  }
};
</script>

<style scoped>
.page-sub-main {
  background-color: #ebeef5;
  color: #666666;
}
.topclass {
  position: fixed;
  bottom: 50px;
  right: 30px;
  z-index: 999;
}
.bottomclass {
  position: fixed;
  bottom: 15px;
  right: 30px;
  z-index: 999;
}
</style>
<template>
  <el-header class="header">
    <router-link to="/">
      <div class="logo" :class="{'logo-hide': !openNav}">
        <img src="../../assets/logo.png" class="image">
        <span class="text" style="color:rgb(85, 26, 139);">官网后台</span>
      </div>
    </router-link>
    <i
      v-if="!minScreen"
      class="fa fa-align-justify toggle"
      :class="switchbtn?'el-icon-s-fold':'el-icon-s-unfold'"
      style="padding:0 20px;"
      @click="navOpenToggle()"
      title="显示/隐藏菜单"
    ></i>
    <el-dropdown trigger="click" class="user" @command="loginOut">
      <span class="user-info">
        {{ user_name }}
        <i class="el-icon-setting"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
export default {
  name: "TheLayoutHeader",
  inject: ["reload"],
  props: ["openNav"],
  data() {
    let min_screen = window.innerWidth < 768;
    return {
      logo: "@/assets/logo.png",
      minScreen: min_screen,
      switchbtn: true,
      user_name: window.sessionStorage.getItem("userName")
    };
  },

  methods: {
    navOpenToggle() {
      this.switchbtn = !this.switchbtn;
      this.$emit("toggle-open");
    },

    loginOut: function() {
      this.$router.push("/");
      this.$store.commit("del_token");
      window.sessionStorage.clear();
    },
    updataAll() {
      this.reload();
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  line-height: 60px;
  background-color: #409eff;
  color: #ffffff;
  div {
    display: inline-block;
  }
  .logo {
    width: 240px;
    border-right: 1px solid #c0c4cc;
    margin-left: -20px;
    text-align: center;
    font-size: 22px;
    cursor: pointer;
    .image {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
  }
  .logo-hide {
    width: 65px;
    .text {
      display: none;
    }
  }
  .user {
    float: right;
    margin: 0 15px;
    cursor: pointer;
    .user-info {
      color: #ffffff;
      i {
        vertical-align: middle;
      }
    }
  }
}
</style>
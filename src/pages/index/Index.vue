<template>
  <el-container id="index">
    <el-header class="stickyheader">
      <Header :sendinfo="infomsg"></Header>
    </el-header>
    <el-main>
      <Main></Main>
    </el-main>
    <el-footer class="magt20">
      <Contant></Contant>
    </el-footer>
    <Join></Join>
  </el-container>
</template>

<script>
import Header from "./header/Header";
import Main from "./main/Main";
import Join from "./Join";
import Contant from "./contant/Contant";
export default {
  name: "Index",
  components: {
    Header,
    Main,
    Contant,
    Join
  },
  data() {
    return {
      infomsg: "index"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stickyheader {
  position: sticky;
  top: 0px;
  left: 0px;
  z-index: 9999;
  background: #fff;
}
.el-header {
  background-color: #fff;
  color: #000;
  text-align: center;
  line-height: 80px;
  height: 80px !important;
}
.el-main {
  padding: 0px;
}
.el-footer {
  background-color: #eeeeee;
  padding-bottom: 40px;
  height: 360px !important;
}
</style>

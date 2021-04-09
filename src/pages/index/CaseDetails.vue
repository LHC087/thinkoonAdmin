<template>
  <el-container id="index">
    <el-header>
      <Header :sendinfo="infomsg"></Header>
    </el-header>
    <el-main>
      <PublicBjBanner></PublicBjBanner>
      <Case :message="sendmsg"></Case>
    </el-main>
    <el-footer class="magt20">
      <Contant></Contant>
    </el-footer>
    <Join></Join>
  </el-container>
</template>

<script>
import Header from "./header/Header";
import PublicBjBanner from "./PublicBjBanner";
import Case from "./main/Case";
import Contant from "./contant/Contant";
import Join from "./Join";
export default {
  name: "CaseDetails",
  components: {
    Header,
    PublicBjBanner,
    Case,
    Contant,
    Join
  },
  data() {
    return {
      infomsg: "caseDetails",
      sendmsg: "detailecase"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

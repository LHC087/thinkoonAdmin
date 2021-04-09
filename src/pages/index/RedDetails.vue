<template>
  <el-container>
    <el-header>
      <Header :sendinfo="infomsg"></Header>
    </el-header>
    <el-main>
      <PublicBjBanner></PublicBjBanner>
      <div id="RedDetails" class="pubcontant">
        <div class="publictitle">
          <h4>{{contacttitle}}</h4>
          <p>{{contactentitle}}</p>
        </div>
        <div>
          <img :src="reddetailsDate[0].reds_img_url" alt="recruitingimg" width="100%">
        </div>
      </div>
    </el-main>
    <el-footer class="magt20">
      <Contant></Contant>
    </el-footer>
    <Join></Join>
  </el-container>
</template>

<script>
import { getGWRedDetails } from "@/api/api";
import Header from "./header/Header";
import PublicBjBanner from "./PublicBjBanner";
import Contant from "./contant/Contant";
import Join from "./Join";

export default {
  name: "RedDetails",
  components: {
    Header,
    PublicBjBanner,
    Contant,
    Join
  },
  data() {
    return {
      infomsg: "redDetails",
      contacttitle: "红人招募",
      contactentitle: "REDS RECRUITING",
      reddetailsDate: [
        {
          reds_img_url: ""
        }
      ]
    };
  },
  mounted() {
    this.getGWRedDetailsDate();
  },
  methods: {
    getGWRedDetailsDate() {
      getGWRedDetails().then(res => {
        this.reddetailsDate = res;
        this.reddetailsDate[0].reds_img_url = require("./../../server/public" +
          res[0].reds_img_url);
      });
    }
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

<template>
  <div id="Red" class="pubcontant">
    <div class="publictitle">
      <h4>{{contacttitle}}</h4>
      <p>{{contactentitle}}</p>
    </div>
    <div>
      <a @click="turnRouter(redDate[0].reds_relate_url)">
        <img :src="redDate[0].reds_img_url" alt="recruitingimg" width="100%">
      </a>
    </div>
  </div>
</template>

<script>
import { getGWRed } from "@/api/api";
export default {
  name: "Red",
  data() {
    return {
      contacttitle: "红人招募",
      contactentitle: "REDS RECRUITING",
      redDate: [
        {
          reds_id: "",
          reds_img_url: "",
          reds_relate_url: ""
        }
      ]
    };
  },
  mounted() {
    this.getGWRedDate();
  },
  methods: {
    getGWRedDate() {
      getGWRed().then(res => {
        this.redDate = res;
        this.redDate[0].reds_img_url = require("./../../../server/public" +
          res[0].reds_img_url);
      });
    },
    turnRouter(ins) {
      this.$router.push("/reddetails");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

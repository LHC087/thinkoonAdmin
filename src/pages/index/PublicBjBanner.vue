<template>
  <div>
    <img :src="bjBanner[0].img" alt="背景图片" width="100%">
  </div>
</template>

<script>
import { getGWBjBannerList } from "@/api/api";
export default {
  name: "PublicBjBanner",
  data() {
    return {
      bjBanner: [{ img: "" }]
    };
  },
  mounted() {
    this.getGWBjBannerListDate();
  },
  methods: {
    getGWBjBannerListDate() {
      getGWBjBannerList().then(res => {
        if (res.length > 0) {
          var data2 = [];
          res.map((value, index, arry) => {
            data2.push({
              img: require("./../../server/public" + value.banner_img_url)
            });
          });
          this.bjBanner = data2;
        } else {
          this.$message.info("暂无数据");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

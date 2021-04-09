<template>
  <div>
    <el-carousel :height="autoHeight">
      <el-carousel-item v-for="(item,index) in bannerList" :key="index">
        <img :src="item.img" alt="图片" referrer="no-referrer|origin|unsafe-url" width="100%;">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getGWBannerList } from "@/api/api";
export default {
  name: "Banner",
  data() {
    return {
      bannerList: []
    };
  },
  computed: {
    autoHeight() {
      let _w =
        document.documentElement.clientWidth || document.body.clientWidth;
      return (_w * 210) / 450 + "px";
    }
  },
  mounted() {
    this.getGWBannerListDate();
  },
  methods: {
    getGWBannerListDate() {
      getGWBannerList().then(res => {
        if (res.length > 0) {
          var data2 = [];
          res.map((value, index, arry) => {
            data2.push({
              img: require("./../../../server/public" + value.banner_img_url)
            });
          });
          this.bannerList = data2;
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

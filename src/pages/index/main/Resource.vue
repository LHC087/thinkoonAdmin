<template>
  <div id="Resource" class="pubcontant">
    <div class="publictitle">
      <h4>{{contacttitle}}</h4>
      <p>{{contactentitle}}</p>
    </div>
    <div class="resoucerousel">
      <el-carousel height="498px" :autoplay="false" indicator-position="none">
        <el-carousel-item v-for="(items,indexs) in resourceList" :key="indexs">
          <ul class="flex">
            <li v-for="(item,index) in items" :key="index" class="showcontant">
              <a :href="item.url" target="_blank" rel="noopener noreferrer">
                <div style="position:relative;">
                  <div style="position:relative;">
                    <img
                      :src="item.img"
                      alt="图片"
                      referrer="no-referrer|origin|unsafe-url"
                      width="100%;height:100%"
                    >
                  </div>
                  <div class="wrap contant">
                    <p>
                      {{item.title}}
                      <br>
                    </p>
                    <span
                      v-for="(items,indexs) in item.tag"
                      :key="indexs"
                      class="portfoliochildclass"
                    >
                      {{items}}
                      <br>
                    </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="more">
      <a @click="turnRouter">
        <p class="morebtn">{{resourcemorename}}</p>
      </a>
    </div>
  </div>
</template>

<script>
import { getGWResourceList } from "@/api/api";
export default {
  name: "Resource",
  data() {
    return {
      contacttitle: "资源矩阵",
      contactentitle: "RESOURCE MATRIX",
      resourcemorename: "MORE",
      resourcemoreurl: "/resourcedetails",
      resourceList: []
    };
  },
  mounted() {
    this.getGWResourceListDate();
  },
  methods: {
    getGWResourceListDate() {
      getGWResourceList().then(res => {
        if (res.length > 0) {
          var data2 = [];
          res.map((value, index, arry) => {
            data2.push({
              img: require("./../../../server/public" + value.resource_img_url),
              url: value.resource_relate_url,
              tag: value.resource_desc.split(","),
              title: value.resource_name
            });
          });
          let size = 10; //一页共几条
          let arr = [];
          for (let i = 0; i < data2.length; i += size) {
            arr.push(data2.slice(i, i + size));
          }
          this.resourceList = arr;
        } else {
          this.$message.info("暂无数据");
        }
      });
    },
    turnRouter() {
      this.$router.push(this.resourcemoreurl);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-inline-start: 0px;
}
.flex > li {
  box-sizing: border-box;
  height: 232px;
  width: 232px;
  padding: 4px;
  text-align: center;
  list-style: none;
}
.flex > li:hover {
  position: relative;
}
.wrap {
  display: none;
}
.showcontant:hover .wrap {
  display: block;
}
.showcontant:hover .contant {
  position: absolute;
  width: 226px;
  height: 226px;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0px;
  border: 2px solid #a9894c;
}
.showcontant p {
  font-size: 16px;
  color: #ffffff;
  margin-top: 30%;
}
.portfoliochildclass {
  font-size: 14px !important;
  color: #cccccc !important;
}
</style>

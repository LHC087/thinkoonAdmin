<template>
  <el-container>
    <el-header>
      <Header :sendinfo="infomsg"></Header>
    </el-header>
    <el-main>
      <PublicBjBanner></PublicBjBanner>
      <div id="ResourceDetails" class="pubcontant magt40">
        <div id="item">
          <ul v-for="(item,index) in kolitem" :key="index">
            <li
              :class="[species==item.id ? item.classname:'']"
              @click="selectNameList(item.id)"
              @mouseenter="selectNameList(item.id)"
            >{{item.name}}</li>
          </ul>
        </div>
        <div class="kollist">
          <ul>
            <li v-for="(item,index) in peoplelist" :key="index">
              <a :href="item.url" target="_blank" rel="noopener noreferrer">
                <img class="wid100 bora50" :src="item.img" alt="img">
                <h5>{{item.name}}</h5>
              </a>
            </li>
          </ul>
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
import Header from "./header/Header";
import PublicBjBanner from "./PublicBjBanner";
import Contant from "./contant/Contant";
import Join from "./Join";
import { getGWResourceDetailsList } from "@/api/api";
export default {
  name: "ResourceDetails",
  components: {
    Header,
    PublicBjBanner,
    Contant,
    Join
  },
  data() {
    return {
      infomsg: "resourceDetails",
      kolitem: [
        {
          id: 0,
          name: "独家KOL",
          classname: "li1"
        },
        {
          id: 1,
          name: "白鹿美妆",
          classname: "li2"
        },
        {
          id: 2,
          name: "石榴美食",
          classname: "li3"
        },
        {
          id: 3,
          name: "有宝母婴",
          classname: "li4"
        }
      ],
      species: 0,
      peoplelist: []
    };
  },
  mounted: function() {
    this.getGWResourceDetailsListDate();
  },
  methods: {
    getGWResourceDetailsListDate() {
      getGWResourceDetailsList({ species: this.species }).then(res => {
        var data2 = [];
        res.map((value, index, arry) => {
          data2.push({
            img: require("./../../server/public" + value.resource_img_url),
            url: value.resource_relate_url,
            name: value.resource_name
          });
        });
        this.peoplelist = data2;
      });
    },
    selectNameList: function(ins) {
      this.species = ins;
      this.getGWResourceDetailsListDate();
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
  overflow: unset;
}
ul {
  padding-inline-start: 0px;
}

.el-footer {
  background-color: #eeeeee;
  padding-bottom: 40px;
  height: 360px !important;
}
</style>

<template>
  <div id="Case" class="pubcontant">
    <div class="publictitle">
      <h4>{{contacttitle}}</h4>
      <p>{{contactentitle}}</p>
    </div>
    <div class="caseslist">
      <div class="caseslists" v-for="(item,index) in caseDate" :key="index">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
          <div>
            <img :src="item.img" alt="Image 01" width="100%">
          </div>
          <div>
            <h5>{{item.title}}</h5>
            <p v-for="(items,indexs) in item.tag" :key="indexs" class="tagclass">
              <span>{{items}}</span>
            </p>
          </div>
        </a>
      </div>
    </div>
    <div class="more" v-if="message=='indexcase'">
      <a @click="turnRouter">
        <p class="morebtn">{{casemorename}}</p>
      </a>
    </div>
  </div>
</template>

<script>
import { getGWCase } from "@/api/api";
export default {
  props: ["message"],
  name: "Case",
  data() {
    return {
      contacttitle: "营销案例",
      contactentitle: "MARKETIMNG CASE",
      caseDate: [],
      casemorename: "MORE",
      casemoreurl: "/casedetails"
    };
  },
  mounted() {
    this.getGWCaseDate();
  },
  methods: {
    getGWCaseDate() {
      getGWCase().then(res => {
        if (res.length > 0) {
          var data2 = [];
          res.map((value, index, arry) => {
            if (this.message == "indexcase") {
              if (index < 6) {
                //限制只取前6条数据
                data2.push({
                  title: value.marketing_title,
                  url: value.resource_relate_url,
                  img: require("./../../../server/public" +
                    value.marketing_img_url),
                  tag: value.marketing_tags.split(",")
                });
              }
            } else if (this.message == "detailecase") {
              data2.push({
                title: value.marketing_title,
                url: value.resource_relate_url,
                img: require("./../../../server/public" +
                  value.marketing_img_url),
                tag: value.marketing_tags.split(",")
              });
            }
          });
          this.caseDate = data2;
        } else {
          this.$message.info("暂无数据");
        }
      });
    },
    turnRouter() {
      this.$router.push(this.casemoreurl);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

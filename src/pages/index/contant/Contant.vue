<template>
  <div id="Contant" class="pubcontant">
    <div class="publictitle">
      <h4>{{contacttitle}}</h4>
      <p>{{contactentitle}}</p>
    </div>
    <div class="pucontant">
      <div class="company">
        <h5>{{contantList[0].company_name}}</h5>
        <h6>{{contantList[0].telphone}}</h6>
        <p>{{contantList[0].area1}}</p>
        <p>{{contantList[0].area2}}</p>
        <p>{{contantList[0].area3}}</p>
      </div>
      <div class="contantimg">
        <div class="contantimgdiv1">
          <img :src="contantList[0].business_weixin_url" alt="contantimg1">
          <h5>{{contantcontant1}}</h5>
        </div>
        <div class="contantimgdiv2">
          <img :src="contantList[0].business_weixin_url" alt="contantimg2">
          <h5>{{contantcontant2}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGWContant } from "@/api/api";
export default {
  name: "Contant",
  data() {
    return {
      contacttitle: "联系我们",
      contactentitle: "CONTANT US",
      contantcontant1: "商务合作",
      contantcontant2: "红人签约",
      contantList: [
        {
          area1: "",
          area2: "",
          area3: "",
          business_weixin_url: "",
          company_name: "",
          id: "",
          invaild: "",
          red_weixin_url: "",
          telphone: ""
        }
      ]
    };
  },
  mounted() {
    this.getGWContantDate();
  },
  methods: {
    getGWContantDate() {
      getGWContant().then(res => {
        this.contantList = res;
        this.contantList[0].business_weixin_url = require("./../../../server/public" +
          res[0].business_weixin_url);
        this.contantList[0].red_weixin_url = require("./../../../server/public" +
          res[0].red_weixin_url);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pucontant {
  display: flex;
}
</style>

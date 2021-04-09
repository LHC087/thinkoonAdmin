<template>
  <div>
    <img @click="openJoin" class="joinus" src="@/assets/img/jone.jpg">
    <a @click="goToTop()">
      <img class="top" src="@/assets/img/top.jpg">
    </a>
    <div id="showjoin" class="showjoins" v-if="showJoinDialog">
      <div class="showjoindiv">
        <a id="btncolse" @click="closeJoin">关闭</a>
        <img alt="join" src="@/assets/img/join.png">
        <a
          v-for="(item,index) in showjoinlist"
          :key="index"
          :href="item.url"
          target="_blank"
          :class="'showjoina'+index"
          rel="noopener noreferrer"
        >{{item.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Join",
  data() {
    return {
      showJoinDialog: false,
      showjoinlist: [
        {
          url: "https://www.lagou.com/gongsi/537416.html",
          name: "拉勾网"
        },
        {
          url: "https://company.zhaopin.com/CZ843159090.htm",
          name: "智联招聘"
        }
      ]
    };
  },
  methods: {
    goToTop() {
      document.querySelector("#app").scrollIntoView(true);
    },
    openJoin() {
      this.showJoinDialog = true;
    },
    closeJoin() {
      this.showJoinDialog = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div class="publicmw">
    <div class="header_cli1">
      <a @click="turnRouter('/')">
        <img src="@/assets/img/logo.png" alt="logo" width="100%">
      </a>
    </div>
    <div class="header_cli2">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        class="float_rig"
      >
        <el-menu-item
          v-for="(item ,index) in menuList"
          :key="index"
          :index="index+'0'"
        >{{item.label}}</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: ["sendinfo"],
  name: "Header",
  data() {
    return {
      activeIndex: "",
      menuList: [
        { label: "资源矩阵" },
        { label: "营销案例" },
        { label: "红人招募" },
        { label: "联系我们" }
      ]
    };
  },
  mounted() {
    if (this.sendinfo == "resourceDetails") {
      this.activeIndex = "00";
    } else if (this.sendinfo == "caseDetails") {
      this.activeIndex = "10";
    } else if (this.sendinfo == "redDetails") {
      this.activeIndex = "20";
    }
  },
  methods: {
    turnRouter(ins) {
      this.$router.push(ins);
    },
    handleSelect(key, keyPath) {
      if (key == "00") {
        if (this.sendinfo == "index") {
          document.querySelector("#Resource").scrollIntoView(true);
        } else if (this.sendinfo == "resourceDetails") {
          document.querySelector("#ResourceDetails").scrollIntoView(true);
        } else {
          this.turnRouter("/resourceDetails");
        }
      } else if (key == "10") {
        if (this.sendinfo == "index") {
          document.querySelector("#Case").scrollIntoView(true);
        } else if (this.sendinfo == "caseDetails") {
          document.querySelector("#Case").scrollIntoView(true);
        } else {
          this.turnRouter("/casedetails");
        }
      } else if (key == "20") {
        if (this.sendinfo == "index") {
          document.querySelector("#Red").scrollIntoView(true);
        } else if (this.sendinfo == "redDetails") {
          document.querySelector("#RedDetails").scrollIntoView(true);
        } else {
          this.turnRouter("/reddetails");
        }
      } else if (key == "30") {
        document.querySelector("#Contant").scrollIntoView(true);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header_cli1 {
  width: 25%;
  display: flex;
  // justify-content: center;
  align-items: center;
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 20px;
  }
}
.header_cli2 {
  width: 75%;
}
.el-menu-item {
  margin-left: 50px !important;
  padding: 0px;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item {
  float: left;
  line-height: 80px;
  border-bottom: 1px solid transparent;
  color: #000;
  font-size: 16px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 1px solid #a9894c;
}
</style>

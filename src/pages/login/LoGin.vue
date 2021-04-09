<template>
  <div class="login-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      status-icon
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <div class="title">官网后台</div>
      <el-form-item prop="name">
        <el-input
          type="text"
          v-model.trim="ruleForm.name"
          auto-complete="off"
          placeholder="用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model.trim="ruleForm.password"
          auto-complete="off"
          placeholder="密码"
          clearable
          @keyup.enter.native="handleSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
      <!-- <el-form-item style="width:100%;">
        <el-button type="text" style="width:48%;color:#000;" @click="turnRouter(0)">立即注册</el-button>
        <el-button type="text" style="width:48%;color:#000;" @click="turnRouter(1)">忘记密码</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
import { postLogin } from "@/api/api";
export default {
  name: "LoGin",
  data() {
    return {
      fromUrl: "/index",

      userToken: "",
      logining: false,
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入登陆名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[^\u4E00-\u9FA5]+$/,
            message: "密码不能含中文",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(event) {
      var that = this;
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.logining = true;
          if (
            that.ruleForm.name == "admin" &&
            that.ruleForm.password == "admin"
          ) {
            window.sessionStorage.setItem("userName", that.ruleForm.name);
            that.$store.commit("set_token", "userToken"); //token拦截
            that.$router.push(that.fromUrl);
          } else {
            that.logining = false;
            that.$message.error("账号密码错误");
          }

          // postLogin({
          //   mobile: that.ruleForm.name,
          //   password: that.ruleForm.password
          // })
          //   .then(res => {
          //     that.logining = false;
          //     that.userToken = "Bearer " + res.data.token;
          //     //根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
          //     that.$store.commit("set_token", that.userToken);
          //     window.sessionStorage.setItem("token", that.userToken);
          //     //保存用户名
          //     window.sessionStorage.setItem(
          //       "handleUserName",
          //       res.data.userRoleVO[0].username
          //     );
          //     that.$router.push(that.fromUrl);
          //   })
          //   .catch(err => {
          //     that.$message.error(err.msg);
          //   });
        } else {
          return false;
        }
      });
    },
    turnRouter(ins) {
      if (ins == 0) {
        this.$router.push("/registered");
      } else if (ins == 1) {
        this.$router.push("/forget");
      }
    }
  }
};
</script>

<style scoped>
.shader {
  width: 100vw;
  height: 100vh;
}
.con {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -1;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 150px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: linear-gradient(rgba(64, 158, 255, 0.9), rgba(103, 194, 58, 0.3));
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 10px auto;
  width: 100%;
  text-align: center;
  line-height: 30px;
  font-size: 26px;
}
.el-button + .el-button {
  margin-left: 0px !important;
}
/* @media (min-width: 769px) {
  .login-page {
    width: 30vw;
  }
} */
</style>
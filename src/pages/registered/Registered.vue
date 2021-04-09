<template>
  <div class="login-container">
    <div class="con">
      <flat-surface-shader
        class="shader"
        type="canvas"
        :light="{ambient: '#E6A23C', diffuse: '#F56C6C', draw: false}"
        :mesh="{segments: 20, slices:10, width: 1.8, height: 1.8}"
      ></flat-surface-shader>
    </div>
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      status-icon
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <div class="title">注册账号</div>
      <el-form-item prop="name">
        <el-input
          type="text"
          v-model="ruleForm2.name"
          auto-complete="off"
          placeholder="账号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm2.password"
          auto-complete="off"
          placeholder="密码"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password1">
        <el-input
          type="password"
          v-model="ruleForm2.password1"
          auto-complete="off"
          placeholder="再次输入密码"
          show-password
          clearable
          @keyup.enter.native="handleSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          type="text"
          v-model="ruleForm2.phone"
          auto-complete="off"
          placeholder="手机号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="codenum">
        <el-input
          type="text"
          v-model="ruleForm2.codenum"
          auto-complete="off"
          placeholder="验证码"
          clearable
          style="width:49%;"
        ></el-input>
        <el-button
          style="width:49%;"
          type="button"
          @click="createCodes"
          class="verification"
        >{{checkCode}}</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Registered",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var codenumceat = (rule, value, callback) => {
      if (value !== this.checkCode) {
        callback(new Error("验证码输入有误!"));
      } else {
        callback();
      }
    };
    return {
      fromUrl: "/",
      logining: false,
      code: "",
      checkCode: "",
      ruleForm2: {
        name: "",
        phone: "",
        password: "",
        password1: "",
        codenum: ""
      },
      rules2: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "账号长度为6~15位"
          },
          {
            pattern: /^[^\u4E00-\u9FA5]+$/,
            message: "账号不能含中文",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请正确填写手机号",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度为6~15位"
          },
          {
            pattern: /^[^\u4E00-\u9FA5]+$/,
            message: "密码不能含中文",
            trigger: "blur"
          }
        ],
        password1: [
          {
            pattern: /^[^\u4E00-\u9FA5]+$/,
            message: "密码不能含中文",
            trigger: "blur"
          },
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        codenum: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          {
            validator: codenumceat,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.createCodes();
  },

  methods: {
    // 图片验证码
    createCodes() {
      //先清空验证码的输入
      this.code = "";
      this.checkCode = "";
      //验证码的长度
      var codeLength = 4;
      //随机数
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (var i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 36);
        //根据索引取得随机数加到code上
        this.code += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.code;
    },
    handleSubmit() {
      var that = this;
      that.$refs.ruleForm2.validate(valid => {
        if (valid) {
          that.logining = true;
          // const url = window.g.apiUrl + "/regist";
          // var params = new URLSearchParams();
          // params.append("loginName", that.ruleForm2.name); //你要传给后台的参数值 key/value
          // params.append("password", that.ruleForm2.password);
          // params.append("phone", that.ruleForm2.phone);
          // that
          //   .$axios({
          //     method: "post",
          //     url: url,
          //     data: params
          //   })
          //   .then(res => {
          //     that.logining = false;
          //     if (res.data.code == 200) {
          //       that.$message.info(res.data.msg);
          //       that.$router.push(that.fromUrl);
          //     } else {
          //       that.$message.error(res.data.msg);
          //     }
          //   })
          //   .catch(err => {
          //     that.$message.error(err.data.msg);
          //     that.logining = false;
          //   });
        } else {
          return false;
        }
      });
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
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 15vh auto;
  width: 50vw;
  padding: 35px 35px 15px;
  background: linear-gradient(rgba(64, 158, 255, 0.9), rgba(103, 194, 58, 0.3));
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
.title {
  margin: 10px auto;
  width: 100%;
  text-align: center;
  line-height: 30px;
  font-size: 26px;
}
.loginpingtai {
  margin-top: 10vh;
}
a {
  cursor: pointer;
  text-decoration: none;
}
@media (min-width: 769px) {
  .login-page {
    width: 30vw;
  }
}
</style>
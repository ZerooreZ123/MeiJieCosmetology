<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text"></h2>
          <p class="brand-info__intro"></p>
        </div>
        <div v-if="page=='login'" class="login-main">
          <h3 class="login-title">用户登录</h3>
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
            <el-form-item prop="userName">
              <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-input v-model="dataForm.captcha" placeholder="验证码">
                  </el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <img :src="captchaPath" @click="getCaptcha()" alt="">
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <div>
                <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
                <div style="text-align:right;">
                  <el-button type="primary" size="text" @click="page='reset'">忘记密码</el-button>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="page=='reset'" class="login-main">
          <h3 class="login-title">忘记密码</h3>
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
            <el-form-item prop="mobile">
              <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="newPassword">
              <el-input v-model="dataForm.newPassword" type="password" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item prop="comfirmPassword">
              <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认新密码"></el-input>
            </el-form-item>
            <el-form-item prop="smscode">
              <el-input v-model="dataForm.smscode" type="text" placeholder="短信验证码" style="width:200px;"></el-input>
              <el-button v-if="timer==0" type="primary" style="float:right;width:120px;" @click="getCode">获取验证码</el-button>
              <el-button v-else type="primary" style="float:right;width:120px;" disabled @click="getCode">{{timer}}</el-button>
            </el-form-item>
            <el-form-item>
              <div>
                <el-button class="login-btn-submit" type="primary" @click="resetPsw()">重置密码</el-button>
                <div style="text-align:right;">
                  <el-button type="primary" size="text" @click="goLogin">返回</el-button>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api";
import { getUUID } from "@/utils";
import { isMobile } from "@/utils/validate";
export default {
  data() {
    var validateComfirmPassword = (rule, value, callback) => {
      if (this.dataForm.newPassword !== value) {
        // console.log(this.dataForm.newPassword);
        // console.log(value);
        callback(new Error("确认密码与密码输入不一致"));
      } else {
        callback();
      }
    };
    var validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      page: "login",
      captchaPath: "",
      timer: 0,
      dataForm: {
        userName: "",
        mobile: "",
        password: "",
        comfirmPassword: "",
        uuid: "",
        captcha: "",
        smscode: ""
      },
      dataRule: {
        mobile: [{ required: true, message: "手机号不能为空", trigger: "blur" }, { validator: validateMobile, trigger: "blur" }],
        userName: [{ required: true, message: "帐号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        newPassword: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
        comfirmPassword: [{ validator: validateComfirmPassword, trigger: "blur" }],
        captcha: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        smscode: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getCaptcha();
  },
  destoryed() {
    clearInterval(this.interval);
  },
  methods: {
    // goReg() {
    //   location.hash = "/register";
    // },
    goLogin() {
      this.page = "login";
      this.getCaptcha();
    },
    getCode() {
      this.timer = 60;
      API.common.smsCode({ mobile: this.dataForm.mobile }).then(({ data }) => {
        if (data && data.code === 0) {
          this.interval = setInterval(() => {
            this.timer--;
            if (this.timer <= 0) {
              clearInterval(this.interval);
            }
          }, 1000);
        } else {
          this.$message.error(data.msg);
          this.timer = 0;
        }
      });
    },
    // 提交表单
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = {
            username: this.dataForm.userName,
            password: this.dataForm.password,
            uuid: this.dataForm.uuid,
            captcha: this.dataForm.captcha
          };
          API.common.login(params).then(({ data }) => {
            if (data && data.code === 0) {
              this.$cookie.set("token", data.token, {
                expires: `${data.expire || 0}s`
              });
              this.$router.replace({
                name: "home"
              });
            } else {
              this.getCaptcha();
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    resetPsw() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = {
            mobile: this.dataForm.mobile,
            newPassword: this.dataForm.newPassword,
            smscode: this.dataForm.smscode
          };
          API.common.resetPassword(params).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "重置密码成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.goLogin()
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    // 获取验证码
    getCaptcha() {
      this.dataForm.uuid = getUUID();
      this.captchaPath = API.common.captcha(this.dataForm.uuid);
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  background-color: #a67c40;
}
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url("../../assets/img/logo_bg.jpg");
    background-size: cover;
  }
  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }
  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }
  .brand-info {
    margin: 220px 100px 0 90px;
    color: #fff;
  }
  .brand-info__text {
    margin: 0 0 22px 0;
    font-size: 48px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: 0.6;
  }
  .login-main {
    position: absolute;
    top: 0;
    right: 0;
    padding: 150px 60px 180px;
    width: 470px;
    min-height: 100%;
    background-color: #fff;
  }
  .login-title {
    font-size: 16px;
  }
  .login-captcha {
    overflow: hidden;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
}
.site-sidebar--dark .site-sidebar__menu.el-menu .el-menu-item:focus,
.site-sidebar--dark .site-sidebar__menu.el-menu .el-menu-item:hover,
.site-sidebar--dark .site-sidebar__menu.el-menu .el-submenu .el-submenu__title:focus,
.site-sidebar--dark .site-sidebar__menu.el-menu .el-submenu li.el-submenu__title:hover {
  background-color: #a67c40 !important;
}
.el-submenu__title:hover {
  background-color: #a67c40 !important;
}
</style>

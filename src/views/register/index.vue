<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text"></h2>
          <p class="brand-info__intro"></p>
        </div>
        <div class="login-main">
          <h3 class="login-title">商户入驻</h3>
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
            <el-form-item prop="mobile">
              <el-input v-model="dataForm.mobile" placeholder="账号（手机号）"></el-input>
            </el-form-item>
            <el-form-item prop="merchantFullname">
              <el-input v-model="dataForm.merchantFullname" placeholder="商户全称"></el-input>
            </el-form-item>
            <el-form-item prop="name">
              <el-input v-model="dataForm.name" placeholder="账户姓名"></el-input>
            </el-form-item>
            <el-form-item prop="address">
              <el-input v-model="dataForm.address" placeholder="商户所在地"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api";
import { isMobile } from "@/utils/validate";
export default {
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      dataForm: {
        mobile: "",
        merchantFullname: "",
        name: "",
        address: ""
      },
      dataRule: {
        mobile: [{ required: true, message: "账号（手机号）不能为空", trigger: "blur" }, { validator: validateMobile, trigger: "blur" }],
        merchantFullname: [{ required: true, message: "商户全称不能为空", trigger: "blur" }],
        name: [{ required: true, message: "账户姓名不能为空", trigger: "blur" }],
        address: [{ required: true, message: "商户所在地不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    // 提交表单
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = this.dataForm;
          API.sysmerchant.add(params).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.$refs["dataForm"].resetFields();
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 60px;
    width: 470px;
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

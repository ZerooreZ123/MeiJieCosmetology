<template>
  <el-dialog :title="!dataForm.userId ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="dataForm.username" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId">
        <el-select v-model="dataForm.officeId" placeholder="请选择所属门店">
          <el-option v-for="office in officeList" :key="office.id" :label="office.name" :value="office.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="dataForm.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="dataForm.identity" placeholder="请选择身份">
          <el-option v-for="item in identityList" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工工号" prop="workNumber">
        <el-input v-model="dataForm.workNumber" placeholder="员工工号"></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="entryTime">
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="dataForm.entryTime" type="datetime" placeholder="选择入职时间">
        </el-date-picker>
        <!-- <el-input v-model="dataForm.entryTime" placeholder="入职时间"></el-input> -->
      </el-form-item>
      <el-form-item label="在职状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">离职</el-radio>
          <el-radio :label="1">在职</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="个人描述" prop="description">
        <el-input type="textarea" :rows="2" v-model="dataForm.description" placeholder="个人描述"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from "@/api";
import { isEmail, isMobile } from "@/utils/validate";
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var validateComfirmPassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error("确认密码不能为空"));
      } else if (this.dataForm.password !== value) {
        callback(new Error("确认密码与密码输入不一致"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error("邮箱格式错误"));
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
      visible: false,
      roleList: [],
      officeList: [],
      identityList: [],
      dataForm: {
        id: 0,
        username: "",
        name: "",
        sex: "",
        description: "",
        password: "",
        comfirmPassword: "",
        salt: "",
        email: "",
        mobile: "",
        roleIdList: [],
        status: 1,
        entryTime: "",
        officeId: ""
      },
      dataRule: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        comfirmPassword: [{ validator: validateComfirmPassword, trigger: "blur" }],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }, { validator: validateEmail, trigger: "blur" }],
        mobile: [{ required: true, message: "手机号不能为空", trigger: "blur" }, { validator: validateMobile, trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.userId = id || 0;
      API.common.getOfficeList().then(result => {
        this.officeList = result.data.list;
      });
      this.getIdentityList().then(() => {
        API.role
          .select()
          .then(({ data }) => {
            this.roleList = data && data.code === 0 ? data.list : [];
          })
          .then(() => {
            this.visible = true;
            this.$nextTick(() => {
              this.$refs["dataForm"].resetFields();
            });
          })
          .then(() => {
            if (this.dataForm.userId) {
              API.user.info(this.dataForm.userId).then(({ data }) => {
                if (data && data.code === 0) {
                  this.dataForm = data.user;
                  // 修改时置空页面显示密码
                  this.dataForm.password = "";
                }
              });
            }
          });
      });
    },
    getIdentityList() {
      return API.sysidentity.list().then(({ data }) => {
        const identityList = data && data.code === 0 ? data.page.list : [];
        this.identityList = identityList;
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = this.dataForm;
          var tick = !this.dataForm.userId ? API.user.add(params) : API.user.update(params);
          tick.then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
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

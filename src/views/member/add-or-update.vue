<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <div class="necessaryWrite">必填信息</div>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="请填写客户姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="dataForm.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="渠道来源" prop="umtSource">
        <el-select v-model="dataForm.umtSource" placeholder="请选择">
          <el-option v-for="item in sourceList" :key="item.id" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId">
        <!-- <el-input v-model="dataForm.officeId" placeholder="所属门店"></el-input> -->
        <el-select v-model="dataForm.officeId" placeholder="请选择">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="selectWrite">选填信息</div>
      <el-form-item label="客户生日" prop="birthday">
        <!-- <el-input v-model="dataForm.appointDate" placeholder="预约日期"></el-input> -->
        <el-date-picker value-format="yyyy-MM-dd" v-model="dataForm.birthday" type="date" placeholder="客户生日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="会员号" prop="memberno">
        <el-input v-model="dataForm.memberno" placeholder="请输入会员号"></el-input>
      </el-form-item>
      <el-form-item label="跟踪员工" prop="recommendPeople">
        <!-- <el-input v-model="dataForm.technician" placeholder="技师"></el-input> -->
        <el-select v-model="dataForm.recommendPeople" placeholder="请选择跟踪员工">
          <el-option v-for="item in userList" :key="item.userId" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入会时间" prop="joinTime">
        <!-- <el-input v-model="dataForm.appointDate" placeholder="预约日期"></el-input> -->
        <el-date-picker value-format="yyyy-MM-dd" v-model="dataForm.joinTime" type="date" placeholder="请选择入会时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上传头像" prop="signPhoto">
        <img-upload :path="dataForm.signPhoto" @success="onSignPhotoUploadSuccess"></img-upload>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    <product-selector :member-id="dataForm.memberId" v-if="showPanel" @selected="list => handleProductSelected(list)"></product-selector>
  </el-dialog>
</template>

<script>
import API from "@/api";
import { isMobile } from "@/utils/validate";
import { getTimeList } from "@/utils/index";
import productSelector from "@/components/productSelector";
import imgUpload from "@/components/imgUpload";

export default {
  components: { productSelector, imgUpload },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      showPanel: false,
      shopList: [],
      sourceList: [],
      userList: [],
      memberList: [],
      dataForm: {
        id: 0,
        name: "",
        sex: "",
        mobile: "",
        umtSource: "",
        officeId: "",
        birthday: "",
        memberno: "",
        joinTime: "",
        echnician: "",
        signPhoto: ""
      },
      dataRule: {
        officeId: [{ required: true, message: "所属门店不能为空", trigger: "blur" }],
        name: [{ required: true, message: "预约人姓名不能为空", trigger: "blur" }],
        // sex: [{ required: true, message: "是否指定：0、否 1、是不能为空", trigger: "blur" }],
        mobile: [{ required: true, message: "预约人电话不能为空", trigger: "blur" }, { validator: validateMobile, trigger: "blur" }],
        umtSource: [{ required: true, message: "渠道来源不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    getTimeList: getTimeList,
    getCategory() {
      const params = {
        type: "guestSource"
      };
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        } else {
          this.shopList = [];
        }
      });
      API.sysdict.getlist(params).then(({ data }) => {

        if (data && data.code === 0) {
          this.sourceList = data.list;
        } else {
          this.sourceList = [];
        }
      });
      API.user.getList().then(({ data }) => {
        if (data && data.code === 0) {
          this.userList = data.list;
        } else {
          this.userList = [];
        }
      });
      API.member.queryMemberList().then(({ data }) => {
        if (data && data.code === 0) {
          this.memberList = data.page.list;
        } else {
          this.memberList = [];
        }
      });
    },
    onSignPhotoUploadSuccess(path) {
      this.dataForm.signPhoto = path;
    },
    openPanel() {
      this.showPanel = true;
    },
    handleProductSelected(list) {
      this.showPanel = false;
      const newList = list.map(obj => ({
        serviceType: obj.serviceType,
        serviceId: obj.id,
        serviceName: obj.name
      }));
      this.dataForm.appointDeatailLsit = this.dataForm.appointDeatailLsit.concat(newList);
    },
    handleRemove(index) {
      this.dataForm.appointDeatailLsit.splice(index, 1);
    },
    init(id) {
      this.getCategory();
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.member.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.member.name;
              this.dataForm.sex = data.member.sex;
              this.dataForm.mobile = data.member.mobile;
              this.dataForm.umtSource = data.member.umtSource;
              this.dataForm.officeId = data.member.officeId;
              this.dataForm.birthday = data.member.birthday;
              this.dataForm.memberno = data.member.memberno;
              this.dataForm.joinTime = data.member.joinTime;
              this.dataForm.recommendPeople = data.member.recommendPeople;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = {
            id: this.dataForm.id || undefined,
            name: this.dataForm.name,
            sex: this.dataForm.sex,
            mobile: this.dataForm.mobile,
            umtSource: this.dataForm.umtSource,
            officeId: this.dataForm.officeId,
            birthday: this.dataForm.birthday,
            memberno: this.dataForm.memberno,
            joinTime: this.dataForm.joinTime,
            recommendPeople: this.dataForm.recommendPeople,
            signPhoto: this.dataForm.signPhoto
            //  memberId: this.dataForm.memberId,
            // nums: this.dataForm.nums,
            // appointDate: this.dataForm.appointDate,
            // reachTime: this.dataForm.reachTime,
            // endTime: this.dataForm.endTime,
            // technician: this.dataForm.technician,
            // isSpecify: this.dataForm.isSpecify,
            // roomId: this.dataForm.roomId,
            // serialno: this.dataForm.serialno,
            // createBy: this.dataForm.createBy,
            // createDate: this.dataForm.createDate,
            // updateBy: this.dataForm.updateBy,
            // updateDate: this.dataForm.updateDate,
            // remarks: this.dataForm.remarks,
            // delFlag: this.dataForm.delFlag
          };

          for (let i = 0; i < this.memberList.length; i++) {
            if (+this.memberList[i].id === +this.dataForm.memberId) {
              params.name = this.memberList[i].name;
              break;
            }
          }

          console.log(JSON.stringify(params));
          var tick = !this.dataForm.id ? API.member.add(params) : API.member.update(params);
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

<style scoped lang="scss">
.necessaryWrite {
  margin-bottom: 20px;
  text-indent: 80px;
  color: red;
  font-size: 16px;
}
.selectWrite {
  margin-bottom: 20px;
  text-indent: 80px;
  font-size: 14px;
}
</style>


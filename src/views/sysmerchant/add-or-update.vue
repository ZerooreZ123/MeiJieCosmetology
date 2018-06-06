<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="账号（手机号）" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="账号（手机号）"></el-input>
      </el-form-item>
      <el-form-item label="账户姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="账户姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="商户logo" prop="merchantLogo">
        <el-input v-model="dataForm.merchantLogo" placeholder="商户logo"></el-input>
        <img-upload :path="dataForm.merchantLogo" @success="merchantLogoUploadSuccess"></img-upload>
      </el-form-item>
      <el-form-item label="商户简称" prop="merchantShortname">
        <el-input v-model="dataForm.merchantShortname" placeholder="商户简称"></el-input>
      </el-form-item>
      <el-form-item label="商户全称" prop="merchantFullname">
        <el-input v-model="dataForm.merchantFullname" placeholder="商户全称"></el-input>
      </el-form-item>
      <el-form-item label="经营类别" prop="operateType">
        <el-input v-model="dataForm.operateType" placeholder="经营类别"></el-input>
      </el-form-item>
      <el-form-item label="商户所在地" prop="address">
        <el-input v-model="dataForm.address" placeholder="商户所在地"></el-input>
      </el-form-item>
      <el-form-item label="法人姓名" prop="corporation">
        <el-input v-model="dataForm.corporation" placeholder="法人姓名"></el-input>
      </el-form-item>
      <el-form-item label="法人身份证号" prop="identityno">
        <el-input v-model="dataForm.identityno" placeholder="法人身份证号"></el-input>
      </el-form-item>
      <el-form-item label="法人身份证正面" prop="identityPositive">
        <el-input v-model="dataForm.identityPositive" placeholder="法人身份证正面"></el-input>
        <img-upload :path="dataForm.identityPositive" @success="identityPositiveUploadSuccess"></img-upload>
      </el-form-item>
      <el-form-item label="法人身份证反面" prop="identityOpposite">
        <el-input v-model="dataForm.identityOpposite" placeholder="法人身份证反面"></el-input>
        <img-upload :path="dataForm.identityOpposite" @success="identityOppositeUploadSuccess"></img-upload>
      </el-form-item>
      <el-form-item label="营业执照编号" prop="businessNo">
        <el-input v-model="dataForm.businessNo" placeholder="营业执照编号"></el-input>
      </el-form-item>
      <el-form-item label="营业执照图片" prop="businessImage">
        <el-input v-model="dataForm.businessImage" placeholder="营业执照图片"></el-input>
        <img-upload :path="dataForm.businessImage" @success="businessImageUploadSuccess"></img-upload>
      </el-form-item>
      <!-- <el-form-item label="创建者" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="更新者" prop="updateBy">
        <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateDate">
        <el-input v-model="dataForm.updateDate" placeholder="更新时间"></el-input>
      </el-form-item> -->
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="备注信息"></el-input>
      </el-form-item>
      <!-- <el-form-item label="删除标记" prop="delFlag">
        <el-input v-model="dataForm.delFlag" placeholder="删除标记"></el-input>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from "@/api";
import imgUpload from "@/components/imgUpload";
export default {
  components: { imgUpload },
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        mobile: "",
        name: "",
        email: "",
        merchantLogo: "",
        merchantShortname: "",
        merchantFullname: "",
        operateType: "",
        address: "",
        corporation: "",
        identityno: "",
        identityPositive: "",
        identityOpposite: "",
        businessNo: "",
        businessImage: "",
        createBy: "",
        createDate: "",
        updateBy: "",
        updateDate: "",
        remarks: "",
        delFlag: ""
      },
      dataRule: {
        mobile: [{ required: true, message: "账号（手机号）不能为空", trigger: "blur" }],
        name: [{ required: true, message: "账户姓名不能为空", trigger: "blur" }],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        merchantLogo: [{ required: true, message: "商户logo不能为空", trigger: "blur" }],
        merchantShortname: [{ required: true, message: "商户简称不能为空", trigger: "blur" }],
        merchantFullname: [{ required: true, message: "商户全称不能为空", trigger: "blur" }],
        operateType: [{ required: true, message: "经营类别不能为空", trigger: "blur" }],
        address: [{ required: true, message: "商户所在地不能为空", trigger: "blur" }],
        corporation: [{ required: true, message: "法人姓名不能为空", trigger: "blur" }],
        identityno: [{ required: true, message: "法人身份证号不能为空", trigger: "blur" }],
        identityPositive: [{ required: true, message: "法人身份证正面不能为空", trigger: "blur" }],
        identityOpposite: [{ required: true, message: "法人身份证反面不能为空", trigger: "blur" }],
        businessNo: [{ required: true, message: "营业执照编号不能为空", trigger: "blur" }],
        businessImage: [{ required: true, message: "营业执照图片不能为空", trigger: "blur" }],
        // createBy: [{ required: true, message: "创建者不能为空", trigger: "blur" }],
        // createDate: [{ required: true, message: "创建时间不能为空", trigger: "blur" }],
        // updateBy: [{ required: true, message: "更新者不能为空", trigger: "blur" }],
        // updateDate: [{ required: true, message: "更新时间不能为空", trigger: "blur" }],
        remarks: [{ required: true, message: "备注信息不能为空", trigger: "blur" }]
        // delFlag: [{ required: true, message: "删除标记不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    merchantLogoUploadSuccess(path) {
      this.dataForm.merchantLogo = path;
    },
    identityPositiveUploadSuccess(path) {
      this.dataForm.identityPositive = path;
    },
    identityOppositeUploadSuccess(path) {
      this.dataForm.identityOpposite = path;
    },
    businessImageUploadSuccess(path) {
      this.dataForm.businessImage = path;
    },
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.sysmerchant.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.mobile = data.sysMerchant.mobile;
              this.dataForm.name = data.sysMerchant.name;
              this.dataForm.email = data.sysMerchant.email;
              this.dataForm.merchantLogo = data.sysMerchant.merchantLogo;
              this.dataForm.merchantShortname = data.sysMerchant.merchantShortname;
              this.dataForm.merchantFullname = data.sysMerchant.merchantFullname;
              this.dataForm.operateType = data.sysMerchant.operateType;
              this.dataForm.address = data.sysMerchant.address;
              this.dataForm.corporation = data.sysMerchant.corporation;
              this.dataForm.identityno = data.sysMerchant.identityno;
              this.dataForm.identityPositive = data.sysMerchant.identityPositive;
              this.dataForm.identityOpposite = data.sysMerchant.identityOpposite;
              this.dataForm.businessNo = data.sysMerchant.businessNo;
              this.dataForm.businessImage = data.sysMerchant.businessImage;
              this.dataForm.createBy = data.sysMerchant.createBy;
              this.dataForm.createDate = data.sysMerchant.createDate;
              this.dataForm.updateBy = data.sysMerchant.updateBy;
              this.dataForm.updateDate = data.sysMerchant.updateDate;
              this.dataForm.remarks = data.sysMerchant.remarks;
              this.dataForm.delFlag = data.sysMerchant.delFlag;
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
            mobile: this.dataForm.mobile,
            name: this.dataForm.name,
            email: this.dataForm.email,
            merchantLogo: this.dataForm.merchantLogo,
            merchantShortname: this.dataForm.merchantShortname,
            merchantFullname: this.dataForm.merchantFullname,
            operateType: this.dataForm.operateType,
            address: this.dataForm.address,
            corporation: this.dataForm.corporation,
            identityno: this.dataForm.identityno,
            identityPositive: this.dataForm.identityPositive,
            identityOpposite: this.dataForm.identityOpposite,
            businessNo: this.dataForm.businessNo,
            businessImage: this.dataForm.businessImage,
            createBy: this.dataForm.createBy,
            createDate: this.dataForm.createDate,
            updateBy: this.dataForm.updateBy,
            updateDate: this.dataForm.updateDate,
            remarks: this.dataForm.remarks,
            delFlag: this.dataForm.delFlag
          };
          var tick = !this.dataForm.id ? API.sysmerchant.add(params) : API.sysmerchant.update(params);
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

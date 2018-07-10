<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input v-model="dataForm.contacts" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="dataForm.qq" placeholder="QQ"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="dataForm.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item label="银行账户开户行" prop="openBank">
        <el-input v-model="dataForm.openBank" placeholder="银行账户开户行"></el-input>
      </el-form-item>
      <el-form-item label="银行账户" prop="bankAccount">
        <el-input v-model="dataForm.bankAccount" placeholder="银行账户"></el-input>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="联系地址"></el-input>
      </el-form-item>
      <!-- <el-form-item label="创建人" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="创建人"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
      </el-form-item> -->
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="备注信息"></el-input>
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
import {
  // isEmail,
  isMobile
} from "@/utils/validate";
var validateMobile = (rule, value, callback) => {
  if (!isMobile(value)) {
    callback(new Error("手机号格式错误"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        phone: "",
        contacts: "",
        qq: "",
        email: "",
        openBank: "",
        bankAccount: "",
        address: "",
        createBy: "",
        createDate: "",
        remarks: ""
      },
      dataRule: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "电话不能为空", trigger: "blur" }, { validator: validateMobile, trigger: "blur" }],
        contacts: [{ required: true, message: "联系人不能为空", trigger: "blur" }],
        qq: [{ required: true, message: "QQ不能为空", trigger: "blur" }],
        email: [{ required: true, message: "Email不能为空", trigger: "blur" }],
        openBank: [{ required: true, message: "银行账户开户行不能为空", trigger: "blur" }],
        bankAccount: [{ required: true, message: "银行账户不能为空", trigger: "blur" }],
        address: [{ required: true, message: "联系地址不能为空", trigger: "blur" }],
        createBy: [{ required: true, message: "创建人不能为空", trigger: "blur" }],
        createDate: [{ required: true, message: "创建时间不能为空", trigger: "blur" }],
        remarks: [{ required: true, message: "备注信息不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.supplier.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.supplier.name;
              this.dataForm.phone = data.supplier.phone;
              this.dataForm.contacts = data.supplier.contacts;
              this.dataForm.qq = data.supplier.qq;
              this.dataForm.email = data.supplier.email;
              this.dataForm.openBank = data.supplier.openBank;
              this.dataForm.bankAccount = data.supplier.bankAccount;
              this.dataForm.address = data.supplier.address;
              this.dataForm.createBy = data.supplier.createBy;
              this.dataForm.createDate = data.supplier.createDate;
              this.dataForm.remarks = data.supplier.remarks;
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
            phone: this.dataForm.phone,
            contacts: this.dataForm.contacts,
            qq: this.dataForm.qq,
            email: this.dataForm.email,
            openBank: this.dataForm.openBank,
            bankAccount: this.dataForm.bankAccount,
            address: this.dataForm.address,
            // 'createBy': this.dataForm.createBy,
            // 'createDate': this.dataForm.createDate,
            remarks: this.dataForm.remarks
          };
          var tick = !this.dataForm.id ? API.supplier.add(params) : API.supplier.update(params);
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

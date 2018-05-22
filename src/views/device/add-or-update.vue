<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="dataForm.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceno">
        <el-input v-model="dataForm.deviceno" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId">
        <el-select v-model="dataForm.officeId" placeholder="请选择所属门店">
          <el-option v-for="office in officeList" :key="office.id" :label="office.name" :value="office.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否可用" prop="isUsable">        
        <el-select v-model="dataForm.isUsable">
          <el-option value="1" label="可用">可用</el-option>
          <el-option value="0" label="不可用">不可用</el-option>
        </el-select>
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
export default {
  data() {
    return {
      visible: false,
      officeList: [],
      dataForm: {
        id: 0,
        name: "",
        deviceno: "",
        isUsable: ""
      },
      dataRule: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        deviceno: [{ required: true, message: "不能为空", trigger: "blur" }],
        isUsable: [{ required: true, message: "是否可用：0、否 1、是不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = +id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        API.common.getOfficeList().then(result => {
          this.officeList = result.data.list;
        });
        if (this.dataForm.id) {
          API.device.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.device;
              this.dataForm.officeId = +data.device.officeId;
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
            deviceno: this.dataForm.deviceno,
            isUsable: this.dataForm.isUsable,
            officeId: this.dataForm.officeId
          };
          var tick = !this.dataForm.id ? API.device.add(params) : API.device.update(params);
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

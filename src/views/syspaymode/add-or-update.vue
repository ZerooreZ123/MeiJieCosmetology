<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <!-- <el-input v-model="dataForm.status" placeholder="状态"></el-input> -->
        <el-radio-group v-model="dataForm.status">
          <el-radio label="0">禁用</el-radio>
          <el-radio label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
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
      dataForm: {
        id: 0,
        name: "",
        status: "",
        sort: ""
      },
      dataRule: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        status: [{ required: true, message: "状态", trigger: "blur" }],
        sort: [{ required: true, message: "排序不能为空", trigger: "blur" }]
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
          API.syspaymode.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.syspaymode.name;
              this.dataForm.status = data.syspaymode.status;
              this.dataForm.sort = data.syspaymode.sort;
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
            status: this.dataForm.status,
            sort: this.dataForm.sort
          };
          var tick = !this.dataForm.id ? API.syspaymode.add(params) : API.syspaymode.update(params);
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

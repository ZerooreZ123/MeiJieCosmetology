<template>
  <el-dialog :title="'设置员工账号数'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">

      <el-form-item label="门店员工账号数" prop="name">
        <el-input v-model="dataForm.addpersons" placeholder="门店员工账号数"></el-input>
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
        addpersons: ""
      },
      dataRule: {
        addpersons: [{ required: true, message: "门店名称不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.sysoffice.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.sysOffice;
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
            addpersons: this.dataForm.addpersons
          };
          var tick = API.sysoffice.setAddpersons(params);
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

<style>
.ql-container {
  height: 200px;
}
</style>

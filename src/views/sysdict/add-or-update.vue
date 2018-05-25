<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="数据值" prop="value">
        <el-input v-model="dataForm.value" placeholder="数据值"></el-input>
      </el-form-item>
      <el-form-item label="标签名" prop="label">
        <el-input v-model="dataForm.label" placeholder="标签名"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="dataForm.type" placeholder="类型"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="dataForm.description" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="排序（升序）" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="排序（升序）"></el-input>
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
        value: "",
        label: "",
        type: "",
        description: "",
        sort: ""
      },
      dataRule: {
        value: [{ required: true, message: "数据值不能为空", trigger: "blur" }],
        label: [{ required: true, message: "标签名不能为空", trigger: "blur" }],
        type: [{ required: true, message: "类型不能为空", trigger: "blur" }],
        description: [{ required: true, message: "描述不能为空", trigger: "blur" }],
        sort: [{ required: true, message: "排序（升序）不能为空", trigger: "blur" }]
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
          API.sysdict.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.value = data.sysdict.value;
              this.dataForm.label = data.sysdict.label;
              this.dataForm.type = data.sysdict.type;
              this.dataForm.description = data.sysdict.description;
              this.dataForm.sort = data.sysdict.sort;
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
            value: this.dataForm.value,
            label: this.dataForm.label,
            type: this.dataForm.type,
            description: this.dataForm.description,
            sort: this.dataForm.sort
          };
          var tick = !this.dataForm.id ? API.sysdict.add(params) : API.sysdict.update(params);
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

<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="分类名称"></el-input>
      </el-form-item>
      <el-form-item label="父ID" prop="parentId">
        <el-input disabled v-model="dataForm.parentId" placeholder="父ID"></el-input>
      </el-form-item>
      <!-- <el-form-item label="排序" prop="catsort">
        <el-input v-model="dataForm.catsort" placeholder="排序"></el-input>
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
export default {
  props: ["data"],
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        parentId: "",
        catsort: ""
      },
      dataRule: {
        name: [{ required: true, message: "分类名称不能为空", trigger: "blur" }],
        parentId: [{ required: true, message: "父ID不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init() {
      console.log(JSON.stringify(this.data));
      this.visible = true;
      this.dataForm.name = this.data.name;
      this.dataForm.parentId = this.data.parentId;
      this.dataForm.createBy = this.data.createBy;
      this.dataForm.catsort = this.data.catsort || 0;
      this.dataForm.id = this.data.id || undefined;
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = {
            id: this.dataForm.id || undefined,
            areaList: this.dataForm.areaList,
            name: this.dataForm.name,
            parentId: this.dataForm.parentId,
            createBy: this.dataForm.createBy,
            catsort: this.dataForm.catsort
          };
          var tick = !this.dataForm.id ? API.sysarea.add(params) : API.sysarea.update(params);
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

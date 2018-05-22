<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="权限角色" prop="perrole">
        <!-- <el-input v-model="dataForm.perrole" placeholder="权限角色"></el-input> -->
        <el-select v-model="dataForm.perrole" placeholder="请选择权限角色">
          <el-option v-for="role in roleList" :key="role.roleId" :label="role.roleName" :value="role.roleId">
          </el-option>
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
      roleList: [],
      dataForm: {
        id: 0,
        name: "",
        perrole: ""
      },
      dataRule: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        perrole: [{ required: true, message: "权限角色不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        API.common.getRoles().then(result => {
          this.roleList = result.data.list;
          if (this.dataForm.id) {
            API.sysidentity.info(this.dataForm.id).then(({ data }) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.sysIdentity.name;
                this.dataForm.perrole = +data.sysIdentity.perrole;
              }
            });
          }
        });
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = {
            id: this.dataForm.id || undefined,
            name: this.dataForm.name,
            perrole: this.dataForm.perrole
          };
          var tick = !this.dataForm.id ? API.sysidentity.add(params) : API.sysidentity.update(params);
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

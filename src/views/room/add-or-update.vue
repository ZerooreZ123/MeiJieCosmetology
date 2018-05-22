<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="房间名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="房间名称"></el-input>
      </el-form-item>
      <el-form-item label="房间编号" prop="roomno">
        <el-input v-model="dataForm.roomno" placeholder="房间编号"></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId">
        <el-select v-model="dataForm.officeId" placeholder="请选择所属门店">
          <el-option v-for="office in officeList" :key="office.id" :label="office.name" :value="office.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="床位数" prop="budNums">
        <el-input v-model.number="dataForm.budNums" placeholder="床位数"></el-input>
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
        roomno: "",
        officeId: "",
        budNums: "",
        isUsable: ""
      },
      dataRule: {
        name: [{ required: true, message: "房间名称不能为空", trigger: "blur" }],
        roomno: [{ required: true, message: "房间编号不能为空", trigger: "blur" }],
        officeId: [{ required: true, message: "所属门店不能为空", trigger: "blur" }],
        budNums: [{ required: true, message: "床位数不能为空", trigger: "blur" }],
        isUsable: [{ required: true, message: "是否可用不能为空", trigger: "blur" }]
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
          API.room.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.room.name;
              this.dataForm.roomno = data.room.roomno;
              this.dataForm.officeId = +data.room.officeId;
              this.dataForm.budNums = data.room.budNums;
              this.dataForm.isUsable = data.room.isUsable;
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
            roomno: this.dataForm.roomno,
            officeId: this.dataForm.officeId,
            budNums: this.dataForm.budNums,
            isUsable: this.dataForm.isUsable
          };
          var tick = !this.dataForm.id ? API.room.add(params) : API.room.update(params);
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

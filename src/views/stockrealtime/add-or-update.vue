<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="库存" prop="stockNum">
        <el-input v-model="dataForm.stockNum" placeholder="库存数"></el-input>
      </el-form-item>
      <el-form-item label="修改原因" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder=""></el-input>
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
        stockNum: "",
        remarks: "",
        stockChangeEntity: {
          stockId: null,
          updateBeforeNum: null,
          updateNum: null,
          remarks: null
        }
      },
      dataRule: {
        stockNum: [{ required: true, message: "库存不能为空", trigger: "blur" }],
        remarks: [{ required: true, message: "修改原因不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.dataForm.stockChangeEntity = {
          stockId: null,
          updateBeforeNum: null,
          updateNum: null,
          remarks: null
        };
        API.stockrealtime.info(this.dataForm.id).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataForm.stockNum = data.stockRealtime.stockNum;
            this.dataForm.stockChangeEntity.stockId = this.dataForm.id;
            this.dataForm.stockChangeEntity.updateBeforeNum = data.stockRealtime.stockNum;
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
            stockNum: this.dataForm.stockNum,
            stockChangeEntity: this.dataForm.stockChangeEntity
          };
          params.stockChangeEntity.updateNum = this.dataForm.stockNum;
          params.stockChangeEntity.remarks = this.dataForm.remarks;
          var tick = API.stockrealtime.update(params);
          tick.then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshdatalist");
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

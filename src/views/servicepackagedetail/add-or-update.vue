<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="套餐ID" prop="packId">
        <el-input v-model="dataForm.packId" placeholder="套餐ID"></el-input>
      </el-form-item>
      <el-form-item label="项目/产品ID" prop="itemProductId">
        <el-input v-model="dataForm.itemProductId" placeholder="项目/产品ID"></el-input>
      </el-form-item>
      <el-form-item label="项目/产品名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="项目/产品名称"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="dataForm.price" placeholder="价格"></el-input>
      </el-form-item>
      <el-form-item label="次数" prop="nums">
        <el-input v-model="dataForm.nums" placeholder="次数"></el-input>
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
        packId: "",
        itemProductId: "",
        name: "",
        price: "",
        nums: ""
      },
      dataRule: {
        packId: [{ required: true, message: "套餐ID不能为空", trigger: "blur" }],
        itemProductId: [{ required: true, message: "项目/产品ID不能为空", trigger: "blur" }],
        name: [{ required: true, message: "项目/产品名称不能为空", trigger: "blur" }],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
        nums: [{ required: true, message: "次数不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = +id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.servicepackagedetail.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.servicePackageDetail;
              // this.dataForm.itemProductId = data.servicepackagedetail.itemProductId
              // this.dataForm.name = data.servicepackagedetail.name
              // this.dataForm.price = data.servicepackagedetail.price
              // this.dataForm.nums = data.servicepackagedetail.nums
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
            packId: this.dataForm.packId,
            itemProductId: this.dataForm.itemProductId,
            name: this.dataForm.name,
            price: this.dataForm.price,
            nums: this.dataForm.nums
          };
          var tick = !this.dataForm.id ? API.servicepackagedetail.add(params) : API.servicepackagedetail.update(params);
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

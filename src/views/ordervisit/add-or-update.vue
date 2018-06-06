<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <!-- <el-form-item label="订单ID" prop="orderId">
        <el-input v-model="dataForm.orderId" placeholder="订单ID"></el-input>
      </el-form-item> -->
      <el-form-item label="消费时间" prop="consumeTime">
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="dataForm.consumeTime" type="datetime" placeholder="消费时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回访时间" prop="visitTime">
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="dataForm.visitTime" type="datetime" placeholder="回访时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="dataForm.status">
          <el-option value="1" label="待回访">待回访</el-option>
          <el-option value="2" label="已回访">已回访</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回访结果" prop="visitResult">
        <el-input type="textarea" :rows="5" v-model="dataForm.visitResult" placeholder="回访结果"></el-input>
      </el-form-item>
      <!-- <el-form-item label="创建者" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="更新者" prop="updateBy">
        <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateDate">
        <el-input v-model="dataForm.updateDate" placeholder="更新时间"></el-input>
      </el-form-item> -->
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="备注信息"></el-input>
      </el-form-item>
      <!-- <el-form-item label="删除标记" prop="delFlag">
        <el-input v-model="dataForm.delFlag" placeholder="删除标记"></el-input>
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
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        orderId: "",
        consumeTime: "",
        visitTime: "",
        status: "",
        visitResult: "",
        createBy: "",
        createDate: "",
        updateBy: "",
        updateDate: "",
        remarks: "",
        delFlag: ""
      },
      dataRule: {
        // orderId: [{ required: true, message: "订单ID不能为空", trigger: "blur" }],
        consumeTime: [{ required: true, message: "消费时间不能为空", trigger: "blur" }],
        visitTime: [{ required: true, message: "回访时间不能为空", trigger: "blur" }],
        status: [{ required: true, message: "状态：1、待回访 2、已回访不能为空", trigger: "blur" }]
        // visitResult: [{ required: true, message: "回访结果不能为空", trigger: "blur" }]
        // createBy: [{ required: true, message: "创建者不能为空", trigger: "blur" }],
        // createDate: [{ required: true, message: "创建时间不能为空", trigger: "blur" }],
        // updateBy: [{ required: true, message: "更新者不能为空", trigger: "blur" }],
        // updateDate: [{ required: true, message: "更新时间不能为空", trigger: "blur" }],
        // remarks: [{ required: true, message: "备注信息不能为空", trigger: "blur" }],
        // delFlag: [{ required: true, message: "删除标记不能为空", trigger: "blur" }]
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
          API.ordervisit.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.orderId = data.orderVisit.orderId;
              this.dataForm.consumeTime = data.orderVisit.consumeTime;
              this.dataForm.visitTime = data.orderVisit.visitTime;
              this.dataForm.status = data.orderVisit.status;
              this.dataForm.visitResult = data.orderVisit.visitResult;
              this.dataForm.createBy = data.orderVisit.createBy;
              this.dataForm.createDate = data.orderVisit.createDate;
              this.dataForm.updateBy = data.orderVisit.updateBy;
              this.dataForm.updateDate = data.orderVisit.updateDate;
              this.dataForm.remarks = data.orderVisit.remarks;
              this.dataForm.delFlag = data.orderVisit.delFlag;
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
            orderId: this.dataForm.orderId,
            consumeTime: this.dataForm.consumeTime,
            visitTime: this.dataForm.visitTime,
            status: this.dataForm.status,
            visitResult: this.dataForm.visitResult,
            createBy: this.dataForm.createBy,
            createDate: this.dataForm.createDate,
            updateBy: this.dataForm.updateBy,
            updateDate: this.dataForm.updateDate,
            remarks: this.dataForm.remarks,
            delFlag: this.dataForm.delFlag
          };
          var tick = !this.dataForm.id ? API.ordervisit.add(params) : API.ordervisit.update(params);
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

<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="150px">
      <el-form-item label="订单" prop="orderId">
        <el-select v-model="dataForm.orderId" placeholder="请选择订单">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号" prop="orderNo">
        <el-input disabled v-model="dataForm.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="总金额" prop="totalAmount">
        <el-input disabled v-model="dataForm.totalAmount" placeholder="总金额" @input="calc">
          <template slot="prepend">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item label="出账门店" prop="outAccountOffice">
        <el-select v-model="dataForm.outAccountOffice" placeholder="请选择出账门店">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入账门店" prop="inAccountOffice">
        <el-select v-model="dataForm.inAccountOffice" placeholder="请选择入账门店">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分账比率" prop="ratio">
        <el-input v-model="dataForm.ratio" placeholder="分账比率" @input="calc">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="出账门店所分金额" prop="outDivisionAccount">
        <el-input disabled="" v-model="dataForm.outDivisionAccount" placeholder="出账门店所分金额"></el-input>
      </el-form-item>
      <el-form-item label="入账门店所分金额" prop="inDivisionAccount">
        <el-input disabled="" v-model="dataForm.inDivisionAccount" placeholder="入账门店所分金额"></el-input>
      </el-form-item>
      <!-- <el-form-item label="状态" prop="status">
        <el-input v-model="dataForm.status" placeholder="状态"></el-input>
      </el-form-item> -->
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
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="备注信息"></el-input>
      </el-form-item>
      <el-form-item label="删除标记" prop="delFlag">
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
    var isNumber = (rule, value, callback) => {
      if (!/^[1-9]\d*$/.test(value)) {
        callback(new Error("必须输入小于等于100的正整数"));
      } else if (value > 100) {
        callback(new Error("必须输入小于等于100的正整数"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      shopList: [],
      dataForm: {
        id: 0,
        outAccountOffice: "",
        inAccountOffice: "",
        totalAmount: "0",
        outDivisionAccount: "",
        inDivisionAccount: "",
        ratio: "100",
        orderId: "",
        orderNo: "",
        status: "",
        createBy: "",
        createDate: "",
        updateBy: "",
        updateDate: "",
        remarks: "",
        delFlag: ""
      },
      dataRule: {
        outAccountOffice: [{ required: true, message: "出账门店不能为空", trigger: "blur" }],
        inAccountOffice: [{ required: true, message: "入账门店不能为空", trigger: "blur" }],
        totalAmount: [{ required: true, message: "总金额不能为空", trigger: "blur" }],
        outDivisionAccount: [{ required: true, message: "出账门店所分金额不能为空", trigger: "blur" }],
        inDivisionAccount: [{ required: true, message: "入账门店所分金额不能为空", trigger: "blur" }],
        ratio: [{ required: true, message: "分账比率不能为空", trigger: "blur" }, { validator: isNumber, trigger: "blur" }],
        orderId: [{ required: true, message: "订单ID不能为空", trigger: "blur" }],
        orderNo: [{ required: true, message: "订单号不能为空", trigger: "blur" }],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }],
        createBy: [{ required: true, message: "创建者不能为空", trigger: "blur" }],
        createDate: [{ required: true, message: "创建时间不能为空", trigger: "blur" }],
        updateBy: [{ required: true, message: "更新者不能为空", trigger: "blur" }],
        updateDate: [{ required: true, message: "更新时间不能为空", trigger: "blur" }],
        remarks: [{ required: true, message: "备注信息不能为空", trigger: "blur" }],
        delFlag: [{ required: true, message: "删除标记不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getOfficeList();
  },
  methods: {
    calc() {
      const { totalAmount, ratio } = this.dataForm;
      this.dataForm.outDivisionAccount = (totalAmount * (1 - ratio / 100)).toFixed(2);
      this.dataForm.inDivisionAccount = (totalAmount * (ratio / 100)).toFixed(2);
    },
    getOfficeList() {
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        } else {
          this.shopList = [];
        }
      });
    },
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.branchaccount.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.outAccountOffice = data.branchaccount.outAccountOffice;
              this.dataForm.inAccountOffice = data.branchaccount.inAccountOffice;
              this.dataForm.totalAmount = data.branchaccount.totalAmount;
              this.dataForm.outDivisionAccount = data.branchaccount.outDivisionAccount;
              this.dataForm.inDivisionAccount = data.branchaccount.inDivisionAccount;
              this.dataForm.ratio = data.branchaccount.ratio;
              this.dataForm.orderId = data.branchaccount.orderId;
              this.dataForm.orderNo = data.branchaccount.orderNo;
              this.dataForm.status = data.branchaccount.status;
              this.dataForm.createBy = data.branchaccount.createBy;
              this.dataForm.createDate = data.branchaccount.createDate;
              this.dataForm.updateBy = data.branchaccount.updateBy;
              this.dataForm.updateDate = data.branchaccount.updateDate;
              this.dataForm.remarks = data.branchaccount.remarks;
              this.dataForm.delFlag = data.branchaccount.delFlag;
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
            outAccountOffice: this.dataForm.outAccountOffice,
            inAccountOffice: this.dataForm.inAccountOffice,
            totalAmount: this.dataForm.totalAmount,
            outDivisionAccount: this.dataForm.outDivisionAccount,
            inDivisionAccount: this.dataForm.inDivisionAccount,
            ratio: this.dataForm.ratio,
            orderId: this.dataForm.orderId,
            orderNo: this.dataForm.orderNo,
            status: this.dataForm.status,
            createBy: this.dataForm.createBy,
            createDate: this.dataForm.createDate,
            updateBy: this.dataForm.updateBy,
            updateDate: this.dataForm.updateDate,
            remarks: this.dataForm.remarks,
            delFlag: this.dataForm.delFlag
          };
          var tick = !this.dataForm.id ? API.branchaccount.add(params) : API.branchaccount.update(params);
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

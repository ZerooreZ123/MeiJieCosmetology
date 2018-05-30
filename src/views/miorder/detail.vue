<template>
  <el-dialog title="订单详情" :close-on-click-modal="false" :visible.sync="visible">
    <div>
      <el-row>
        <el-col :span="12">
          <div>订单编号：{{dataForm.orderNo}}</div>
          <div>所属门店：{{dataForm.officeName || "无"}}</div>
          <div>订单备注：{{dataForm.remarks}}</div>
        </el-col>
        <el-col :span="12">
          <div>流水单号：{{dataForm.serialNo}}</div>
          <div>开单时间：{{dataForm.createDate}}</div>
        </el-col>
      </el-row>

      <el-tabs v-model="activeName">
        <el-tab-pane label="订单内容" name="orderDetail">
          <el-table :data="dataForm.detailList" border>
            <el-table-column prop="id" header-align="center" align="center" label="ID" width="50">
            </el-table-column>
            <el-table-column prop="serviceName" header-align="center" align="center" label="内容">
            </el-table-column>
            <el-table-column prop="nums" header-align="center" align="center" label="数量">
            </el-table-column>
            <el-table-column prop="servicePrice" header-align="center" align="center" label="单价">
            </el-table-column>
            <el-table-column header-align="center" align="center" label="小计">
              <template slot-scope="scope">
                {{scope.row.nums * scope.row.servicePrice}}
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" label="支付">
              <template slot-scope="scope">
                <div v-for="obj in scope.row.payList" :key="obj.id">
                  {{obj.payMethod}}&nbsp;￥{{obj.payPrice}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="serviceTechnician" header-align="center" align="center" label="服务人员">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="操作记录" name="orderHistory">
          <el-table :data="dataForm.logList" border>
            <el-table-column prop="orderId" header-align="center" align="center" label="订单ID" width="80">
            </el-table-column>
            <el-table-column prop="logType" header-align="center" align="center" label="类别">
            </el-table-column>
            <el-table-column prop="logContent" header-align="center" align="center" label="内容">
            </el-table-column>
            <el-table-column prop="logUserName" header-align="center" align="center" label="操作人">
            </el-table-column>
            <el-table-column prop="logTime" header-align="center" align="center" label="时间">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <!-- <el-button type="primary" @click="dataFormSubmit()">确定</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
import API from "@/api";
export default {
  data() {
    return {
      activeName: "orderDetail",
      visible: false,
      dataForm: {}
    };
  },
  methods: {
    init(id) {
      this.dataForm = {};
      this.visible = true;
      this.$nextTick(() => {});
      API.miorder.info(id).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataForm = data.miOrder;
        }
      });
    }
  }
};
</script>

<template lang="pug">
  el-dialog(title="详情",:close-on-click-modal="true",:visible.sync="visible")
    div(class="info")
      span 发货部门：{{row.consignorName}}
      span 收货部门：{{row.receiveName}}
      span 申请人：{{row.transactor}}
      span 备注：{{row.remarks}}
      // span recordType：{{recordType}}
      // span type：{{row.type}}
      // span status：{{row.status}}
    el-table(:data="list",border,style="width: 100%;")
      el-table-column(prop="brand",header-align="center",align="center",label="品牌")
      el-table-column(prop="name",header-align="center",align="center",label="商品")
      el-table-column(prop="productCode",header-align="center",align="center",label="编号")
      el-table-column(prop="unit",header-align="center",align="center",label="单位")
      el-table-column(prop="currentStock",header-align="center",align="center",label="当前库存")
      el-table-column(prop="allocationNum",header-align="center",align="center",label="申请数量")
        template(slot-scope="scope")
          el-input(v-if="row.type==0",v-model="scope.row.allocationNum")
          span(v-if="row.type==1") {{scope.row.allocationNum}}
      el-table-column(header-align="center",align="center",label="操作")
        template(slot-scope="scope")
          // 申请单，且出库
          el-button(v-if="row.type==0 && row.status!=1",type="text",size="small",@click="delRecord(scope.$index)") 删除
          // 发货单，且出库
          el-button(v-if="row.type==1 && row.status!=0",type="text",size="small",@click="delRecord(scope.$index)") 删除
    div(style="text-align:right;margin-top:10px;")
      // 申请单
      template(v-if="row.type==0")
        // 我创建，且出库
        template(v-if="recordType==1 && row.status==1")
          el-button(type="primary",@click="submit(3)") 确认收货
          el-button(@click="update(4)") 拒绝收货
        // 我创建，且驳回
        template(v-if="recordType==1 && row.status==2")
          el-button(type="primary",@click="update(0)") 提交
          el-button 删除
        // 我审批，且待审批
        template(v-if="recordType==2 && row.status==0")
          el-button(@click="update(2)") 驳回申请
          el-button(type="primary",@click="update(1)") 审批通过并出货
      // 发货单
      template(v-if="row.type==1")
        // 我审批，且出库
        template(v-if="recordType==2 && row.status==0")
          el-button(type="primary",@click="submit(3)") 确认收货
          el-button(@click="update(4)") 拒绝收货
</template>

<script>
import API from "@/api";

export default {
  data() {
    return {
      visible: false,
      recordType: null,
      row: {},
      list: []
    };
  },
  watch: {},
  methods: {
    init(params) {
      console.log(params);
      this.visible = true;
      this.recordType = params.recordType;
      this.row = params.row;
      this.getData(params.row.id);
    },
    getData(id) {
      this.list = [];
      // type: 3 调拨
      API.stockallocation.getDetailsList({ stockId: id, type: 3 }).then(({ data }) => {
        if (data && data.code === 0) {
          this.list = data.list;
        }
      });
    },
    delRecord(index) {
      this.list.splice(index, 1);
    },
    update(status) {
      const params = {
        id: this.row.id,
        consignorOffice: this.row.consignorOffice,
        receiveOffice: this.row.receiveOffice,
        type: this.row.type,
        status: status,
        consumeDetailsList: this.list
      };
      API.stockallocation.updateExamine(params).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data);
          this.$parent.reload();
          this.visible = false;
        }
      });
    },
    submit(status) {
      const params = {
        id: this.row.id,
        consignorOffice: this.row.consignorOffice,
        receiveOffice: this.row.receiveOffice,
        type: this.row.type,
        status: status
      };
      API.stockallocation.submitExamine(params).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data);
          this.$parent.reload();
          this.visible = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.info > span {
  margin-right: 20px;
}
</style>

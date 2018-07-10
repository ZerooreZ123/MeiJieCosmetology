<template lang="pug">
  el-dialog(title="调拨详情",:close-on-click-modal="true",:visible.sync="visible")
    div(class="info")
      span 记录日期：{{detail.createDate}}
      span 申请人：{{detail.transactor}}
      br
      span 发货部门：{{detail.consignorName}}
      span 收货部门：{{detail.receiveName}}
      span 备注：{{detail.remarks}}
    el-table(:data="detail.consumeDetailsList",border,style="width: 100%;")
      el-table-column(prop="brand",header-align="center",align="center",label="品牌")
      el-table-column(prop="name",header-align="center",align="center",label="商品")
      el-table-column(prop="productCode",header-align="center",align="center",label="编号")
      el-table-column(prop="unit",header-align="center",align="center",label="单位")
      el-table-column(prop="currentStock",header-align="center",align="center",label="当前库存")
      el-table-column(prop="allocationNum",header-align="center",align="center",label="调拨数量")
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      detail: {}
    };
  },
  methods: {
    init(params) {
      console.log(JSON.stringify(params));
      this.visible = true;
      this.detail = params;
    }
  }
};
</script>

<style scoped>
.info > span {
  margin-right: 20px;
}
</style>

<template lang="pug">
  el-dialog(title="采购入库",:close-on-click-modal="true",:visible.sync="visible")
    div(class="info")
      span 记录日期：{{stock.purchaseDate}}
      span 经办人：{{stock.transactor}}
      span 供应商：{{stock.shop}}
      span 备注：{{stock.remarks}}
    el-table(:data="stock.list",border,style="width: 100%;")
      el-table-column(header-align="center",align="center",label="入库部门")
        template(slot-scope="scope") {{scope.row.receiveName}}
      el-table-column(prop="name",header-align="center",align="center",label="商品")
      el-table-column(prop="productCode",header-align="center",align="center",label="编号")
      el-table-column(prop="brand",header-align="center",align="center",label="品牌")
      el-table-column(prop="unit",header-align="center",align="center",label="单位")
      el-table-column(prop="purchasePrice",header-align="center",align="center",label="采购价")
      el-table-column(prop="inboundNum",header-align="center",align="center",label="入库数量")
      el-table-column(header-align="center",align="center",label="小计")
        template(slot-scope="scope") ￥{{scope.row.purchasePrice * scope.row.inboundNum}}
</template>

<script>
import API from "@/api";

const emptyStruct = {
  shop: "",
  purchaseDate: "",
  remarks: "",
  transactor: "",
  list: []
};
export default {
  data() {
    return {
      visible: false,
      stock: emptyStruct
    };
  },
  watch: {},
  methods: {
    init(params) {
      this.visible = true;
      this.getData(params.id, params.type);
    },
    getData(id, type) {
      this.stockPurchase = emptyStruct;
      API.stockpurchase.getInboundDetail({ id, type }).then(({ data }) => {
        if (data && data.code === 0) {
          if (+type === 1) {
            this.stock.shop = data.stockPurchase.officeName;
            this.stock.supplierName = data.stockPurchase.supplierName;
            this.stock.purchaseDate = data.stockPurchase.purchaseDate;
            this.stock.remarks = data.stockPurchase.remarks;
            this.stock.transactor = data.stockPurchase.transactor;
            this.stock.list = data.stockPurchase.stockConsumeDetailsList;
          } else if (+type === 3) {
            this.stock.shop = data.stockAllocation.receiveName;
            this.stock.purchaseDate = data.stockAllocation.createDate;
            this.stock.remarks = data.stockAllocation.remarks;
            this.stock.transactor = data.stockAllocation.transactor;
            this.stock.list = data.stockAllocation.consumeDetailsList;
          }
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

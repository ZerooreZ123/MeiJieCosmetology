<template lang="pug">
  el-dialog(title="采购入库",:close-on-click-modal="true",:visible.sync="visible")
    div(class="info")
      span 记录日期：{{stockPurchase.purchaseDate}}
      span 经办人：{{stockPurchase.transactor}}
      span 供应商：{{stockPurchase.supplierName}}
      span 备注：{{stockPurchase.remarks}}
    el-table(:data="stockPurchase.stockConsumeDetailsList",border,style="width: 100%;")
      el-table-column(header-align="center",align="center",label="入库部门")
        template(slot-scope="scope") {{stockPurchase.officeName}}
      el-table-column(prop="name",header-align="center",align="center",label="商品")
      el-table-column(prop="productCode",header-align="center",align="center",label="编号")
      el-table-column(prop="brand",header-align="center",align="center",label="品牌")
      el-table-column(prop="unit",header-align="center",align="center",label="单位")
      el-table-column(prop="purchasePrice",header-align="center",align="center",label="采购价")
      el-table-column(prop="warehousNum",header-align="center",align="center",label="入库数量")
      el-table-column(header-align="center",align="center",label="小计")
        template(slot-scope="scope") ￥{{scope.row.purchasePrice * scope.row.warehousNum}}
</template>

<script>
import API from "@/api";

const emptyStruct = {
  officeName: "",
  purchaseAmount: "",
  purchaseDate: "",
  remarks: "",
  transactor: "",
  stockConsumeDetailsList: []
};
export default {
  data() {
    return {
      visible: false,
      stockPurchase: emptyStruct
    };
  },
  watch: {},
  methods: {
    init(params) {
      this.visible = true;
      this.getData(params.id);
    },
    getData(id) {
      this.stockPurchase = emptyStruct;
      API.stockpurchase.info(id).then(({ data }) => {
        if (data && data.code === 0 && data.stockPurchase) {
          this.stockPurchase = data.stockPurchase;
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

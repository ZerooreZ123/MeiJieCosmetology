<template lang="pug">
  el-dialog(title="采购入库",:close-on-click-modal="true",:visible.sync="visible")
    div(class="info")
      span 记录日期：{{stockConsume.consumeDate}}
      span 盘点人：{{stockConsume.inventory}}
      span 备注：{{stockConsume.remarks}}
    el-table(:data="stockConsume.stockConsumeDetailsList",border,style="width: 100%;")
      el-table-column(header-align="center",align="center",label="入库部门")
        template(slot-scope="scope") {{stockConsume.officeName}}
      el-table-column(prop="name",header-align="center",align="center",label="商品")
      el-table-column(prop="productCode",header-align="center",align="center",label="编号")
      el-table-column(prop="brand",header-align="center",align="center",label="品牌")
      el-table-column(prop="unit",header-align="center",align="center",label="单位")
      el-table-column(prop="consumeNum",header-align="center",align="center",label="消耗数量")
</template>

<script>
import API from "@/api";

const emptyStruct = {
  officeName: "",
  consumeNum: "",
  consumeDate: "",
  remarks: "",
  inventory: "",
  stockConsumeDetailsList: []
};
export default {
  data() {
    return {
      visible: false,
      stockConsume: emptyStruct
    };
  },
  watch: {},
  methods: {
    init(params) {
      this.visible = true;
      this.getData(params.id);
    },
    getData(id) {
      this.stockConsume = emptyStruct;
      API.stockconsume.info(id).then(({ data }) => {
        if (data && data.code === 0 && data.stockConsume) {
          this.stockConsume = data.stockConsume;
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

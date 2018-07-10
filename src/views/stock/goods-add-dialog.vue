<template lang="pug">
  el-dialog(title="添加商品",:close-on-click-modal="true",:visible.sync="visible")
    div(class="topbar")
      span
        el-select(v-model="catFirst",placeholder="大类",@change="getList")
          el-option(label="全部",value="")
          el-option(v-for="item in categoryList",:key="item.id",:label="item.name",:value="item.id")
      span
        el-select(v-model="brandId",placeholder="品牌",@change="getList")
          el-option(label="全部",value="")
          el-option(v-for="item in brandList",:key="item.id",:label="item.name",:value="item.id")
      span
        el-input(v-model="key",placeholder="搜索名称/编号",style="width:200px;")
      span
        el-button(@click="getList") 搜索
    el-table(:data="dataList",border,@selection-change="selectionChangeHandle",style="width: 100%;")
      el-table-column(type="selection",header-align="center",align="center",width="50")
      el-table-column(prop="name",header-align="center",align="center",label="商品名称")
      el-table-column(prop="purchasePrice",header-align="center",align="center",label="采购价")
      el-table-column(prop="categoryname",header-align="center",align="center",label="类别")
      el-table-column(prop="brandName",header-align="center",align="center",label="品牌")
      el-table-column(prop="productUnit",header-align="center",align="center",label="单位")
      el-table-column(prop="capacityUnit",header-align="center",align="center",label="规格")
      el-table-column(prop="productno",header-align="center",align="center",label="编号")
    div(style="margin-top:10px;")
      el-button(type="primary",@click="doAdd") 确认添加
</template>

<script>
import API from "@/api";

export default {
  data() {
    return {
      visible: false,
      catFirst: "",
      brandId: "",
      key: "",
      dataListSelections: [],
      categoryList: [],
      brandList: [],
      dataList: []
    };
  },
  watch: {},
  methods: {
    init(params) {
      this.visible = true;
      console.log(params.officeId)
      this.officeId = params.officeId;
      this.getCategory();
      this.getList();
    },
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    getCategory() {
      API.common.getCategoryList().then(({ data }) => {
        this.categoryList = data.list["products"];
      });
      API.productbrand.queryProductBrandList().then(({ data }) => {
        this.brandList = data.list;
      });
    },
    getList() {
      this.dataList = [];
      API.stockpurchase
        .getGoodList({
          officeId: this.officeId,
          catFirst: this.catFirst,
          brandId: this.brandId,
          key: this.key
        })
        .then(({ data }) => {
          if (data.code === 0) {
            this.dataList = data.list;
          }
        });
    },
    doAdd() {
      this.$emit("select-finish", this.dataListSelections)
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.topbar {
  padding-bottom: 10px;
}
.topbar > span {
  margin-right: 10px;
}
</style>

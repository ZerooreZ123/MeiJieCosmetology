<template>
  <div>
    <tab-nav :itemList='itemList' :space="10">
      <template slot="采购入库">
        <purchase-add/>
      </template>
      <template slot="入库记录">
        <stockpurchase/>
      </template>
    </tab-nav>
  </div>
</template>

<script>
import tabNav from "../../components/tabNav";
import stockpurchase from "../stockpurchase/index.vue";
import purchaseAdd from "./purchase-add.vue";
export default {
  data() {
    return {
      itemList: ["采购入库", "入库记录"]
    };
  },
  components: {
    tabNav,
    stockpurchase,
    purchaseAdd
  },
  methods: {}
};
</script>

<template>
  <div>
    <tab-nav :itemList='itemList' :space="10">
      <template slot="库存管理">
        <stockrealtime></stockrealtime>
      </template>
      <template slot="月出入统计">
        <financial></financial>
      </template>
      <template slot="库存变更记录">
        <stockconsumedetails></stockconsumedetails>
      </template>
    </tab-nav>
  </div>
</template>

<script>
import tabNav from "../../components/tabNav";
import stockrealtime from "../stockrealtime/index";
import financial from "../stockrealtime/financial";
import stockconsumedetails from "../stockrealtime/stockconsumedetails";

export default {
  data() {
    return {
      itemList: ["库存管理", "月出入统计", "库存变更记录"]
    };
  },
  components: {
    tabNav,
    stockrealtime,
    financial,
    stockconsumedetails
  },
  methods: {}
};
</script>

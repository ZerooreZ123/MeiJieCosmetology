<template>
  <div>
    <tab-nav :itemList='itemList' :space="10">
      <template slot="调拨/申请">
        <allocation-add></allocation-add>
      </template>
      <template slot="审批/接收">
        <allocation-approve></allocation-approve>
      </template>
      <template slot="调拨记录">
        <stockallocation></stockallocation>
      </template>
    </tab-nav>
  </div>
</template>

<script>
import tabNav from "../../components/tabNav";
import allocationAdd from "./allocation-add";
import allocationApprove from "./allocation-approve";
import stockallocation from "../stockallocation/index";

export default {
  data() {
    return {
      itemList: ["调拨/申请", "审批/接收", "调拨记录"]
    };
  },
  components: {
    tabNav,
    allocationAdd,
    allocationApprove,
    stockallocation
  },
  methods: {}
};
</script>

<template>
  <div>
    <tab-nav :itemList='itemList' :space="10">
      <template slot="记录消耗">
        <consume-add></consume-add>
      </template>
      <template slot="出库记录-消耗">
        <stockconsume :type="1"></stockconsume>
      </template>
      <template slot="出库记录-售卖">
        <stockconsume :type="2"></stockconsume>
      </template>
    </tab-nav>
  </div>
</template>

<script>
import tabNav from "../../components/tabNav";
import consumeAdd from "./consume-add";
import stockconsume from "../stockconsume/index";

export default {
  data() {
    return {
      itemList: ["记录消耗", "出库记录-消耗", "出库记录-售卖"]
    };
  },
  components: {
    tabNav,
    consumeAdd,
    stockconsume
  },
  methods: {}
};
</script>

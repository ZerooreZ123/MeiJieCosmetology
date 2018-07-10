<template>
  <div>
    <tab-nav :itemList='itemList' :space="10">
      <template slot="项目">
        <serviceitem/>
      </template>
      <template slot="套餐">
        <servicepackage/>
      </template>
      <template slot="产品">
        <serviceproduct/>
      </template>
      <template slot="卡">
        <servicecard></servicecard>
      </template>
    </tab-nav>
  </div>
</template>

<script>
import tabNav from "../../components/tabNav";
import serviceitem from "../serviceitem/index";
import servicepackage from "../servicepackage/index";
import serviceproduct from "../serviceproduct/index";
import servicecard from "../servicecard/index";
export default {
  data() {
    return {
      itemList: ["项目", "套餐", "产品", "卡"]
    };
  },
  components: {
    tabNav,
    serviceitem,
    servicepackage,
    serviceproduct,
    servicecard
  },
  methods: {}
};
</script>

<style scoped>
</style>

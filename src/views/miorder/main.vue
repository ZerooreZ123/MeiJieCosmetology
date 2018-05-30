<template>
  <tab-nav :itemList='itemList' space="10">
    <!-- 状态：1、待付款 2、已付款 3、尾款单 4、已取消 5、已退单 -->
    <div slot="待付款">
      <order :status="1"></order>
    </div>
    <div slot="已付款">
      <order :status="2"></order>
    </div>
    <div slot="尾款单">
      <order :status="3"></order>
    </div>
    <div slot="历史订单">
      <order :history="true"></order>
    </div>
    <div slot="当前营业总收入">
      <chart></chart>
    </div>
  </tab-nav>
</template>

<script>
import tabNav from "@/components/tabNav";
import order from "./index";
import chart from "./chart";
export default {
  components: { tabNav, order, chart },
  data() {
    return {
      itemList: ["待付款", "已付款", "尾款单", "历史订单", "当前营业总收入"]
    };
  }
};
</script>

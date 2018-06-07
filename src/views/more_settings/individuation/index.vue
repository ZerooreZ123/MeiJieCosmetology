<template>
  <div>
    <tab-nav :itemList='itemList' space="10">
      <div slot="项目/产品/类别">
        <product-and-type></product-and-type>
      </div>
      <div slot="产品品牌管理">
        <productbrand></productbrand>
      </div>
      <div slot="员工身份设置">
        <sysidentity></sysidentity>
      </div>
      <div slot="支付方式">
        <syspaymode></syspaymode>
      </div>
      <div slot="角色权限设置">
        <role></role>
      </div>
      <div slot="开关设置">
        <switch-setting></switch-setting>
      </div>
    </tab-nav>
  </div>
</template>

<script>
import productbrand from "@/views/productbrand/index";
import productAndType from "./product_and_type";
import switchSetting from "./switch_setting";
import sysidentity from "@/views/sysidentity/index";
import syspaymode from "@/views/syspaymode/index";
import role from "@/views/role/index";
import tabNav from "@/components/tabNav";
export default {
  components: {
    productbrand,
    tabNav,
    productAndType,
    sysidentity,
    syspaymode,
    role,
    switchSetting
  },
  data() {
    return {
      itemList: ["项目/产品/类别", "产品品牌管理", "员工身份设置", "支付方式", "角色权限设置", "开关设置"]
    };
  }
};
</script>

<style scoped>
</style>


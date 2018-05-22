<template>
  <div>
    <tab-nav :itemList='itemList' :space="10">
      <template slot="门店列表">
        <sysoffice ref="sysoffice" />
      </template>
      <template slot="房间列表">
        <room ref="room" />
      </template>
      <template slot="设备列表">
        <device ref="syspaymode" />
      </template>
      <template slot="区域管理">
        <sysarea ref="sysarea" />
      </template>
    </tab-nav>

  </div>
</template>

<script>
import tabNav from "../../components/tabNav";
import sysarea from "../sysarea/index";
import room from "../room/index";
import sysoffice from "../sysoffice/index";
import device from "../device/index";
export default {
  data() {
    return {
      itemList: ["门店列表", "房间列表", "设备列表", "区域管理"]
    };
  },
  components: {
    tabNav,
    sysarea,
    room,
    sysoffice,
    device
  },
  methods: {}
};
</script>

<style scoped>
</style>

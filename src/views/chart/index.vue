<template>
  <div>

    <tab-nav :itemList='itemList' :space="10" ref="nav">
      <template slot="right">
        <div class="time-bar">
          <el-date-picker value-format="yyyy-MM-dd hh:mm" v-model="startTime" type="datetime" placeholder="开始时间">
          </el-date-picker>
          --
          <el-date-picker value-format="yyyy-MM-dd hh:mm" v-model="endTime" type="datetime" placeholder="结束时间">
          </el-date-picker>
        </div>
      </template>
      <template slot="营收统计">
        <statistics :start-time="startTime" :end-time="endTime"></statistics>
      </template>
      <template slot="销售排行">
        <rank :start-time="startTime" :end-time="endTime"></rank>
      </template>
    </tab-nav>
  </div>
</template>

<script>
import tabNav from "../../components/tabNav";
import statistics from "./statistics";
import rank from "./rank";
import { formatDate } from "@/utils";
export default {
  components: { tabNav, statistics, rank },
  data() {
    return {
      startTime: formatDate(new Date(), "yyyy-MM-dd") + " 00:00",
      endTime: formatDate(new Date(), "yyyy-MM-dd") + " 23:59",
      itemList: ["营收统计", "销售排行"]
    };
  }
};
</script>

<style scoped>
.time-bar {
  display: block;
  float: right;
  margin-top: 15px;
  margin-right: 100px;
}
</style>

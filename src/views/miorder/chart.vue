<template>
  <div>
    <div>
      <el-select v-model="shopId" placeholder="请选择门店" style="float:right;">
        <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <div style="clear:both;margin-bottom:10px;"></div>
    </div>
    <el-row>
      <el-col :span="12" class="block">
        <my-echarts ref="收入金额明细" :option="optionBar"></my-echarts>
      </el-col>
      <el-col :span="12" class="block">
        <my-echarts ref="收入来源统计" :option="optionPie"></my-echarts>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="block">
        <my-echarts ref="客次客数统计" :option="optionLineArea"></my-echarts>
      </el-col>
      <el-col :span="12" class="block">
        <my-echarts ref="历史订单数" :option="optionLine"></my-echarts>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import myEcharts from "@/components/myEcharts";
import API from "@/api";
import { optionBar, optionLine, optionLineArea, optionPie } from "./baseOptions.js";

export default {
  components: { myEcharts },
  data() {
    return {
      optionBar: optionBar,
      optionPie: optionPie,
      optionLineArea: optionLineArea,
      optionLine: optionLine,
      shopId: "",
      shopList: []
    };
  },
  mounted() {
    this.getShopList();
    this.getAmount();
    this.getSource();
    this.getGuest();
    this.getQuantity();
  },
  watch: {
    shopId() {
      this.getShopList(this.shopId);
      this.getAmount(this.shopId);
      this.getSource(this.shopId);
      this.getGuest(this.shopId);
      this.getQuantity(this.shopId);
    }
  },
  methods: {
    getShopList() {
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        }
      });
    },
    getAmount(officeId) {
      API.miorder.getAmount({officeId}).then(({ data }) => {
        // console.log(data.list);
        if (data && data.code === 0) {
          const xData = data.list.map(obj => obj.name);
          const yData = data.list.map(obj => obj.payPrice);
          optionBar.xAxis.data = xData;
          optionBar.series[0].data = yData;
          this.optionBar = optionBar;
          this.$refs["收入金额明细"].reload();
        }
      });
    },
    getSource(officeId) {
      API.miorder.getSource({officeId}).then(({ data }) => {
        // console.log(data.list);
        if (data && data.code === 0) {
          const xData = data.list.map(obj => obj.name);
          const yData = data.list.map(obj => ({
            name: obj.name,
            value: obj.receivable
          }));
          optionPie.legend.data = xData;
          optionPie.series[0].data = yData;
          this.optionPie = optionPie;
          this.$refs["收入来源统计"].reload();
        }
      });
    },
    getGuest(officeId) {
      API.miorder.getGuest({officeId}).then(({ data }) => {
        // console.log(data.list);
        if (data && data.code === 0) {
          const xData = data.list.map(obj => obj.name);
          const yData = data.list.map(obj => obj.val);
          optionLineArea.xAxis.data = xData;
          optionLineArea.series[0].data = yData;
          this.optionLineArea = optionLineArea;
          this.$refs["客次客数统计"].reload();
        }
      });
    },
    getQuantity(officeId) {
      API.miorder.getQuantity({officeId}).then(({ data }) => {
        // console.log(data.list);
        if (data && data.code === 0) {
          const xData = data.list.map(obj => obj.month);
          const yData = data.list.map(obj => obj.counts);
          optionLine.xAxis.data = xData;
          optionLine.series[0].data = yData;
          this.optionLine = optionLine;
          this.$refs["历史订单数"].reload();
        }
      });
    }
  }
};
</script>

<style scoped>
.block {
  height: 400px;
}
</style>

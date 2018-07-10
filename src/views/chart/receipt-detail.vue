<template lang="pug">
  div
    div
      el-button(class="goback",@click="$parent.page='main'",size="small") 返回
    el-row
      el-col(:span="18")
        div(style="height:350px;")
          my-echarts(ref="line",:option="lineOption")
        div(style="height:350px;")
          my-echarts(ref="bar",:option="barOption")
      el-col(:span="6")
        div(style="height:350px;")
          my-echarts(ref="pie",:option="pieOption")
</template>


<script>
import API from "@/api";
import myEcharts from "@/components/myEcharts";
import { lineStruct, barStruct, pieStruct } from "./struct.js";

export default {
  props: ["startTime", "endTime"],
  components: { myEcharts },
  data() {
    return {
      lineOption: JSON.parse(JSON.stringify(lineStruct)),
      barOption: JSON.parse(JSON.stringify(barStruct)),
      pieOption: JSON.parse(JSON.stringify(pieStruct))
    };
  },
  mounted() {
    this.getData();
  },
  activated() {},
  watch: {
    startTime() {
      this.getData();
    },
    endTime() {
      this.getData();
    }
  },
  methods: {
    getData() {
      const params = {
        startTime: this.startTime,
        endTime: this.endTime
      };
      API.chart.consumeTrend(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.lineOption.title.text = "消耗走势";
          this.lineOption.xAxis.data = data.list.map(o => o.times);
          this.lineOption.series[0].data = data.list.map(o => o.payPrice);
          this.$refs.line.reload();
        } else {
          this.$message.error(data.msg);
        }
      });
      API.chart.otherConsumeThrend(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.barOption.title.text = "其它消耗走势";
          this.barOption.xAxis.data = data.list.map(o => o.name);
          this.barOption.series[0].data = data.list.map(o => o.realPrice);
          this.$refs.bar.reload();
        } else {
          this.$message.error(data.msg);
        }
      });
      API.chart.realPrice(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.pieOption.title.text = "业绩来源对比";
          this.pieOption.series[0].data = data.list.map(o => {
            return {
              name: o.type,
              value: o.realPrice || 0
            };
          });
          this.$refs.pie.reload();
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
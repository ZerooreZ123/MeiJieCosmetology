<template>
  <div ref="chart" style="height:100%;width:100%"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["option"],
  mounted() {
    this.ec = echarts.init(this.$refs.chart);
    this.ec.setOption(this.option);
  },
  methods: {
    reload() {
      this.ec.setOption(this.option);
    }
  }
};
</script>


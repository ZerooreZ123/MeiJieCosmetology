<template lang="pug">
div
  div(v-if="page=='main'")
    el-row
      el-col(:span="18")
        div(class="flex-ctn")
          div(class="chart-t-block",@click="page='amount'")
            img(class="icon",src="~@/assets/img/Total performance.png")
            div(class="sum-text")
              div(style="font-size:20px;") ￥{{amountSum}}
              div(class="title-label") 总业绩
          div(class="list")
            div(v-for="item in amount",:key="item.name")
              span(class="label") {{item.name}}
              span ￥{{item.payPrice | money}}
        div(class="flex-ctn")
          div(class="chart-t-block",@click="page='card'")
            img(class="icon",src="~@/assets/img/Total card consumption.png")
            div(class="sum-text")
              div(style="font-size:20px;") ￥{{cardConsumnSum}}
              div(class="title-label") 总卡耗
          div(class="list")
            div(v-for="item in cardConsumn",:key="item.type")
              span(class="label") {{item.type}}
              span ￥{{item.payPrice | money}}
        div(class="flex-ctn")
          div(class="chart-t-block",@click="page='receipt'")
            img(class="icon",src="~@/assets/img/Business income.png")
            div(class="sum-text")
              div(style="font-size:20px;") ￥{{receiptSum}}
              div(class="title-label") 营业收入
          div(class="list")
            div(v-for="item in receipt",:key="item.type")
              span(class="label") {{item.type}}
              span ￥{{item.realPrice | money}}
      el-col(:span="6")
        div(style="height:350px;")
          my-echarts(ref="pie",:option="pieOption")
          my-echarts(ref="bar",:option="barOption")
  amount-detail(v-if="page=='amount'",:start-time="startTime",:end-time="endTime")
  receipt-detail(v-if="page=='receipt'",:start-time="startTime",:end-time="endTime")
  card-detail(v-if="page=='card'",:start-time="startTime",:end-time="endTime")
</template>


<script>
import API from "@/api";
import myEcharts from "@/components/myEcharts";
import { barStruct, pieStruct } from "./struct.js";
import amountDetail from "./amount-detail";
import receiptDetail from "./receipt-detail";
import cardDetail from "./card-detail";
import filters from "@/filters";
export default {
  props: ["startTime", "endTime"],
  components: { amountDetail, receiptDetail, myEcharts, cardDetail },
  data() {
    return {
      page: "main",
      amount: [],
      receipt: [],
      cardConsumn: [],
      openAndContinueCard: [],
      barOption: JSON.parse(JSON.stringify(barStruct)),
      pieOption: JSON.parse(JSON.stringify(pieStruct))
    };
  },
  computed: {
    amountSum() {
      let sum = 0;
      this.amount.forEach(o => (sum += o.payPrice || 0));
      return sum.toFixed(2);
    },
    receiptSum() {
      let sum = 0;
      this.receipt.forEach(o => (sum += o.realPrice || 0));
      return sum.toFixed(2);
    },
    cardConsumnSum() {
      let sum = 0;
      this.cardConsumn.forEach(o => (sum += o.payPrice || 0));
      return sum.toFixed(2);
    }
  },
  filters: filters,
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
      API.chart.getAmount(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.amount = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });
      API.chart.cardConsumn(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.cardConsumn = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });
      API.chart.realPrice(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.receipt = data.list;
          this.barOption.title.text = "合计产出统计";
          this.barOption.xAxis.data = data.list.map(o => o.type);
          this.barOption.series[0].data = data.list.map(o => o.realPrice || 0);
          this.barOption.grid = {
            left: "15%",
            right: 0
          };
          this.$refs.bar.reload();
        } else {
          this.$message.error(data.msg);
        }
      });
      API.chart.openAndContinueCard(params).then(({ data }) => {
        // {"msg":"success","code":0,"list":[{"payPrice":10000.00,"type":"开卡购卡"},{"payPrice":200.00,"type":"卡充值"}]}
        if (data && data.code === 0) {
          this.pieOption.title.text = "合计存款统计";
          this.pieOption.series[0].data = data.list.map(o => {
            return {
              name: o.type,
              value: o.payPrice
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



<style scoped lang="scss">
.flex-ctn {
  display: flex;
  flex-direction: row;
  border: 1px solid #eee;
  margin-top: 10px;
  .chart-t-block {
    width: 279px;
    min-height: 100px;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .icon {
      display: block;
      width: 50px;
      margin-right: 20px;
    }
    .sum-text {
      width: 150px;
    }
  }
  .list {
    line-height: 30px;
    padding-left: 20px;
  }
  .label {
    display: inline-block;
    width: 150px;
    color: #777;
  }
  .title-label {
    font-size: 14px;
    color: #777;
  }
}
</style>

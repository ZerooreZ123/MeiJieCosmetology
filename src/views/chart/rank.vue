<template lang="pug">
  div
    el-row(style="margin-top:20px;")
      el-col(:span="12")
        div(class="title") 开卡/续充排行
        el-tabs(v-model="cardActiveName")
          el-tab-pane(label="卡大类",name="卡大类")
            el-table(border,style="width: 100%;",:data="cardList",max-height="500")
              el-table-column(type="index",header-align="center",align="center",label="排名",width="50")
              el-table-column(prop="name",header-align="center",align="center",label="类别")
              el-table-column(prop="realPrice",header-align="center",align="center",label="产值")
              el-table-column(header-align="center",align="center",label="占比")
                template(slot-scope="scope") {{scope.row.proportion | money}}%
          el-tab-pane(label="具体卡",name="具体卡")
            el-table(border,style="width: 100%;",:data="cardListDetail",max-height="500")
              el-table-column(type="index",header-align="center",align="center",label="排名",width="50")
              el-table-column(prop="name",header-align="center",align="center",label="类别")
              el-table-column(prop="realPrice",header-align="center",align="center",label="产值")
              el-table-column(header-align="center",align="center",label="占比")
                template(slot-scope="scope") {{scope.row.proportion | money}}%
      el-col(:span="12")
        div(class="title") 卡耗排行
        el-tabs(v-model="cardConsumnActiveName")
          el-tab-pane(label="卡大类",name="卡大类")
            el-table(border,style="width: 100%;",:data="cardConsumnList",max-height="500")
              el-table-column(type="index",header-align="center",align="center",label="排名",width="50")
              el-table-column(prop="name",header-align="center",align="center",label="类别")
              el-table-column(prop="realPrice",header-align="center",align="center",label="产值")
              el-table-column(header-align="center",align="center",label="占比")
                template(slot-scope="scope") {{scope.row.proportion | money}}%
          el-tab-pane(label="具体卡",name="具体卡")
            el-table(border,style="width: 100%;",:data="cardConsumnDetail",max-height="500")
              el-table-column(type="index",header-align="center",align="center",label="排名",width="50")
              el-table-column(prop="name",header-align="center",align="center",label="类别")
              el-table-column(prop="realPrice",header-align="center",align="center",label="产值")
              el-table-column(header-align="center",align="center",label="占比")
                template(slot-scope="scope") {{scope.row.proportion | money}}%
    el-row(style="margin-top:20px;")
      el-col(:span="12")
        div(class="title") 项目服务营收
        el-tabs(v-model="itemsActiveName")
          el-tab-pane(label="项目大类",name="项目大类")
            el-table(border,style="width: 100%;",:data="itemsList",max-height="500")
              el-table-column(type="index",header-align="center",align="center",label="排名",width="50")
              el-table-column(prop="name",header-align="center",align="center",label="类别")
              el-table-column(prop="realPrice",header-align="center",align="center",label="产值")
              el-table-column(header-align="center",align="center",label="占比")
                template(slot-scope="scope") {{scope.row.proportion | money}}%
          el-tab-pane(label="具体项目",name="具体项目")
            el-table(border,style="width: 100%;",:data="itemsListDetail",max-height="500")
              el-table-column(type="index",header-align="center",align="center",label="排名",width="50")
              el-table-column(prop="name",header-align="center",align="center",label="类别")
              el-table-column(prop="realPrice",header-align="center",align="center",label="产值")
              el-table-column(header-align="center",align="center",label="占比")
                template(slot-scope="scope") {{scope.row.proportion | money}}%
      el-col(:span="12")
        div(class="title") 产品营收
        el-tabs(v-model="productActiveName")
          el-tab-pane(label="项目大类",name="产品大类")
            el-table(border,style="width: 100%;",:data="productList",max-height="500")
              el-table-column(type="index",header-align="center",align="center",label="排名",width="50")
              el-table-column(prop="name",header-align="center",align="center",label="类别")
              el-table-column(prop="realPrice",header-align="center",align="center",label="产值")
              el-table-column(header-align="center",align="center",label="占比")
                template(slot-scope="scope") {{scope.row.proportion | money}}%
          el-tab-pane(label="具体产品",name="具体产品")
            el-table(border,style="width: 100%;",:data="productListDetail",max-height="500")
              el-table-column(type="index",header-align="center",align="center",label="排名",width="50")
              el-table-column(prop="name",header-align="center",align="center",label="类别")
              el-table-column(prop="realPrice",header-align="center",align="center",label="产值")
              el-table-column(header-align="center",align="center",label="占比")
                template(slot-scope="scope") {{scope.row.proportion | money}}%

</template>

<script>
import API from "@/api";
import filters from "@/filters";
export default {
  components: { API },
  props: ["startTime", "endTime"],
  data() {
    return {
      itemsList: [],
      itemsListDetail: [],
      itemsActiveName: "项目大类",
      productList: [],
      productListDetail: [],
      productActiveName: "产品大类",
      cardList: [],
      cardListDetail: [],
      cardActiveName: "卡大类",
      cardConsumnList: [],
      cardConsumnDetail: [],
      cardConsumnActiveName: "卡大类"
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    startTime() {
      this.getData();
    },
    endTime() {
      this.getData();
    }
  },
  filters: filters,
  methods: {
    getData() {
      const params = {
        startTime: this.startTime,
        endTime: this.endTime
      };
      API.chart.otherConsumeThrend(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.itemsList = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });
      API.chart.detailItem(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.itemsListDetail = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });
      API.chart.catFirstRevenue(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.productList = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });
      API.chart.detailProduct(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.productListDetail = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });

      // 开卡/充值卡大类排行
      API.chart.cardCarFirst(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.cardList = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });

      // 开卡/充值具体卡排行
      API.chart.detailCard(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.cardListDetail = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });

      // 卡耗排行卡大类
      API.chart.cardConsumnCarFirst(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.cardConsumnList = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });

      // 卡耗排行具体卡
      API.chart.detailCardConsumn(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.cardConsumnDetail = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  border-left: 4px solid #c99f63;
  font-weight: bold;
  padding-left: 10px;
}
</style>

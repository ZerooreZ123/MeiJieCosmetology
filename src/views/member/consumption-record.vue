<template>
  <div>
    <div class="selectTime">
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="startTime" placeholder="开始时间" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="endTime" placeholder="结束时间" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="dataList" border style="width: 100%;">
      <el-table-column prop="createDate" header-align="center" align="center" label="消费时间" width="140">
      </el-table-column>
      <el-table-column prop="detailList" header-align="center" align="center" label="美疗师">
        <template slot-scope="scope">
          <div v-for="item in scope.row.detailList" :key="item.serviceId" v-text="item.serviceTechnician"></div>
        </template>
      </el-table-column>
      <el-table-column prop="orderNo" header-align="center" align="center" label="订单编号">
      </el-table-column>
      <el-table-column prop="detailList" header-align="center" align="center" label="消费内容">
        <template slot-scope="scope">
          <div v-for="item in scope.row.detailList" :key="item.serviceId" v-text="item.serviceName"></div>
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" header-align="center" align="center" label="订单金额">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="lookOrder(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    <add-order-detail v-if="isShow" ref="addOrderDetail"></add-order-detail>
  </div>
</template>

<script>
import API from "@/api";
import addOrderDetail from "./add-order-detail";
export default {
  props: ["memberId"],
  components: { addOrderDetail },
  data() {
    return {
      isShow: false,
      startTime: "",
      endTime: "",
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataList: []
    };
  },
  mounted() {
    if (this.memberId) {
      this.getDataList();
    }
  },
  methods: {
    getDataList() {
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        memberId: this.memberId,
        startTime: this.startTime,
        endTime: this.endTime
      };
      API.miorder.list(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.appointmentList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.appointmentList();
    },
    lookOrder(id) {
      this.isShow = true;
      this.$nextTick(() => {
        this.$refs.addOrderDetail.init(id);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>



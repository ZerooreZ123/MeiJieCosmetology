<template>
  <div>
    <div class="selectTime">
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="startTime" placeholder="开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="endTime" placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border style="width: 100%;" :data="dataList">
      <el-table-column prop="appointDate" header-align="center" align="center" label="预约时间" width="120">
      </el-table-column>
      <el-table-column prop="technician" header-align="center" align="center" label="美疗师">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.technician">{{scope.row.technician}}</el-tag>
          <el-tag v-else>未指定</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roomName" header-align="center" align="center" label="预约房间">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.roomName">{{scope.row.roomName}}</el-tag>
          <el-tag v-else>未指定房间</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" header-align="center" align="center" label="预约内容">
      </el-table-column>
      <el-table-column prop="status" header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" size="small" type="danger">已失效</el-tag>
          <el-tag v-if="scope.row.status == 1" size="small">生效中</el-tag>
          <el-tag v-if="scope.row.status == 2" size="small" type="success">已开单</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
  </div>
</template>

<script>
import API from "@/api";
export default {
  props: ["memberId"],
  data() {
    return {
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
        overTime: this.endTime
      };
      API.appointment.list(params).then(({ data }) => {
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
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>



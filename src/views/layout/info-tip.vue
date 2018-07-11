<template>
  <el-dialog title="特殊日期提醒" :visible.sync="visible" :append-to-body="true">
    <div class="mod-config">
      <br/>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-date-picker type="date" value-format="yyyy-MM-dd" :model="dataForm.startTime" placeholder="开始日期"></el-date-picker>~
          <el-date-picker type="date" value-format="yyyy-MM-dd" :model="dataForm.endTime" placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.name" placeholder="会员名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50">
        </el-table-column>
        <el-table-column prop="id" header-align="center" align="center" label="ID" width="50">
        </el-table-column>
        <el-table-column prop="name" header-align="center" align="center" label="会员名">
        </el-table-column>
        <el-table-column prop="mobile" header-align="center" align="center" label="会员电话">
        </el-table-column>
        <el-table-column prop="birthday" header-align="center" align="center" label="生日时间">
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="lookDetail(scope.row.id)">会员详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import API from "@/api";
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        name: "",
        startTime: "",
        endTime: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    };
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        name: this.dataForm.name,
        startTime: this.dataForm.startTime,
        endTime: this.dataForm.endTime
      };
      API.member.birthday(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    lookDetail(id) {
      this.visible = false;
      this.$router.push({ path: "/member/member_detail/" + id });
    },
    // 初始化
    init() {
      this.visible = true;
      this.$nextTick(() => {
        var params = {};
        API.member.birthday(params).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list;
            this.totalPage = data.page.totalCount;
          } else {
            this.dataList = [];
            this.totalPage = 0;
          }
          this.dataListLoading = false;
        });
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
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    }
  }
};
</script>


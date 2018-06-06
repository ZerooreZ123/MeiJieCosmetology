<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataListPage1()">
      <div class="btns">
        <div class="input-left">
          <el-form-item>
            消费时间:
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="dataForm.startDay" placeholder="开始日期"></el-date-picker>~
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="dataForm.endDay" placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-button @click="getDataListPage1()">查询</el-button>
        </div>
        <div class="btns-right">
          <!-- <el-button v-if="isAuth('order:ordervisit:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button> -->
          <el-button v-if="isAuth('order:ordervisit:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
          <div class="clear"></div>
        </div>
      </div>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" label="编号">
      </el-table-column>
      <el-table-column prop="orderId" header-align="center" align="center" label="订单编号">
        <template slot-scope="scope">
          <div v-if="scope.row.orderInfo">
            <a href="javascript:();" @click="showDetail(scope.row.orderInfo.id)">
              <i class="el-icon-view"></i>
              <strong>{{scope.row.orderInfo.orderNo}}</strong>
            </a>
          </div>
          <div v-else>未找到订单信息</div>
        </template>
      </el-table-column>
      <el-table-column prop="consumeTime" header-align="center" align="center" label="消费时间">
      </el-table-column>
      <el-table-column prop="visitTime" header-align="center" align="center" label="回访时间">
      </el-table-column>
      <el-table-column prop="status" header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '1'" size="small" type="danger">待回访</el-tag>
          <el-tag v-else-if="scope.row.status === '2'" size="small">已回访</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="visitResult" header-align="center" align="center" label="回访结果">
      </el-table-column>
      <!-- <el-table-column
        prop="createBy"
        header-align="center"
        align="center"
        label="创建者">
      </el-table-column>
      <el-table-column
        prop="createDate"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateBy"
        header-align="center"
        align="center"
        label="更新者">
      </el-table-column>
      <el-table-column
        prop="updateDate"
        header-align="center"
        align="center"
        label="更新时间">
      </el-table-column> -->
      <el-table-column prop="remarks" header-align="center" align="center" label="备注信息">
      </el-table-column>
      <!-- <el-table-column
        prop="delFlag"
        header-align="center"
        align="center"
        label="删除标记">
      </el-table-column> -->
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '1'" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">回访处理</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <detail v-if="detailVisible" ref="detail" @refreshDataList="getDataList"></detail>
  </div>
</template>

<script>
import API from "@/api";
import AddOrUpdate from "./add-or-update";
import detail from "../miorder/detail";
export default {
  data() {
    return {
      dataForm: {
        startDay: "",
        endDay: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      detailVisible: false
    };
  },
  components: {
    AddOrUpdate,
    detail
  },
  activated() {
    this.getDataList();
  },
  methods: {
    getDataListPage1() {
      this.pageIndex = 1;
      this.getDataList();
    },
    showDetail(id) {
      this.detailVisible = true;
      this.$nextTick(() => {
        this.$refs.detail.init(id);
      });
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        startDay: this.dataForm.startDay,
        endDay: this.dataForm.endDay
      };
      API.ordervisit.list(params).then(({ data }) => {
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
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(`确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.ordervisit.del(ids).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>

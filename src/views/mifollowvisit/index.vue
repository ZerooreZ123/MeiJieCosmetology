<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <div class="btns">
        <div class="btns-right">
          <div class="input-left">
            <el-form-item>
              回访时间:
              <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="dataForm.startDay" placeholder="开始日期"></el-date-picker>~
              <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="dataForm.endDay" placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
              回访员:
              <el-select placeholder="请选择" v-model="dataForm.updateBy">
                <el-option label="全部" value="">
                </el-option>
                <el-option v-for="item in userList" :key="item.userId" :label="item.name" :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button @click="getDataList()">查询</el-button>
          </div>
          <el-button v-if="isAuth('generator:mifollowvisit:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <el-button v-if="isAuth('generator:mifollowvisit:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
          <div class="clear"></div>
        </div>
      </div>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <!-- <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="">
      </el-table-column> -->
      <el-table-column prop="remarks" header-align="center" align="center" label="会员">
      </el-table-column>
      <el-table-column prop="visitType" header-align="center" align="center" label="回访类型">
      </el-table-column>
      <el-table-column prop="visitTimeType" header-align="center" align="center" label="回访时间类型">
      </el-table-column>
      <el-table-column prop="visitTime" header-align="center" align="center" label="计划跟进回访时间">
      </el-table-column>
      <el-table-column prop="visitForm" header-align="center" align="center" label="回访形式">
      </el-table-column>
      <el-table-column prop="concatResult" header-align="center" align="center" label="联系结果">
      </el-table-column>
      <el-table-column prop="status" header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '1'" size="small" type="danger">待回访</el-tag>
          <el-tag v-else-if="scope.row.status === '2'" size="small">已回访</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="visitResult"
        header-align="center"
        align="center"
        label="跟进回访">
      </el-table-column>
      <el-table-column
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
      </el-table-column> -->
      <el-table-column prop="updateBy" header-align="center" align="center" label="回访人">
        <template slot-scope="scope">
          {{scope.row.updateBy | userName(userList)}}
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="updateDate"
        header-align="center"
        align="center"
        label="更新时间">
      </el-table-column>
      <el-table-column
        prop="remarks"
        header-align="center"
        align="center"
        label="备注信息">
      </el-table-column>
      <el-table-column
        prop="delFlag"
        header-align="center"
        align="center"
        label="删除标记">
      </el-table-column> -->
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">回访处理</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import API from "@/api";
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      dataForm: {
        startDay: "",
        endDay: "",
        updateBy: ""
      },
      dataList: [],
      userList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.getDataList();
  },
  mounted() {
    API.user.getList().then(({ data }) => {
      if (data && data.code === 0) {
        this.userList = data.list;
      } else {
        this.userList = [];
      }
    });
  },
  filters: {
    userName(updateBy, userList) {
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].userId === +updateBy) {
          return userList[i].name;
        }
      }
      return "未知";
    }
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        startDay: this.dataForm.startDay,
        endDay: this.dataForm.endDay,
        updateBy: this.dataForm.updateBy
      };
      API.mifollowvisit.list(params).then(({ data }) => {
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
        API.mifollowvisit.del(ids).then(({ data }) => {
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

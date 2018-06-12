<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <div class="btns">
        <div class="input-left">
          <el-form-item>
            <el-select v-model="officeId" placeholder="请选择门店">
              <el-option label="全部" value="">
              </el-option>
              <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="dataForm.key" placeholder="搜索姓名/技师" clearable @clear="getDataListPage1"></el-input>
          </el-form-item>
          <el-button @click="getDataListPage1()">查询</el-button>
        </div>
        <div class="btns-right">
          <el-button v-if="isAuth('appoint:appointment:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <el-button v-if="isAuth('appoint:appointment:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
          <div class="clear"></div>
        </div>
      </div>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" label="ID" width="50">
      </el-table-column>
      <!-- <el-table-column prop="appointNo" header-align="center" align="center" label="预约单号">
      </el-table-column> -->
      <!-- <el-table-column prop="officeId" header-align="center" align="center" label="所属机构">
      </el-table-column> -->
      <el-table-column prop="name" header-align="center" align="center" label="预约人姓名">
      </el-table-column>
      <el-table-column prop="mobile" header-align="center" align="center" label="预约人电话">
      </el-table-column>
      <el-table-column prop="nums" header-align="center" align="center" label="预约人数">
      </el-table-column>
      <el-table-column prop="appointDate" header-align="center" align="center" label="预约日期">
      </el-table-column>
      <!-- <el-table-column prop="reachTime" header-align="center" align="center" label="到店时间">
      </el-table-column>
      <el-table-column prop="endTime" header-align="center" align="center" label="预约结束时间">
      </el-table-column> -->
      <el-table-column prop="technician" header-align="center" align="center" label="技师">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" size="small" type="danger">已失效</el-tag>
          <el-tag v-if="scope.row.status == 1" size="small">生效中</el-tag>
          <el-tag v-if="scope.row.status == 2" size="small" type="success">已开单</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="是否指定">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isSpecify == 0" size="small" type="danger">否</el-tag>
          <el-tag v-else size="small">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="选择房间">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.roomId">{{getRoomNameById(scope.row.roomId)}}</el-tag>
          <el-tag v-else>未指定房间</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="serialno" header-align="center" align="center" label="流水单号">
      </el-table-column> -->
      <!-- <el-table-column prop="createBy" header-align="center" align="center" label="创建者">
      </el-table-column> -->
      <!-- <el-table-column prop="createDate" header-align="center" align="center" label="创建时间">
      </el-table-column> -->
      <!-- <el-table-column prop="updateBy" header-align="center" align="center" label="更新者">
      </el-table-column>
      <el-table-column prop="updateDate" header-align="center" align="center" label="更新时间">
      </el-table-column> -->
      <el-table-column prop="remarks" header-align="center" align="center" label="备注信息">
      </el-table-column>
      <!-- <el-table-column
        prop="delFlag"
        header-align="center"
        align="center"
        label="删除标记">
      </el-table-column> -->
      <el-table-column fixed="right" header-align="center" align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="text" size="small" @click="goOrderCreatePage(scope.row.id)">开单收银</el-button>
          <el-button v-if="scope.row.status == 1" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="scope.row.status == 1" type="text" size="small" @click="cancle(scope.row.id)">取消</el-button>
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
        key: ""
      },
      officeId: "",
      shopList: [],
      dataList: [],
      roomList: [],
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
    this.getShopList()
      .then(() => this.queryRoomList())
      .then(() => this.getDataList());
  },
  watch: {
    officeId() {
      this.getDataListPage1();
    }
  },
  methods: {
    goOrderCreatePage(id) {
      window.location.hash = "/createorder/appointment/" + id;
    },
    getShopList() {
      return API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        } else {
          this.shopList = [];
        }
      });
    },
    getRoomNameById(id) {
      for (let i = 0; i < this.roomList.length; i++) {
        if (this.roomList[i].id === id) {
          return this.roomList[i].name;
        }
      }
      return "";
    },
    queryRoomList() {
      return API.room.queryRoomList().then(({ data }) => {
        if (data && data.code === 0) {
          this.roomList = data.list;
        } else {
          this.roomList = [];
        }
      });
    },
    // 获取数据列表
    getDataListPage1() {
      this.pageIndex = 1;
      this.getDataList();
    },
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        key: this.dataForm.key,
        officeId: this.officeId
      };
      API.appointment.list(params).then(({ data }) => {
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
    cancle(id) {
      var params = {
        id: id,
        status: 0
      };
      API.appointment.updateInfo(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.getDataList();
            }
          });
        }
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
        API.appointment.del(ids).then(({ data }) => {
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

<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <div class="btns">
        <div class="btns-right">
          <div class="input-left">
            <el-form-item>
              <el-input v-model="dataForm.key" placeholder="门店名" clearable @clear="getDataListPage1()"></el-input>
            </el-form-item>
            <el-button @click="getDataListPage1()">查询</el-button>
          </div>
          <el-button v-if="isAuth('sys:sysoffice:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <el-button v-if="isAuth('sys:sysoffice:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
        label="主键">
      </el-table-column> -->
      <!-- <el-table-column
        prop="merchantId"
        header-align="center"
        align="center"
        label="商户ID">
      </el-table-column> -->
      <!-- <el-table-column prop="fullName" header-align="center" align="center" label="门店全称">
      </el-table-column> -->
      <el-table-column prop="name" header-align="center" align="center" label="门店简称">
      </el-table-column>
      <!-- <el-table-column
        prop="sort"
        header-align="center"
        align="center"
        label="排序">
      </el-table-column> -->
      <!-- <el-table-column
        prop="areaId"
        header-align="center"
        align="center"
        label="区域ID">
      </el-table-column> -->
      <el-table-column prop="code" header-align="center" align="center" label="门店编号">
      </el-table-column>
      <el-table-column prop="master" header-align="center" align="center" label="门店负责人">
      </el-table-column>
      <el-table-column prop="phone" header-align="center" align="center" label="联系电话">
      </el-table-column>
      <!-- <el-table-column prop="machine" header-align="center" align="center" label="座机">
      </el-table-column> -->
      <el-table-column header-align="center" align="center" label="门店类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small" type="danger">直营店</el-tag>
          <el-tag v-else size="small">加盟店</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="organization"
        header-align="center"
        align="center"
        label="组织机构">
      </el-table-column> -->
      <!-- <el-table-column
        prop="isWechat"
        header-align="center"
        align="center"
        label="是否接受微信预约">
      </el-table-column> -->
      <!-- <el-table-column
        prop="province"
        header-align="center"
        align="center"
        label="省份">
      </el-table-column>
      <el-table-column
        prop="city"
        header-align="center"
        align="center"
        label="城市">
      </el-table-column>
      <el-table-column
        prop="county"
        header-align="center"
        align="center"
        label="区县">
      </el-table-column> -->
      <!-- <el-table-column
        prop="lat"
        header-align="center"
        align="center"
        label="纬度">
      </el-table-column>
      <el-table-column
        prop="lng"
        header-align="center"
        align="center"
        label="经度">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        label="门店地址">
      </el-table-column>
      <el-table-column
        prop="businessStarttime"
        header-align="center"
        align="center"
        label="营业开始时间">
      </el-table-column>
      <el-table-column
        prop="businessEndtime"
        header-align="center"
        align="center"
        label="营业结束时间">
      </el-table-column>
      <el-table-column
        prop="appointmentStarttime"
        header-align="center"
        align="center"
        label="预约开始时间">
      </el-table-column>
      <el-table-column
        prop="appointmentEndtime"
        header-align="center"
        align="center"
        label="预约结束时间">
      </el-table-column> -->
      <el-table-column header-align="center" align="center" label="是否营业">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isBusiness == 0" size="small" type="danger">否</el-tag>
          <el-tag v-else size="small">是</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="signDistance"
        header-align="center"
        align="center"
        label="签到距离">
      </el-table-column>
      <el-table-column
        prop="signPhoto"
        header-align="center"
        align="center"
        label="门店招牌照片">
      </el-table-column>
      <el-table-column
        prop="storePhoto"
        header-align="center"
        align="center"
        label="店内照片">
      </el-table-column>
      <el-table-column
        prop="logo"
        header-align="center"
        align="center"
        label="门店品牌LOGO">
      </el-table-column>
      <el-table-column
        prop="introduce"
        header-align="center"
        align="center"
        label="门店介绍">
      </el-table-column>
      <el-table-column
        prop="characteristic"
        header-align="center"
        align="center"
        label="门店特色">
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
      </el-table-column>
      <el-table-column
        prop="remarks"
        header-align="center"
        align="center"
        label="备注信息">
      </el-table-column> -->
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('sys:sysoffice:setAddpersons')" type="text" size="small" @click="setAddpersons(scope.row.id)">设置门店员工账号数</el-button>
          <!-- <el-button v-if="isAuth('sys:sysoffice:save')" type="text" @click="addOrUpdateHandle()">新增</el-button> -->
          <el-button v-if="isAuth('sys:sysoffice:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <set-addperson v-if="addOrUpdateVisible" ref="setAddperson" @refreshDataList="getDataList"></set-addperson>
  </div>
</template>

<script>
import API from "@/api";
import AddOrUpdate from "./add-or-update";
import SetAddperson from "./set-addperson";
export default {
  data() {
    return {
      dataForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  components: {
    AddOrUpdate,
    SetAddperson
  },
  filter: {},
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataListPage1() {
      this.pageIndex = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        name: this.dataForm.key
      };
      API.sysoffice.list(params).then(({ data }) => {
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
    setAddpersons(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.setAddperson.init(id);
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
        API.sysoffice.del(ids).then(({ data }) => {
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

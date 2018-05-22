<template>
  <div class="mod-config">
    <el-form :inline="true" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button v-if="isAuth('servicePackage:servicepackagedetail:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('servicePackage:servicepackagedetail:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <div class="list-nav">
      <category listname="套餐大类" :list="packageList" @onItemClick="onPackageClick"></category>
      <category v-if="packageList2.length > 0" listname="套餐小类" :list="packageList2" @onItemClick="onPackage2Click"></category>
      <category listname="所属门店" :list="shopList" @onItemClick="onShopClick"></category>
      <category listname="状&emsp;&emsp;态" :list="state" @onItemClick="onStateClick"></category>
    </div>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" label="">
      </el-table-column>
      <el-table-column prop="packId" header-align="center" align="center" label="套餐ID">
      </el-table-column>
      <el-table-column prop="itemProductId" header-align="center" align="center" label="项目/产品ID">
      </el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="项目/产品名称">
      </el-table-column>
      <el-table-column prop="price" header-align="center" align="center" label="价格">
      </el-table-column>
      <el-table-column prop="nums" header-align="center" align="center" label="次数">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
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
import category from "@/components/category";
export default {
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      packageList: [],
      packageList2: [],
      shopList: [],
      state: [{ name: "在售" }, { name: "停业" }]
    };
  },
  components: {
    AddOrUpdate,
    category
  },
  mounted() {
    this.getDataList();
    this.getCategory();
  },
  methods: {
    getCategory() {
      API.common.getCategoryList().then(({ data }) => {
        this.packageList = data.list["packages"];
      });
      API.common.getOfficeList().then(({ data }) => {
        this.shopList = data.list;
      });
    },
    onPackageClick(item) {
      if (item) {
        this.packageList2 = item.categoryList;
        this.filter_package = item.id;
      } else {
        this.filter_package = undefined;
      }
      this.filter_package2 = undefined;
      this.getDataList();
    },
    onPackage2Click(item) {
      if (item) {
        this.filter_package2 = item.id;
      } else {
        this.filter_package2 = undefined;
      }
      this.getDataList();
    },
    onShopClick(item) {
      if (item) {
        this.filter_shop = item.id;
      } else {
        this.filter_shop = undefined;
      }
      this.getDataList();
    },
    onStateClick(item) {
      if (item.name === "在售") {
        this.filter_state = 1;
      } else {
        this.filter_state = 0;
      }
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize
      };
      if (this.filter_package !== undefined) {
        params.catFirst = this.filter_package;
      }
      if (this.filter_package2 !== undefined) {
        params.catSecond = this.filter_package2;
      }
      if (this.filter_shop !== undefined) {
        params.officeId = this.filter_shop;
      }
      if (this.filter_state !== undefined) {
        params.status = this.filter_state;
      }

      API.servicepackagedetail.list(params).then(({ data }) => {
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
    getProject() {
      const params = {
        id: "2"
      };
      return API.servicecategory.list(params).then(({ data }) => {
        const project = data && data.code === 0 ? data.page.list : [];
        this.project = project;
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
        API.servicepackagedetail.del(ids).then(({ data }) => {
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

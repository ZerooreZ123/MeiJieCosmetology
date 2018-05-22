<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!-- <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('serviceProduct:serviceproduct:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('serviceProduct:serviceproduct:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item> -->
      <div class="btns">
        <div class="btns-right">
          <el-button v-if="isAuth('serviceProduct:serviceproduct:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <el-button v-if="isAuth('serviceProduct:serviceproduct:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
          <div class="clear"></div>
        </div>
      </div>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" label="ID" width="50">
      </el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="产品名称">
      </el-table-column>
      <el-table-column prop="productno" header-align="center" align="center" label="产品编号">
      </el-table-column>
      <el-table-column prop="officeId" header-align="center" align="center" label="所属门店">
      </el-table-column>
      <el-table-column prop="salePrice" header-align="center" align="center" label="产品售价">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="产品类型">
        <template slot-scope="scope">
          <!-- <el-tag v-if="scope.row.type === 0" size="small">否</el-tag>
          <el-tag v-else size="small">是</el-tag> -->
          {{scope.row.type}}
        </template>
      </el-table-column>
      <el-table-column prop="productNit" header-align="center" align="center" label="产品单位">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small">停售</el-tag>
          <el-tag v-else size="small">在售</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="brandId" header-align="center" align="center" label="产品品牌">
      </el-table-column>
      <el-table-column prop="catFirst" header-align="center" align="center" label="一级分类">
      </el-table-column>
      <el-table-column prop="catSecond" header-align="center" align="center" label="二级分类">
      </el-table-column>
      <el-table-column prop="productForm" header-align="center" align="center" label="产品形态">
      </el-table-column>
      <el-table-column prop="capacity" header-align="center" align="center" label="产品容量">
      </el-table-column>
      <el-table-column prop="capacityUnit" header-align="center" align="center" label="容量单位">
      </el-table-column>
      <el-table-column prop="qualityPeriod" header-align="center" align="center" label="保质期">
      </el-table-column>
      <el-table-column prop="images" header-align="center" align="center" label="产品配图">
      </el-table-column>
      <!-- <el-table-column prop="content" header-align="center" align="center" label="产品简介">
      </el-table-column> -->
      <!-- <el-table-column prop="createBy" header-align="center" align="center" label="创建者">
      </el-table-column>
      <el-table-column prop="createDate" header-align="center" align="center" label="创建时间">
      </el-table-column>
      <el-table-column prop="updateBy" header-align="center" align="center" label="更新者">
      </el-table-column> -->
      <el-table-column prop="updateDate" header-align="center" align="center" label="更新时间">
      </el-table-column>
      <el-table-column prop="remarks" header-align="center" align="center" label="备注信息">
      </el-table-column>
      <!-- <el-table-column prop="delFlag" header-align="center" align="center" label="删除标记">
      </el-table-column> -->
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
    AddOrUpdate
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        key: this.dataForm.key
      };
      API.serviceproduct.list(params).then(({ data }) => {
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
        API.serviceproduct.del(ids).then(({ data }) => {
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

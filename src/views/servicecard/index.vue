<template>
  <div class="mod-config">
    <div class="list-nav">
      <category listname="卡类型" :list="cardTypeList" @onItemClick="onCardTypeClick"></category>
      <category listname="所属门店" :list="shopList" @onItemClick="onShopClick"></category>
      <category listname="套餐大类" :list="cardsList" @onItemClick="onCardsClick"></category>
      <category v-if="cardsList2.length > 0" listname="套餐小类" :list="cardsList2" @onItemClick="onCards2Click"></category>
      <category listname="状&emsp;&emsp;态" :list="status" @onItemClick="onStatusClick"></category>
    </div>

    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <div class="btns">
        <div class="btns-right">
          <div class="input-left">
            <el-input v-model="dataForm.name" placeholder="卡名称" clearable style="width:150px;"></el-input>
            <el-button @click="getDataList()">查询</el-button>
          </div>
          <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <el-button v-if="isAuth('stock:servicecard:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        </div>
      </div>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="卡名称">
      </el-table-column>
      <el-table-column prop="type" header-align="center" align="center" label="卡类型">
      </el-table-column>
      <el-table-column prop="price" header-align="center" align="center" label="卡售价">
        <template slot-scope="scope">￥{{scope.row.price}}</template>
      </el-table-column>
      <el-table-column prop="denomination" header-align="center" align="center" label="卡面额">
        <template slot-scope="scope" v-if="scope.row.denomination">￥{{scope.row.denomination}}</template>
      </el-table-column>
      <el-table-column prop="status" header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="+scope.row.status === 0" size="small">可售</el-tag>
          <el-tag v-else size="small" type="danger">不可售</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" v-if="scope.row.status==0" @click="changeStatus(scope.row.id, 1)">设为停售</el-button>
          <el-button type="text" size="small" v-if="scope.row.status==1" @click="changeStatus(scope.row.id, 0)">设为可售</el-button>
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
      dataForm: {
        name: "",
        catFirst: "",
        catSecond: "",
        officeId: "",
        status: "",
        type: ""
      },
      status: [{ name: "可售", value: 0 }, { name: "只可用不可售", value: 1 }],
      dataList: [],
      shopList: [],
      cardsList: [],
      cardsList2: [],
      cardTypeList: [{ name: "储值卡" }, { name: "折扣卡" }, { name: "时段卡" }, { name: "疗程总次卡" }, { name: "疗程分次卡" }],
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
    category
  },
  mounted() {
    this.getCategory();
    this.getDataList();
  },
  methods: {
    onStatusClick(obj) {
      if (obj) {
        this.dataForm.status = obj.value;
      } else {
        this.dataForm.status = "";
      }
      this.getDataList();
    },
    onCardTypeClick(obj) {
      if (obj) {
        this.dataForm.type = obj.name;
      } else {
        this.dataForm.type = "";
      }
      this.getDataList();
    },
    onShopClick(obj) {
      if (obj) {
        this.dataForm.officeId = obj.id;
      } else {
        this.dataForm.officeId = "";
      }
      this.getDataList();
    },
    onCardsClick(obj) {
      if (obj) {
        this.cardsList2 = obj.categoryList;
        // this.filter_cards = obj.id;
        this.dataForm.catFirst = obj.id;
      } else {
        this.cardsList2 = [];
        // this.filter_cards = undefined;
        this.dataForm.catFirst = "";
      }
      // this.filter_cards2 = undefined;
      this.dataForm.catSecond = "";
      this.getDataList();
    },
    onCards2Click(obj) {
      if (obj) {
        // this.filter_cards2 = obj.id;
        this.dataForm.catSecond = obj.id;
      } else {
        // this.filter_cards2 = undefined;
        this.dataForm.catSecond = "";
      }
      this.getDataList();
    },
    getCategory() {
      API.common.getCategoryList().then(({ data }) => {
        if (data && data.code === 0) {
          this.cardsList = data.list["cards"];
        }
      });
      API.common.getOfficeList().then(({ data }) => {
        this.shopList = data.list;
      });
    },
    changeStatus(id, status) {
      API.servicecard
        .updateStatus({
          id: id,
          status: status
        })
        .then(({ data }) => {
          if (data && data.code === 0) {
            this.getDataList();
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        name: this.dataForm.name,
        type: this.dataForm.type,
        status: this.dataForm.status,
        catFirst: this.dataForm.catFirst,
        catSecond: this.dataForm.catSecond,
        officeId: this.dataForm.officeId
      };
      API.servicecard.list(params).then(({ data }) => {
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
        API.servicecard.del(ids).then(({ data }) => {
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

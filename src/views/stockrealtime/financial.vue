<template lang="pug">
.mod-config
  el-form(:inline='true', :model='dataForm', @keyup.enter.native='getDataList()')
    el-form-item
      el-date-picker(value-format="yyyy-MM-dd",type="date",placeholder="开始日期",v-model="dataForm.startTime",style="margin-right:10px;width:150px;")
      el-date-picker(value-format="yyyy-MM-dd",type="date",placeholder="结束日期",v-model="dataForm.endTime",style="margin-right:10px;width:150px;")
      el-button(@click="reload") 搜索
  el-table(:data='dataList', border='', v-loading='dataListLoading', style='width: 100%;')
    el-table-column(prop='officeName', header-align='center', align='center', label='所属门店')
    el-table-column(prop='productCode', header-align='center', align='center', label='编号')
    el-table-column(prop='name', header-align='center', align='center', label='商品名称')
    el-table-column(label='期初', header-align='center')
      el-table-column(prop='qichuNum', header-align='center', align='center', label='数量')
      el-table-column(prop='qichuPrice', header-align='center', align='center', label='进价')
    el-table-column(label='本期入库', header-align='center')
      el-table-column(prop='', header-align='center', align='center', label='数量')
        template(slot-scope="scope") {{scope.row.warehousNum + scope.row.allocationNum}}
      el-table-column(prop='purchaseAllPrice', header-align='center', align='center', label='进价')
    el-table-column(label='本期出库', header-align='center')
      el-table-column(prop='', header-align='center', align='center', label='数量')
        template(slot-scope="scope") {{scope.row.consumeNum + scope.row.allocationOutNum}}
      el-table-column(prop='consumeAllPrice', header-align='center', align='center', label='进价')
    el-table-column(label='期末结余', header-align='center')
      el-table-column(prop='', header-align='center', align='center', label='数量')
        template(slot-scope="scope") {{scope.row.allocationNum - scope.row.consumeNum}}
      el-table-column(prop='', header-align='center', align='center', label='进价')
        template(slot-scope="scope") {{scope.row.allocationOutNum  - scope.row.consumeAllPrice}}
  el-pagination(@size-change='sizeChangeHandle', @current-change='currentChangeHandle', :current-page='pageIndex', :page-sizes='[10, 20, 50, 100]', :page-size='pageSize', :total='totalPage', layout='total, sizes, prev, pager, next, jumper')
  add-or-update(v-if='addOrUpdateVisible', ref='addOrUpdate', @refreshdatalist='getDataList')

</template>

<script>
import API from "@/api";
import AddOrUpdate from "./add-or-update";
import { GetMDay } from "@/utils";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
export default {
  data() {
    return {
      dataForm: {
        startTime: year + "-" + month + "-01",
        endTime: year + "-" + month + "-" + GetMDay(year, month)
      },
      dataList: [],
      productBrandList: [],
      shopList: [],
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
    this.queryProductBrandList();
    this.getShopList();
    this.getDataList();
  },
  methods: {
    getShopList() {
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        } else {
          this.shopList = [];
        }
      });
    },
    queryProductBrandList() {
      API.productbrand.queryProductBrandList().then(({ data }) => {
        if (data && data.code === 0) {
          this.productBrandList = data.list;
        }
      });
    },
    reload() {
      this.pageIndex = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        startTime: this.dataForm.startTime,
        endTime: this.dataForm.endTime
      };
      API.stockrealtime.statistics(params).then(({ data }) => {
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
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.stockrealtime.del([id]).then(({ data }) => {
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

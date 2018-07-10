<template lang="pug">
.mod-config
  el-form(:inline='true', :model='dataForm', @keyup.enter.native='getDataList()')
    el-form-item
      el-select(v-model="dataForm.officeId",placeholder="所属门店",@change="reload",style="margin-right:10px;")
        el-option(label='全部门店', value='')
        el-option(v-for='item in shopList', :key='item.id', :label='item.name', :value='item.id')
      el-select(v-model="dataForm.brand",placeholder="品牌",@change="reload",style="margin-right:10px;")
        el-option(label='全部品牌', value='')
        el-option(v-for='item in productBrandList', :key='item.id', :label='item.name', :value='item.name')
      el-input(v-model="dataForm.key",placeholder="商品名称/编号",style="margin-right:10px;width:200px;")
      el-button(@click="reload") 搜索
  el-table(:data='dataList', border='', v-loading='dataListLoading', style='width: 100%;')
    el-table-column(prop='name', header-align='center', align='center', label='商品名称')
    el-table-column(prop='beforeNum', header-align='center', align='center', label='变更前库存')
    el-table-column(prop='allocationNum', header-align='center', align='center', label='库存变更')
    el-table-column(prop='currentStock', header-align='center', align='center', label='当前库存')
    el-table-column(prop='createDate', header-align='center', align='center', label='时间')
    el-table-column(prop='salePrice', header-align='center', align='center', label='售价')
    el-table-column(prop='purchasePrice', header-align='center', align='center', label='采购价')
    el-table-column(prop='brand', header-align='center', align='center', label='品牌')
    el-table-column(prop='receiveName', header-align='center', align='center', label='收货方')
    el-table-column(prop='consignorName', header-align='center', align='center', label='发货方')
    el-table-column(prop='type', header-align='center', align='center', label='类型')
    el-table-column(prop='remarks', header-align='center', align='center', label='备注信息')
    el-table-column(prop='productCode', header-align='center', align='center', label='产品编号')
  el-pagination(@size-change='sizeChangeHandle', @current-change='currentChangeHandle', :current-page='pageIndex', :page-sizes='[10, 20, 50, 100]', :page-size='pageSize', :total='totalPage', layout='total, sizes, prev, pager, next, jumper')
  add-or-update(v-if='addOrUpdateVisible', ref='addOrUpdate', @refreshdatalist='getDataList')

</template>

<script>
import API from "@/api";
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      dataForm: {
        officeId: "",
        brand: "",
        key: ""
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
        officeId: this.dataForm.officeId,
        brand: this.dataForm.brand,
        key: this.dataForm.key
      };
      API.stockrealtime.stockconsumedetails(params).then(({ data }) => {
        console.log(data);
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

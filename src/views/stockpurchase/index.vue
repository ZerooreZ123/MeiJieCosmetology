<template lang="pug">
.mod-config
  el-form
    el-form-item
      el-select(v-model='dataForm.officeId', placeholder='入库部门', @change='reload',style="margin-right:10px;")
        el-option(v-for='item in shopList', :key='item.id', :label='item.name', :value='item.id')
      el-select(v-model='dataForm.type', placeholder='类型', @change='resetSupplierId',style="margin-right:10px;")
        el-option(label='采购', value='1')
        el-option(label='调拨', value='3')
      el-select(v-if="dataForm.type==1",v-model='dataForm.supplierId', placeholder='供应商', @change='reload')
        el-option(v-for='item in supplierList', :key='item.id', :label='item.name', :value='item.id')
      el-select(v-if="dataForm.type==3",v-model='dataForm.supplierId', placeholder='门店', @change='reload')
        el-option(v-for='item in allShopList', :key='item.id', :label='item.name', :value='item.id')
  el-table(:data='dataList', border='', v-loading='dataListLoading', @selection-change='selectionChangeHandle', style='width: 100%;')
    el-table-column(prop='id', header-align='center', align='center', label='编号', width='50')
    el-table-column(prop='officeName', header-align='center', align='center', label='入库部门')
    el-table-column(prop='supplierName', header-align='center', align='center', label='供应商')
    el-table-column(header-align='center', align='center', label='类型')
      template(slot-scope='scope') {{scope.row.detailType | formatType}}
    el-table-column(prop='purchaseDate', header-align='center', align='center', label='采购日期')
    el-table-column(prop='transactor', header-align='center', align='center', label='办理人')
    el-table-column(prop='remarks', header-align='center', align='center', label='备注信息')
    el-table-column(fixed='right', header-align='center', align='center', width='150', label='操作')
      template(slot-scope='scope')
        el-button(type='text', size='small', @click='showDetail(scope.row.id,scope.row.detailType)') 显示详情
  el-pagination(@size-change='sizeChangeHandle', @current-change='currentChangeHandle', :current-page='pageIndex', :page-sizes='[10, 20, 50, 100]', :page-size='pageSize', :total='totalPage', layout='total, sizes, prev, pager, next, jumper')
  purchase-log-dialog(ref='purchaseLogDialog')
</template>

<script>
import API from "@/api";
import purchaseLogDialog from "../stock/purchase-log-dialog.vue";
export default {
  data() {
    return {
      dataForm: {
        officeId: "",
        supplierId: "",
        type: ""
      },
      dataList: [],
      shopList: [],
      allShopList: [],
      supplierList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  components: {
    purchaseLogDialog
  },
  mounted() {
    this.getShopList();
    this.getSupplierList();
    this.getDataList();
    this.getAllShopList();
  },
  filters: {
    formatType(v) {
      if (+v === 1) {
        return "采购";
      } else if (+v === 2) {
        return "消耗";
      } else if (+v === 3) {
        return "调拨";
      } else {
        return "未知";
      }
    }
  },
  methods: {
    resetSupplierId() {
      this.dataForm.supplierId = "";
      this.reload();
    },
    reload() {
      this.pageIndex = 1;
      this.getDataList();
    },
    getShopList() {
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        } else {
          this.shopList = [];
        }
      });
    },
    getAllShopList() {
      API.common.getAllOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.allShopList = data.list;
        } else {
          this.allShopList = [];
        }
      });
    },
    getSupplierList() {
      API.stockpurchase.getSupplierList().then(({ data }) => {
        console.log("getSupplierList", data);
        if (data.code === 0) {
          this.supplierList = data.list;
        }
      });
    },
    showDetail(id, type) {
      this.$refs.purchaseLogDialog.init({ id, type });
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        officeId: this.dataForm.officeId,
        supplierId: this.dataForm.supplierId,
        type: this.dataForm.type
      };
      API.stockpurchase.list(params).then(({ data }) => {
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
    }
  }
};
</script>

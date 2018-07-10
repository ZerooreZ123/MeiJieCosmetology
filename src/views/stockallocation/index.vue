<template lang="pug">
.mod-config
  el-form(:inline='true', :model='dataForm', @keyup.enter.native='getDataList()')
    el-form-item
      el-select(v-model='dataForm.type', placeholder='类型', @change='reload',style="margin-right:10px;")
        el-option(label="全部", value="")
        el-option(label="发货单", value="1")
        el-option(label="申请单", value="0")
  el-table(:data='dataList', border='', v-loading='dataListLoading', style='width: 100%;')
    // el-table-column(prop='id', header-align='center', align='center', label='编号')
    el-table-column(prop='type', header-align='center', align='center', label='类型')
      template(slot-scope='scope') {{scope.row.type | formatType}}
    el-table-column(prop='consignorName', header-align='center', align='center', label='发货部门')
    el-table-column(prop='receiveName', header-align='center', align='center', label='接收部门')
    el-table-column(prop='transactor', header-align='center', align='center', label='经办人')
    el-table-column(prop='auditorName', header-align='center', align='center', label='审核人')
    el-table-column(prop='status', header-align='center', align='center', label='审核状态')
      template(slot-scope='scope') {{scope.row.status | formatStatus(scope.row.type)}}
    el-table-column(prop='remarks', header-align='center', align='center', label='备注信息')
    el-table-column(fixed='right', header-align='center', align='center', width='150', label='操作')
      template(slot-scope='scope')
        el-button(type='text', size='small', @click='showDetail(scope.row)') 查看详情
  el-pagination(@size-change='sizeChangeHandle', @current-change='currentChangeHandle', :current-page='pageIndex', :page-sizes='[10, 20, 50, 100]', :page-size='pageSize', :total='totalPage', layout='total, sizes, prev, pager, next, jumper')
  allocation-log-dialog(ref="allocationLogDialog")
</template>

<script>
import API from "@/api";
import allocationLogDialog from "../stock/allocation-log-dialog";
export default {
  data() {
    return {
      dataForm: {
        type: ""
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
  components: {allocationLogDialog},
  mounted() {
    this.getDataList();
  },
  filters: {
    formatType(v) {
      if (+v === 1) {
        // return "调拨他人";
        return "发货单";
      } else if (+v === 0) {
        // return "申请调拨";
        return "申请单";
      }
    },
    formatStatus(status, type) {
      if (+type === 0) {
        if (+status === 1) {
          return "出库";
        } else if (+status === 0) {
          return "待审核";
        } else if (+status === 2) {
          return "驳回";
        } else if (+status === 3) {
          return "确认收货";
        } else if (+status === 4) {
          return "拒收";
        }
      } else if (+type === 1) {
        if (+status === 3) {
          return "确认收货";
        } else if (+status === 0) {
          return "出库";
        } else if (+status === 4) {
          return "拒收";
        }
      }
    }
  },
  methods: {
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
        type: this.dataForm.type
      };
      API.stockallocation.getList(params).then(({ data }) => {
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
    showDetail(row) {
      this.$refs.allocationLogDialog.init(row);
    }
  }
};
</script>

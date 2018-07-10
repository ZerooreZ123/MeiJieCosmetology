<template lang="pug">
.mod-config
  el-form(:inline='true', :model='dataForm', @keyup.enter.native='getDataList()')
    el-form-item
      el-radio(v-model="dataForm.type",:label="1",@change="reload") 我创建的
      el-radio(v-model="dataForm.type",:label="2",@change="reload") 需我审核
  el-table(:data='dataList', border, v-loading='dataListLoading', style='width: 100%;')
    el-table-column(prop='id', header-align='center', align='center', label='编号', width="50")
    el-table-column(prop='createDate', header-align='center', align='center', label='创建时间')
    el-table-column(prop='type', header-align='center', align='center', label='类型')
      template(slot-scope='scope') {{scope.row.type | formatType}}
    el-table-column(prop='consignorName', header-align='center', align='center', label='发货部门')
    el-table-column(prop='receiveName', header-align='center', align='center', label='接收部门')
    el-table-column(prop='transactor', header-align='center', align='center', label='申请人')
    el-table-column(prop='status', header-align='center', align='center', label='审核状态')
      template(slot-scope='scope') {{scope.row.status | formatStatus(scope.row.type)}}
    el-table-column(prop='remarks', header-align='center', align='center', label='备注信息')
    el-table-column(fixed='right', header-align='center', align='center', width='150', label='操作')
      template(slot-scope='scope')
        template(v-if="dataForm.type == 1")
          el-button(type="text",size="small",v-if="scope.row.status == 0 && scope.row.type == 0",@click="recall(scope.row.id)") 撤回
          el-button(type="text",size="small",v-else,@click="handle(scope.row,dataForm.type)") 处理
        template(v-if="dataForm.type == 2")
          el-button(type="text",size="small",@click="handle(scope.row,dataForm.type)") 处理
  el-pagination(@size-change='sizeChangeHandle', @current-change='currentChangeHandle', :current-page='pageIndex', :page-sizes='[10, 20, 50, 100]', :page-size='pageSize', :total='totalPage', layout='total, sizes, prev, pager, next, jumper')
  allocation-approve-dialog(ref="allocationApproveDialog")
</template>

<script>
import _ from "lodash";
import API from "@/api";
import allocationApproveDialog from "./allocation-approve-dialog";
export default {
  data() {
    return {
      dataForm: {
        type: 1
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
  components: { allocationApproveDialog },
  mounted() {
    this.getShopList();
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
    recall(id) {},
    handle(row, recordType) {
      this.$refs.allocationApproveDialog.init({ row, recordType });
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
    getShopNameById(id) {
      const o = _.find(this.shopList, obj => obj.id === id);
      if (o) {
        return o.name;
      } else {
        return "未知";
      }
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
        type: this.dataForm.type // 1：我申请 2：我审核
      };
      API.stockallocation.list(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
          this.$message.error(data.msg)
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
    }
  }
};
</script>

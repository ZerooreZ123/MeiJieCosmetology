<template lang="pug">
.mod-config
  el-form(:inline='true', :model='dataForm', @keyup.enter.native='getDataList()')
    el-form-item
      el-select(v-model='dataForm.officeId', placeholder='消耗门店', @change='reload',style="margin-right:10px;")
        el-option(v-for='item in shopList', :key='item.id', :label='item.name', :value='item.id')
      el-select(v-if="type==1",v-model="dataForm.consumeType",placeholder="消耗类型", @change='reload')
        el-option(v-for="item in typeList",:key="item.id",:label="item.label",:value="item.value")
  el-table(:data='dataList', border='', v-loading='dataListLoading', style='width: 100%;')
    el-table-column(prop='id', header-align='center', align='center', label='编号')
    el-table-column(prop='officeName', header-align='center', align='center', label='消耗门店')
    el-table-column(prop='consumeDate', header-align='center', align='center', label='消耗日期')
    el-table-column(prop='inventory', header-align='center', align='center', label='盘点人')
    el-table-column(prop='consumeType', header-align='center', align='center', label='消耗类型')
    el-table-column(prop='remarks', header-align='center', align='center', label='备注信息')
    el-table-column(fixed='right', header-align='center', align='center', width='150', label='操作')
      template(slot-scope='scope')
        el-button(type='text', size='small', @click='showDetail(scope.row.id)') 显示详情
  el-pagination(@size-change='sizeChangeHandle', @current-change='currentChangeHandle', :current-page='pageIndex', :page-sizes='[10, 20, 50, 100]', :page-size='pageSize', :total='totalPage', layout='total, sizes, prev, pager, next, jumper')
  consume-log-dialog(ref="consumeLogDialog")
</template>

<script>
import API from "@/api";
import consumeLogDialog from "../stock/consume-log-dialog";

export default {
  props: ["type"],
  data() {
    return {
      dataForm: {
        officeId: "",
        consumeType: ""
      },
      dataList: [],
      shopList: [],
      typeList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  components: { consumeLogDialog },
  mounted() {
    this.getTypeList();
    this.getShopList();
    this.getDataList();
  },
  methods: {
    reload() {
      this.pageIndex = 1;
      this.getDataList();
    },
    getTypeList() {
      const params = {
        type: "consumeType"
      };
      API.sysdict.getlist(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.typeList = data.list;
        }
      });
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
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        consumeType: this.dataForm.consumeType,
        officeId: this.dataForm.officeId,
        type: this.type
      };
      API.stockconsume.list(params).then(({ data }) => {
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
    showDetail(id) {
      this.$refs.consumeLogDialog.init({ id });
    }
  }
};
</script>

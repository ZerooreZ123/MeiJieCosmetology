<template lang="pug">
  div
    div(class="topProcessBar")
      div(class="circle",:class="{active:step>0}") 1
        div(class="c-label") 填写采购单
      div(class="line",:class="{active:step>0}")
      div(class="line",:class="{active:step>1}")
      div(class="circle",:class="{active:step>1}") 2
        div(class="c-label") 确认采购数量
      div(class="line",:class="{active:step>1}")
      div(class="line",:class="{active:step>2}")
      div(class="circle",:class="{active:step>2}") 3
        div(class="c-label") 产品入库
    div(class="step-1",v-if="step==1")
      div(class="f-container")
        div(class="left-form")
          el-card
            el-form(:model="dataForm",:rules="dataRule",label-width="80px")
              el-form-item(label="采购部门",prop="officeId")
                el-select(v-model="dataForm.officeId",placeholder="采购部门")
                  el-option(v-for="item in shopList",:key="item.id",:label="item.name",:value="item.id")
              el-form-item(label="采购日期",prop="purchaseDate")
                el-date-picker(value-format="yyyy-MM-dd",v-model="dataForm.purchaseDate",type="date",placeholder="采购日期")
              el-form-item(label="经办人",prop="transactor")
                el-input(v-model="dataForm.transactor",placeholder="经办人")
              el-form-item(label="供货商",prop="supplierId")
                el-select(v-model="dataForm.supplierId",placeholder="供货商")
                  el-option(v-for="item in supplierList",:key="item.id",:label="item.name",:value="item.id")
                span &emsp;
                el-button(@click="openAddSupplier") 添加供货商
              el-form-item(label="备注",prop="remarks")
                el-input(v-model="dataForm.remarks",placeholder="备注")
            div(style="text-align:right;")
              el-button(type="primary",@click="openDialog") 添加商品
        div(class="right-table")
          el-card
            el-table(:data="dataList",border,@selection-change="selectionChangeHandle",style="width: 100%;")
              el-table-column(prop="name",header-align="center",align="center",label="商品名称")
              el-table-column(prop="brandName",header-align="center",align="center",label="品牌")
              el-table-column(prop="productUnit",header-align="center",align="center",label="单位")
              el-table-column(header-align="center",align="center",label="入库数量")
                template(slot-scope="scope")
                  el-input(v-model="scope.row.purchaseAmount",@input="reCalcSum")
              el-table-column(prop="purchasePrice",header-align="center",align="center",label="采购价")
                template(slot-scope="scope")
                  el-input(v-model="scope.row.purchasePrice",@input="reCalcSum")
              el-table-column(header-align="center",align="center",label="操作")
                template(slot-scope="scope")
                  el-button(type="text",size="small",@click="deleteHandle(scope.$index)") 删除
      div(style="text-align:center;padding-top:10px;")
        el-button(type="primary",style="width: 200px;",@click="step = 2") 下一步
    div(class="step-2",v-if="step==2")
      div(class="s2-flex-ctn")
        div
          div
            div(class="label") 供应商：
            div(class="r-content") {{getSupplierById(dataForm.supplierId)}}
          div
            div(class="label") 采购日期：
            div(class="r-content") {{dataForm.purchaseDate}}
          div
            div(class="label") 采购门店：
            div(class="r-content") {{getShopNameById(dataForm.officeId)}}
        div
          div
            div(class="label") 备注信息：
            div(class="r-content") {{dataForm.remarks}}
          div
            div(class="label") 采购金额：
            div(class="r-content") ￥{{sumPrice}}
          div
            div(class="label") 经办人：
            div(class="r-content") {{dataForm.transactor}}
      el-table(:data="dataList",border,style="width: 100%;margin-top:20px;")
        el-table-column(header-align="center",align="center",label="入库部门")
          template(slot-scope="scope") {{getShopNameById(dataForm.officeId)}}
        el-table-column(header-align="center",align="center",label="商品来源")
          template(slot-scope="scope") {{getSupplierById(dataForm.supplierId)}}
        el-table-column(prop="brandName",header-align="center",align="center",label="品牌")
        el-table-column(prop="productUnit",header-align="center",align="center",label="单位")
        el-table-column(prop="purchasePrice",header-align="center",align="center",label="采购价")
        el-table-column(prop="stockNum",header-align="center",align="center",label="当前库存")
        el-table-column(header-align="center",align="center",label="入库数量")
          template(slot-scope="scope")
            el-input(v-model="scope.row.purchaseAmount",@input="reCalcSum")
      div(style="text-align:center;margin-top:20px;")
        // el-button(style="width:100px;") 打印
        // span &emsp;&emsp;
        el-button(style="width:100px;",@click="goBackToS1") 上一步
        span &emsp;&emsp;
        el-button(style="width:100px;",type="primary",@click="doSubmit") 下一步
    div(class="step-3",v-if="step==3")
      div(style="text-align:center;margin-top:50px;")
        img(src="../../assets/img/Success_128px_1194837_easyicon.net.png")
      div(style="text-align:center;font-size:30px;")
        span 入库成功
      div(style="text-align:center;margin-top:20px;")
        el-button(@click="reset") 返回
    goods-add-dialog(ref="goodsAddDialog",@select-finish="setGoodsList")
    add-supplier(ref="addSupplier", @refreshDataList="getSupplierList")
</template>

<script>
import _ from "lodash";
import API from "@/api";
import goodsAddDialog from "./goods-add-dialog.vue";
import addSupplier from "../supplier/add-or-update.vue";

export default {
  components: { goodsAddDialog, addSupplier },
  data() {
    return {
      step: 1,
      dataForm: {
        officeId: "",
        purchaseDate: "",
        transactor: "",
        supplierId: "",
        remarks: ""
      },
      dataRule: {
        officeId: [{ required: true, message: "采购部门不能为空", trigger: "blur" }],
        purchaseDate: [{ required: true, message: "采购日期不能为空", trigger: "blur" }],
        transactor: [{ required: true, message: "办理人不能为空", trigger: "blur" }],
        supplierId: [{ required: true, message: "供应商不能为空", trigger: "blur" }]
      },
      supplierList: [],
      shopList: [],
      dataList: [],
      sumPrice: 0
    };
  },
  computed: {
  },
  mounted() {
    this.getShopList();
    this.getSupplierList();
  },
  methods: {
    reCalcSum() {
      let sum = 0;
      this.dataList.forEach(obj => {
        sum += +obj.purchasePrice * +obj.purchaseAmount;
      });
      console.log(sum)
      this.sumPrice = sum;
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
    getSupplierList() {
      API.stockpurchase.getSupplierList().then(({ data }) => {
        console.log("getSupplierList", data);
        if (data.code === 0) {
          this.supplierList = data.list;
        }
      });
    },
    getSupplierById(id) {
      const o = _.find(this.supplierList, obj => obj.id === id);
      if (o) {
        return o.name;
      } else {
        return "未知";
      }
    },
    getShopNameById(id) {
      const o = _.find(this.shopList, obj => obj.id === id);
      if (o) {
        return o.name;
      } else {
        return "未知";
      }
    },
    selectionChangeHandle() {},
    openDialog() {
      this.$refs.goodsAddDialog.init({ officeId: this.dataForm.officeId });
    },
    openAddSupplier() {
      this.$refs.addSupplier.init();
    },
    setGoodsList(goodsList) {
      goodsList.forEach(o => {
        if (!o.purchaseAmount) {
          o.purchaseAmount = "0";
        }
      });
      this.dataList = this.dataList.concat(goodsList);
    },
    deleteHandle(index) {
      this.dataList.splice(index, 1);
    },
    doSubmit() {
      const stockConsumeDetailsList = this.dataList.map(o => {
        return {
          productCode: o.productno,
          name: o.name,
          brand: o.brandName,
          unit: o.productUnit,
          warehousNum: o.purchaseAmount,
          currentStock: o.stockNum,
          purchasePrice: o.purchasePrice,
          salePrice: o.salePrice,
          type: 1 // (1.采购,2.消耗,3.调拨)
        };
      });
      const params = {
        officeId: this.dataForm.officeId,
        purchaseDate: this.dataForm.purchaseDate,
        transactor: this.dataForm.transactor,
        supplierId: this.dataForm.supplierId,
        purchaseAmount: this.sumPrice,
        remarks: this.dataForm.remarks,
        stockConsumeDetailsList: stockConsumeDetailsList
      };
      API.stockpurchase.add(params).then(({ data }) => {
        if (data.code === 0) {
          this.step = 3;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    goBackToS1() {
      this.step = 1;
    },
    reset() {
      this.step = 1;
      this.dataForm = {
        officeId: "",
        purchaseDate: "",
        transactor: "",
        supplierId: "",
        remarks: ""
      };
      this.dataList = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.topProcessBar {
  text-align: center;
  padding-bottom: 15px;
  div {
    display: inline-block;
    vertical-align: middle;
  }
  .line {
    height: 3px;
    width: 150px;
    background-color: #ccc;
    &.active {
      background-color: #c99f63;
    }
  }
  .circle {
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    border-radius: 50%;
    color: #fff;
    background-color: #ccc;
    position: relative;
    &.active {
      background-color: #c99f63;
    }
    .c-label {
      position: absolute;
      bottom: -18px;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      font-size: 14px;
      line-height: 14px;
      width: 100px;
      color: #303133;
    }
  }
}
.f-container {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  .left-form {
    flex: 2;
  }
  .right-table {
    flex: 3;
    padding-left: 10px;
  }
}
.s2-flex-ctn {
  display: flex;
  flex-direction: row;
  margin: 0 100px;
  margin-top: 30px;
  div {
    flex: 1;
    .label {
      text-align: left;
      width: 100px;
      border-right: 2px solid #aaa;
      display: inline-block;
      line-height: 50px;
    }
    .r-content {
      display: inline-block;
      margin-left: 30px;
      line-height: 50px;
    }
  }
}
</style>


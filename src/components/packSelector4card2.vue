<template lang="pug">
div(class="mask",@click="handleCancel")
  .w-container
    el-row
      el-col.w-title(:span='8') 请选择分类
      el-col.w-title(:span='16') 请选择项目
    el-row
      el-col(:span='8', style='border-right:1px solid #eee;')
        el-tree(v-if='categoryList.length > 0',ref="tree",:data='categoryList', node-key='guid', :expand-on-click-node='true', show-checkbox='', @check='handleCheck')
          span.custom-tree-node(slot-scope='{ node, data }')
            span {{ node.label }}
      el-col(:span='16')
        .list-item(v-if="serviceList.length > 0",v-for='(item, index) in serviceList', :key='item.guid',@click="handleItemClick(item, index)")
          span.title {{item.name}}
          span.price(v-if="!!item.salePrice") ￥{{item.salePrice}}
          el-input.i-num(v-if="cardType=='疗程分次卡'",placeholder="次数",v-model="userTempData[item.guid].discountNum",style="width:100px;",type="number")
          i.el-icon-delete.remove-item(@click.stop='removeService(item, index)')
        div(v-if="serviceList.length==0") &nbsp;

    el-row
      el-col(:span='24', style='text-align:right;padding: 10px;')
        el-button(@click='handleOK()') 确认

</template>

<script>
import _ from "lodash";
import "@/assets/scss/el-tree.scss";
import API from "@/api";
import transform, { guid } from "@/utils/tree";

export default {
  props: ["officeId", "cardType"],
  data() {
    return {
      userTempData: {},
      activeIndex: null,
      serviceList: [],
      dataListSelected: [],
      dataListUserData: {}, // 为了恢复删除的项目时，记住用户的修改
      categoryList: []
    };
  },
  mounted() {
    this.getCategory();
  },
  computed: {},
  methods: {
    handleCancel(ev) {
      if (ev.target.className === "mask") {
        this.$emit("cancel");
      }
    },
    handleOK() {
      const result = this.serviceList.map(o => {
        return {
          officeId: this.officeId, // 这里是外面选择的门店ID
          serviceType: o.serviceType,
          catFirst: o.catFirst || "",
          catSecond: o.catSecond || "",
          serviceId: o.salePrice ? o.id : "", // 如果存在价格，说明是服务
          serviceName: o.label || "",
          discountNum: this.userTempData[o.guid].discountNum,
          salePrice: o.salePrice || "",
          level: o.level !== undefined ? o.level : 3
        };
      });
      // console.log(JSON.stringify(result));
      this.$emit("selected", result);
    },
    handleItemClick(item, index) {
      console.log(item.guid);
      this.activeIndex = item.guid;
    },
    initUserTempData(item) {
      if (this.userTempData[item.guid] === undefined) {
        this.userTempData[item.guid] = {
          discountNum: 0
        };
      }
    },
    removeService(item, index) {
      this.$refs.tree.setChecked(item.guid, false, false);
      this.serviceList.splice(index, 1);
      this.activeIndex = null;
    },
    handleNumChange(guid, value) {
      alert(1)
      console.log(guid)
      console.log("===")
      console.log(value)
      this.userTempData[guid].discountNum = value;
    },
    getCategory() {
      API.servicecategory.selectCardTree().then(({ data }) => {
        const items = transform(data.list["items"]);
        const products = transform(data.list["products"]);
        const packages = transform(data.list["packages"]);
        this.categoryList = [
          {
            guid: guid(),
            name: "所有项目",
            label: "所有项目",
            categoryType: 1,
            level: 0,
            children: items
          },
          {
            guid: guid(),
            name: "所有产品",
            label: "所有产品",
            categoryType: 2,
            level: 0,
            children: products
          },
          {
            guid: guid(),
            name: "所有套餐",
            label: "所有套餐",
            categoryType: 3,
            level: 0,
            children: packages
          }
        ];
      });
    },
    handleCheck(node, selected) {
      const list = _.filter(selected.checkedNodes, o => !!o.salePrice);
      this.serviceList = list;
      list.forEach(item => {
        console.log(item);
        this.initUserTempData(item);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2015;
}
.w-container {
  position: fixed;
  width: 1000px;
  left: 50%;
  margin-left: -500px;
  top: 15vh;
  z-index: 2000;
  background: #fff;
  border: 1px solid #ccc;
  .w-title {
    text-align: center;
    font-size: 16px;
    color: #fff;
    background-color: #c99f63;
    line-height: 40px;
  }
  .list-item {
    border-bottom: 1px solid #eee;
    line-height: 50px;
    position: relative;
    padding: 0 10px;
    .title {
      display: inline-block;
      width: 130px;
    }
    .price {
      color: #c99f63;
    }
    .i-num {
      position: absolute;
      right: 30px;
      top: 5px;
    }
    .remove-item {
      position: absolute;
      right: 10px;
      top: 20px;
    }
  }
}
</style>


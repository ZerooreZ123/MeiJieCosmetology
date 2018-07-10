<template lang="pug">
div(class="mask",@click="handleCancel")
  .w-container
    el-row
      el-col.w-title(:span='8') 请选择分类
      el-col.w-title(:span='16') 请选择项目
    el-row
      el-col(:span='8', style='border-right:1px solid #eee;')
        el-tree(ref="tree",v-if='categoryList.length > 0', :data='categoryList', node-key='guid', :expand-on-click-node='false', show-checkbox='', @check='handleCheck')
          span.custom-tree-node(slot-scope='{ node, data }')
            span {{ node.label }}
      el-col(:span='16')
        .list-item(v-for='(item, index) in serviceList', :key='item.guid')
          span.title {{item.name}}
          span.price ￥{{item.salePrice}}
          el-input.i-num(v-model="dataListUserData[item.guid].nums",type="number")
          i.el-icon-delete.remove-item(@click='removeService(index, item)')
    el-row
      el-col(:span='24', style='text-align:right;padding: 10px;')
        el-button(@click='handleOK()') 确认

</template>

<script>
import _ from "lodash";
import "@/assets/scss/el-tree.scss";
import API from "@/api";
import transform from "@/utils/tree";

export default {
  data() {
    return {
      serviceList: [],
      dataListUserData: {}, // 为了恢复删除的项目时，记住用户的修改
      categoryList: []
    };
  },
  mounted() {
    this.getCategory();
  },
  computed: {},
  methods: {
    loadData(list) {
    },
    handleCancel(ev) {
      if (ev.target.className === "mask") {
        this.$emit("cancel");
      }
    },
    handleOK() {
      const result = [];
      this.serviceList.forEach(obj => {
        result.push({
          itemProductId: obj.id,
          name: obj.name,
          price: obj.salePrice,
          nums: this.dataListUserData[obj.guid].nums,
          serviceType: obj.serviceType
        });
      });
      console.log(JSON.stringify(result))
      this.$emit("selected", result);
    },
    removeService(index, item) {
      this.$refs.tree.setChecked(item.guid, false, false);
      this.serviceList.splice(index, 1);
    },
    getCategory() {
      API.servicecategory.treeEx().then(({ data }) => {
        this.categoryList = transform(data.list["items"].concat(data.list["products"]));
      });
    },
    handleCheck(node, selected) {
      const list = _.filter(selected.checkedNodes, o => !o.children);
      list.forEach(o => {
        this.dataListUserData[o.guid] = {
          nums: 1
        }
      });
      this.serviceList = list;
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
      width: 150px;
    }
    .remove-item {
      position: absolute;
      right: 10px;
      top: 20px;
    }
  }
}
</style>


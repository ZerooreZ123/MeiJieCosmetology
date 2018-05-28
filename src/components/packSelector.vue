<template>
  <div class="w-container">
    <el-row>
      <el-col :span="8" class="w-title">
        请选择分类
      </el-col>
      <el-col :span="16" class="w-title">
        请选择项目
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" style="border-right:1px solid #eee;">
        <el-tree v-if="categoryList.length > 0" :data="categoryList" node-key="id" :expand-on-click-node="false" show-checkbox @check="handleCheck">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="16">
        <div v-for="(item, index) in serviceList1" :key="item.id" class="list-item">
          <span class="title">{{item.name}}</span>
          <span class="price">￥{{item.salePrice}}</span>
          <el-input-number class="i-num" :min="1" :value="getServiceNumberOfUser(item.id, 1)" @change="value => handleNumChange(item.id, 1, value)"></el-input-number>
          <i class="el-icon-delete remove-item" @click="removeService(index, 1)"></i>
        </div>
        <div v-for="(item, index) in serviceList2" :key="item.id" class="list-item">
          <span class="title">{{item.name}}</span>
          <span class="price">￥{{item.salePrice}}</span>
          <el-input-number class="i-num" :min="1" :value="getServiceNumberOfUser(item.id, 2)" @change="value => handleNumChange(item.id, 2, value)"></el-input-number>
          <i class="el-icon-delete remove-item" @click="removeService(index, 2)"></i>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="text-align:right;padding: 10px;">
        <el-button @click="handleCancel()">取消</el-button>
        <el-button @click="handleOK()">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "@/assets/scss/el-tree.scss";
import API from "@/api";
import transform from "@/utils/tree";

export default {
  data() {
    return {
      serviceList1: [],
      serviceList2: [],
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
    handleCancel() {
      this.$emit("cancel");
    },
    handleOK() {
      const result = [];
      this.serviceList1.forEach(obj => {
        result.push({
          itemProductId: obj.id,
          name: obj.name,
          price: obj.salePrice,
          nums: this.getServiceNumberOfUser(obj.id, 1),
          serviceType: 1
        });
      });
      this.serviceList2.forEach(obj => {
        result.push({
          itemProductId: obj.id,
          name: obj.name,
          price: obj.salePrice,
          nums: this.getServiceNumberOfUser(obj.id, 2),
          serviceType: 2
        });
      });
      this.$emit("selected", result);
    },
    removeService(index, type) {
      if (type === 1) {
        this.serviceList1.splice(index, 1);
      } else if (type === 2) {
        this.serviceList2.splice(index, 1);
      }
    },
    handleNumChange(id, type, value) {
      // console.log(id, type, value);
      if (this.dataListUserData[id + "_" + type]) {
        this.dataListUserData[id + "_" + type].num = value;
      } else {
        this.dataListUserData[id + "_" + type] = {
          num: value
        };
      }
      this.$forceUpdate();
    },
    getServiceNumberOfUser(id, type) {
      if (this.dataListUserData[id + "_" + type]) {
        return this.dataListUserData[id + "_" + type].num;
      } else {
        return 1;
      }
    },
    getCategory() {
      API.servicecategory.treeEx().then(({ data }) => {
        this.categoryList = transform(data.list["items"].concat(data.list["products"]));
      });
    },
    handleCheck(node, selected) {
      // console.log(JSON.stringify(selected.checkedNodes));
      const dataListSelected = [];
      this.dataListSelected = dataListSelected;
      selected.checkedNodes.forEach(n => {
        if (n.data) {
          dataListSelected.push(n);
        }
      });
      this.dataListSelected = dataListSelected;

      let serviceList1 = [];
      let serviceList2 = [];
      this.dataListSelected.forEach(obj => {
        if (+obj.categoryType === 1) {
          serviceList1 = serviceList1.concat(obj.data);
        } else if (+obj.categoryType === 2) {
          serviceList2 = serviceList2.concat(obj.data);
        }
      });
      this.serviceList1 = serviceList1;
      this.serviceList2 = serviceList2;
    }
  }
};
</script>

<style scoped lang="scss">
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


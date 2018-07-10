<template>
  <div class="mask" @click="cancel">
    <div class="w-container">
      <div class="w-nav">
        <div @click="setType(1)" :class="{active: serviceType == 1}">项目</div>
        <div @click="setType(2)" :class="{active: serviceType == 2}">产品</div>
        <div @click="setType(3)" :class="{active: serviceType == 3}">套餐</div>
        <div v-if="this.memberId" @click="setType('H')" :class="{active: serviceType == 'H'}">历史</div>
      </div>

      <div class="w-list">
        <el-tag @close="handleRemove(index)" closable v-for="(item, index) in dataListSelected" :key="item.id">{{item.name}}&nbsp;
          <span class="price">￥{{item.price}}</span>
        </el-tag>
      </div>

      <div class="w-cat" v-if="serviceType != 'H'">
        <el-select v-model="catFirst" placeholder="请选择大类" @change="id => onCat1Change(id)">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="catSecond" placeholder="请选择小类" @change="onCat2Change()">
          <el-option v-for="item in categoryList2" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div class="w-list">
        <span @click="handleClick(item)" v-for="item in dataList" :key="item.id">
          <el-tag>{{item.name}}&nbsp;
            <span class="price" v-if="serviceType == 1 || serviceType == 2">￥{{item.salePrice}}</span>
            <span class="price" v-if="serviceType == 3">￥{{item.packPrice}}</span>
            <span class="price" v-else>￥{{item.servicePrice}}</span>
          </el-tag>
        </span>
      </div>
      <el-row>
        <el-col :span="6">
          &nbsp;
        </el-col>
        <el-col :span="12">
          <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, prev, pager, next">
          </el-pagination>
        </el-col>
        <el-col :span="6" style="text-align:right;padding-right:10px;">
          <el-button @click="handleOK()">确认</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import API from "@/api";
export default {
  props: ["member-id"],
  data() {
    return {
      serviceType: 1,
      catFirst: "",
      catSecond: "",
      dataList: [],
      dataListSelected: [],
      categoryList: [],
      categoryList2: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    };
  },
  mounted() {
    this.getCategory();
    this.getDataList();
  },
  methods: {
    setType(serviceType) {
      this.dataList = [];
      this.totalPage = 0;

      this.serviceType = serviceType;
      this.catFirst = "";
      this.catSecond = "";
      this.getCategory();
      this.getDataList();
    },
    getCategory() {
      API.common.getCategoryList().then(({ data }) => {
        if (this.serviceType === 1) {
          this.categoryList = data.list["items"];
        } else if (this.serviceType === 2) {
          this.categoryList = data.list["products"];
        } else if (this.serviceType === 3) {
          this.categoryList = data.list["packages"];
        } else {
          this.categoryList = [];
        }
        this.categoryList2 = [];
      });
    },
    onCat1Change(id) {
      this.getDataList();
      this.catSecond = "";
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].id === id) {
          this.categoryList2 = this.categoryList[i].categoryList;
          break;
        }
      }
    },
    onCat2Change() {
      this.getDataList();
    },
    handleClick(item) {
      const obj = {
        id: item.id,
        name: item.name
      };
      obj.serviceType = this.serviceType;
      if (this.serviceType === 1 || this.serviceType === 2) {
        obj.price = item.salePrice;
      } else if (this.serviceType === 3) {
        obj.price = item.packPrice;
      } else if (this.serviceType === "H") {
        obj.price = item.servicePrice;
        obj.serviceType = item.serviceType;
      }
      this.dataListSelected.push(obj);
    },
    handleRemove(index) {
      this.dataListSelected.splice(index, 1);
    },
    handleOK() {
      this.$emit("selected", this.dataListSelected);
    },
    cancel(ev) {
      if (ev.target.className === "mask") {
        this.$emit("cancel");
      }
    },
    getDataList() {
      const serviceType = this.serviceType;
      const params = {
        page: this.pageIndex,
        limit: this.pageSize,
        status: 1
      };
      if (this.catFirst) {
        params.catFirst = this.catFirst;
      }
      if (this.catSecond) {
        params.catSecond = this.catSecond;
      }
      if (serviceType === 1) {
        API.serviceitem.list(params).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list;
            this.totalPage = data.page.totalCount;
          } else {
            this.dataList = [];
            this.totalPage = 0;
          }
        });
      } else if (serviceType === 2) {
        API.serviceproduct.list(params).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list;
            this.totalPage = data.page.totalCount;
          } else {
            this.dataList = [];
            this.totalPage = 0;
          }
        });
      } else if (serviceType === 3) {
        API.servicepackage.list(params).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list;
            this.totalPage = data.page.totalCount;
          } else {
            this.dataList = [];
            this.totalPage = 0;
          }
        });
      } else if (serviceType === "H") {
        API.miorderdetail.history(this.memberId).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = data.list.map(obj => {
              return {
                id: obj.serviceId,
                name: obj.serviceName,
                serviceType: obj.serviceType,
                servicePrice: obj.servicePrice
              };
            });
            this.totalPage = 0;
          } else {
            this.dataList = [];
            this.totalPage = 0;
          }
        });
      }
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
.site-wrapper .el-pagination {
  text-align: center;
}
.w-container {
  position: fixed;
  width: 600px;
  left: 50%;
  margin-left: -300px;
  top: 15vh;
  z-index: 2000;
  background: #fff;
  border: 1px solid #ccc;
}

.w-nav {
  background-color: #fde3be;
  overflow: hidden;
  div {
    float: left;
    font-size: 18px;
    line-height: 40px;
    width: 100px;
    text-align: center;
    padding: 5px 0;
    &.active {
      background-color: #c99f63;
      color: #fff;
    }
  }
}
.w-cat {
  padding: 5px 20px;
}
.w-list {
  padding-left: 20px;
  span {
    margin-right: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .price {
    color: #ff4400;
  }
}
</style>


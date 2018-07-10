<template lang="pug">
div(class="mask",@click="cancel")
  .w-container
    .w-nav
      div(@click="setType('')", :class="{active: serviceType == ''}") 全部
      div(@click="setType('折扣卡')", :class="{active: serviceType == '折扣卡'}") 折扣卡
      div(@click="setType('储值卡')", :class="{active: serviceType == '储值卡'}") 储值卡
      div(@click="setType('时段卡')", :class="{active: serviceType == '时段卡'}") 时段卡
      div(@click="setType('疗程总次卡')", :class="{active: serviceType == '疗程总次卡'}") 疗程总次卡
      div(@click="setType('疗程分次卡')", :class="{active: serviceType == '疗程分次卡'}") 疗程分次卡
    .w-cat
      el-select(v-model='catFirst', placeholder='请选择大类', @change='id => onCat1Change(id)')
        el-option(v-for='item in categoryList', :key='item.id', :label='item.name', :value='item.id')
      el-select(v-model='catSecond', placeholder='请选择小类', @change='onCat2Change()')
        el-option(v-for='item in categoryList2', :key='item.id', :label='item.name', :value='item.id')
    .w-list
      span(@click='handleClick(item)', v-for='item in dataList', :key='item.id')
        el-tag {{item.name}}
          span.price ￥{{item.price}}

</template>

<script>
import _ from "lodash";
import API from "@/api";
export default {
  props: ["member-id"],
  data() {
    return {
      serviceType: "",
      catFirst: "",
      catSecond: "",
      dataListFull: [],
      categoryList: [],
      categoryList2: []
    };
  },
  mounted() {
    this.getCategory();
    this.getDataList();
  },
  computed: {
    dataList() {
      console.log(this.dataListFull);
      let result = _.filter(this.dataListFull, o => {
        if (this.serviceType) {
          return o.type === this.serviceType;
        } else {
          return true;
        }
      });
      result = _.filter(result, o => {
        if (this.catFirst) {
          return o.catFirst === this.catFirst;
        } else {
          return true;
        }
      });
      result = _.filter(result, o => {
        if (this.catSecond) {
          return o.catSecond === this.catSecond;
        } else {
          return true;
        }
      });
      return result;
    }
  },
  methods: {
    cancel(ev) {
      if (ev.target.className === "mask") {
        this.$emit("cancel");
      }
    },
    setType(serviceType) {
      this.serviceType = serviceType;
    },
    getCategory() {
      API.common.getCategoryList().then(({ data }) => {
        if (data && data.code === 0) {
          this.categoryList = data.list["cards"];
        } else {
          this.categoryList = [];
        }
        this.categoryList2 = [];
      });
    },
    onCat1Change(id) {
      this.catSecond = "";
      const child = _.find(this.categoryList, o => +o.id === +id);
      if (child) {
        this.categoryList2 = child.categoryList;
      } else {
        this.categoryList2 = [];
      }
    },
    handleClick(item) {
      this.$emit("selected", item);
    },
    getDataList() {
      API.servicecard.getList({}).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataListFull = data.list;
        } else {
          this.dataListFull = [];
        }
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
.site-wrapper .el-pagination {
  text-align: center;
}
.w-container {
  position: fixed;
  width: 700px;
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
    text-align: center;
    padding: 5px 20px;
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


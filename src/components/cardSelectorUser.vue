<template lang="pug">
div(class="mask",@click="cancel")
  .w-container
    .w-nav
      div(@click="setType('1')", :class="{active: serviceType == '1'}") 生效卡
      div(@click="setType('2')", :class="{active: serviceType == '2'}") 过期卡
      div(@click="setType('3')", :class="{active: serviceType == '3'}") 已用完的卡
    .w-list
      span(@click='handleClick(item)', v-for='item in dataListFull', :key='item.id')
        el-tag {{item.name}}
          span.price ￥{{item.price}}

</template>

<script>
// import _ from "lodash";
import API from "@/api";
export default {
  props: ["memberId"],
  data() {
    return {
      serviceType: "1",
      dataListFull: []
    };
  },
  mounted() {
    this.getDataList();
  },
  computed: {
    dataList() {
      return [];
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
      this.getDataList();
    },
    handleClick(item) {
      this.$emit("selected", item);
    },
    getDataList() {
      const params = {
        memberId: this.memberId,
        type: this.serviceType
      }
      API.membercard.cardList(params).then(({ data }) => {
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


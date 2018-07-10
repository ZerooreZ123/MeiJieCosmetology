<template>
  <div class="container">
    <div class="item" v-for="(item, index) in itemName" :key="index" @mouseover="dataDetails(index)" @click="goUrl(item.url)">
      <div :class="active===index?'activeClass': 'single'">
        <div class="photo"><img :src="active===index?item.activeSrc:item.photoSrc" alt=""></div>
        <div class="text">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      itemName: [
        {
          photoSrc: require("@/assets/img/inventory/1.png"),
          activeSrc: require("@/assets/img/inventory/5.png"),
          url: "/stock/purchase",
          text: "采购管理"
        },
        {
          photoSrc: require("@/assets/img/inventory/2.png"),
          activeSrc: require("@/assets/img/inventory/6.png"),
          url: "/stock/consume",
          text: "消耗管理"
        },
        {
          photoSrc: require("@/assets/img/inventory/3.png"),
          activeSrc: require("@/assets/img/inventory/7.png"),
          url: "/stock/allocation",
          text: "调拨管理"
        },
        {
          photoSrc: require("@/assets/img/inventory/4.png"),
          activeSrc: require("@/assets/img/inventory/8.png"),
          url: "/stock/realtime",
          text: "盘库管理"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    goUrl(hash) {
      location.hash = hash;
    },
    dataDetails(i) {
      this.active = i;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 110px 80px;
  .item {
    display: inline-block;
    width: 50%;
    padding: 50px;
    .activeClass {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border: 1px dashed #c99f63;
      height: 225px;
      padding: 20px 0;
      font-size: 26px;
      color: #fff;
      background: #c99f63;
      .photo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
        border-right: 1px solid #bd9357;
        img {
          width: 80px;
          height: 70px;
        }
      }
      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
      }
    }
    .single {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border: 1px dashed #c99f63;
      height: 225px;
      padding: 20px 0;
      font-size: 26px;
      color: #c99f63;
      background: #fff;
      .photo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
        border-right: 1px solid #bd9357;
        img {
          width: 80px;
          height: 70px;
        }
      }
      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
      }
    }
  }
}
// .linkTo {
//   text-decoration: none;
// }
</style>
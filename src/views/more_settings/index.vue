<template>
  <div class="container">
    <div class="block sh" @click="goUrl('/more_settings/shop_list')">
      <div>商户信息完善</div>
    </div>
    <div class="block xm" @click="goUrl('/more_settings/product_list')">
      <div>项目/套餐/产品</div>
    </div>
    <div class="block yg" @click="goUrl('/more_settings/user_list')">
      <div>员工</div>
    </div>
    <div class="block gxh" @click="goUrl('/more_settings/individuation')">
      <div>个性化设置</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemList: [1, 2, 3]
    };
  },
  mounted() {},
  methods: {
    goUrl(hash) {
      location.hash = hash;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

$bgImgWidth: 70%;
.block {
  height: 50vh;
  width: 22%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  position: relative;
  & > div {
    width: 100%;
    position: absolute;
    bottom: 30px;
    text-align: center;
    font-size: 30px;
  }
  &.gxh {
    background: url("../../assets/img/gxh.png") no-repeat center center;
    background-size: $bgImgWidth;
  }
  &.sh {
    background: url("../../assets/img/sh.png") no-repeat center center;
    background-size: $bgImgWidth;
  }
  &.xm {
    background: url("../../assets/img/xm.png") no-repeat center center;
    background-size: $bgImgWidth;
  }
  &.yg {
    background: url("../../assets/img/yg.png") no-repeat center center;
    background-size: $bgImgWidth;
  }
}
</style>
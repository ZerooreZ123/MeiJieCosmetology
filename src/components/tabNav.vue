<template>
  <div>
    <div class="shopList" v-if="!disabled">
      <div class="item" v-for="(item, index) in itemList" :key="index" @click="setActiveIndex(index)" :class="activeIndex== index ? 'avtiveIndex': ''">
        {{item}}
      </div>
      <slot name="right">
      </slot>
    </div>
    <div class="shopList" v-if="disabled">
      <div class="item" v-for="(item, index) in itemList" :key="index" :class="activeIndex== index ? 'avtiveIndex disabled': 'disabled'">
        {{item}}
      </div>
      <slot name="right">
      </slot>
    </div>
    <div :style="spaceStyle" v-if="index == activeIndex" v-for="(item, index) in itemList" :key="index">
      <slot :name="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    setActiveIndex(index) {
      this.activeIndex = index;
      this.$emit("addParmas", index);
    }
  },
  props: ["itemList", "space", "disabled"],
  computed: {
    spaceStyle() {
      return `padding-top:${this.space || 0}px;`;
    }
  }
};
</script>
<style scoped>
.shopList {
  background-color: #fde3be;
  padding: 0;
}

.shopList form {
  width: 377px;
  height: 73px;
  padding: 12px;
  float: right;
  position: relative;
}
.shopList form input {
  outline: none;
  width: 347px;
  height: 42px;
  border: 1px solid #c99f63;
  background: #fde3be;
  padding-left: 8px;
  color: gray;
}
.icon-search {
  background-color: red;
  display: inline-block;
  background: url("../assets/icon-sousuo.svg") no-repeat;
  height: 20px;
  width: 20px;
  background-size: 100%;
  position: absolute;
  top: 25px;
  right: 32px;
}
.shopList .item {
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 72px;
  width: 172px;
  line-height: 72px;
  text-align: center;
  cursor: pointer;
  transition: all ease .3s;
}
.shopList .item:hover {
  background-color: #c99f63;
  color: #fff;
}
.avtiveIndex {
  background-color: #c99f63;
  color: #fff;
}
.shopList .item.disabled {
  cursor: not-allowed;
}

@media screen and (max-width: 1377px) {
  .shopList {
    height: 72px;
    width: 1075px;
    background-color: #fde3be;
    padding: 0;
  }
}
</style>



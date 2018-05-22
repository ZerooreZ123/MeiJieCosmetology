<template>
  <div class="list-line">
    <div class="title">
      <span v-html="listname"></span>
      <span class="show-all" @click="handleClick(null)">全部</span>
    </div>
    <div class="list-line-items" v-if="list.length > 0">
      <span class="item" :class="{active: activeIndex == index}" v-for="(item, index) in list" :key="item.id" @click="handleClick(item, index)">{{item.name}}</span>
    </div>
    <div class="list-line-items" v-else>
      <span>没有数据</span>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  props: ["listname", "list"],
  watch: {
    list() {
      this.activeIndex = null;
    }
  },
  data() {
    return {
      activeIndex: null
    };
  },
  methods: {
    handleClick(item, index) {
      if (item) {
        this.activeIndex = index;
        this.$emit("onItemClick", item);
      } else {
        this.activeIndex = null;
        this.$emit("onItemClick", null);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.list-line {
  text-align: left;
  position: relative;
  line-height: 30px;
  .title {
    position: absolute;
    left: 0;
    .show-all {
      color: #c99f63;
      cursor: pointer;
    }
  }

  &-items {
    margin-left: 150px;
    .item {
      padding: 0 20px;
      cursor: pointer;
      display: inline-block;
    }
    .active {
      background-color: #c99f63;
      color: #fff;
    }
  }
}

.clear {
  clear: both;
}
</style>


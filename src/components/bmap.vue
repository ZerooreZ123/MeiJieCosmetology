<template>
  <div ref="allmap" class="allmap"></div>
</template>

<script>
export default {
  props: ["name"],
  mounted() {
    this.map = new window.BMap.Map(this.$refs.allmap); // 创建Map实例
    this.map.centerAndZoom("南京市", 11);
    this.map.addEventListener("click", ev => {
      this.$emit("mapClick", ev.point);
    });
  },
  watch: {
    name() {
      if (this.name) {
        this.handleNameInput();
      }
    }
  },
  methods: {
    handleNameInput() {
      const local = new window.BMap.LocalSearch(this.map, {
        renderOptions: { map: this.map }
      });
      local.search(this.name);
    }
  }
};
</script>

<style scoped>
.allmap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
</style>

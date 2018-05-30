<template>
  <div class="col" :style="cStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["span"],
  data() {
    return {
      width: 100
    };
  },
  mounted() {},
  computed: {
    cStyle() {
      const w = this.width / 24 * this.span;
      return `width:${w}%`;
    }
  }
};
</script>

<style scoped>
.col {
  float: left;
}
</style>


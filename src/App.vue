<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {};
</script>

<style>
/* 勿删，修正富文本插件icon不对齐的问题 */
.ql-snow .ql-color-picker .ql-picker-label svg,
.ql-snow .ql-icon-picker .ql-picker-label svg {
  vertical-align: top;
}
</style>

<template>
  <img :src="path" :alt="alt" :style="style" />
</template>

<script>
export default {
  props: ["src", "alt", "style"],
  computed: {
    path() {
      return window.SITE_CONFIG["resourceServer"] + this.src;
    }
  }
};
</script>

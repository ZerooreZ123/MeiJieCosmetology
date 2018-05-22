<template>
  <div>
    <tab-nav :itemList='itemList' space="10">
      <template slot="员工列表">
        <user></user>
      </template>
    </tab-nav>
  </div>
</template>

<script>
import tabNav from "@/components/tabNav";
import user from "@/views/user/index";

export default {
  data() {
    return {
      itemList: ["员工列表"],
      str: "",
      childrenIndex: 0
    };
  },
  components: {
    tabNav,
    user
  },
  methods: {}
};
</script>

<style scoped>
</style>

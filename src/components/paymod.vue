<template>
  <el-dialog title="添加支付" :close-on-click-modal="false" :visible.sync="visible">
    <div class="pay-list">
      <span v-for="item in dataList" :key="item.id" @click="() => handleClick(item)">
        <el-tag>{{item.name}}</el-tag>
      </span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <!-- <el-button type="primary" @click="dataFormSubmit()">确定</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
import API from "@/api";
export default {
  data() {
    return {
      visible: false,
      index: null,
      dataList: []
    };
  },
  mounted() {
    API.syspaymode.queryPayList().then(({ data }) => {
      if (data && data.code === 0) {
        this.dataList = data.list;
      }
    });
  },
  methods: {
    init(index) {
      this.visible = true;
      this.index = index;
    },
    handleClick(item) {
      this.visible = false;
      item.index = this.index;
      this.$emit("selected", item);
    }
  }
};
</script>

<style scoped>
.pay-list > span {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>

<template>
  <el-dialog title="添加支付" :close-on-click-modal="false" :visible.sync="visible">
    <el-tabs v-model="activeName">
      <el-tab-pane label="常用" name="常用">
        <div class="pay-list">
          <span v-for="item in dataList" :key="item.id" @click="() => handleClick(item,'common')">
            <el-tag>{{item.name}}</el-tag>
          </span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="会员卡" name="会员卡">
        <div class="pay-list">
          <span v-for="item in cardsList" :key="item.id" @click="() => handleClick(item,'card')">
            <el-tag>{{item.name}}</el-tag>
          </span>
        </div>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import _ from "lodash";
import API from "@/api";
export default {
  props: ["memberId"],
  data() {
    return {
      visible: false,
      index: null,
      activeName: "常用",
      dataList: [],
      cardsList: [],
      serviceId: null
    };
  },
  mounted() {},
  methods: {
    init(index, item, canUseCard) {
      this.visible = true;
      if (item) this.serviceId = item.serviceId;
      API.syspaymode.queryPayList().then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.list;
        }
      });
      if (this.memberId && canUseCard) {
        const params = {
          memberId: this.memberId
        };
        API.membercard.userCard(params).then(({ data }) => {
          if (data && data.code === 0) {
            this.cardsList = data.list;
          }
        });
      }
      if (index !== undefined) {
        this.index = index;
      }
    },
    handleClick(item, payType) {
      this.visible = false;
      item.index = this.index;
      item.payType = payType;
      if (item.type === "疗程总次卡" || item.type === "疗程分次卡") {
        const service = _.find(item.orderCarGiveList, o => +o.serviceId === +this.serviceId);
        if (!service) {
          this.$message.error("此服务无法使用该卡");
          return;
        }
      }
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

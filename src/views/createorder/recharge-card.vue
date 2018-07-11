<template lang="pug">
  div
    div(class="border" v-if="!card.name")
      el-button(@click="showPanel") 卡充值
    div(v-else)
      el-row
        el-col(:span="14")
          el-card(style="position:relative;")
            img(src="../../assets/img/order-card-def.png",class="card-img")
            div(style="margin-left: 140px;")
              div(class="card-title") {{card.name}}
                a(class="card-change",v-if="!readonly",@click="showPanel") 更换卡
              // div(class="card-price") 售价：￥{{card.price}}
            div(style="padding-top: 80px;")
              span 充值金额：
              el-input(style="width:200px;",placeholder="充值金额",v-model="totalPrice")
                template(slot="prepend") ￥
          el-card(style="position:relative;margin-top:10px;") 服务人员：
            el-select(placeholder="请填写服务人员",v-model="serviceTechnician", :disabled="readonly")
              el-option(v-for="item in userList", :key="item.userId", :label="item.name", :value="item.name")
          el-collapse(value="其它信息")
            el-collapse-item(title="其它信息：",name="其它信息")
              el-card(style="position:relative;",class="other")
                div(class="other-row")
                  span 卡编号：
                  el-input(disabled,placeholder="没有则不填",style="width:200px;",v-model="cardno")
                div(class="other-row")
                  span 流水单号：
                  el-input(placeholder="没有则不填",style="width:200px;",v-model="serialNo",:disabled="readonly")
                div(class="other-row")
                  span 备注信息：
                  el-input(placeholder="没有则不填",style="width:200px;",v-model="remarks",:disabled="readonly")
        el-col(:span="10", style="padding-left: 10px;")
          el-card
            div(class="other-row") 订单金额：￥{{totalPrice}}
            div(class="other-row") 应收金额：￥{{totalPrice}}
            div(class="other-row") 还需支付：￥{{needPay}}
            div(class="paymode-line",v-for="(paymode, paymodeIndex) in payList",:key="paymode.t")
              span(style="width:160px;display:inline-block;") 已支付（{{paymode.payMethod}}）：
              span ￥
              input(type="text",class="paymode-value",v-model="paymode.payPrice",:disabled="paymode.readonly")
              i(v-if="!paymode.readonly",class="el-icon-delete remove-paymode",@click="removePaymode(paymodeIndex)")
            div(class="other-row")
              a(@click="showPaymod") 添加支付方式
            div(style="padding-top:10px;")
              el-button(type="primary",@click="submit") 提交

    card-selector-user(v-if="showSelector",@selected="onCardSelect",@cancel="showSelector=false",:member-id="memberId")
    paymod(ref="paymod",@selected="onPaymodSelected")
</template>

<script>
import API from "@/api";
import cardSelectorUser from "@/components/cardSelectorUser";
import paymod from "@/components/paymod";
import { formatDate } from "@/utils/index";
function getNumber() {
  return Math.floor(Math.random() * 10);
}
function createCardno() {
  return formatDate(new Date(), "yyyyMMdd") + getNumber() + getNumber() + getNumber() + getNumber();
}
export default {
  props: ["officeId", "roomId", "roomName", "memberId", "userList"],
  components: { cardSelectorUser, paymod },
  data() {
    return {
      active: false,
      readonly: false,
      showSelector: false,
      card: {},
      serialNo: "",
      cardno: "",
      remarks: "",
      serviceTechnician: "",
      totalPrice: 0,
      payList: []
    };
  },
  computed: {
    needPay() {
      let result = +this.totalPrice;
      this.payList.forEach(o => {
        if (o.payPrice) {
          result -= +o.payPrice;
        }
      });
      return result;
    }
  },
  mounted() {
    if (!this.active) {
      // this.getData();
    }
    this.active = true;
  },
  activated() {
    if (this.active) {
      // this.getData();
    }
  },
  methods: {
    clear() {
      this.readonly = false;
      this.$emit("readonly", false);
      this.$emit("reset", {
        memberId: "",
        officeId: "",
        roomId: ""
      });
      this.card = {};
      this.serialNo = "";
      this.cardno = "";
      this.remarks = "";
      this.serviceTechnician = "";
      this.payList = [];
    },
    showPanel() {
      if (!this.memberId) {
        this.$message.error("请先选择会员");
        return;
      }
      if (!this.officeId) {
        this.$message.error("请先选择门店");
        return;
      }
      // if (!this.roomId) {
      //   this.$message.error("请先选择房间");
      //   return;
      // }
      this.showSelector = true;
    },
    onCardSelect(item) {
      this.card = item;
      this.showSelector = false;
      this.cardno = createCardno();
    },
    showPaymod() {
      this.$refs.paymod.init();
    },
    removePaymode(paymodeIndex) {
      this.payList.splice(paymodeIndex, 1);
    },
    onPaymodSelected(item) {
      this.payList.push({
        payMethod: item.name,
        paymodeId: item.id,
        payPrice: 0,
        t: new Date().getTime()
      });
    },
    submit() {
      if (+this.totalPrice === 0) {
        this.$message.error("请填写充值金额");
        return;
      }
      if (this.needPay && this.needPay !== 0) {
        this.$message.error("您还没完全支付");
        return;
      }
      if (!this.serviceTechnician) {
        this.$message.error("请填写服务人员");
        return;
      }
      const params = {
        serialNo: this.serialNo,
        officeId: this.officeId,
        orderType: 3, // 1、开单 2、开卡购卡 3、卡充值
        memberId: this.memberId,
        roomId: this.roomId,
        roomName: this.roomName,
        totalPrice: this.totalPrice,
        realPrice: this.totalPrice,
        needPay: this.needPay,
        remarks: this.remarks,
        memberCard: {
          id: this.card.id, // 用户卡的ID
          memberId: this.memberId,
          cardno: this.cardno
        },
        detailList: [
          {
            serviceType: 6, // 1、项目 2、产品 3、套餐 4、附加费 5、开卡购卡 6、充值
            serviceId: this.card.cardId,
            serviceName: this.card.name,
            servicePrice: this.totalPrice,
            nums: 1,
            serviceNeedPay: this.needPay,
            subtotal: this.totalPrice,
            serviceTechnician: this.serviceTechnician,
            payList: this.payList
          }
        ]
      };
      API.miorder.save(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.clear();
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>


<style scoped>
.border {
  border: 3px dashed #ccc;
  line-height: 100px;
  text-align: center;
}
.card-img {
  width: 120px;
  position: absolute;
}
.card-title {
  font-size: 20px;
}
.card-price {
  margin-top: 0;
}
.card-change {
  float: right;
  font-size: 14px;
  cursor: pointer;
}
.other {
  padding: 0 20px;
}
.other-row {
  border-bottom: 1px solid #eee;
  line-height: 60px;
}
.other-row span {
  display: inline-block;
  width: 110px;
}
.paymode-line {
  line-height: 40px;
}
.remove-paymode {
  color: red;
}
.paymode-value {
  width: 50px;
  border: 1px solid #c99f63;
}
</style>

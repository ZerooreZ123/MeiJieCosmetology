<template lang="pug">
  div
    div(class="border" v-if="!card.name")
      el-button(@click="showPanel") 购卡
    div(v-else)
      el-row
        el-col(:span="14")
          el-card(style="position:relative;")
            img(src="../../assets/img/order-card-def.png",class="card-img")
            div(style="margin-left: 140px;")
              div(class="card-title") {{card.name}}
                a(class="card-change",v-if="!readonly",@click="showPanel") 更换卡
              div(class="card-price") 售价：￥{{card.price}}
          el-card(style="position:relative;margin-top:10px;") 售卡人员：
            el-select(placeholder="请填写售卡人员",v-model="serviceTechnician", :disabled="readonly")
              el-option(v-for="item in userList", :key="item.userId", :label="item.name", :value="item.name")
          el-collapse(value="其它信息")
            el-collapse-item(title="其它信息：",name="其它信息")
              el-card(style="position:relative;",class="other")
                div(class="other-row")
                  span 卡编号：
                  el-input(disabled,placeholder="没有则不填",style="width:200px;",v-model="cardno")
                  span(style="margin-left: 50px;") 激活：
                  el-switch(v-model="isActivation")
                div(class="other-row")
                  span 流水单号：
                  el-input(placeholder="没有则不填",style="width:200px;",v-model="serialNo",:disabled="readonly")
                  // span(style="margin-left: 50px;") 补单：
                  // el-switch(v-model="isActivation")
                div(class="other-row")
                  span 备注信息：
                  el-input(placeholder="没有则不填",style="width:200px;",v-model="remarks",:disabled="readonly")
        el-col(:span="10", style="padding-left: 10px;")
          el-card
            div(class="other-row") 订单金额：￥{{card.price}}
            div(class="other-row") 应收金额：￥{{card.price}}
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

    card-selector(v-if="showSelector",@selected="onCardSelect",@cancel="showSelector=false")
    paymod(ref="paymod",@selected="onPaymodSelected")
</template>

<script>
import API from "@/api";
import cardSelector from "@/components/cardSelector";
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
  components: { cardSelector, paymod },
  data() {
    return {
      active: false,
      readonly: false,
      showSelector: false,
      card: {},
      serialNo: "",
      cardno: "",
      remarks: "",
      isActivation: false,
      serviceTechnician: "",
      payList: []
    };
  },
  computed: {
    needPay() {
      let result = +this.card.price;
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
      this.getData();
    }
    this.active = true;
  },
  activated() {
    if (this.active) {
      this.getData();
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
      this.isActivation = false;
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
    getData() {
      if (this.$route.params.type === "order-card" || this.$route.params.type === "repayment-card") {
        API.miorder.info(+this.$route.params.id).then(({ data }) => {
          if (data && data.code === 0) {
            this.serialNo = data.miOrder.serialNo;
            this.cardno = data.miOrder.memberCard.cardno;
            this.remarks = data.miOrder.remarks;
            this.isActivation = data.miOrder.memberCard.isActivation;
            this.serviceTechnician = data.miOrder.detailList[0].serviceTechnician;
            this.$emit("reset", {
              memberId: data.miOrder.memberId,
              officeId: data.miOrder.officeId,
              roomId: data.miOrder.roomId.toString()
            });
            this.card = {
              id: data.miOrder.serviceId,
              name: data.miOrder.detailList[0].serviceName,
              price: data.miOrder.detailList[0].servicePrice
            };
            if (this.$route.params.type === "repayment-card") {
              this.readonly = true;
              data.miOrder.detailList[0].payList.forEach(obj => {
                obj.readonly = true;
              });
            }
            this.payList = data.miOrder.detailList[0].payList;
          } else {
            this.payList = [];
            this.$message.error(data.msg);
          }
        });
      }
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
      if (!this.serviceTechnician) {
        this.$message.error("请填写售卡人员");
        return;
      }
      if (this.needPay && this.needPay !== 0) {
        this.$message.error("您还没完全支付");
        return;
      }
      const params = {
        serialNo: this.serialNo,
        officeId: this.officeId,
        orderType: 2, // 1、开单 2、开卡购卡 3、卡充值
        memberId: this.memberId,
        roomId: this.roomId,
        roomName: this.roomName,
        totalPrice: this.card.price,
        needPay: this.needPay,
        remarks: this.remarks,
        memberCard: {
          denomination: this.card.denomination ? this.card.denomination : "",
          frequency: this.card.frequency ? this.card.frequency : "",
          cardId: this.card.id,
          memberId: this.memberId,
          cardno: this.cardno,
          isActivation: this.isActivation
        },
        detailList: [
          {
            serviceType: 5, // 1、项目 2、产品 3、套餐 4、附加费 5、开卡购卡 6、充值
            serviceId: this.card.id,
            serviceName: this.card.name,
            servicePrice: this.card.price,
            nums: 1,
            serviceNeedPay: this.needPay,
            subtotal: this.card.price,
            discount: 10,
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
  margin-top: 40px;
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

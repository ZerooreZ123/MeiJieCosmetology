import API from "@/api";
import _ from "lodash";
import productSelector from "@/components/productSelector";
import paymod from "@/components/paymod";
export default {
  props: ["officeId", "roomId", "roomName", "memberId", "userList"],
  data() {
    return {
      active: false,
      readonly: false,
      dataForm: {
        serialNo: "",
        memberNums: 1
      },
      appointmentId: "",
      paymodVisible: false,
      showPanel: false,
      dataList: []
    };
  },
  computed: {
    sum() {
      let sum = 0;
      this.dataList.forEach(item => {
        sum += item.subtotal;
      });
      console.log(1, sum);
      return sum;
    },
    sumNeed() {
      let sum = 0;
      this.dataList.forEach(item => {
        sum += item.serviceNeedPay;
      });
      return sum;
    }
  },
  components: {
    productSelector,
    paymod
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
      this.dataList = [];
      this.dataForm = {
        serialNo: "",
        memberNums: 1
      };
    },
    getData() {
      console.log("id", this.$route.params.id);
      if (this.$route.params.type === "repayment") {
        this.readonly = true;
      } else {
        this.readonly = false;
      }
      if (this.$route.params.type === "order" || this.$route.params.type === "repayment") {
        API.miorder.info(+this.$route.params.id).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataForm.serialNo = data.miOrder.serialNo;
            this.dataForm.memberNums = data.miOrder.memberNums;
            this.$emit("reset", {
              memberId: data.miOrder.memberId,
              officeId: data.miOrder.officeId,
              roomId: data.miOrder.roomId.toString()
            });
            if (this.$route.params.type === "repayment") {
              data.miOrder.detailList.forEach(detail => {
                detail.payList.forEach(obj => {
                  obj.readonly = true;
                });
              });
            }
            this.dataList = data.miOrder.detailList;
          } else {
            this.dataList = [];
          }
        });
      } else if (this.$route.params.type === "appointment") {
        API.appointment.info(+this.$route.params.id).then(({ data }) => {
          if (data && data.code === 0) {
            console.log(data);
            this.appointmentId = data.appointment.id;
            this.dataForm.serialNo = data.appointment.serialno;
            this.$emit("reset", {
              memberId: data.appointment.memberId,
              officeId: data.appointment.officeId,
              roomId: data.appointment.roomId ? data.appointment.roomId.toString() : ""
            });

            this.dataForm.memberNums = data.appointment.nums;
            this.dataList = data.appointment.appointDeatailLsit.map(obj => {
              return {
                serviceTechnician: obj.serviceTechnician,
                serviceName: obj.serviceName,
                serviceId: obj.serviceId,
                servicePrice: obj.servicePrice || 1,
                nums: obj.nums || 1,
                serviceNeedPay: obj.servicePrice * obj.nums,
                subtotal: obj.servicePrice * obj.nums,
                serviceType: obj.serviceType,
                t: new Date().getTime(),
                payList: []
              };
            });
          } else {
            this.dataList = [];
          }
        });
      } else {
        this.dataList = [];
        this.dataForm = {
          serialNo: "",
          memberNums: 1
        };
      }
    },
    showPaymod(index, item) {
      this.$refs.paymod.init(index, item, true);
    },
    getDiscount(memberCard, serviceId) {
      const service = _.find(memberCard.orderCarGiveList, card => +card.serviceId === +serviceId);
      if (service) {
        if (+service.discountType === 0) {
          return "会员价：￥" + service.discountNum;
        } else if (+service.discountType === 1) {
          return "折扣：" + service.discountNum + "%";
        } else {
          return "折扣卡异常";
        }
      }
    },
    onPaymodSelected(item) {
      const service = this.dataList[item.index];
      const payList = service.payList || [];
      const isExist = _.find(payList, p => !!p.memberCard);
      if (isExist && item.payType === "card") {
        this.$message.error("只能使用一张会员卡");
        return;
      }
      payList.push({
        memberCard: item,
        payMethod: item.name,
        paymodeId: item.id,
        payPrice: 0,
        type: item.type,
        payType: item.payType,
        surplusMoney: item.surplusMoney,
        surplusFrequency: item.surplusFrequency,
        t: new Date().getTime()
      });
      this.$set(this.dataList[item.index], "payList", payList);
      this.handlePaymodeInput(item.index);
    },
    addNewItem() {
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
      this.showPanel = true;
    },
    addNewAddons() {
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
      this.dataList.push({
        serviceTechnician: "",
        serviceName: "附加费",
        serviceId: 0,
        servicePrice: 1,
        nums: 1,
        serviceNeedPay: 0,
        subtotal: 0,
        serviceType: 4,
        t: new Date().getTime(),
        payList: []
      });
    },
    handleNumChange(index, num) {
      this.$set(this.dataList[index], "subtotal", num * this.dataList[index].servicePrice);
      this.handlePaymodeInput(index);
    },
    handlePaymodeInput(index) {
      // 用于支付内容变更，重新计算还需支付价格。
      const servicePrice = this.dataList[index].servicePrice; // 单价
      const payList = this.dataList[index].payList; // 支付方式list
      let subtotal = this.dataList[index].subtotal; // 总价
      // 折扣
      payList.forEach(paymode => {
        if (paymode.type === "折扣卡") {
          const service = _.find(paymode.memberCard.orderCarGiveList, card => +card.serviceId === +this.dataList[index].serviceId);
          if (+service.discountType === 0) {
            subtotal = service.discountNum; // 优惠价
          } else if (+service.discountType === 1) {
            subtotal = (subtotal * service.discountNum) / 100; // 打折
          }
        }
      });

      // 其它
      let sum = 0;
      payList.forEach(paymode => {
        if (paymode.payNum && paymode.type === "疗程总次卡") {
          if (paymode.payNum > paymode.surplusFrequency) {
            this.$message.error("剩余次数不足");
            paymode.payNum = paymode.surplusFrequency;
            this.handlePaymodeInput(index); // 递归重设
          }
          sum += +paymode.payNum * servicePrice;
          paymode.payPrice = +paymode.payNum * servicePrice;
        } else if (paymode.payNum && paymode.type === "疗程分次卡") {
          const service = _.find(paymode.memberCard.orderCarGiveList, card => +card.serviceId === +this.dataList[index].serviceId);
          if (service) {
            if (paymode.payNum > service.discountNum) {
              this.$message.error("剩余次数不足");
              paymode.payNum = service.discountNum;
              this.handlePaymodeInput(index); // 递归重设
            }
            sum += +paymode.payNum * servicePrice;
            paymode.payPrice = +paymode.payNum * servicePrice;
          } else {
            this.$message.error("疗程分次卡异常");
          }
        } else {
          if (paymode.payPrice > paymode.surplusMoney) {
            this.$message.error("剩余金额不足");
            paymode.payPrice = paymode.surplusMoney;
            this.handlePaymodeInput(index); // 递归重设
          }
          sum += +paymode.payPrice;
        }
      });
      this.$set(this.dataList[index], "serviceNeedPay", subtotal - sum);
    },
    handleProductSelected(list) {
      const newList = list.map(obj => {
        return {
          serviceTechnician: "",
          serviceName: obj.name,
          serviceId: obj.id,
          servicePrice: +obj.price,
          nums: 1,
          serviceNeedPay: +obj.price,
          subtotal: +obj.price,
          serviceType: obj.serviceType,
          t: new Date().getTime(),
          payList: []
        };
      });
      this.dataList = this.dataList.concat(newList);
      this.showPanel = false;
    },
    deleteHandle(index) {
      this.dataList.splice(index, 1);
    },
    removePaymode(index, paymodeIndex) {
      this.dataList[index].payList.splice(paymodeIndex, 1);
      this.handlePaymodeInput(index);
    },
    submit() {
      if (!this.officeId) {
        this.$message.error("请选择门店");
        return;
      }
      // if (!this.roomId) {
      //   this.$message.error("请选择房间");
      //   return;
      // }
      if (!this.memberId) {
        this.$message.error("请选择会员");
        return;
      }

      const data = this.dataForm;
      if (!data.serialNo) {
        this.$message.error("请填写流水单号");
        return;
      }
      data.officeId = this.officeId;
      data.roomId = this.roomId;
      data.memberId = this.memberId;
      data.roomName = this.roomName;
      data.detailList = this.dataList;
      data.orderType = 1;
      if ((this.$route.params.type === "order" || this.$route.params.type === "repayment") && this.$route.params.id) {
        // 订单再次修改
        data.id = +this.$route.params.id;
        // console.log(JSON.stringify(data));
        API.miorder.receivables(data).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.clear();
              }
            });
          }
        });
      } else {
        console.log(JSON.stringify(data));
        API.miorder.save(data).then(({ data }) => {
          if (data && data.code === 0) {
            if (this.appointmentId) {
              var params = {
                id: this.appointmentId,
                status: 2
              };
              API.appointment.updateInfo(params).then(({ data }) => {
                if (data && data.code === 0) {
                  this.$message({
                    message: "操作成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                      this.clear();
                    }
                  });
                }
              });
            } else {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.clear();
                }
              });
            }
          }
        });
      }
    }
  }
};

import API from "@/api";
import productSelector from "@/components/productSelector";
import paymod from "@/components/paymod";
export default {
  data() {
    return {
      filter: {
        userList: [],
        memberList: [],
        officeList: [],
        roomList: []
      },
      dataForm: {
        serialNo: "",
        memberNums: 1,
        officeId: "",
        roomId: "",
        roomName: "",
        memberId: ""
      },
      paymodVisible: false,
      showPanel: false,
      dataList: []
    };
  },
  components: {
    productSelector,
    paymod
  },
  mounted() {
    this.getOfficeList();
    this.getRoomList();
    this.getMemberList();
    this.getUserList();
  },
  methods: {
    getData() {
      console.log("orderId", this.$route.params.orderId);
    },
    getRoomNameById(id) {
      const roomList = this.filter.roomList;
      for (let i = 0; i < roomList.length; i++) {
        if (roomList[i].id === id) {
          return roomList[i].name;
        }
      }
      return null;
    },
    showPaymod(index) {
      this.$refs.paymod.init(index);
    },
    onPaymodSelected(item) {
      const index = item.index;
      const payList = this.dataList[index].payList || [];
      payList.push({
        payMethod: item.name,
        paymodeId: item.id,
        payPrice: 0,
        t: new Date().getTime()
      });
      this.$set(this.dataList[index], "payList", payList);
    },
    addNewItem() {
      this.showPanel = true;
    },
    addNewAddons() {
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
      const payList = this.dataList[index].payList;
      const subtotal = this.dataList[index].subtotal;
      let sum = 0;
      payList.forEach(paymode => {
        sum += +paymode.payPrice;
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
    getMemberList() {
      API.member.queryMemberList().then(({ data }) => {
        if (data && data.code === 0) {
          this.filter.memberList = data.list;
        } else {
          this.filter.memberList = [];
        }
      });
    },
    getUserList() {
      API.user.getList().then(({ data }) => {
        if (data && data.code === 0) {
          this.filter.userList = data.list;
        } else {
          this.filter.userList = [];
        }
      });
    },
    getOfficeList() {
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.filter.officeList = data.list;
        } else {
          this.filter.officeList = [];
        }
      });
    },
    getRoomList() {
      API.room.queryRoomList().then(({ data }) => {
        if (data && data.code === 0) {
          this.filter.roomList = data.list;
        } else {
          this.filter.roomList = [];
        }
      });
    },
    deleteHandle(index) {
      this.dataList.splice(index, 1);
    },
    removePaymode(index, paymodeIndex) {
      this.dataList[index].payList.splice(paymodeIndex, 1);
      this.handlePaymodeInput(index);
    },
    submit() {
      const data = this.dataForm;
      if (!data.officeId) {
        this.$message.error("请选择门店");
        return;
      }
      if (!data.roomId) {
        this.$message.error("请选择房间");
        return;
      }
      if (!data.memberId) {
        this.$message.error("请选择会员");
        return;
      }
      if (!data.serialNo) {
        this.$message.error("请填写流水单号");
        return;
      }

      data.detailList = this.dataList;
      data.roomName = this.getRoomNameById(data.roomId);
      console.log(JSON.stringify(data));
      API.miorder.save(data).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.dataList = [];
            }
          });
        }
      });
    }
  }
};

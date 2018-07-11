<template>
  <div class="mod-config">
    <div>
      <el-breadcrumb separator="/" style="float:left;margin-right: 20px;">
        <el-breadcrumb-item>
          <span class="breadcrumb-title icon-content-center">
            <i class="el-icon-circle-plus iconSet"></i>开单收银</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-select v-model="dataForm.officeId" placeholder="请选择门店" :disabled="readonly == true">
        <el-option v-for="item in filter.officeList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="dataForm.roomId" placeholder="请选择房间" :disabled="readonly == true">
        <el-option v-for="item in filter.roomList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="dataForm.memberId" placeholder="请选择或搜索会员" filterable style="width:300px;" :disabled="readonly == true">
        <el-option v-for="item in filter.memberList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <div style="clear:both;margin-bottom:20px;"></div>
    </div>
    <div class="tab-flex" v-if="!readonly">
      <div style="background-color: #b7abff;" class="items" @click="activeIndex = 0" :class="{active: activeIndex==0}">
        <img src="~@/assets/img/zh.png">
        <span>综合消费</span>
      </div>
      <div style="background-color: #7fb5fb;" class="items" @click="activeIndex = 1" :class="{active: activeIndex==1}">
        <img src="~@/assets/img/ka.png">
        <span>开卡购卡</span>
      </div>
      <div style="background-color: #66cb7d;" class="items" @click="activeIndex = 2" :class="{active: activeIndex==2}">
        <img src="~@/assets/img/cz.png">
        <span>卡充值</span>
      </div>
    </div>
    <div>
      <common v-if="activeIndex==0" :user-list="filter.userList" :office-id="dataForm.officeId" :room-name="getRoomNameById(dataForm.roomId)" :room-id="dataForm.roomId" :member-id="dataForm.memberId" @reset="resetForm" @readonly="flag => readonly = flag"></common>
      <create-card v-if="activeIndex==1" :user-list="filter.userList" :office-id="dataForm.officeId" :room-name="getRoomNameById(dataForm.roomId)" :room-id="dataForm.roomId" :member-id="dataForm.memberId" @reset="resetForm" @readonly="flag => readonly = flag"></create-card>
      <recharge-card v-if="activeIndex==2" :user-list="filter.userList" :office-id="dataForm.officeId" :room-name="getRoomNameById(dataForm.roomId)" :room-id="dataForm.roomId" :member-id="dataForm.memberId" @reset="resetForm" @readonly="flag => readonly = flag"></recharge-card>
    </div>
  </div>
</template>

<script>
import API from "@/api";
import common from "./common.vue";
import createCard from "./create-card";
import rechargeCard from "./recharge-card";

export default {
  components: { common, createCard, rechargeCard },
  data() {
    return {
      itemList: ["综合消费", "开卡购卡", "卡充值"],
      activeIndex: 0,
      readonly: false,
      filter: {
        userList: [],
        memberList: [],
        officeList: [],
        roomList: []
      },
      dataForm: {
        officeId: "",
        roomId: "",
        memberId: ""
      }
    };
  },
  activated() {
    this.init();
  },
  // mounted() {
  //   this.init();
  // },
  methods: {
    init() {
      this.resetForm();
      if (this.$route.params.type === "repayment") {
        // 普通开单的重新支付
        this.readonly = true;
        this.activeIndex = 0;
      } else if (this.$route.params.type === "order-card") {
        // 开卡购卡
        this.readonly = false;
        this.activeIndex = 1;
      } else if (this.$route.params.type === "repayment-card") {
        // 开卡购卡的重新支付
        this.readonly = true;
        this.activeIndex = 1;
      } else if (this.$route.params.type === "order-recharge") {
        // 卡充值
        this.readonly = false;
        this.activeIndex = 2;
      } else if (this.$route.params.type === "repayment-recharge") {
        // 卡充值的重新支付
        this.readonly = true;
        this.activeIndex = 2;
      } else if (this.$route.params.type === "openOrder") {
        this.dataForm.memberId = +this.$route.params.id;
        this.activeIndex = 0;
      } else if (this.$route.params.type === "openCard") {
        this.dataForm.memberId = +this.$route.params.id;
        this.activeIndex = 1;
      } else {
        this.activeIndex = 0;
        this.readonly = false;
      }
      this.getOfficeList();
      this.getRoomList();
      this.getMemberList();
      this.getUserList();
    },
    resetForm(obj) {
      console.log(obj);
      if (obj) {
        this.dataForm.officeId = obj.officeId;
        this.dataForm.roomId = obj.roomId;
        this.dataForm.memberId = obj.memberId;
      } else {
        this.dataForm = {
          officeId: "",
          roomId: "",
          memberId: ""
        };
      }
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
    getRoomNameById(id) {
      const roomList = this.filter.roomList;
      for (let i = 0; i < roomList.length; i++) {
        if (roomList[i].id === id) {
          return roomList[i].name;
        }
      }
      return null;
    },
    getRoomList() {
      API.room.queryRoomList().then(({ data }) => {
        if (data && data.code === 0) {
          this.filter.roomList = data.list;
        } else {
          this.filter.roomList = [];
        }
      });
    }
  }
};
</script>


<style scoped lang="scss">
.icon-content-center {
  display: flex;
  align-items: center;
}
.iconSet {
  color: #409eff;
  font-size: 36px;
}
.tab-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
  .items {
    width: 30%;
    text-align: center;
    font-size: 26px;
    color: #fff;
    height: 144px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 30px;
      margin-right: 10px;
    }
    &.active {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    }
  }
}
</style>

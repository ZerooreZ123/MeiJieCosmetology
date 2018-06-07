<template>
  <div class="mod-home">
    <div>
      <el-breadcrumb separator="/" style="float:left;">
        <el-breadcrumb-item>
          <img src="~@/assets/img/main/01.png" alt="">
          <span class="breadcrumb-title">首页</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-select v-model="shopId" placeholder="请选择门店" style="float:right;">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <div style="clear:both;margin-bottom:10px;"></div>
    </div>
    <m-row>
      <m-col :span="7.5">
        <el-card>
          <div class="i-title">
            <img src="../../assets/img/main/yj.png" /> {{turnover.name}}
            <el-dropdown class="i-right-menu" @command="handleCommandTurnover">
              <span class="el-dropdown-link">
                {{limitTurnover | limit}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="">全部</el-dropdown-item>
                <el-dropdown-item command="day">天</el-dropdown-item>
                <el-dropdown-item command="week">周</el-dropdown-item>
                <el-dropdown-item command="month">月</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="i-num" style="color:#f3e008">￥{{turnover.val}}</div>
        </el-card>
      </m-col>
      <m-col :span="0.75">&nbsp;</m-col>
      <m-col :span="7.5">
        <el-card>
          <div class="i-title">
            <img src="../../assets/img/main/zkh.png" /> {{orderNum.name}}
            <el-dropdown class="i-right-menu" @command="handleCommandOrderNum">
              <span class="el-dropdown-link">
                {{limitOrderNum | limit}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="">全部</el-dropdown-item>
                <el-dropdown-item command="day">天</el-dropdown-item>
                <el-dropdown-item command="week">周</el-dropdown-item>
                <el-dropdown-item command="month">月</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="i-num" style="color:#fa787a">￥{{orderNum.val}}</div>
        </el-card>
      </m-col>
      <m-col :span="0.75">&nbsp;</m-col>
      <m-col :span="7.5">
        <el-card>
          <div class="i-title">
            <img src="../../assets/img/main/yysr.png" /> {{appoint.name}}
            <el-dropdown class="i-right-menu" @command="handleCommandAppoint">
              <span class="el-dropdown-link">
                {{limitAppoint | limit}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="">全部</el-dropdown-item>
                <el-dropdown-item command="day">天</el-dropdown-item>
                <el-dropdown-item command="week">周</el-dropdown-item>
                <el-dropdown-item command="month">月</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="i-num" style="color:#b32dfc">￥{{appoint.val}}</div>
        </el-card>
      </m-col>
    </m-row>

    <el-card style="margin-top:10px;">
      <div class="i-title">
        <img src="../../assets/img/main/tj.png" /> 客人统计
        <el-dropdown class="i-right-menu" @command="handleCommandGuest">
          <span class="el-dropdown-link">
            {{limitGuest | limit}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="">全部</el-dropdown-item>
            <el-dropdown-item command="day">天</el-dropdown-item>
            <el-dropdown-item command="week">周</el-dropdown-item>
            <el-dropdown-item command="month">月</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-row>
        <el-col :span="8">
          <div class="p-num" style="color:#d49efe">{{guestList[0].val}}</div>
          <div class="p-text">{{guestList[0].name}}</div>
        </el-col>
        <el-col :span="8">
          <div class="p-num" style="color:#9ca1fc">{{guestList[1].val}}</div>
          <div class="p-text">{{guestList[1].name}}</div>
        </el-col>
        <el-col :span="8">
          <div class="p-num" style="color:#7ede84">{{guestList[2].val}}</div>
          <div class="p-text">{{guestList[2].name}}</div>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-top:10px;">
      <el-row>
        <el-col :span="16">
          <div class="i-title">
            <img src="../../assets/img/main/yy.png" /> 预约信息
          </div>
          <el-table :data="appointmentList" border style="width: 100%;margin-top:10px;">
            <el-table-column prop="name" header-align="center" align="center" label="客户">
            </el-table-column>
            <el-table-column prop="appointDate" header-align="center" align="center" label="预约时间">
            </el-table-column>
            <el-table-column prop="mobile" header-align="center" align="center" label="电话">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="8" style="padding-left:10px;">
          <div class="i-title">
            <img src="../../assets/img/main/yg.png" /> 正在服务的员工
            <div class="search">
              <el-input placeholder="技师名" v-model="filterServiceTechnician"></el-input>
              <img src="../../assets/img/main/ss.png" />
            </div>
          </div>
          <div>
            <el-table :data="staffList" border style="width: 100%;margin-top:10px;">
              <el-table-column prop="orderNo" header-align="center" align="center" label="订单号">
              </el-table-column>
              <el-table-column prop="serviceTechnician" header-align="center" align="center" label="技师">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import mRow from "@/components/mRow";
import mCol from "@/components/mCol";
import API from "@/api";
export default {
  components: { mRow, mCol },
  data() {
    return {
      active: false,
      shopId: "",
      shopList: [],
      appoint: {},
      orderNum: {},
      turnover: {},
      limitAppoint: "",
      limitOrderNum: "",
      limitGuest: "",
      limitTurnover: "",
      guestList: [{}, {}, {}],
      appointmentList: [],
      filterServiceTechnician: "",
      staffList: []
    };
  },
  mounted() {
    this.getData();
    this.getAppoint({});
    this.getOrderNum({});
    this.getTurnover({});
    this.getGuest({});
    this.getAppointmentList();
    this.getStaff({});
    this.active = true;
  },
  activated() {
    if (this.active) {
      this.getData();
      this.getAppoint({});
      this.getOrderNum({});
      this.getTurnover({});
      this.getGuest({});
      this.getAppointmentList();
      this.getStaff({});
    }
  },
  filters: {
    limit(val) {
      if (val === "week") {
        return "周";
      } else if (val === "month") {
        return "月";
      } else if (val === "day") {
        return "天";
      } else {
        return "全部";
      }
    }
  },
  watch: {
    shopId() {
      this.reloadWithParams();
    },
    filterServiceTechnician() {
      const params = {};
      if (this.shopId) {
        params.officeId = this.shopId;
      }
      params.serviceTechnician = this.filterServiceTechnician;
      this.getStaff(params);
    }
  },
  methods: {
    reloadWithParams() {
      const params = {};
      if (this.shopId) {
        params.officeId = this.shopId;
      }
      this.getStaff(params);
      if (this.limitAppoint) {
        params.type = this.limitAppoint;
        this.getAppoint(params);
      } else {
        delete params.type;
        this.getAppoint(params);
      }
      if (this.limitOrderNum) {
        params.type = this.limitOrderNum;
        this.getOrderNum(params);
      } else {
        delete params.type;
        this.getOrderNum(params);
      }
      if (this.limitTurnover) {
        params.type = this.limitTurnover;
        this.getTurnover(params);
      } else {
        delete params.type;
        this.getTurnover(params);
      }
      if (this.limitGuest) {
        params.type = this.limitGuest;
        this.getGuest(params);
      } else {
        delete params.type;
        this.getGuest(params);
      }
    },
    getData() {
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        }
      });
    },
    getStaff(params) {
      API.home.getStaff(params).then(({ data }) => {
        console.log(data);
        if (data && data.code === 0) {
          this.staffList = data.list;
        }
      });
    },
    getAppoint(params) {
      API.home.getAppoint(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.appoint = data.list;
        }
      });
    },
    getOrderNum(params) {
      API.home.getOrderNum(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.orderNum = data.list;
        }
      });
    },
    getTurnover(params) {
      API.home.getTurnover(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.turnover = data.list;
        }
      });
    },
    getGuest(params) {
      API.home.getGuest(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.guestList = data.list;
        }
      });
    },
    getAppointmentList() {
      API.home.getAppointmentList({ day: 5 }).then(({ data }) => {
        if (data && data.code === 0) {
          this.appointmentList = data.list;
        }
      });
    },
    handleCommandAppoint(command) {
      this.limitAppoint = command;
      const params = { type: command };
      if (this.shopId) {
        params.officeId = this.shopId;
      }
      this.getAppoint(params);
    },
    handleCommandOrderNum(command) {
      this.limitOrderNum = command;
      const params = { type: command };
      if (this.shopId) {
        params.officeId = this.shopId;
      }
      this.getOrderNum(params);
    },
    handleCommandTurnover(command) {
      this.limitTurnover = command;
      const params = { type: command };
      if (this.shopId) {
        params.officeId = this.shopId;
      }
      this.getTurnover(params);
    },
    handleCommandGuest(command) {
      this.limitGuest = command;
      const params = { type: command };
      if (this.shopId) {
        params.officeId = this.shopId;
      }
      this.getGuest(params);
    }
  }
};
</script>

<style scoped>
.mod-home {
  line-height: 1.5;
}
.i-title {
  color: #c99f63;
  font-size: 22px;
  position: relative;
}
.i-title * {
  vertical-align: top;
}
.i-right-menu {
  position: absolute;
  right: 0;
  top: 0;
}
.i-num {
  font-size: 42px;
}
.p-num {
  font-size: 42px;
  text-align: center;
}
.p-text {
  font-size: 18px;
  text-align: center;
}
.search {
  position: absolute;
  top: -5px;
  right: 0;
  width: 200px;
}
.search > img {
  position: absolute;
  right: 10px;
  top: 4px;
}
</style>


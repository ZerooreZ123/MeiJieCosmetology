<template>
  <div class="mod-home">
    <div>
      <el-select v-model="shopId" placeholder="请选择" style="float:right;">
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
          <el-table :data="dataList" border style="width: 100%;margin-top:10px;">
            <el-table-column header-align="center" align="center">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="8">
          <div class="i-title">
            <img src="../../assets/img/main/yg.png" /> 正在服务的员工
          </div>
          <div style="padding:10px;">
            <div class="search">
              <el-input placeholder="参数名"></el-input>
              <img src="../../assets/img/main/ss.png" />
            </div>
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
      dataList: []
    };
  },
  mounted() {
    this.getData();
    this.getAppoint({});
    this.getOrderNum({});
    this.getTurnover({});
    this.getGuest({});
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
    }
  },
  methods: {
    reloadWithParams() {
      const params = {};
      if (this.shopId) {
        params.officeId = this.shopId;
      }
      if (this.limitAppoint) {
        params.type = this.limitAppoint;
        this.getAppoint(params);
      } else {
        this.getAppoint(params);
      }
      if (this.limitOrderNum) {
        params.type = this.limitOrderNum;
        this.getOrderNum(params);
      } else {
        this.getOrderNum(params);
      }
      if (this.limitTurnover) {
        params.type = this.limitTurnover;
        this.getTurnover(params);
      } else {
        this.getTurnover(params);
      }
      if (this.limitGuest) {
        params.type = this.limitGuest;
        this.getGuest(params);
      } else {
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
    handleCommandAppoint(command) {
      this.limitAppoint = command;
      this.reloadWithParams();
    },
    handleCommandOrderNum(command) {
      this.limitOrderNum = command;
      this.reloadWithParams();
    },
    handleCommandTurnover(command) {
      this.limitTurnover = command;
      this.reloadWithParams();
    },
    handleCommandGuest(command) {
      this.limitGuest = command;
      this.reloadWithParams();
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
  position: relative;
}
.search > img {
  position: absolute;
  right: 10px;
  top: 4px;
}
</style>


<template>
  <div class="mod-config">
    <div class="member-title">
      <div><img src="../../assets/img/hy.png" class="imgHeader">会员列表</div>
      <div class="addButton">
        <el-select placeholder="请选择" v-if='isShow' v-model="shopId">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="addMember()" v-if="isMember">添加会员</el-button>
      </div>
    </div>
    <tab-nav :itemList='itemList' space="8" @addParmas="tabClck($event)">
      <div slot="会员信息">
        <member-info ref="memInfo"></member-info>
      </div>
      <div slot="会员筛选">
        <div class="selectionCondition">选择条件</div>
        <el-form ref="dataForm" :model="selectionCondition" label-width="100px">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="selectionCondition.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="消费频率">
            <el-col :span="5">
              <el-select placeholder="请选择" v-model="selectionCondition.type">
                <el-option v-for="item in choiceList" :key="item.id" :label="item.name" :value="item.type">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-input-number controls-position="right" v-model="selectionCondition.frequency" :min="1"></el-input-number>
            </el-col>
            <el-col class="line" :span="2" align="center">区间</el-col>
            <el-col :span="5">
              <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="selectionCondition.startDay" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1" align="center">~</el-col>
            <el-col :span="5">
              <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="selectionCondition.endDay" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="累计消费">
            <el-col :span="5">
              <el-select placeholder="请选择" v-model="selectionCondition.addUpConsume">
                <el-option v-for="item in weekList" :key="item.id" :label="item.name" :value="item.day"></el-option>
              </el-select>
            </el-col>
            <el-col class="line" :span="2" align="center">金额</el-col>
            <el-col :span="4.5">
              <el-input-number controls-position="right" v-model="selectionCondition.minMoney" :min="0" width="100"></el-input-number>
            </el-col>
            <el-col class="line" :span="1" align="center">~</el-col>
            <el-col :span="5">
              <el-input-number controls-position="right" v-model="selectionCondition.maxMoney" :min="0"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="多久未消费">
            <el-select placeholder="请选择" v-model="selectionCondition.notSpending">
              <el-option v-for="item in notSpending" :key="item.id" :label="item.name" :value="item.day"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="filterCondition">添加筛选</el-button>
          </el-form-item>
        </el-form>
        <div>
          <div class="filterCondition">筛选条件</div>
          <el-tag v-for="tag in tags" :key="tag.name" :type="tag.type" closable @close="handleClose(tag)">
            {{tag.name}}
          </el-tag>
        </div>
        <div class="result">
          <div class="filterResult">筛选结果:共找到
            <span>{{customers}}</span>位会员</div>
          <el-table :data="dataResult" border style="width: 100%;">
            <el-table-column prop="name" header-align="center" align="center" label="会员">
            </el-table-column>
            <el-table-column prop="memberno" header-align="center" align="center" label="会员号">
            </el-table-column>
            <el-table-column prop="mobile" header-align="center" align="center" label="手机号">
            </el-table-column>
            <el-table-column prop="officeName" header-align="center" align="center" label="所属门店">
            </el-table-column>
            <el-table-column prop="createDate" header-align="center" align="center" label="建档日期">
            </el-table-column>
            <el-table-column prop="sex" header-align="center" align="center" label="会员性别">
              <template slot-scope="scope">
                <div>
                  <div>{{parseInt(scope.row.sex,10)===1?"男":"女"}}</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="sizeChangeHandle1" @current-change="currentChangeHandle1" :current-page="pageIndex1" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize1" :total="totalPage1" layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
      <div slot="会员概括总览">
        <div class="chartBox">
          <el-row>
            <el-col :span="12" class="block">
              <my-echarts ref="会员详情" :option="optionHuan"></my-echarts>
            </el-col>
            <el-col :span="12" class="block">
              <my-echarts ref="会员渠道分析" :option="optionPie"></my-echarts>
            </el-col>
          </el-row>
        </div>
      </div>
    </tab-nav>
    <div class="seachInput" v-if="isSeach">
      <el-input placeholder="请输入会员名" suffix-icon="el-icon-search" v-model="inputTest">
      </el-input>
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <!-- <member-detail v-if="memberDetailVisible"></member-detail> -->
  </div>
</template>

<script>
import API from "@/api";
import memberInfo from "./member-info";
import tabNav from "@/components/tabNav";
import myEcharts from "@/components/myEcharts";
import { optionHuan, optionPie } from "./memberOption.js";
export default {
  data() {
    return {
      optionHuan: optionHuan,
      optionPie: optionPie,
      dataResult: [],
      customers: 0,
      pageIndex1: 1,
      pageSize1: 10,
      totalPage1: 0,
      dataListLoading: false,
      memberDetailVisible: false,
      isShow: false,
      isSeach: false,
      isMember: true,
      options: [],
      itemList: ["会员信息", "会员筛选", "会员概括总览"],
      choiceList: [{ name: "小于", id: 0, type: "lt" }, { name: "等于", id: 1, type: "eq" }, { name: "大于", id: 2, type: "gt" }],
      weekList: [{ name: "一周", id: 0, day: 7 }, { name: "两周", id: 1, day: 14 }, { name: "三周", id: 2, day: 21 }, { name: "半年", id: 3, day: 183 }],
      notSpending: [{ name: "一周", id: 0, day: 7 }, { name: "两周", id: 1, day: 14 }, { name: "三周", id: 2, day: 21 }, { name: "半年", id: 3, day: 183 }],
      tags: [],
      tagTemp: "",
      shopId: "",
      inputTest: "",
      timeDay: "",
      selectionCondition: {
        sex: "",
        type: "",
        frequency: 1,
        timeNumber: "",
        addUpConsume: "",
        notSpending: "",
        minMoney: "",
        maxMoney: "",
        startDay: "",
        endDay: ""
      }
    };
  },
  components: {
    tabNav,
    myEcharts,
    memberInfo
  },
  activated() {
    // this.getCategoryList();
    this.getMember();
  },
  mounted() {
    // this.getCategoryList();
    this.getMember();
  },
  watch: {
    shopId() {
      this.getMember(this.shopId);
    }
  },
  methods: {
    tabClck(i) {
      if (i === 2) {
        this.isShow = true;
        this.isMember = false;
      } else if (i === 0) {
        this.isSeach = false;
        this.isShow = false;
        this.isMember = true;
      } else {
        this.isShow = false;
        this.isSeach = false;
        this.isMember = false;
      }
    },
    addMember(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.memInfo.addOrUpdateHandle(id);
      });
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      switch (tag.id) {
        case 0:
          this.$nextTick(() => {
            this.selectionCondition.sex = "";
          });
          break;
        case 1:
          this.$nextTick(() => {
            this.selectionCondition.type = "";
            this.selectionCondition.frequency = 1;
            this.selectionCondition.startDay = "";
            this.selectionCondition.endDay = "";
          });

          break;
        case 2:
          this.$nextTick(() => {
            this.selectionCondition.minMoney = "";
            this.selectionCondition.maxMoney = "";
            this.selectionCondition.addUpConsume = "";
          });

          break;
        case 3:
          this.$nextTick(() => {
            this.selectionCondition.notSpending = "";
          });
          break;
        default:
          this.selectionCondition.sex = "";
      }
    },
    getMember(officeId) {
      API.common.getOfficeList().then(({ data }) => {
        this.shopList = data.list;
      });
      API.member.getGuestSource({ officeId }).then(({ data }) => {
        if (data && data.code === 0) {
          const xData = data.list.map(obj => obj.label);
          const yData = data.list.map(obj => ({
            name: obj.label,
            value: obj.val,
            itemStyle: {
              color: obj.color
            }
          }));
          optionPie.legend.data = xData;
          optionPie.series[0].data = yData;
          this.optionPie = optionPie;
          if (this.$refs["会员渠道分析"] !== undefined) {
            this.$refs["会员渠道分析"].reload();
          }
        }
      });
      API.member.getMemberDetail({ officeId }).then(({ data }) => {
        if (data && data.code === 0) {
          const Data = data.list.map(obj => ({
            name: obj.people,
            value: obj.total,
            itemStyle: {
              color: obj.color
            }
          }));
          optionHuan.series[0].data = Data;
          this.optionHuan = optionHuan;
          if (this.$refs["会员详情"] !== undefined) {
            this.$refs["会员详情"].reload();
          }
        }
      });
    },
    filterCondition() {
      this.tags = [];
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize
      };
      if (this.selectionCondition.sex !== "") {
        params.sex = this.selectionCondition.sex;
        this.tags.push({
          id: 0,
          name: parseInt(this.selectionCondition.sex, 10) === 0 ? "性别: 女" : "性别: 男"
        });
      }
      if (this.selectionCondition.type !== "") {
        params.type = this.selectionCondition.type;
      }
      if (this.selectionCondition.frequency !== 0) {
        params.number = this.selectionCondition.frequency;
      }
      if (this.selectionCondition.startDay !== "") {
        params.startTime = this.selectionCondition.startDay;
      }
      if (this.selectionCondition.endDay !== "") {
        params.endTime = this.selectionCondition.endDay;
      }
      if (this.selectionCondition.minMoney !== 0) {
        params.minConsume = this.selectionCondition.minMoney;
      }
      if (this.selectionCondition.maxMoney !== 0) {
        params.maxConsume = this.selectionCondition.maxMoney;
      }
      if (this.selectionCondition.addUpConsume !== "") {
        params.totalTime = this.selectionCondition.addUpConsume;
      }
      if (this.selectionCondition.type !== "" && this.selectionCondition.frequency > 0 && this.selectionCondition.startDay && this.selectionCondition.endDay) {
        switch (this.selectionCondition.type) {
          case "eq":
            this.tagTemp = "等于";
            break;
          case "gt":
            this.tagTemp = "大于";
            break;
          case "lt":
            this.tagTemp = "小于";
            break;
          default:
            this.tagTemp = "";
        }
        this.tags.push({
          id: 1,
          name: `消费频率${this.selectionCondition.startDay}至${this.selectionCondition.endDay}到店${this.tagTemp}${this.selectionCondition.frequency}次`
        });
      }
      if (this.selectionCondition.addUpConsume !== "" && this.selectionCondition.minMoney >= 0 && this.selectionCondition.maxMoney >= 0) {
        this.tags.push({
          id: 2,
          name: `${Math.floor(this.selectionCondition.addUpConsume / 7)}周累计消费${this.selectionCondition.minMoney}~${this.selectionCondition.maxMoney}元`
        });
      }
      if (this.selectionCondition.notSpending !== "") {
        params.times = this.selectionCondition.notSpending;
        this.tags.push({
          id: 3,
          name: Math.floor(this.selectionCondition.notSpending / 7) + "周未消费"
        });
      }
      API.member.queryCustomerlist(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataResult = data.page.list;
          this.customers = data.page.list.length;
          this.totalPage1 = data.page.totalCount;
        } else {
          this.dataResult = [];
          this.customers = 0;
          this.totalPage1 = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle1(val) {
      this.pageSize1 = val;
      this.pageIndex1 = 1;
      this.filterCondition();
    },
    // 当前页
    currentChangeHandle1(val) {
      this.pageIndex1 = val;
      this.filterCondition();
    }
  }
};
</script>
<style lang="scss" scoped>
.userDefined {
  display: inline-block;
  width: 80px;
  height: 20px;
  font-size: 14px;
  line-height: 14px;
  border: 2px solid #f6f6f6;
  outline: none;
}
.member-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .addButton {
    margin-right: 22px;
  }
}
.selectionCondition {
  font-size: 16px;
  color: #c99f63;
  text-indent: 12px;
  margin-bottom: 10px;
}
.filterCondition {
  margin-bottom: 10px;
}
.result {
  margin-top: 20px;
}
.filterResult {
  margin-bottom: 10px;
}
.chartBox {
  margin-bottom: 10px;
  .block {
    height: 400px;
  }
}
.imgHeader {
  display: inline-block;
  width: 28px;
  height: 28px;
  margin: 0 6px;
}
.seachInput {
  position: absolute;
  top: 102px;
  right: 68px;
}
</style>



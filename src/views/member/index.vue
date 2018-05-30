<template>
  <div class="mod-config">
    <div class="member-title">
      <div>会员列表</div>
      <div class="addButton">
        <!-- <el-select placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> -->
        <el-button type="primary" @click="addOrUpdateHandle()">添加客户</el-button>
      </div>
    </div>
    <tab-nav :itemList='itemList' space="10">
      <div slot="会员信息">
        <div class="list-nav">
          <category listname="顾客分类" :list="clientList" @onItemClick="onLlientClick"></category>
          <category listname="时间分类" :list="timeList" @onItemClick="onTimeClick"></category>
          <category listname="近期分类" :list="recentList" @onItemClick="onRecentClick"></category>
          <category listname="到店频次" :list="frequencyList" @onItemClick="onFrequencyClick"></category>
          <category listname="客户来源" :list="sourceList" @onItemClick="onSourceClick"></category>
          <category listname="所属门店" :list="storeList" @onItemClick="onStoreClick"></category>
        </div>
        <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
          <el-table-column type="selection" header-align="center" align="center" width="50">
          </el-table-column>
          <el-table-column prop="id" header-align="center" align="center" label="">
          </el-table-column>
          <el-table-column prop="name" header-align="center" align="center" label="会员信息">
          </el-table-column>
          <!-- <el-table-column prop="name" header-align="center" align="center" label="会员级别">
          </el-table-column> -->
          <el-table-column prop="totalConsume" header-align="center" align="center" label="累计消费">
          </el-table-column>
          <!-- <el-table-column header-align="center" align="center" width="150" label="会员信息">
            <template slot-scope="scope">
              <div>{{dataList.name}}</div>
              <div></div>
              <div></div>
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="mobile" header-align="center" align="center" label="上次消费">
          </el-table-column> -->
          <!-- <el-table-column prop="umtSource" header-align="center" align="center" label="实收金额">
          </el-table-column> -->
          <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <div slot="客户筛选">
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
              <el-input-number controls-position="right" v-model="selectionCondition.frequency"></el-input-number>
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
            <el-col :span="5">
              <el-input-number controls-position="right" v-model="selectionCondition.minMoney"></el-input-number>
            </el-col>
            <el-col class="line" :span="1" align="center">~</el-col>
            <el-col :span="5">
              <el-input-number controls-position="right" v-model="selectionCondition.maxMoney"></el-input-number>
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
            <span>{{customers}}</span>位客户</div>
          <el-table :data="dataResult" border @selection-change="selectionChangeHandle" style="width: 100%;">
            <el-table-column prop="name" header-align="center" align="center" label="客户">
            </el-table-column>
            <el-table-column prop="memberno" header-align="center" align="center" label="会员号">
            </el-table-column>
            <el-table-column prop="mobile" header-align="center" align="center" label="手机号">
            </el-table-column>
            <el-table-column prop="officeName" header-align="center" align="center" label="所属门店">
            </el-table-column>
            <el-table-column prop="createDate" header-align="center" align="center" label="建档日期">
            </el-table-column>
            <el-table-column prop="sex" header-align="center" align="center" label="客户性别">
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
              <my-echarts ref="收入来源统计" :option="optionHuan"></my-echarts>
            </el-col>
            <el-col :span="12" class="block">
              <my-echarts ref="收入来源统计" :option="optionPie"></my-echarts>
            </el-col>
          </el-row>
        </div>
      </div>
    </tab-nav>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import API from "@/api";
import AddOrUpdate from "./add-or-update";
import category from "@/components/category";
import tabNav from "@/components/tabNav";
import myEcharts from "@/components/myEcharts";
import { optionHuan, optionPie } from "./memberOption.js";
export default {
  data() {
    return {
      optionHuan: optionHuan,
      optionPie: optionPie,
      dataForm: {
        key: ""
      },
      clientList: [{ name: "持卡" }, { name: "未此卡" }],
      timeList: [
        { name: "超过一月未到店", num: 30 },
        { name: "超过两月未到店", num: 60 },
        { name: "超过三月未到店", num: 90 },
        { name: "超过半年未到店", num: 180 }
      ],
      weekList: [{ name: "一周", id: 0, day: 7 }, { name: "两周", id: 1, day: 14 }, { name: "三周", id: 2, day: 21 }, { name: "半年", id: 3, day: 183 }],
      notSpending: [{ name: "一周", id: 0, day: 7 }, { name: "两周", id: 1, day: 14 }, { name: "三周", id: 2, day: 21 }, { name: "半年", id: 3, day: 183 }],
      choiceList: [{ name: "小于", id: 0, type: "lt" }, { name: "等于", id: 1, type: "eq" }, { name: "大于", id: 2, type: "gt" }],
      recentList: [{ name: "近三天过生日", num: 3 }, { name: "近一周过生日", num: 7 }, { name: "近三周过生日", num: 21 }],
      frequencyList: [{ name: "1次以内/月", frequency: 1 }, { name: "2次以内/月", frequency: 2 }, { name: "3次以内/月", frequency: 3 }],
      sourceList: [],
      storeList: [],
      dataList: [],
      dataResult: [],
      customers: 0,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      pageIndex1: 1,
      pageSize1: 10,
      totalPage1: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      options: [],
      itemList: ["会员信息", "客户筛选", "会员概括总览"],
      tags: [{ name: "性别女", type: "" }, { name: "消费频率2018-5-2到2018-5-8到店消费2次", type: "" }],
      selectionCondition: {
        sex: "",
        type: "",
        frequency: "",
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
    AddOrUpdate,
    category,
    tabNav,
    myEcharts
  },
  activated() {
    this.getDataList();
    this.getCategoryList();
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    getCategoryList() {
      const params = {
        type: "guestSource"
      };
      API.common.getOfficeList().then(({ data }) => {
        this.storeList = data.list;
      });

      API.sysdict.getlist(params).then(({ data }) => {
        const temp = [];
        data.list.forEach(ev => {
          temp.push({
            name: ev.label
          });
        });
        this.sourceList = temp;
      });
    },
    onLlientClick() {
      // 顾客分类
    },
    onTimeClick(item) {
      // 时间分类
      if (item) {
        this.filter_times = item.num;
      } else {
        this.filter_times = undefined;
      }
      this.getDataList();
    },
    onRecentClick(item) {
      // 近期分类
      if (item) {
        this.filter_day = item.num;
      } else {
        this.filter_day = undefined;
      }
      this.getDataList();
    },
    onFrequencyClick(item) {
      // 到店频次
      if (item) {
        this.filter_frequency = item.frequency;
      } else {
        this.filter_frequency = undefined;
      }
      this.getDataList();
    },
    onSourceClick(item) {
      // 客户来源
      if (item) {
        this.filter_umtSource = item.name;
      } else {
        this.filter_umtSource = undefined;
      }
      this.getDataList();
    },
    onStoreClick(item) {
      // 门店选择
      if (item) {
        this.filter_officeId = item.id;
      } else {
        this.filter_officeId = undefined;
      }
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        key: this.dataForm.key
      };
      if (this.filter_times !== undefined) {
        params.times = this.filter_times;
      }
      if (this.filter_day !== undefined) {
        params.day = this.filter_day;
      }
      if (this.filter_frequency !== undefined) {
        params.number = this.filter_frequency;
      }
      if (this.filter_umtSource !== undefined) {
        params.umtSource = this.filter_umtSource;
      }
      if (this.filter_officeId !== undefined) {
        params.officeId = this.filter_officeId;
      }
      API.member.list(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
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
    },
    filterCondition() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        key: this.dataForm.key
      };
      if (this.selectionCondition.sex !== "") {
        params.sex = this.selectionCondition.sex;
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
      if (this.selectionCondition.notSpending !== "") {
        params.times = this.selectionCondition.notSpending;
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
      API.member.queryMemberList(params).then(({ data }) => {
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
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(`确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.member.del(ids).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
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
</style>



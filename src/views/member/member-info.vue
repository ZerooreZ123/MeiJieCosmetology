<template>
  <div>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <div class="btns">
        <div class="input-left">
          <el-form-item>
            <el-input v-model="dataForm.key" placeholder="姓名/手机号" clearable @clear="getDataList"></el-input>
          </el-form-item>
          <el-button @click="getDataList()">查询</el-button>
        </div>
        <div class="btns-right">
          <el-button v-if="isAuth('appoint:appointment:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <el-button v-if="isAuth('appoint:appointment:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
          <div class="clear"></div>
        </div>
      </div>
    </el-form>
    <div class="list-nav">
      <category listname="顾客分类" :list="clientList" @onItemClick="onLlientClick"></category>
      <category listname="时间分类" :list="timeList" @onItemClick="onTimeClick">
        <!-- <input v-model="timeDay" class="userDefined" type="text" placeholder="自定义天数" @change="onTimeClick(timeDay,1)"> -->
      </category>
      <category listname="近期分类" :list="recentList" @onItemClick="onRecentClick"></category>
      <category listname="到店频次" :list="frequencyList" @onItemClick="onFrequencyClick"></category>
      <category listname="会员来源" :list="sourceList" @onItemClick="onSourceClick"></category>
      <category listname="所属门店" :list="storeList" @onItemClick="onStoreClick"></category>
    </div>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" label="ID" width="80">
      </el-table-column>
      <el-table-column header-align="center" prop="totalConsume" label="会员信息">
        <template slot-scope="scope">
          <div class="tabModule">
            <img :src="parseUrl(scope.row.headimage)" alt="" class="photo">
            <div class="textModule">
              <div>{{scope.row.name}}</div>
              <div>{{scope.row.mobile | hideMobile}}</div>
              <div>{{`会员号: ${scope.row.memberno}`}}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="totalConsume" header-align="center" align="center" label="累计消费">
        <template slot-scope="scope">
          <div>
            <div>{{`累计: ￥${scope.row.totalConsume}`}}</div>
            <div>{{`总计到店: ${scope.row.totalC || 0} 次`}}</div>
            <div>{{`本月${scope.row.monthCount || 0}次`}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="lookDetail(scope.row.id)">查看</el-button>
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import API from "@/api";
import category from "@/components/category";
import AddOrUpdate from "./add-or-update";
import parseUrl from "@/utils/parseUrl";
export default {
  components: {
    AddOrUpdate,
    category
  },
  data() {
    return {
      dataForm: {
        key: ""
      },
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      sourceList: [],
      storeList: [],
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      storeNews: "全部门店",
      clientList: [{ name: "持卡" }, { name: "未持卡" }],
      resourceServer: window.SITE_CONFIG["resourceServer"],
      timeList: [
        { name: "超过一月未到店", num: 30 },
        { name: "超过两月未到店", num: 60 },
        { name: "超过三月未到店", num: 90 },
        { name: "超过半年未到店", num: 180 }
      ],
      recentList: [{ name: "近三天过生日", num: 3 }, { name: "近一周过生日", num: 7 }, { name: "近三周过生日", num: 21 }],
      frequencyList: [{ name: "1次以内/月", frequency: 1 }, { name: "2次以内/月", frequency: 2 }, { name: "3次以内/月", frequency: 3 }]
    };
  },
  activated() {
    this.getDataList();
    this.getCategoryList();
  },
  mounted() {
    this.getDataList();
    this.getCategoryList();
  },
  filters: {
    hideMobile(str) {
      const r = [];
      for (let i = 0; i < str.length; i++) {
        if (i <= 3) {
          r.push(str[i]);
        } else if (i > 7) {
          r.push(str[i]);
        } else {
          r.push("*");
        }
      }
      return r.join("");
    }
  },
  methods: {
    parseUrl,
    onLlientClick() {
      // 顾客分类
    },
    onTimeClick1(item, num) {
      // 时间分类
      this.getDataList();
    },
    onTimeClick(item, num) {
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
    lookDetail(id) {
      this.$router.push({ path: "/member/member_detail/" + id });
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
.tabModule {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .photo {
    background-color: #eee;
    display: inline-block;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: 0 10px;
  }
  .textModule {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>


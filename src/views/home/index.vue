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
            <img src="../../assets/img/main/yj.png" /> 业绩收入
            <el-dropdown class="i-right-menu">
              <span class="el-dropdown-link">
                时间段
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>当天</el-dropdown-item>
                <el-dropdown-item>上周</el-dropdown-item>
                <el-dropdown-item>本月</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="i-num" style="color:#f3e008">￥510233</div>
        </el-card>
      </m-col>
      <m-col :span="0.75">&nbsp;</m-col>
      <m-col :span="7.5">
        <el-card>
          <div class="i-title">
            <img src="../../assets/img/main/zkh.png" /> 总卡耗
            <el-dropdown class="i-right-menu">
              <span class="el-dropdown-link">
                时间段
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>当天</el-dropdown-item>
                <el-dropdown-item>上周</el-dropdown-item>
                <el-dropdown-item>本月</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="i-num" style="color:#fa787a">￥510233</div>
        </el-card>
      </m-col>
      <m-col :span="0.75">&nbsp;</m-col>
      <m-col :span="7.5">
        <el-card>
          <div class="i-title">
            <img src="../../assets/img/main/yysr.png" /> 营业收入
            <el-dropdown class="i-right-menu">
              <span class="el-dropdown-link">
                时间段
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>当天</el-dropdown-item>
                <el-dropdown-item>上周</el-dropdown-item>
                <el-dropdown-item>本月</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="i-num" style="color:#b32dfc">￥510233</div>
        </el-card>
      </m-col>
    </m-row>

    <el-card style="margin-top:10px;">
      <div class="i-title">
        <img src="../../assets/img/main/tj.png" /> 客人统计
        <el-dropdown class="i-right-menu">
          <span class="el-dropdown-link">
            时间段
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>当天</el-dropdown-item>
            <el-dropdown-item>上周</el-dropdown-item>
            <el-dropdown-item>本月</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-row>
        <el-col :span="8">
          <div class="p-num" style="color:#d49efe">28</div>
          <div class="p-text">新客人</div>
        </el-col>
        <el-col :span="8">
          <div class="p-num" style="color:#9ca1fc">28</div>
          <div class="p-text">新会员</div>
        </el-col>
        <el-col :span="8">
          <div class="p-num" style="color:#7ede84">28</div>
          <div class="p-text">消费人次</div>
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
      dataList: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        }
      });
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


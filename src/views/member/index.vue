<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('member:member:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('member:member:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" label="">
      </el-table-column>
      <el-table-column prop="memberno" header-align="center" align="center" label="会员编号">
      </el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="姓名">
      </el-table-column>
      <el-table-column prop="sex" header-align="center" align="center" label="性别">
      </el-table-column>
      <el-table-column prop="mobile" header-align="center" align="center" label="手机号">
      </el-table-column>
      <el-table-column prop="umtSource" header-align="center" align="center" label="渠道来源">
      </el-table-column>
      <el-table-column prop="officeId" header-align="center" align="center" label="所属门店">
      </el-table-column>
      <el-table-column prop="birthday" header-align="center" align="center" label="生日">
      </el-table-column>
      <el-table-column prop="ageRange" header-align="center" align="center" label="年龄段">
      </el-table-column>
      <el-table-column prop="joinTime" header-align="center" align="center" label="入会时间">
      </el-table-column>
      <el-table-column prop="headimage" header-align="center" align="center" label="头像">
      </el-table-column>
      <el-table-column prop="recommendPeople" header-align="center" align="center" label="推荐人">
      </el-table-column>
      <el-table-column prop="identityno" header-align="center" align="center" label="身份证号">
      </el-table-column>
      <el-table-column prop="email" header-align="center" align="center" label="">
      </el-table-column>
      <el-table-column prop="qq" header-align="center" align="center" label="">
      </el-table-column>
      <el-table-column prop="wechatno" header-align="center" align="center" label="微信号">
      </el-table-column>
      <el-table-column prop="profession" header-align="center" align="center" label="客户职业">
      </el-table-column>
      <el-table-column prop="address" header-align="center" align="center" label="客户地址">
      </el-table-column>
      <el-table-column prop="height" header-align="center" align="center" label="身高（cm）">
      </el-table-column>
      <el-table-column prop="weight" header-align="center" align="center" label="体重（kg）">
      </el-table-column>
      <el-table-column prop="bloodType" header-align="center" align="center" label="血型">
      </el-table-column>
      <el-table-column prop="totalConsume" header-align="center" align="center" label="累计消费">
      </el-table-column>
      <el-table-column prop="openId" header-align="center" align="center" label="微信授权openId">
      </el-table-column>
      <el-table-column prop="createBy" header-align="center" align="center" label="创建者">
      </el-table-column>
      <el-table-column prop="createDate" header-align="center" align="center" label="创建时间">
      </el-table-column>
      <el-table-column prop="updateBy" header-align="center" align="center" label="更新者">
      </el-table-column>
      <el-table-column prop="updateDate" header-align="center" align="center" label="更新时间">
      </el-table-column>
      <el-table-column prop="remarks" header-align="center" align="center" label="备注信息">
      </el-table-column>
      <el-table-column prop="delFlag" header-align="center" align="center" label="删除标记">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import API from "@/api";
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      dataForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      // this.dataListLoading = true
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        key: this.dataForm.key
      };
      API.member.list(params).then(({ data }) => {
        alert(JSON.stringify(data));
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

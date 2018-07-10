<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataListPage1()">

      <el-form-item>
        发送时间:
        <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="dataForm.startDay" placeholder="开始日期"></el-date-picker>~
        <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="dataForm.endDay" placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-button @click="getDataListPage1()">查询</el-button>

      <!-- <div class="btns-right">
          <el-button v-if="isAuth('order:ordervisit:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
          <div class="clear"></div>
        </div> -->
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <!-- <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
      <el-table-column prop="sendTime" header-align="center" align="center" label="发送时间">
      </el-table-column>
      <el-table-column prop="submitTime" header-align="center" align="center" label="提交时间">
      </el-table-column>
      <el-table-column prop="content" header-align="center" align="center" label="短信内容">
      </el-table-column>
      <el-table-column prop="messageNum" header-align="center" align="center" label="发送短信数量">
      </el-table-column>
      <el-table-column prop="memberNum" header-align="center" align="center" label="发送会员数量">
      </el-table-column>
      <el-table-column :formatter="examFormatter" header-align="center" align="center" label="审核状态">
      </el-table-column>
      <el-table-column :formatter="sendFormatter" header-align="center" align="center" label="发送状态">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button> -->
          <!-- <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button> -->
          <!-- 审核失败 或 发送失败 -->
          <el-button v-if="scope.row.examineStatus==0 || scope.row.sendStatus==0" type="text" size="small" @click="postMessageAgain(scope.row)">再次发送</el-button>
          <!-- 发送中 流程有疑问？-->
          <el-button v-if="scope.row.sendStatus==2" type="text" size="small" @click="canclePostMessage(scope.row)">取消发送</el-button>
          <el-button v-if="scope.row.sendStatus==2" type="text" size="small" @click="postMessageNow(scope.row)">发送短信</el-button>
          <!-- 审核成功 且 发送中 -->
          <el-button v-if="scope.row.examineStatus==1 && scope.row.sendStatus==2" type="text" size="small" @click="postMessageNow(scope.row)">发送短信</el-button>
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
        startDay: "",
        endDay: ""
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
  mounted() {
    this.getDataList();
  },
  methods: {
    examFormatter(row, column) {
      return row.examineStatus === "0" ? "审核失败" : row.sendStatus === "1" ? "审核成功" : "审核中~~~";
    },
    sendFormatter(row, column) {
      return row.sendStatus === "0" ? "发送失败" : row.sendStatus === "1" ? "发送成功" : "发送中~~~";
    },
    postMessageAgain(message) {
      console.log(111, message);
      API.messageList.messageDetail(message.id).then(({ data }) => {
        if (data && data.code === 0) {
          // console.log(11, data.messageExamine);
          // this.$emit("switchToPostMessage", message, data.messageExamine);
          let noticeList = [];
          data.messageExamine.noticeList.forEach((item, index) => {
            noticeList.push({
              memberId: item.id || "",
              templateId: item.id || "",
              content: item.content || ""
            });
          });
          let params = {
            id: message.id,
            messageNum: data.messageExamine.noticeList.length,
            memberNum: data.messageExamine.noticeList.length,
            noticeList
          };
          API.messageList.makeSurePost(params).then(({ data }) => {
            if (data && data.code === 0) {
              console.log("保存成功+++++++");
              // this.$emit("switchToGroup", "") // 群发成功跳转到群发记录
              this.$message({
                message: "发送成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.getDataList();
                }
              });
            }
          });
        }
      });
    },
    postMessageNow(message) {
      API.messageList.postMessageRightNow({ id: message.id }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(11, "发送成功+++++++");
          this.$message({
            message: "发送成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.getDataList();
            }
          });
        }
      });
    },
    canclePostMessage(message) {
      API.messageList.canclePostMessage(message.id).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(11, "取消发送成功+++++++");
          this.$message({
            message: "取消发送成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.getDataList();
            }
          });
        }
      });
    },
    getDataListPage1() {
      this.pageIndex = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        startDay: this.dataForm.startDay,
        endDay: this.dataForm.endDay
      };
      API.messageexamine.list(params).then(({ data }) => {
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
        API.messageexamine.del(ids).then(({ data }) => {
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
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
</style>


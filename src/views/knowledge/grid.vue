<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="输入名称搜索" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="grid">

      <div class="grid-item" v-for="know in dataList" :key="know.id">
        <div class="resource" @click="updateclickCountsById(know.id)">
          <img v-if="know.resourceType === '1'" src="~@/assets/img/know.png" width="300" @click="openPreview(know.name,know.content)" />
          <img v-if="know.resourceType === '2'" :src="resourceServer+know.imagePath.split(',')[0]" width="300" @click="openPreviewImage(know.imagePath)" />
          <video v-if="know.resourceType === '3'" :src="resourceServer+know.videoPath" controls width="300"></video>
        </div>
        <div class="info">
          <div class="infoItem">
            <strong>名称：</strong>{{know.name}}</div>
          <div class="infoItem">
            <span>
              <strong>点击数量：</strong>{{know.clickCounts}}</span>
            <span>
              <strong>上传时间：</strong>{{know.createDate}}</span>
          </div>

        </div>

      </div>

    </div>
    <div v-if="isshow" class="showBanner" @click="() => isshow = false">
      <carousel-item :path="path"></carousel-item>
    </div>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <knowdetail @refreshDataList="getDataList" :innerContent="content" ref="knowdetail"></knowdetail>
  </div>
</template>

<script>
import API from "@/api";
import knowdetail from "./knowdetail";
import carouselItem from "@/components/carousel-item";
export default {
  data() {
    return {
      active: false,
      dataForm: {
        name: ""
      },
      resourceServer: window.SITE_CONFIG["resourceServer"],
      isshow: false,
      path: "",
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      content: ""
    };
  },
  components: { carouselItem, knowdetail },
  activated() {
    if (this.active) {
      this.getDataList();
    }
  },
  mounted() {
    this.getDataList();
    this.active = true;
  },
  methods: {
    openPreview(name, content) {
      this.content = content;
      this.$refs.knowdetail.init();
    },
    openPreviewImage(path) {
      this.path = path;
      this.isshow = true;
    },
    updateclickCountsById(id) {
      var params = {
        id: id
      };
      API.knowledge.updateclickCountsById(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.getDataList();
        }
      });
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        name: this.dataForm.name
      };
      API.knowledge.list(params).then(({ data }) => {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  .grid-item {
    width: 300px;
    height: 300px;
    // background: red;
    margin-top: 20px;
  }
  .resource {
    height: 200px;
    line-height: 200px;
  }
  .info {
    font-size: 12px;
    font-family: "Microsoft YaHei", tahoma, arial, "Hiragino Sans GB", "\5b8b\4f53", sans-serif !important;
    .infoItem {
      height: 30px;
      line-height: 30px;
    }
  }
}
.showBanner {
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


<template>
  <el-carousel :interval="4000" type="card">
    <el-carousel-item v-for="item in fileList" :key="item">
      <img :src="resourceServer+item" width="300" />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
      resourceServer: window.SITE_CONFIG["resourceServer"],
      absPath: "",
      fileList: []
    };
  },
  props: ["path"],
  mounted() {
    if (this.path) {
      this.fileList = this.path.split(",");
    }
  },
  watch: {
    path() {
      if (this.path) {
        this.fileList = this.path.split(",");
      }
    }
  },
  methods: {}
};
</script>
<style>
.el-carousel__container {
  position: relative;
  height: 200px;
  width: 600px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
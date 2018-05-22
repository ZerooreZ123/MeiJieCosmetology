<template>
  <el-upload class="upload-demo" drag :action="uploadUrl" :show-file-list="false" accept="image/png, image/jpeg" :before-upload="beforeUploadHandle" :on-success="handleSuccess">
    <img v-if="absPath" :src="absPath" class="el-icon-upload" style="width:100%;margin: 0;" />
    <div v-else>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </div>
  </el-upload>
</template>

<script>
import API from "@/api";
export default {
  data() {
    return {
      uploadUrl: API.common.upload(this.$cookie.get("token")),
      absPath: ""
    };
  },
  props: ["before-upload", "on-success", "path"],
  mounted() {},
  watch: {
    path() {
      if (this.path) {
        this.absPath = window.SITE_CONFIG["resourceServer"] + this.path;
      }
    }
  },
  methods: {
    // 上传之前
    beforeUploadHandle(file) {
      if (file.type !== "image/jpg" && file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/gif") {
        this.$message.error("只支持jpg、png、gif格式的图片！");
        return false;
      }
    },
    handleSuccess(ev) {
      if (ev.code === 0) {
        this.absPath = window.SITE_CONFIG["resourceServer"] + ev.picPath;
        this.$emit("success", ev.picPath);
      }
    }
  }
};
</script>

<style scoped>
</style>

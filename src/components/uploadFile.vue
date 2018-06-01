<template>
    <el-upload class="upload-demo" :action="uploadFileUrl" :on-preview="handlePreview" :on-success="handleSuccess" :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
            <video :src="absPath" controls width="200"></video>
            上传文件不能超过100M
        </div>
    </el-upload>
</template>


<script>
import API from "@/api";
export default {
  data() {
    return {
      uploadFileUrl: API.common.upload(this.$cookie.get("token")),
      absPath: "",
      fileList: []
    };
  },
  props: ["before-upload", "on-success", "path"],
  watch: {
    path() {
      if (this.path) {
        this.absPath = window.SITE_CONFIG["resourceServer"] + this.path;
      } else {
        this.absPath = "path未传递";
      }
    }
  },
  methods: {
    handleSuccess(ev, file, fileList) {
      if (ev.code === 0) {
        this.absPath = window.SITE_CONFIG["resourceServer"] + ev.picPath;
        this.$emit("success", ev.picPath);
        this.fileList = [{ name: file.name, url: this.absPath }];
      }
    }
  }
};
</script>
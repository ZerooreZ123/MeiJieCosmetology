<template>
  <el-dialog class="dialogContent" title="知识预览" :close-on-click-modal="true" :visible.sync="show" width="90%">
    <div v-html="innerContent">
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">取消</el-button>
      <!-- <el-button type="primary" @click="dataFormSubmit()">确定</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      dataForm: {}
    };
  },
  methods: {
    init() {
      this.show = true;
    }
  },
  props: ["innerContent"]
};
</script>

<style>
.el-dialog__body img {
  max-width: 100%;
}
</style>

<template>
  <el-dialog :visible.sync="visible" width="70%">
    <div slot="title" class="dialogTitle" >短信模板</div>
    <template>
      <div class="message-head">
        <el-row>
          <el-col :span="8">
            模板
          </el-col>
          <el-col :span="16">
            模板内容
          </el-col>
        </el-row>
      </div>
    </template>
    <div class="message-content">
      <el-row>
        <el-col :span="8">
          <div class="message-wrap">
            <div class="message-item" :style="{background:index==selectedHead?'#c99f63':'#FFF', color:index==selectedHead?'#FFF':'#333'}" v-for="(item, index) in template" @click="selectMesage(item, index)" :key="index">{{item.name}}</div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="message-wrap">
            <!-- <div class="message-item" :style="{background:index==selectedMessage?'#c99f63':'#FFF', color:index==selectedMessage?'#FFF':'#333'}" v-for="(messageItem, index) in messageInfo" @click="selectMesageInfo(messageItem, index)" :key="index">{{messageItem}}</div> -->
            <!-- <div class="message-item" v-for="(messageItem, index) in messageInfo" @click="selectMesageInfo(messageItem, index)" :key="index">{{messageItem}}</div> -->
            <div class="message-item"  @click="selectMesageInfo(messageInfo)">{{messageInfo.content}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- </template> -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
  
</template>

<script>
export default {
  props: ["template"],
  data() {
    return {
      visible: true,
      showClose: false,
      messageTemplate: [],
      messageInfo: {},
      selectedHead: 0
      // selectedMessage: 0
    };
  },
  mounted() {
    // this.
  },
  methods: {
    init(messageInfo) {
      //  在这里传短信列表数据
      this.visible = true;
      this.selectMesage(this.template[0], 0);
    },
    dataFormSubmit() {
      this.visible = false;
    },
    selectMesage(messages, index) {
      console.log(messages);
      this.messageInfo = messages;
      this.$emit("messageChange", messages);
      this.selectedHead = index;
      // this.selectedMessage = 0;
    },
    selectMesageInfo(message) {
      // this.selectedMessage = index;
      this.$emit("messageChange", message);
      this.visible = false;
    }
  }
};
</script>
<style scoped>
.head-wrap {
  background: #c99f63;
}
.dialogTitle {
  background-color: #c99f63;
  height: 60px;
  line-height: 60px;
  color: white;
  text-align: left;
  padding-left: 20px;
  font-size: 18px;
}
.message-head {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding: 6px 0;
}
.message-content {
  background: rgba(0, 0, 0, 0.12);
}
.message-wrap {
  border: 0.8px solid rgba(0, 0, 0, 0.12);
  padding: 10px;
  padding-bottom: 40px;
  margin: 10px;
  background: #fff;
  border-radius: 3px;
}
.message-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  height: 40px;
  line-height: 40px;
  text-align: left;
  cursor: pointer;
  padding-left: 11px;
  border-radius: 3px;
}
</style>
<style >
.el-dialog__header {
  padding: 0 !important;
}
.el-dialog__body {
  padding: 0 !important;
}
</style>



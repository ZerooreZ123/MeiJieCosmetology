<template>
  <div class="mod-config">
   <div class="content-wrap">
    <div class="steps step-one">
      <div class="title-head">
        <h4 class="tag-info">
          第一步&nbsp;:&nbsp;编辑短信内容
        </h4>
      </div>
      <div class="message-wrap">
        <div class="message-warn">
          提示：短信内容请勿涉及政治、宗教信仰、个人隐私、人身攻击等敏感内容；同时避免使用“回车”“【】”等特殊符号。
        </div>
        <div class="input-wrap">
          <div class="input-box">
            <textarea class="mw-input2" rows="5" max="260" v-model="messageInfo.content" placeholder="请输入您要发送的短信内容" style="width: 100%; resize: none;" aria-invalid="false"></textarea>
          </div>
          <div class="button-list">
             <div class="custom-btn" @click="showDialog">常用短信模板</div>
             <custom-dialog :template="messageTemplate" ref="customDialog" v-if="toShowDialog" @messageChange="refreshMessage"></custom-dialog>
          </div>
        </div>
        <div class="message-count">
          <!-- 当前已输入0个字 = 0条短信 -->
        </div>
      </div>
    </div>

    <div class="steps step-two">
      <div class="title-head">
        <h4 class="tag-info">
          第二步&nbsp;:&nbsp;筛选发送名单
        </h4>
      </div>
      <div class="message-wrap">
        <!-- 会员筛选 -->
       <member-filter @refreshMemberInfo="filterMember"></member-filter>
       <!-- <member-info ref="memInfo" @refreshMemberInfo="filterMember"></member-info> -->
      </div>
    </div>

    <div class="steps step-three">
      <div class="title-head">
        <h4 class="tag-info">
          第三步&nbsp;:&nbsp;确认发送短信
        </h4>
      </div>
      <div class="message-wrap">
        <el-row>
            <el-col :span="18">
              <span class="post-count">接收人数:&nbsp;<span class="posted">{{memberData.length}}</span>人</span>
            </el-col>
            <el-col :span="6">
              <span class="post-count post-detail">当前短信余量：&nbsp;<span class="posted">{{messageRemain}}</span>条</span><br>
              <span class="post-count post-detail">本次消耗：&nbsp;<span class="posted">{{memberData.length}}</span>条</span><br>
              <span class="post-count post-detail">短信余量：&nbsp;<span class="posted">{{messageRemain-memberData.length}}</span>条</span><br>
            </el-col>
        </el-row> 
      </div>
    </div>

    <div class="custom-btn post-message" @click="postMessage">
      确认群发
    </div>
   </div>
  </div>
</template>

<script>
import API from "@/api";
import customDialog from "./dialog.vue";
import memberFilter from "./memberFilter.vue";

export default {
  components: {
    "custom-dialog": customDialog,
    "member-filter": memberFilter
  },
  props: ['message'], // 用来回填从群发记录跳转过来的短信内容
  data() {
    return {
      readonly: false,
      toShowDialog: false,
      messageTemplate: [],
      messageInfo: {content: ""},
      memberData: [], // 筛选会员结果
      messageRemain: 0
    };
  },
  mounted() {
    this.init();
    this.messageInfo.content = this.message.content;
  },
  methods: {
    init() {
      API.messageList.messageTemplateList().then(({ data }) => {
        if (data && data.code === 0) {
          console.log("短信模板+++++", data.list);
          this.messageTemplate = data.list;
        }
      });
      API.messageList.messageRemain().then(({ data }) => {
        if (data && data.code === 0) {
          const tempData = data.list[0];
          this.messageRemain = tempData.messageStock || 0;
        }
      });
    },
    showDialog() {
      this.toShowDialog = true;
      // if (this.$refs.customDialog) {
      // this.$refs.customDialog.init();
      // }
      this.$nextTick(() => {
        this.$refs.customDialog.init();
      });
    },
    refreshMessage(message) {
      this.messageInfo = message;
    },
    filterMember(member) {
      this.memberData = member;
      console.log('会员筛选++++', this.memberData);
    },
    postMessage() {
      let noticeList = [];
      this.memberData.forEach((item, index) => {
        noticeList.push({
          memberId: item.id,
          templateId: this.messageInfo.id,
          content: this.messageInfo.content
        })
      });
      let params = {
        templateId: this.messageInfo.id,
        messageNum: this.memberData.length,
        memberNum: this.memberData.length,
        noticeList
      };
      API.messageList.makeSurePost(params).then(({ data }) => {
        if (data && data.code === 0) {
          console.log("保存成功+++++++");
          this.$emit("switchToGroup", "") // 群发成功跳转到群发记录
        }
      });
    }
  }
};
</script>


<style scoped>
* {
  box-sizing: border-box;
}
.content-wrap {
  width: 90%;
  margin: 20px auto;
  /* background: yellowgreen; */
}
.message-wrap {
  padding: 18px;
  box-shadow: none !important;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.title-head {
  border-left: solid 5px #c99f63;
  padding-left: 15px;
  margin-top: 32px;
  margin-bottom: 12px;
}
.message-warn {
  color: #f65223;
}
.input-wrap {
  margin: 16px 0;
  display: flex;
}
.input-box {
  width: 80%;
  max-width: 80%;
}
.button-list {
  flex: 1;
  text-align: center;
}
.custom-btn {
  margin: 5px auto;
  color: #fff;
  background: #c99f63;
  border: none;
  width: 124px;
  height: 38px;
  line-height: 38px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}
.post-message {
  margin-top: 30px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.56);
}
.custom-btn:hover {
  background: #c99f63;
  color: #fff;
}
textarea.mw-input2 {
  border: 1px solid #ccc !important;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
  background: #fff !important;
  border-radius: 2px !important;
}
.post-count {
  color: #666 !important;
  font-size: 22px;
}
.posted {
  color: #f65223;
}
.post-detail {
  display: inherit;
  font-size: 14px;
  text-align: right;
}
</style>

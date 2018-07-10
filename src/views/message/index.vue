<template>
  <div class="mod-config">
    <tab-nav ref="tabNav" :itemList='itemList' :space="10">
      <template slot="发短信">
        <post-message  :message="messageTem" ref="sendmessage" @switchToGroup="switchToGroup"></post-message>
      </template>
      <template slot="短信设置">
        <message-setting></message-setting>
      </template>
      <template slot="短信群发记录">
        <messageexamine @switchToPostMessage="switchToPostMessage"></messageexamine>
      </template>
      <template slot="通知短信记录">
        <message-notice></message-notice>
      </template>
    </tab-nav>
  </div>
</template>

<script>
// import API from "@/api";
import tabNav from "../../components/tabNav";
import postMessage from "./postMessage.vue";
import messageexamine from "../messageexamine/index.vue";
import mesageNotice from "../messagenotice/index.vue";
import MessageSetting from "./messageSetting.vue";

export default {
  components: {
    tabNav,
    "post-message": postMessage,
    "message-notice": mesageNotice,
    "messageexamine": messageexamine,
    MessageSetting
  },
  data() {
    return {
      itemList: ["发短信", "短信设置", "短信群发记录", "通知短信记录"],
      readonly: false,
      filter: {
        userList: [],
        memberList: [],
        officeList: [],
        roomList: []
      },
      dataForm: {
        officeId: "",
        roomId: "",
        memberId: ""
      },
      messageTem: ""
    };
  },
  activated() {
    this.init();
  },
  // mounted() {
  //   this.init();
  // },
  methods: {
    init() {},
    switchToGroup() {
      this.$refs.tabNav.setActiveIndex(2)
    },
    switchToPostMessage(message, memberData) {
      this.$refs.tabNav.setActiveIndex(0);
      // this.$refs.sendMessage.messageInfo;
      // console.log(111, this.$refs.sendMessage.messageInfo);
      this.messageTem = message;
      // this.$refs.sendmessage.filterMember()
    }
  }
};
</script>


<style>
.site-content {
  overflow: hidden;
}
.mod-config {
  height: 100%;
  overflow: hidden;
}
</style>

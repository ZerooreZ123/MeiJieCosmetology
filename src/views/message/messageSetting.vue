<template>
  <div class="message-content">
    <div class="left-bar">
      <div class="menu-bar" v-for="(item, index) in barList" :key="index" @click="getMessage(index)"
        :style="{color:selectBar==index?'#c99f63':'#333','border-right':selectBar==index?'7px solid #c99f63':'0'}"
      >{{item}}</div>
    </div>

    <div class="right-bar">
      <div class="message-item" v-for="(item, index) in messageList" :key="index" >
        <div class="item-head">
          <div>{{item.name}}:</div>
          <el-switch
            @change="switched(item)"
            v-model="item.isEnable"
            active-color="#c99f63"
            inactive-color="#666">
          </el-switch>
        </div>
        <div class="item-content" >
          <span v-show="item.params[0].value" class="title">{{item.params[0].key}}</span>
          <el-input v-show="item.params[0].value" v-model="item.params[0].value" placeholder="请输入内容"></el-input>&nbsp;&nbsp;
          <span v-show="item.params[0].value" >{{item.params[0].unit}}</span>
          <el-button v-show="item.params[0].value" type="warning" icon="el-icon-check" circle @click="switched(item)"></el-button>
        </div>
        <div class="item-footer">
          <span>
            {{item.content}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api";
export default {
  data() {
    return {
      barList: ["客户提醒", "商户提醒"],
      selectBar: 0,
      value2: true,
      inputContent: "",
      messageList: []
    };
  },
  mounted() {
    this.getMessage(0);
  },
  methods: {
    getMessage(index) {
      this.selectBar = index;
      API.messageList.messageList({ type: index }).then(({ data }) => {
        if (data && data.code === 0) {
          this.messageList = []; // 清空数组
          data.list.forEach((item, index) => {
            // console.log(11, JSON.parse(item.params)[0].key);
            item.params = JSON.parse(item.params);
            // const isAble = item.isEnable === "0" ? false : true;
            // item.isEnable = item.isEnable === 0 ? false : true;
            if (item.isEnable === "0") {
              item.isEnable = false;
            } else {
              item.isEnable = true;
            }
            this.messageList.push(item);
          });
        }
      });
    },
    switched(message) {
      const params = {
        id: message.id,
        isEnable: message.isEnable ? 1 : 0,
        officeId: message.officeId,
        code: message.code,
        name: message.name,
        content: message.content,
        type: this.selectBar,
        params: JSON.stringify(message.params),
        value: message.params[0].value
      };
      API.messageList.messageSetting(params).then(({ data }) => {
        if (data && data.code === 0) {
          console.log("success+++++++");
          this.getMessage(this.selectBar);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.message-content {
  width: 95.5%;
  margin: 0 auto;
  display: flex;
}
.left-bar {
  width: 134px !important;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  margin-left: 10px;
}
.right-bar {
  display: flex;
  flex-wrap: wrap;
}
.menu-bar {
  border-right: 7px solid #c99f63;
  padding-right: 20px;
  color: #c99f63;
  margin: 10px auto;
  text-align: center;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
}
.message-item {
  width: 300px;
  margin-left: 35px;
  margin-top: 42px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.item-head {
  color: #c99f63;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  padding: 18px 15px 21px;
  background-color: #f7f7f7;
}
.item-content {
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  min-height: 100px;

  display: flex;
  align-items: center;
  span.title {
    display: inline-block;
    width: 115px;
  }
}
.item-footer {
  padding: 15px 20px;
}
.el-button.is-circle {
  padding: 6px;
}
</style>



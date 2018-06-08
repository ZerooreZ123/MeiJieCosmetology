<template>
  <div class="mod-config">
    <div class="contentWrap">
      <div class="setting">打印设置</div>
      <div class="wrap flex_between">
        <div class="sideWrap">
          <div class="info">
            <div class="infoHead flex_column">
              <div>LOGO</div>
              <span>门店: 中山公园店</span>
              <span>地址: 上海市长宁区通协路</span>
              <span>电话: (021)-54214214</span>
              <span>*********感谢光临*********</span>
            </div>
            <div class="module flex-start">
              <span>消费日期: 2017-08-01 9:00 AM</span>
              <span>顾客: Filipino</span>
              <span>会员号: 001</span>
              <span>电话: 152****831</span>
              <span>收银员: 菲奥娜</span>
              <span>流水单号: 100270758965</span>
              <span>订单号: 100270758923</span>
            </div>
            <div class="item">
              <div class="itemModule flex_between">
                <span class="font_weight">品项</span>
                <span class="font_weight">小计</span>
              </div>
            </div>
            <div class="item">
              <div class="option flex_between">
                <span>中式全身按摩</span>
                <span>x1</span>
                <span>783.00</span>
              </div>
              <div class="option flex_between">
                <span>服务: No-099颜真卿</span>
              </div>
              <div class=" itemModule flex_between">
                <span class="font_weight">合计</span>
                <span class="font_weight">1383.00</span>
              </div>
            </div>
            <div class="item">
              <div class="title flex_between">
                <span class="font_weight">赠送</span>
                <span class="font_weight">数量</span>
              </div>
              <div class="option flex_between">
                <span>中式全身按摩</span>
                <span>1</span>
              </div>
              <div class="option flex_between border">
                <span>200元代金劵</span>
                <span>2</span>
              </div>
            </div>
            <div class="item">
              <div class="title flex_between">
                <span class="font_weight">已付</span>
                <span class="font_weight">小计</span>
              </div>
              <div class="option flex_between">
                <span>疗效卡</span>
                <span>1次=600.00</span>
              </div>
              <div class="option flex_between">
                <span>时段卡</span>
                <span>1次=783.00</span>
              </div>
              <div class=" itemModule flex_between">
                <span class="font_weight">合计</span>
                <span class="font_weight">1383.00</span>
              </div>
            </div>
            <div class="item">
              <div class=" option flex_between">
                <span class="font_weight">账户余额</span>
              </div>
              <div class="option flex_between border">
                <span>会员卡</span>
                <span>21152.00</span>
              </div>
            </div>
            <div class="write font_weight">签名</div>
            <div class="infoFoot flex_column">
              <div>感谢惠顾!</div>
              <span>技术支持:</span>
              <span>www.meil.com (TEL:400-006-2020)</span>
            </div>
          </div>
        </div>
        <div class="mainWrap">
          <el-form label-width="120px" :model="dataList">
            <el-form-item label="选择自动打印" prop="is">
              <el-radio-group v-model="dataList.is">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="填写打印数量" prop="num">
              <el-input v-model="dataList.num" placeholder="请填写打印数量"></el-input>
            </el-form-item>
          </el-form>
          <div class="save" @click="saveoption()">保存</div>
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
      option: "",
      num: "",
      dataList: {
        is: "",
        num: ""
      }
    };
  },
  activated() {
    this.getDtataList();
  },
  mounted() {
    this.getDtataList();
  },
  methods: {
    getDtataList() {
      const params = {
        type: "printSetting"
      };
      API.sysdict.getlist(params).then(({ data }) => {
        this.dataList.is = data.list[0].value;
        this.dataList.num = data.list[1].value;
      });
    },
    saveoption() {
      const params = {
        isAuto: this.dataList.is,
        printNums: this.dataList.num
      };
      API.sysdict.updateValue(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.contentWrap {
  background: #f7f7f7;
  .setting {
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    text-indent: 42px;
    background: #fff;
    margin-bottom: 16px;
  }
  .wrap {
    .sideWrap {
      min-height: 332px;
      width: 38%;
      padding: 30px 45px;
      background: #fff;
      .info {
        border: 2px solid #f7f7f9;
        .infoHead {
          div {
            font-size: 20px;
            color: #000;
            font-weight: 700;
            padding: 20px 0 16px;
          }
          span {
            height: 18px;
            line-height: 18px;
          }
        }
        .infoFoot {
          margin-bottom: 20px;
          div {
            font-size: 20px;
            color: #000;
            font-weight: 700;
            padding: 20px 0 16px;
          }
          span {
            height: 30px;
            line-height: 30px;
          }
        }
      }
      .module {
        padding: 15px 20px 10px;
        span {
          line-height: 30px;
        }
      }
      .item {
        padding: 0 20px;
        .itemModule {
          padding: 15px 0;
          border-bottom: 1px dotted #666;
        }
        .option {
          line-height: 30px;
        }
        .title {
          margin: 15px 0;
        }
        .border {
          border-bottom: 1px dotted #666;
        }
      }
      .write {
        text-indent: 20px;
        margin: 16px 0 50px;
      }
    }
    .mainWrap {
      min-height: 332px;
      width: 60%;
      margin-left: 10px;
      padding-top: 30px;
      padding-right: 20px;
      border: 1px solid #f7f7f7;
      background: #fff;
      .save {
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #66a7f9;
        color: #fff;
        margin: 50px 20px;
        cursor: pointer;
      }
    }
  }
}
.font_weight {
  font-size: 14px;
  font-weight: 700;
}
.flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_between {
  display: flex;
  justify-content: space-between;
}
.flex_column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex-start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>



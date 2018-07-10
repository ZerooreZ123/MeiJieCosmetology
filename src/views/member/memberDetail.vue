<template>
  <div class="mod-config">
    <div class="contentWrap">
      <div class="sideWrap">
        <div class="sideHeader">
          <img :src="parseUrl(this.dataInfo.headimage)" alt="">
          <div class="name">{{this.dataInfo.name}}</div>
          <div class="btnBox">
            <div class="btn flex_center">快速预约</div>
            <div class="btn flex_center">会员等级</div>
            <div class="btn flex_center">编辑信息</div>
          </div>
        </div>
        <div class="btnGroup">
          <div class="btnItem openCardColor flex_center">
            <img src="../../assets/img/member/openCard.png" alt="">
            <span>开卡</span>
          </div>
          <div class="btnItem openOrderColor flex_center">
            <img src="../../assets/img/member/openOrder.png" alt="">
            <span>开单</span>
          </div>
          <div class="btnItem reissueCardColor flex_center">
            <img src="../../assets/img/member/reissueCard.png" alt="">
            <span>补卡</span>
          </div>
          <div class="btnItem giveColor flex_center">
            <img src="../../assets/img/member/give.png" alt="">
            <span>赠送</span>
          </div>
        </div>
        <div class="momeyModule">
          <div class="moduleItem flex_column">
            <span class="number">12000</span>
            <span class="news">会员钱包</span>
            <span class="drive">修改余额</span>
          </div>
          <div class="moduleItem flex_column">
            <span class="number">12000</span>
            <span class="news">会员积分</span>
            <span class="drive">修改积分</span>
          </div>
          <div class="moduleItem flex_column">
            <span class="number">12000</span>
            <span class="news">欠款金额</span>
            <span class="drive">修改金额</span>
          </div>
        </div>
        <div class="memberInfor">
          <div class="inforItem">
            <img src="../../assets/img/member/store.png" alt="">
            <span>所属门店: </span>
            <span class="valueItem">{{this.dataInfo.officeName}}</span>
          </div>
          <div class="inforItem">
            <img src="../../assets/img/member/phone.png" alt="">
            <span>电 话: </span>
            <span class="valueItem">{{this.dataInfo.mobile}}</span>
          </div>
          <div class="inforItem">
            <img src="../../assets/img/member/num.png" alt="">
            <span>会员号: </span>
            <span class="valueItem">{{this.dataInfo.memberno}}</span>
          </div>
          <div class="inforItem">
            <img src="../../assets/img/member/tag.png" alt="">
            <span>会员标签: </span>
            <span class="valueItem"></span>
          </div>
          <div class="inforItem">
            <img class="add" src="../../assets/img/member/add.png" alt="">
          </div>
          <div class="inforItem">
            <img src="../../assets/img/member/taboo.png" alt="">
            <span>禁忌症: </span>
            <span class="valueItem"></span>
          </div>
          <div class="inforItem">
            <img class="add" src="../../assets/img/member/add.png" alt="">
          </div>
          <div class="inforItem">
            <img src="../../assets/img/member/write.png" alt="">
            <span>备注: </span>
            <span class="valueItem">{{this.dataInfo.remarks}}</span>
          </div>
          <div class="inforItem"></div>
        </div>
      </div>
      <div class="mainWrap">
        <!-- <ul>
          <li>会员账户</li>
          <li>操作纪录</li>
        </ul> -->
        <div class="operatingRecord">操作纪录</div>
        <tab-nav :itemList='itemList' :space="15">
          <div slot="预约记录">
            <member-appointment ref="appointment" :member-id="memberId"></member-appointment>
          </div>
          <div slot="消费记录">
            <consumption-record ref="consumption" :member-id="memberId"></consumption-record>
          </div>
        </tab-nav>
      </div>
    </div>

  </div>
</template>
<script>
import tabNav from "@/components/tabNav";
import API from "@/api";
import parseUrl from "@/utils/parseUrl";
import memberAppointment from "./member-appointment";
import consumptionRecord from "./consumption-record";

export default {
  components: { tabNav, memberAppointment, consumptionRecord },
  data() {
    return {
      memberId: "",
      // imagePath: {
      //   background: ""
      // },
      resourceServer: window.SITE_CONFIG["resourceServer"],
      itemList: ["预约记录", "消费记录"],
      dataInfo: {
        technician: "",
        mobile: "",
        officeName: "",
        memberno: "",
        headimage: ""
      }
    };
  },
  activated() {
    this.getMemberInfo();
  },
  methods: {
    parseUrl,
    getMemberInfo() {
      this.memberId = this.$route.params.id;
      API.member.info(this.$route.params.id).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataInfo.technician = data.member.technician;
          this.dataInfo.mobile = data.member.mobile;
          this.dataInfo.name = data.member.name;
          this.dataInfo.officeName = data.member.officeName;
          this.dataInfo.memberno = data.member.memberno;
          this.dataInfo.headimage = data.member.headimage;
          this.$refs.appointment.getDataList();
          // this.$refs.consumption.getDataList();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.contentWrap {
  display: flex;
  justify-content: space-between;
  .sideWrap {
    min-height: 332px;
    width: 28%;
    .sideHeader {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 336px;
      background: #fde3be;
      img {
        display: inline-block;
        width: 150px;
        height: 150px;
        margin-top: 52px;
        border-radius: 50%;
      }
      .name {
        font-size: 16px;
        color: #000;
        margin: 18px 0 22px;
      }
      .btnBox {
        width: 83%;
        display: flex;
        justify-content: space-around;
        margin: 0 50px;
        .btn {
          width: 28%;
          height: 34px;
          color: #c99f63;
          border-radius: 17px;
          border: 1px solid #fff;
          margin: 0 10px;
        }
      }
    }
    .btnGroup {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
      .btnItem {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        width: 23%;
        height: 44px;
        border-radius: 4px;
      }
    }
    .momeyModule {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
      .moduleItem {
        width: 25%;
        height: 116px;
        border: 2px solid #f3f3f3;
        .number {
          font-size: 16px;
        }
        .news {
          font-size: 14px;
          margin: 10px 0;
        }
        .drive {
          color: #59adf5;
        }
      }
    }
    .memberInfor {
      margin-top: 20px;
      .inforItem {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #f6f6f6;
        .add {
          margin-left: 25px;
        }
        .valueItem {
          flex: 1;
          margin-left: 5px;
        }
      }
    }
  }
  .mainWrap {
    min-height: 332px;
    width: 70%;
    .operatingRecord {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      color: #c99f63;
    }
    .selectTime {
      margin: 10px 10px 0;
    }
  }
  .flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex_column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .openCardColor {
    background: #b7abff;
  }
  .openOrderColor {
    background: #e6b4bf;
  }
  .reissueCardColor {
    background: #59adf5;
  }
  .giveColor {
    background: #66cb7c;
  }
}
</style>



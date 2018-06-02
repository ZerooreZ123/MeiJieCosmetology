<template>
  <div class="mod-config">
    <div class="contentWrap">
      <div class="sideWrap">
        <div class="sideHeader">
          <img src="../../assets/img/avatar.png" alt="">
          <div class="name">{{'小小生活'}}</div>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="8">
              <div class="btn flex_center">快速预约</div>
            </el-col>
            <el-col :span="8">
              <div class="btn flex_center">会员等级</div>
            </el-col>
            <el-col :span="8">
              <div class="btn flex_center">编辑信息</div>
            </el-col>
          </el-row>
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
            <span class="news">会员钱包</span>
            <span class="drive">修改余额</span>
          </div>
          <div class="moduleItem flex_column">
            <span class="number">12000</span>
            <span class="news">会员钱包</span>
            <span class="drive">修改余额</span>
          </div>
        </div>
        <div class="memberInfor">
          <div class="inforItem">
            <img src="../../assets/img/member/store.png" alt="">
            <span>所属门店: </span>
            <span class="valueItem">某某门店</span>
          </div>
          <div class="inforItem">
            <img src="../../assets/img/member/phone.png" alt="">
            <span>电话: </span>
            <span class="valueItem">18617015598</span>
          </div>
          <div class="inforItem">
            <img src="../../assets/img/member/num.png" alt="">
            <span>会员号: </span>
            <span class="valueItem">123</span>
          </div>
          <div class="inforItem">
            <img src="../../assets/img/member/tag.png" alt="">
            <span>客户标签: </span>
            <span class="valueItem"></span>
          </div>
          <!-- <div class="inforItem">
            <img src="../../assets/img/member/taboo.png" alt="">
            <span>禁忌症: </span>
            <span class="valueItem"></span>
          </div> -->
          <div class="inforItem">
            <img src="../../assets/img/member/write.png" alt="">
            <span>备注: </span>
            <span class="valueItem"></span>
          </div>
        </div>
      </div>
      <div class="mainWrap">
        <!-- <ul>
          <li>会员账户</li>
          <li>操作纪录</li>
        </ul> -->
        <tab-nav :itemList='itemList'>
          <div slot="预约记录">
            <div class="selectTime">
              <el-form :inline="true">
                <el-form-item>
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="startTime" placeholder="开始时间" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="endTime" placeholder="结束时间" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table border style="width: 100%;">
              <el-table-column header-align="center" align="center" label="预约时间" width="80">
              </el-table-column>
              <el-table-column header-align="center" align="center" label="美疗师">
              </el-table-column>
              <el-table-column header-align="center" align="center" label="预约房间">
              </el-table-column>
              <el-table-column header-align="center" align="center" label="预约内容">
              </el-table-column>
              <el-table-column header-align="center" align="center" label="状态">
              </el-table-column>
            </el-table>
          </div>
          <div slot="消费记录">
            <div class="selectTime">
              <el-form :inline="true">
                <el-form-item>
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="startTime" placeholder="开始时间" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="endTime" placeholder="结束时间" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table border style="width: 100%;">
              <el-table-column header-align="center" align="center" label="消费时间" width="80">
              </el-table-column>
              <el-table-column header-align="center" align="center" label="美疗师">
              </el-table-column>
              <el-table-column header-align="center" align="center" label="订单编号">
              </el-table-column>
              <el-table-column header-align="center" align="center" label="消费内容">
              </el-table-column>
              <el-table-column header-align="center" align="center" label="订单金额">
              </el-table-column>
              <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div slot="获赠记录">
          </div>
          <div slot="修改记录">
          </div>
        </tab-nav>
      </div>
    </div>
  </div>
</template>
<script>
import tabNav from "@/components/tabNav";
export default {
  components: {tabNav},
  data() {
    return {
      startTime: "",
      endTime: "",
      itemList: ["预约记录", "消费记录", "获赠记录", "修改记录"]
    };
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
      height: 260px;
      background: #ddd3ca;
      img {
        display: inline-block;
        width: 80px;
        height: 80px;
        margin-top: 52px;
        border-radius: 50%;
      }
      .name {
        font-size: 16px;
        color: #000;
        margin: 18px 0 22px;
      }
      .btn {
        width: 88px;
        height: 34px;
        color: #c99f63;
        border-radius: 17px;
        border: 1px solid #fff;
        margin: 0 10px;
      }
    }
    .btnGroup {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
      .btnItem {
        font-size: 14px;
        width: 66px;
        height: 30px;
        border-radius: 4px;
      }
    }
    .momeyModule {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
      .moduleItem {
        width: 88px;
        height: 88px;
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
        height: 30px;
        border-bottom: 1px solid #f6f6f6;
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



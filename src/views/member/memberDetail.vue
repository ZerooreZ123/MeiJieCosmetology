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
        <tab-nav :itemList='itemList'>
          <div slot="预约记录">
            <div class="selectTime">
              <el-form :inline="true">
                <el-form-item>
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="startTime" placeholder="开始时间"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="endTime" placeholder="结束时间"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="inquire">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table border style="width: 100%;" :data="tabInfo">
              <el-table-column prop="appointDate" header-align="center" align="center" label="预约时间" width="120">
              </el-table-column>
              <el-table-column prop="technician" header-align="center" align="center" label="美疗师">
              </el-table-column>
              <el-table-column prop="roomName" header-align="center" align="center" label="预约房间">
              </el-table-column>
              <el-table-column prop="remarks" header-align="center" align="center" label="预约内容">

              </el-table-column>
              <el-table-column prop="status" header-align="center" align="center" label="状态">
              </el-table-column>
            </el-table>
            <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
          </div>
          <div slot="消费记录">
            <div class="selectTime">
              <el-form :inline="true">
                <el-form-item>
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="beginTime" placeholder="开始时间" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="finishTime" placeholder="结束时间" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="query">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table :data="dataList" border style="width: 100%;">
              <el-table-column prop="createDate" header-align="center" align="center" label="消费时间" width="140">
              </el-table-column>
              <el-table-column prop="detailList" header-align="center" align="center" label="美疗师">
                <template slot-scope="scope">
                  <div v-for="item in scope.row.detailList" :key="item.serviceId" v-text="item.serviceTechnician"></div>
                </template>
              </el-table-column>
              <el-table-column prop="orderNo" header-align="center" align="center" label="订单编号">
              </el-table-column>
              <el-table-column prop="detailList" header-align="center" align="center" label="消费内容">
                <template slot-scope="scope">
                  <div v-for="item in scope.row.detailList" :key="item.serviceId" v-text="item.serviceName"></div>
                </template>
              </el-table-column>
              <el-table-column prop="totalPrice" header-align="center" align="center" label="订单金额">
              </el-table-column>
              <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="lookOrder(scope.row.id)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="sizeChangeHandle1" @current-change="currentChangeHandle1" :current-page="pageIndex1" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize1" :total="totalPage1" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
          </div>
          <!-- <div slot="获赠记录">
          </div>
          <div slot="修改记录">
      </div> -->
        </tab-nav>
      </div>
    </div>
    <add-order-detail v-if="isShow" ref="addOrderDetail"></add-order-detail>
  </div>
</template>
<script>
import tabNav from "@/components/tabNav";
import API from "@/api";
import addOrderDetail from "./add-order-detail";
import parseUrl from "@/utils/parseUrl";
export default {
  components: { tabNav, addOrderDetail },
  data() {
    return {
      startTime: "",
      endTime: "",
      beginTime: "",
      finishTime: "",
      idMember: "",
      isShow: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      pageIndex1: 1,
      pageSize1: 10,
      totalPage1: 0,
      // imagePath: {
      //   background: ""
      // },
      resourceServer: window.SITE_CONFIG["resourceServer"],
      dataForm: {
        key: ""
      },
      itemList: ["预约记录", "消费记录"],
      dataInfo: {
        technician: "",
        mobile: "",
        officeName: "",
        memberno: "",
        headimage: ""
      },
      tabInfo: [],
      dataList: []
    };
  },
  activated() {
    this.getMemberInfo();
  },
  beforDetory() {
    window.memberId = null;
  },
  methods: {
    parseUrl,
    getMemberInfo() {
      this.$nextTick(() => {
        API.member.info(window.memberId).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataInfo.technician = data.member.technician;
            this.dataInfo.mobile = data.member.mobile;
            this.dataInfo.name = data.member.name;
            this.dataInfo.officeName = data.member.officeName;
            this.dataInfo.memberno = data.member.memberno;
            this.dataInfo.headimage = data.member.headimage;
            this.idMember = data.member.id;
            // this.imagePath.background = `url(${this.resourceServer}${this.dataInfo.headimage}) no-repeat center center`;
            this.appointmentList(data.member.id);
            this.getDataList(data.member.id);
          }
        });
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.appointmentList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.appointmentList();
    },
    // 每页数1
    sizeChangeHandle1(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页1
    currentChangeHandle1(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    appointmentList(memId) {
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        key: this.dataForm.key,
        memberId: memId
      };
      API.appointment.list(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabInfo = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.tabInfo = [];
          this.totalPage = 0;
        }
      });
    },
    getDataList(memId) {
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        key: this.dataForm.key,
        memberId: memId
      };
      API.miorder.list(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          console.log(this.dataList);
          this.totalPage1 = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage1 = 0;
        }
      });
    },
    inquire() {
      // alert(`开始时间${this.startTime}-结束时间${this.endTime}`);
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        key: this.dataForm.key,
        memberId: this.idMember,
        startTime: this.startTime,
        overTime: this.endTime
      };
      API.appointment.list(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.tabInfo = data.page.list;
          this.totalPage = data.page.totalCount;
          console.log(data.page.list);
        } else {
          this.tabInfo = [];
          this.totalPage = 0;
        }
      });
    },
    query() {
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        key: this.dataForm.key,
        memberId: this.idMember,
        startTime: this.beginTime,
        endTime: this.finishTime
      };
      API.miorder.list(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage1 = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage1 = 0;
        }
      });
    },
    lookOrder(id) {
      this.isShow = true;
      this.$nextTick(() => {
        this.$refs.addOrderDetail.init(id);
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



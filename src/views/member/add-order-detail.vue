<template>
  <el-dialog :visible.sync="visible" :close-on-click-modal="false" width="55%">
    <div class="wrap">
      <div class="contentWrap">
        <div class="sideWrap">
          <div class="sideHeader">
            <img :src="resourceServer+this.headimage" alt="">
            <div class="memberPerson">
              <div class="name">{{this.name}}</div>
              <div class="mobile">{{this.mobile}}</div>
              <div class="store">{{this.officeName}}</div>
            </div>
          </div>
          <div class="memberInfor">
            <div class="inforItem">
              <span>订单编号: </span>
              <span class="valueItem">{{this.orderNo}}</span>
            </div>
            <div class="inforItem">
              <span>流水单号: </span>
              <span class="valueItem">{{this.serialNo}}</span>
            </div>
            <div class="inforItem">
              <span>所属门店: </span>
              <span class="valueItem">{{this.officeName}}</span>
            </div>
            <div class="inforItem">
              <span>开单时间: </span>
              <span class="valueItem">{{this.createTime}}</span>
            </div>
            <div class="inforItem">
              <span>收银时间: </span>
              <span class="valueItem">{{this.payTime}}</span>
            </div>
            <div class="inforItem">
              <span>收银人员: </span>
              <span class="valueItem">{{this.creater}}</span>
            </div>
            <div class="inforItem">
              <span>订单备注: </span>
              <span class="valueItem">{{this.remarks}}</span>
            </div>
          </div>
        </div>
        <div class="mainWrap">
          <tab-nav :itemList='itemList'>
            <div slot="订单内容">
              <el-table border :data="orderDetail">
                <el-table-column header-align="center" align="center" label="订单内容">
                  <template slot-scope="scope">
                    <div>
                      <div>{{scope.row.serviceName}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="单价">
                  <template slot-scope="scope">
                    <div>
                      <div>{{scope.row.servicePrice}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="数量">
                  <template slot-scope="scope">
                    <div>
                      <div>{{scope.row.nums}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="小计">
                  <template slot-scope="scope">
                    <div>
                      <div>{{scope.row.subtotal}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="支付">
                  <template slot-scope="scope">
                    <div>
                      <div v-for="item in scope.row.payList" :key="item.id">{{scope.row.payList.length>0 ? item.payMethod:""}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="服务人员">
                  <template slot-scope="scope">
                    <div>
                      <div>{{scope.row.serviceTechnician}}</div>
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column header-align="center" align="center" label="业绩/卡耗/提成">
                </el-table-column> -->
              </el-table>
              <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
              <div class="payInfor">
                <div class="payCount">支付统计:</div>
                <div class="payMethod">
                  <div v-for="item in this.payCount" :key="item.id">
                    {{item.hasOwnProperty('payMethod')?item.payMethod:''}}￥{{item.hasOwnProperty('payPrice')?item.payPrice:''}}
                  </div>
                </div>
                <div class="payMoney">支付时间{{this.payTime}}</div>
                <div class="payMoney">当前欠款
                  <span>￥{{debt}}</span>
                </div>
              </div>
              <div class="pay" @click="pay" v-if="debt>0">还款</div>
            </div>
            <div slot="操作记录">
              <el-table :data="logList" border>
                <el-table-column prop="orderId" header-align="center" align="center" label="订单ID" width="80">
                </el-table-column>
                <el-table-column prop="logType" header-align="center" align="center" label="类别">
                </el-table-column>
                <el-table-column prop="logContent" header-align="center" align="center" label="内容">
                </el-table-column>
                <el-table-column prop="logUserName" header-align="center" align="center" label="操作人">
                </el-table-column>
                <el-table-column prop="logTime" header-align="center" align="center" label="时间">
                </el-table-column>
              </el-table>
            </div>
          </tab-nav>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { mapMutations } from "vuex";
import tabNav from "@/components/tabNav";
import API from "@/api";
export default {
  components: { tabNav },
  data() {
    return {
      startTime: "",
      endTime: "",
      visible: true,
      debt: "",
      payTime: "",
      orderNo: "",
      serialNo: "",
      createTime: "",
      totalPrice: "",
      officeName: "",
      mobile: "",
      name: "",
      payCount: [],
      headimage: "",
      creater: "",
      remarks: "",
      resourceServer: window.SITE_CONFIG["resourceServer"],
      itemList: ["订单内容", "操作记录"],
      orderDetail: [],
      logList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      idMerber: ""
    };
  },
  methods: {
    ...mapMutations(["UPDATE_MENU_NAV_ACTIVE_NAME"]),
    pay() {
      this.visible = false;
      this.$router.push({ path: "/miorder" });
      this.UPDATE_MENU_NAV_ACTIVE_NAME({ name: "129" });
    },
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.init(this.idMerber);
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.init(this.idMerber);
    },
    init(id) {
      this.idOrder = id || 0;
      this.idMerber = id || 0;
      this.payCount = [];
      this.visible = true;
      this.$nextTick(() => {
        if (this.idOrder) {
          API.miorder.list({ id: this.idOrder }).then(({ data }) => {
            if (data && data.code === 0) {
              this.orderDetail = data.page.list[0].detailList;
              this.logList = data.page.list[0].logList;
              this.debt = data.page.list[0].needPay;
              this.payTime = data.page.list[0].payTime;
              this.orderNo = data.page.list[0].orderNo;
              this.serialNo = data.page.list[0].serialNo;
              this.createTime = data.page.list[0].createDate;
              this.totalPrice = data.page.list[0].totalPrice;
              this.officeName = data.page.list[0].officeName;
              this.name = data.page.list[0].member.name;
              this.mobile = data.page.list[0].member.mobile;
              this.totalPage = data.page.totalCount;
              this.headimage = data.page.list[0].member.headimage;
              this.creater = data.page.list[0].creater;
              this.remarks = data.page.list[0].remarks;
              data.page.list[0].detailList.forEach(e => {
                e.payList.forEach(ev => {
                  this.payCount.push(ev);
                });
              });
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  min-height: 400px;
  overflow: hidden;
  .contentWrap {
    display: flex;
    justify-content: space-between;
    .sideWrap {
      width: 28%;
      .sideHeader {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #f6f6f6;
        img {
          display: inline-block;
          width: 80px;
          height: 80px;
          margin: 0 20px;
          border-radius: 50%;
        }
        .name {
          font-size: 16px;
          color: #000;
        }
      }
      .memberInfor {
        margin-top: 20px;
        .inforItem {
          display: flex;
          align-items: center;
          width: 100%;
          height: 30px;
          .valueItem {
            flex: 1;
            margin-left: 5px;
          }
        }
      }
    }
    .mainWrap {
      width: 70%;
      .payInfor {
        font-size: 14px;
        color: #000;
        .payCount {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-right: 10px;
        }
        .payMethod {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
          div {
            margin-right: 10px;
            color: red;
          }
        }
        .payMoney {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-right: 10px;
          border-bottom: 1px solid #f6f6f6;
          span {
            color: red;
          }
        }
      }
      .pay {
        float: right;
        text-align: center;
        line-height: 20px;
        width: 60px;
        height: 20px;
        margin-top: 10px;
        margin-right: 10px;
        color: #fff;
        background: #59adf5;
        cursor: pointer;
      }
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
<template>
  <el-dialog :visible.sync="visible" :close-on-click-modal="false" width="76%">
    <div class="wrap">
      <div class="contentWrap">
        <div class="sideWrap">
          <div class="sideHeader">
            <img src="../../assets/img/avatar.png" alt="">
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
              <span class="valueItem">{{this.orderNo}}</span>
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
              <span class="valueItem">某某莉 001</span>
            </div>
            <div class="inforItem">
              <span>订单备注: </span>
              <span class="valueItem">无</span>
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
                </el-table-column>
                <el-table-column header-align="center" align="center" label="服务人员">
                  <template slot-scope="scope">
                    <div>
                      <div>{{scope.row.serviceTechnician}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="业绩/卡耗/提成">
                </el-table-column>
              </el-table>
              <div class="payInfor">
                <div>支付统计: 微信支付
                  <span>￥{{this.totalPrice}}</span>
                </div>
                <div>支付时间{{this.payTime}}</div>
                <div>当前欠款
                  <span>￥{{this.debt}}</span>
                </div>
              </div>
              <div class="pay">还款</div>
            </div>
            <div slot="操作记录">
            </div>
          </tab-nav>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
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
      createTime: "",
      totalPrice: "",
      officeName: "",
      mobile: "",
      name: "",
      itemList: ["订单内容", "操作纪录"],
      orderDetail: []
    };
  },
  methods: {
    init(id) {
      this.idOrder = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        if (this.idOrder) {
          API.miorder.list({ id: this.idOrder }).then(({ data }) => {
            if (data && data.code === 0) {
              this.orderDetail = data.page.list[0].detailList;
              this.debt = data.page.list[0].needPay;
              this.payTime = data.page.list[0].payTime;
              this.orderNo = data.page.list[0].orderNo;
              this.createTime = data.page.list[0].createDate;
              this.totalPrice = data.page.list[0].totalPrice;
              this.officeName = data.page.list[0].officeName;
              this.name = data.page.list[0].member.name;
              this.mobile = data.page.list[0].member.mobile;
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
  width: 1000px;
  height: 400px;
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
        div {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 40px;
          line-height: 40px;
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
        background: #59adf5;
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
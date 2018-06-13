<template>
  <div class="mod-config" v-if="printitem.orderNo">
    <div class="contentWrap">
      <div class="wrap flex_between">
        <div class="sideWrap">
          <div class="info">
            <div class="infoHead flex_column">
              <!-- <div>LOGO</div> -->
              <span>{{printitem.officeName}}</span>
              <!-- <span>地址: 上海市长宁区通协路</span>
              <span>电话: (021)-54214214</span> -->
              <span>*********感谢光临*********</span>
            </div>
            <div class="module flex-start">
              <span>消费日期: {{printitem.payTime}}</span>
              <span>顾客: {{printitem.member.name}}</span>
              <span>会员号: {{printitem.member.memberno}}</span>
              <span>电话: {{printitem.member.mobile}}</span>
              <!-- <span>收银员: 菲奥娜</span> -->
              <span>流水单号: {{printitem.serialNo}}</span>
              <span>订单号: {{printitem.orderNo}}</span>
            </div>
            <div class="item">
              <div class="itemModule flex_between">
                <span>品项</span>
                <span>小计</span>
              </div>
            </div>
            <div class="item">
              <template v-for="orderItem in printitem.detailList">
                <div class="option flex_between" :key="orderItem.id">
                  <span>{{orderItem.serviceName}}</span>
                  <span>{{orderItem.servicePrice}}</span>
                </div>
                <div class="option flex_between" :key="orderItem.id">
                  <span>服务人员:{{orderItem.serviceTechnician}}</span>
                </div>
              </template>

              <div class=" itemModule flex_between">
                <span>合计</span>
                <span>{{printitem.realPrice}}</span>
              </div>
            </div>
            <!-- <div class="item">
              <div class="title flex_between">
                <span>赠送</span>
                <span>数量</span>
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
                <span>已付</span>
                <span>小计</span>
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
                <span>合计</span>
                <span>1383.00</span>
              </div>
            </div> -->
            <!-- <div class="item">
              <div class=" option flex_between">
                <span>账户余额</span>
              </div>
              <div class="option flex_between border">
                <span>会员卡</span>
                <span>21152.00</span>
              </div>
            </div> -->
            <div class="write">签名</div>
            <div class="infoFoot flex_column">
              <div>谢谢惠顾!</div>
              <!-- <span>技术支持:</span>
              <span>www.meil.com (TEL:400-006-2020)</span> -->
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      dataForm: {}
    };
  },
  methods: {},
  props: ["printitem"]
};
</script>
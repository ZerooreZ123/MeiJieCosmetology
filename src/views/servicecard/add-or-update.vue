<template lang="pug">
el-dialog(:title="!dataForm.id ? '新增' : '修改'", :close-on-click-modal='false', :visible.sync='visible')
  el-form(:model='dataForm', :rules='dataRule', ref='dataForm', @keyup.enter.native='dataFormSubmit()', label-width='120px')
    el-form-item(label='卡类型', prop='type')
      el-radio-group(v-model='dataForm.type')
        el-radio(label='储值卡') 储值卡
        el-radio(label='折扣卡') 折扣卡
        el-radio(label='时段卡') 时段卡
        el-radio(label='疗程总次卡') 疗程总次卡
        el-radio(label='疗程分次卡') 疗程分次卡
    el-form-item(label='所属门店', prop='officeId')
      el-select(v-model='dataForm.officeId', placeholder='请选择',style="width:300px;")
        el-option(v-for='item in shopList', :key='item.id', :label='item.name', :value='item.id')
    el-form-item(label='卡名称', prop='name')
      el-input(v-model='dataForm.name', placeholder='卡名称')
    el-form-item(label='卡售价', prop='price')
      el-input(v-model='dataForm.price', placeholder='卡售价')
    el-form-item(label='卡面额', prop='denomination',v-show="dataForm.type=='储值卡'")
      el-input(v-model='dataForm.denomination', placeholder='卡面额')
    el-form-item(v-if="dataForm.type == '疗程总次卡'", label='疗程总次')
      el-input(v-model='dataForm.frequency', placeholder='疗程总次')
    el-form-item(label='卡内容')
      div ↓
      div(v-if="dataForm.type != '疗程分次卡'")
        div(v-for="(item,index) in dataForm.serviceCardContentList")
          span(style="margin-right:10px;") {{item.serviceName}}
          span(style="margin-right:10px;")
            template(v-if="item.salePrice") 价格：￥{{item.salePrice || ""}}
            template(v-else) &nbsp;
          span(v-if="item.discountType==1") 折扣：{{item.discountNum}}%
          span(v-if="item.discountType==0") 优惠价：￥{{item.discountNum}}
          el-button(size="mini",style="margin-left:10px;",@click="removeCardContent(index)") 删除
      div(v-else)
        div(v-for="(item,index) in dataForm.serviceCardContentList")
          span(style="margin-right:10px;") {{item.serviceName}}
          span(style="margin-right:10px;") 价格：￥{{item.salePrice || ""}}
          span 次数：{{item.discountNum}}
          el-button(size="mini",style="margin-left:10px;",@click="removeCardContent(index)") 删除
      div
        el-button(@click='showPanel') 增加卡内容
    el-form-item(label='开始时间类型', prop='startTimeType')
      el-radio-group(v-model='dataForm.startTimeType')
        el-radio(label='1') 购买时间
        el-radio(label='2') 首次使用时间
        el-radio(label='3') 指定日期
    el-form-item(v-if='dataForm.startTimeType == 3', label='开始日期', prop='startTime')
      el-date-picker(value-format='yyyy-MM-dd HH:mm:ss', v-model='dataForm.startTime', type='datetime', placeholder='开始日期')
    el-form-item(label='结束时间类型', prop='endTimeType')
      el-radio-group(v-model='dataForm.endTimeType')
        el-radio(label='1') 不限时长
        el-radio(label='2') 固定时长
        el-radio(label='3') 指定日期
    el-form-item(v-if='dataForm.endTimeType == 3', label='结束时间', prop='endTime')
      el-date-picker(value-format='yyyy-MM-dd HH:mm:ss', v-model='dataForm.endTime', type='datetime', placeholder='结束时间')
    el-form-item(v-if='dataForm.endTimeType == 2', label='固定时长', prop='fixedTime')
      el-input(v-model='dataForm.fixedTime', placeholder='固定时间')
    el-form-item(v-if='dataForm.endTimeType == 2', label='固定时长类型', prop='fixedTimeType')
      el-radio-group(v-model='dataForm.fixedTimeType')
        el-radio(label='year') 年
        el-radio(label='month') 月
        el-radio(label='day') 日
    el-form-item(label='卡耗计算方式', prop='cardConsumeType', v-if="dataForm.type == '时段卡'")
      el-radio-group(v-model='dataForm.cardConsumeType')
        el-radio(label='0') 按项目原价计算
        el-radio(label='1') 按次数计算
    el-form-item(v-if="dataForm.cardConsumeType == 1 && dataForm.type == '时段卡'", label='次数')
      el-input(v-model='dataForm.frequency', placeholder='次数')
    el-form-item(label='一级分类', prop='catFirst')
      el-select(v-model='dataForm.catFirst', placeholder='一级分类',@change="onCardsChange")
        el-option(v-for="item in cardsList",:key="item.id",:label="item.name",:value="item.id")
    el-form-item(label='二级分类', prop='catSecond')
      el-select(v-model='dataForm.catSecond', placeholder='二级分类')
        el-option(v-for="item in cardsList2",:key="item.id",:label="item.name",:value="item.id")
    el-form-item(label='售卡须知', prop='notes')
      el-input(v-model='dataForm.notes', placeholder='售卡须知')
    el-form-item(label='用途', prop='purpose')
      // el-input(v-model='dataForm.purpose', placeholder='用途')
      el-checkbox-group(v-model='dataForm.purpose')
        el-checkbox(label='售卖')
        el-checkbox(label='赠送')
    el-form-item(label='状态', prop='status')
      el-radio-group(v-model='dataForm.status')
        el-radio(label='0') 可售
        el-radio(label='1') 只可用不可售
    el-form-item(label='卡类别', prop='category')
      el-radio-group(v-model='dataForm.category')
        el-radio(label='1') 会员卡
        el-radio(label='2') 营销卡
  span.dialog-footer(slot='footer')
    el-button(@click='visible = false') 取消
    el-button(type='primary', @click='dataFormSubmit()') 确定
  template(v-if="dataForm.type=='储值卡' || dataForm.type=='折扣卡' || dataForm.type=='时段卡'")
    pack-selector(v-if='showPackSelector', @cancel='showPackSelector = false', @selected='handlePackSelect'
      :office-id="dataForm.officeId",:card-type="dataForm.type")
  template(v-if="dataForm.type=='疗程总次卡' || dataForm.type=='疗程分次卡'")
    pack-selector2(v-if='showPackSelector', @cancel='showPackSelector = false', @selected='handlePackSelect'
      :office-id="dataForm.officeId",:card-type="dataForm.type")

</template>

<script>
import _ from "lodash";
import API from "@/api";
import packSelector from "@/components/packSelector4card";
import packSelector2 from "@/components/packSelector4card2";
export default {
  components: { packSelector, packSelector2 },
  data() {
    return {
      visible: false,
      showPackSelector: false,
      shopList: [],
      cardsList: [],
      cardsList2: [],
      cardTypeList: [],
      dataForm: {
        id: 0,
        type: "储值卡",
        officeId: "",
        name: "",
        price: "",
        denomination: "",
        startTime: "",
        startTimeType: "",
        endTime: "",
        endTimeType: "",
        fixedTime: "",
        fixedTimeType: "",
        catFirst: "",
        catSecond: "",
        notes: "",
        status: "",
        category: "",
        remarks: "",
        cardConsumeType: 0,
        frequency: 0,
        purpose: [],
        serviceCardContentList: []
      },
      dataRule: {
        type: [{ required: true, message: "卡类型不能为空", trigger: "blur" }],
        officeId: [{ required: true, message: "所属门店不能为空", trigger: "blur" }],
        name: [{ required: true, message: "卡名称不能为空", trigger: "blur" }],
        price: [{ required: true, message: "卡售价不能为空", trigger: "blur" }],
        // denomination: [{ required: true, message: "卡面额不能为空", trigger: "blur" }],
        startTime: [{ required: true, message: "开始日期不能为空", trigger: "blur" }],
        startTimeType: [{ required: true, message: "开始时间类型不能为空", trigger: "blur" }],
        endTime: [{ required: true, message: "结束时间不能为空", trigger: "blur" }],
        endTimeType: [{ required: true, message: "结束时间类型不能为空", trigger: "blur" }],
        fixedTime: [{ required: true, message: "固定时间不能为空", trigger: "blur" }],
        fixedTimeType: [{ required: true, message: "固定时间类型不能为空", trigger: "blur" }],
        catFirst: [{ required: true, message: "一级分类不能为空", trigger: "blur" }],
        catSecond: [{ required: true, message: "二级分类不能为空", trigger: "blur" }],
        notes: [{ required: true, message: "售卡须知不能为空", trigger: "blur" }],
        purpose: [{ required: true, message: "用途不能为空", trigger: "blur" }],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }],
        category: [{ required: true, message: "卡类别不能为空", trigger: "blur" }],
        remarks: [{ required: true, message: "备注信息不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    getCategory() {
      API.common.getCategoryList().then(({ data }) => {
        if (data && data.code === 0) {
          this.cardsList = data.list["cards"];
        }
      });
      API.common.getOfficeList().then(({ data }) => {
        this.shopList = data.list;
      });
    },
    handlePackSelect(list) {
      this.dataForm.serviceCardContentList = this.dataForm.serviceCardContentList.concat(list);
      this.showPackSelector = false;
    },
    removeCardContent(index) {
      this.dataForm.serviceCardContentList.splice(index, 1);
    },
    showPanel() {
      if (this.dataForm.officeId) {
        this.showPackSelector = true;
      } else {
        this.$message.error("请先选择门店");
      }
    },
    onCardsChange(id) {
      const obj = _.find(this.cardsList, o => o.id === id);
      if (obj) {
        this.cardsList2 = obj.categoryList;
      } else {
        this.cardsList2 = [];
      }
      this.dataForm.catSecond = "";
    },
    init(id) {
      this.getCategory();
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.dataForm.purpose = [];
        this.dataForm.serviceCardContentList = [];
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.servicecard.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.serviceCard;
              if (data.serviceCard.purpose) {
                this.dataForm.purpose = data.serviceCard.purpose.split(",");
              } else {
                this.dataForm.purpose = [];
              }
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = JSON.parse(JSON.stringify(this.dataForm)); // 解除引用关系
          params.purpose = this.dataForm.purpose.join(",");
          var tick = !this.dataForm.id ? API.servicecard.add(params) : API.servicecard.update(params);
          tick.then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    }
  }
};
</script>

<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
      <!-- <el-form-item label="商户ID" prop="merchantId">
        <el-input v-model="dataForm.merchantId" placeholder="商户ID"></el-input>
      </el-form-item> -->
      <el-form-item label="门店名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="门店简称"></el-input>
      </el-form-item>
      <el-form-item label="门店全称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="门店全称"></el-input>
      </el-form-item>
      <!--  <el-form-item label="排序" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
      </el-form-item>
      <el-form-item label="区域ID" prop="areaId">
        <el-input v-model="dataForm.areaId" placeholder="区域ID"></el-input>
      </el-form-item> -->
      <el-form-item label="门店编号" prop="code">
        <el-input v-model="dataForm.code" placeholder="门店编号"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="master">
        <el-input v-model="dataForm.master" placeholder="门店负责人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item label="座机" prop="machine">
        <el-input v-model="dataForm.machine" placeholder="座机"></el-input>
      </el-form-item>
      <el-form-item label="门店类型" prop="type">
        <el-select placeholder="门店类型" v-model="dataForm.type">
          <el-option label="直营店" value="0"></el-option>
          <el-option label="加盟店" value="1"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="组织机构" prop="organization">
        <el-input v-model="dataForm.organization" placeholder="组织机构"></el-input>
      </el-form-item> -->
      <el-form-item label="省份" prop="province">
        <!-- <el-input v-model="dataForm.province" placeholder="省份"></el-input> -->
        <el-select placeholder="省份" v-model="dataForm.province" @change="onProvinceChange">
          <el-option v-for="area in areaTree" :key="area.id" :label="area.name" :value="area.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <!-- <el-input v-model="dataForm.city" placeholder="城市"></el-input> -->
        <el-select placeholder="城市" v-model="dataForm.city" @change="onCityChange">
          <el-option v-for="area in areaTree2" :key="area.id" :label="area.name" :value="area.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区县" prop="county">
        <!-- <el-input v-model="dataForm.county" placeholder="区县"></el-input> -->
        <el-select placeholder="区县" v-model="dataForm.county">
          <el-option v-for="area in areaTree3" :key="area.id" :label="area.name" :value="area.name"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="是否放开微信预约" prop="isWechat">
        <el-input v-model="dataForm.isWechat" placeholder="是否接受微信预约"></el-input>
         <el-radio-group v-model="dataForm.isWechat">
          <el-radio label="0"></el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="营业开始时间" prop="businessStarttime">
        <!-- <el-input v-model="dataForm.businessStarttime" placeholder="营业开始时间"></el-input> -->
        <el-time-picker v-model="dataForm.businessStarttime" type="time" format="HH:mm" value-format="HH:mm" placeholder="营业开始时间"></el-time-picker>
      </el-form-item>
      <el-form-item label="营业结束时间" prop="businessEndtime">
        <!-- <el-input v-model="dataForm.businessEndtime" placeholder="营业结束时间"></el-input> -->
        <el-time-picker v-model="dataForm.businessEndtime" type="datetime" format="HH:mm" value-format="HH:mm" placeholder="营业结束时间"></el-time-picker>
      </el-form-item>
      <el-form-item label="预约开始时间" prop="appointmentStarttime">
        <!-- <el-input v-model="dataForm.appointmentStarttime" placeholder="预约开始时间"></el-input> -->
        <el-time-picker v-model="dataForm.appointmentStarttime" type="datetime" format="HH:mm" value-format="HH:mm" placeholder="预约开始时间"></el-time-picker>
      </el-form-item>
      <el-form-item label="预约结束时间" prop="appointmentEndtime">
        <!-- <el-input v-model="dataForm.appointmentEndtime" placeholder="预约结束时间"></el-input> -->
        <el-time-picker v-model="dataForm.appointmentEndtime" type="datetime" format="HH:mm" value-format="HH:mm" placeholder="预约结束时间"></el-time-picker>
      </el-form-item>
      <el-form-item label="是否营业" prop="isBusiness">
        <el-radio-group v-model="dataForm.isBusiness">
          <el-radio label="1">营业</el-radio>
          <el-radio label="0">停业</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="坐标拾取">
        <el-row>
          <el-col :span="12">
            <el-input v-model="locationNameTemp" placeholder="请输入位置名称"></el-input>
          </el-col>
          <el-col :span="12">
            <el-button style="margin-left: 20px;" @click="() => this.locationName = this.locationNameTemp">搜索位置</el-button>
          </el-col>
        </el-row>
        <div style="height:400px;margin-top: 20px;">
          <bmap :name="locationName" @mapClick="point => this.handleMapClick(point)"></bmap>
        </div>
      </el-form-item>
      <el-form-item label="经度" prop="lng">
        <el-input v-model="dataForm.lng" placeholder="经度"></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="lat">
        <el-input v-model="dataForm.lat" placeholder="纬度"></el-input>
      </el-form-item>
      <el-form-item label="门店地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="门店地址"></el-input>
      </el-form-item>
      <!-- <el-form-item label="签到距离" prop="signDistance">
        <el-input v-model="dataForm.signDistance" placeholder="签到距离"></el-input>
      </el-form-item> -->
      <el-form-item label="门店招牌照片" prop="signPhoto">
        <el-input v-model="dataForm.signPhoto" placeholder="门店招牌照片"></el-input>
        <img-upload :path="dataForm.signPhoto" @success="onSignPhotoUploadSuccess"></img-upload>
      </el-form-item>
      <el-form-item label="店内照片" prop="storePhoto">
        <el-input v-model="dataForm.storePhoto" placeholder="店内照片"></el-input>
        <img-upload :path="dataForm.storePhoto" @success="onStorePhotoUploadSuccess"></img-upload>
      </el-form-item>
      <el-form-item label="门店品牌LOGO" prop="logo">
        <el-input v-model="dataForm.logo" placeholder="门店品牌LOGO"></el-input>
        <img-upload :path="dataForm.logo" @success="onLogoUploadSuccess"></img-upload>
      </el-form-item>
      <el-form-item label="门店特色" prop="characteristic">
        <quill-editor :options="editorOption" v-model="dataForm.characteristic">
        </quill-editor>
      </el-form-item>
      <el-form-item label="门店介绍" prop="introduce">
        <el-input type="textarea" :rows="5" v-model="dataForm.introduce" placeholder="门店介绍"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from "@/api";
import bmap from "@/components/bmap";
import imgUpload from "@/components/imgUpload";
import editorOption from "@/utils/editorOption";
export default {
  components: { bmap, imgUpload },
  data() {
    return {
      locationNameTemp: "",
      locationName: "",
      visible: false,
      editorOption: editorOption,
      areaTree: [],
      areaTree2: [],
      areaTree3: [],
      dataForm: {
        id: 0,
        merchantId: "",
        name: "",
        fullName: "",
        sort: "",
        areaId: "",
        code: "",
        master: "",
        phone: "",
        machine: "",
        type: "",
        organization: "",
        isWechat: "",
        province: "",
        city: "",
        county: "",
        lat: "",
        lng: "",
        address: "",
        businessStarttime: "",
        businessEndtime: "",
        appointmentStarttime: "",
        appointmentEndtime: "",
        isBusiness: "",
        signDistance: "",
        signPhoto: "",
        storePhoto: "",
        logo: "",
        introduce: "",
        characteristic: "",
        createBy: "",
        createDate: "",
        updateBy: "",
        updateDate: "",
        remarks: "",
        delFlag: ""
      },
      dataRule: {
        name: [{ required: true, message: "门店名称不能为空", trigger: "blur" }],
        fullName: [{ required: true, message: "门店全称不能为空", trigger: "blur" }],
        sort: [{ required: true, message: "排序不能为空", trigger: "blur" }],
        areaId: [{ required: true, message: "区域ID不能为空", trigger: "blur" }],
        code: [{ required: true, message: "门店编号不能为空", trigger: "blur" }],
        master: [{ required: true, message: "门店负责人不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "联系电话不能为空", trigger: "blur" }],
        machine: [{ required: true, message: "座机不能为空", trigger: "blur" }],
        type: [{ required: true, message: "门店类型不能为空", trigger: "blur" }],
        organization: [{ required: true, message: "组织机构不能为空", trigger: "blur" }],
        isWechat: [{ required: true, message: "是否接受微信预约不能为空", trigger: "blur" }],
        province: [{ required: true, message: "省份不能为空", trigger: "blur" }],
        city: [{ required: true, message: "城市不能为空", trigger: "blur" }],
        county: [{ required: true, message: "区县不能为空", trigger: "blur" }],
        lat: [{ required: true, message: "纬度不能为空", trigger: "blur" }],
        lng: [{ required: true, message: "经度不能为空", trigger: "blur" }],
        address: [{ required: true, message: "门店地址不能为空", trigger: "blur" }],
        businessStarttime: [{ required: true, message: "营业开始时间不能为空", trigger: "blur" }],
        businessEndtime: [{ required: true, message: "营业结束时间不能为空", trigger: "blur" }],
        appointmentStarttime: [{ required: true, message: "预约开始时间不能为空", trigger: "blur" }],
        appointmentEndtime: [{ required: true, message: "预约结束时间不能为空", trigger: "blur" }],
        isBusiness: [{ required: true, message: "是否营业不能为空", trigger: "blur" }],
        // signDistance: [{ required: true, message: "签到距离不能为空", trigger: "blur" }],
        signPhoto: [{ required: true, message: "门店招牌照片不能为空", trigger: "blur" }],
        storePhoto: [{ required: true, message: "店内照片不能为空", trigger: "blur" }],
        logo: [{ required: true, message: "门店品牌LOGO不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    getArea() {
      return API.sysarea.list({}).then(({ data }) => {
        if (data && data.code === 0 && data.list[0]) {
          this.areaTree = data.list[0].areaList;
        }
      });
    },
    onProvinceChange(name) {
      for (let i = 0; i < this.areaTree.length; i++) {
        if (this.areaTree[i].name === name) {
          this.areaTree2 = this.areaTree[i].areaList;
          break;
        }
      }
      this.dataForm.city = "";
      this.dataForm.county = "";
    },
    onCityChange(name) {
      for (let i = 0; i < this.areaTree2.length; i++) {
        if (this.areaTree2[i].name === name) {
          this.areaTree3 = this.areaTree2[i].areaList;
          break;
        }
      }
      this.dataForm.county = "";
    },
    handleMapClick(point) {
      this.dataForm.lng = point.lng;
      this.dataForm.lat = point.lat;
    },
    onLogoUploadSuccess(path) {
      this.dataForm.logo = path;
    },
    onSignPhotoUploadSuccess(path) {
      this.dataForm.signPhoto = path;
    },
    onStorePhotoUploadSuccess(path) {
      this.dataForm.storePhoto = path;
    },
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.getArea().then(() => {
          if (this.dataForm.id) {
            API.sysoffice.info(this.dataForm.id).then(({ data }) => {
              if (data && data.code === 0) {
                this.dataForm = data.sysOffice;
              }
            });
          }
        });
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = {
            id: this.dataForm.id || undefined,
            merchantId: this.dataForm.merchantId,
            name: this.dataForm.name,
            fullName: this.dataForm.fullName,
            sort: this.dataForm.sort,
            areaId: this.dataForm.areaId,
            code: this.dataForm.code,
            master: this.dataForm.master,
            phone: this.dataForm.phone,
            machine: this.dataForm.machine,
            type: this.dataForm.type,
            organization: this.dataForm.organization,
            isWechat: this.dataForm.isWechat,
            province: this.dataForm.province,
            city: this.dataForm.city,
            county: this.dataForm.county,
            lat: this.dataForm.lat,
            lng: this.dataForm.lng,
            address: this.dataForm.address,
            businessStarttime: this.dataForm.businessStarttime,
            businessEndtime: this.dataForm.businessEndtime,
            appointmentStarttime: this.dataForm.appointmentStarttime,
            appointmentEndtime: this.dataForm.appointmentEndtime,
            isBusiness: this.dataForm.isBusiness,
            signDistance: this.dataForm.signDistance,
            signPhoto: this.dataForm.signPhoto,
            storePhoto: this.dataForm.storePhoto,
            logo: this.dataForm.logo,
            introduce: this.dataForm.introduce,
            characteristic: this.dataForm.characteristic,
            createBy: this.dataForm.createBy,
            createDate: this.dataForm.createDate,
            updateBy: this.dataForm.updateBy,
            updateDate: this.dataForm.updateDate,
            remarks: this.dataForm.remarks,
            delFlag: this.dataForm.delFlag
          };
          var tick = !this.dataForm.id ? API.sysoffice.add(params) : API.sysoffice.update(params);
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

<style>
.ql-container {
  height: 200px;
}
</style>

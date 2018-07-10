<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="套餐名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="套餐名称"></el-input>
      </el-form-item>
      <el-form-item label="套餐编号" prop="packno">
        <el-input v-model="dataForm.packno" placeholder="套餐编号"></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId">
        <el-select v-model="dataForm.officeId" placeholder="请选择">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="套餐内容" prop="packDetailList">
        <span v-for="(obj, index) in dataForm.paDetailList" :key="obj.id" style="margin-right: 10px;">
          <el-tag @close="handleRemove(index)" closable>{{obj.name}}x{{obj.nums}}</el-tag>
        </span>
        <el-button @click="showPackSelector = true">增加</el-button>
      </el-form-item>
      <el-form-item label="套餐价格" prop="packPrice">
        <el-input v-model="dataForm.packPrice" placeholder="套餐价格"></el-input>
      </el-form-item>
      <el-form-item label="套餐时长" prop="packTime">
        <el-input v-model="dataForm.packTime" placeholder="套餐时长"></el-input>
      </el-form-item>
      <el-form-item label="一级分类" prop="catFirst">
        <el-select v-model="dataForm.catFirst" placeholder="请选择" @change="onCatFirstChange">
          <el-option v-for="item in packageList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="catSecond">
        <el-select v-model="dataForm.catSecond" placeholder="请选择">
          <el-option v-for="item in packageList2" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio label="0">停售</el-radio>
          <el-radio label="1">在售</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="套餐配图" prop="images">
        <el-input v-model="dataForm.images" placeholder="套餐配图"></el-input>
        <img-upload :path="dataForm.images" @success="onImagesUploadSuccess"></img-upload>
      </el-form-item>
      <el-form-item label="套餐描述" prop="content">
        <el-input v-model="dataForm.content" placeholder="套餐描述"></el-input>
      </el-form-item>
      <!-- <el-form-item label="创建者" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="更新者" prop="updateBy">
        <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="更新时间" prop="updateDate">
        <el-input v-model="dataForm.updateDate" placeholder="更新时间"></el-input>
      </el-form-item> -->
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="备注信息"></el-input>
      </el-form-item>
      <!-- <el-form-item label="删除标记" prop="delFlag">
        <el-input v-model="dataForm.delFlag" placeholder="删除标记"></el-input>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    <pack-selector v-if="showPackSelector" @cancel="showPackSelector = false" @selected="handlePackSelect"></pack-selector>
  </el-dialog>
</template>

<script>
import API from "@/api";
import imgUpload from "@/components/imgUpload";
import packSelector from "@/components/packSelector";

export default {
  components: { imgUpload, packSelector },
  data() {
    return {
      visible: false,
      showPackSelector: false,
      packageList: [],
      packageList2: [],
      shopList: [],
      dataForm: {
        id: 0,
        name: "",
        packno: "",
        officeId: "",
        packPrice: "",
        packTime: "",
        catFirst: "",
        catSecond: "",
        status: "",
        images: "",
        content: "",
        createBy: "",
        createDate: "",
        updateBy: "",
        updateDate: "",
        remarks: "",
        delFlag: "",
        paDetailList: []
      },
      dataRule: {
        name: [{ required: true, message: "套餐名称不能为空", trigger: "blur" }],
        packno: [{ required: true, message: "套餐编号不能为空", trigger: "blur" }],
        officeId: [{ required: true, message: "所属门店不能为空", trigger: "blur" }],
        packPrice: [{ required: true, message: "套餐价格不能为空", trigger: "blur" }],
        packTime: [{ required: true, message: "套餐时长不能为空", trigger: "blur" }],
        catFirst: [{ required: true, message: "一级分类不能为空", trigger: "blur" }],
        catSecond: [{ required: true, message: "二级分类不能为空", trigger: "blur" }],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }],
        // images: [{ required: true, message: "套餐配图不能为空", trigger: "blur" }],
        content: [{ required: true, message: "套餐描述不能为空", trigger: "blur" }]
        // createBy: [{ required: true, message: "创建者不能为空", trigger: "blur" }],
        // createDate: [{ required: true, message: "创建时间不能为空", trigger: "blur" }],
        // updateBy: [{ required: true, message: "更新者不能为空", trigger: "blur" }],
        // updateDate: [{ required: true, message: "更新时间不能为空", trigger: "blur" }],
        // remarks: [{ required: true, message: "备注信息不能为空", trigger: "blur" }],
        // delFlag: [{ required: true, message: "删除标记不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handlePackSelect(packList) {
      // console.log(packList);
      this.dataForm.paDetailList = this.dataForm.paDetailList.concat(packList);
      this.showPackSelector = false;
    },
    handleRemove(index) {
      this.dataForm.paDetailList.splice(index, 1);
    },
    getCategory() {
      API.common.getCategoryList().then(({ data }) => {
        this.packageList = data.list["packages"];
      });
      API.common.getOfficeList().then(({ data }) => {
        this.shopList = data.list;
      });
    },
    onCatFirstChange(id) {
      for (let i = 0; i < this.packageList.length; i++) {
        if (this.packageList[i].id === id) {
          this.packageList2 = this.packageList[i].categoryList;
          break;
        }
      }
    },
    onImagesUploadSuccess(path) {
      this.dataForm.images = path;
    },
    init(id) {
      this.getCategory();
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.dataForm.paDetailList = [];
        if (this.dataForm.id) {
          API.servicepackage.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.servicePackage.name;
              this.dataForm.packno = data.servicePackage.packno;
              this.dataForm.officeId = +data.servicePackage.officeId;
              this.dataForm.packPrice = data.servicePackage.packPrice;
              this.dataForm.packTime = data.servicePackage.packTime;
              this.dataForm.catFirst = data.servicePackage.catFirst;
              this.dataForm.catSecond = data.servicePackage.catSecond;
              this.dataForm.status = data.servicePackage.status;
              this.dataForm.images = data.servicePackage.images;
              this.dataForm.content = data.servicePackage.content;
              this.dataForm.createBy = data.servicePackage.createBy;
              this.dataForm.createDate = data.servicePackage.createDate;
              this.dataForm.updateBy = data.servicePackage.updateBy;
              this.dataForm.updateDate = data.servicePackage.updateDate;
              this.dataForm.remarks = data.servicePackage.remarks;
              this.dataForm.delFlag = data.servicePackage.delFlag;
              this.dataForm.paDetailList = data.servicePackage.paDetailList || [];
              this.onCatFirstChange(this.dataForm.catFirst);
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = {
            id: this.dataForm.id || undefined,
            name: this.dataForm.name,
            packno: this.dataForm.packno,
            officeId: this.dataForm.officeId,
            packPrice: this.dataForm.packPrice,
            packTime: this.dataForm.packTime,
            catFirst: this.dataForm.catFirst,
            catSecond: this.dataForm.catSecond,
            status: this.dataForm.status,
            images: this.dataForm.images,
            content: this.dataForm.content,
            createBy: this.dataForm.createBy,
            createDate: this.dataForm.createDate,
            updateBy: this.dataForm.updateBy,
            updateDate: this.dataForm.updateDate,
            remarks: this.dataForm.remarks,
            delFlag: this.dataForm.delFlag,
            paDetailList: this.dataForm.paDetailList
          };
          var tick = !this.dataForm.id ? API.servicepackage.add(params) : API.servicepackage.update(params);
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

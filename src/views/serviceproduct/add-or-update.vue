<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="产品名称"></el-input>
      </el-form-item>
      <el-form-item label="产品编号" prop="productno">
        <el-input v-model="dataForm.productno" placeholder="产品编号"></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId">
        <el-select v-model="dataForm.officeId" placeholder="请选择">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品售价" prop="salePrice">
        <el-input v-model="dataForm.salePrice" placeholder="产品售价"></el-input>
      </el-form-item>
      <el-form-item label="产品类型" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择">
          <el-option v-for="item in productTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品单位" prop="productUnit">
        <el-input v-model="dataForm.productUnit" placeholder="产品单位"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio label="0">停售</el-radio>
          <el-radio label="1">在售</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="产品品牌" prop="brandId">
        <el-select v-model="dataForm.brandId" placeholder="请选择" @change="onCatFirstChange">
          <el-option v-for="item in productBrandList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="一级分类" prop="catFirst">
        <el-select v-model="dataForm.catFirst" placeholder="请选择" @change="onCatFirstChange">
          <el-option v-for="item in productList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="catSecond">
        <el-select v-model="dataForm.catSecond" placeholder="请选择">
          <el-option v-for="item in productList2" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品形态" prop="productForm">
        <el-select v-model="dataForm.productForm" placeholder="请选择">
          <el-option v-for="item in productFormList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品容量" prop="capacity">
        <el-input v-model="dataForm.capacity" placeholder="产品容量"></el-input>
      </el-form-item>
      <el-form-item label="容量单位" prop="capacityUnit">
        <el-select v-model="dataForm.capacityUnit" placeholder="请选择">
          <el-option v-for="item in productCapacityList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="保质期" prop="qualityPeriod">
        <el-input v-model="dataForm.qualityPeriod" placeholder="保质期"></el-input>
      </el-form-item>
      <el-form-item label="产品配图" prop="images">
        <el-input v-model="dataForm.images" placeholder="产品配图"></el-input>
        <img-upload :path="dataForm.images" @success="onImagesUploadSuccess"></img-upload>
      </el-form-item>
      <el-form-item label="产品简介" prop="content">
        <quill-editor :options="editorOption" v-model="dataForm.content">
        </quill-editor>
      </el-form-item>
      <!-- <el-form-item label="创建者" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="更新者" prop="updateBy">
        <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateDate">
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
  </el-dialog>
</template>

<script>
import API from "@/api";
import imgUpload from "@/components/imgUpload";
import editorOption from "@/utils/editorOption";
import _ from "lodash";
export default {
  components: { imgUpload },
  data() {
    return {
      editorOption: editorOption,
      visible: false,
      productList: [],
      productList2: [],
      shopList: [],
      productTypeList: [],
      productCapacityList: [],
      productFormList: [],
      productBrandList: [],
      dataForm: {
        id: 0,
        name: "",
        productno: "",
        officeId: "",
        salePrice: "",
        type: "",
        productUnit: "",
        status: "",
        brandId: "",
        catFirst: "",
        catSecond: "",
        productForm: "",
        capacity: "",
        capacityUnit: "",
        qualityPeriod: "",
        images: "",
        content: "",
        createBy: "",
        createDate: "",
        updateBy: "",
        updateDate: "",
        remarks: "",
        delFlag: ""
      },
      dataRule: {
        name: [{ required: true, message: "产品名称不能为空", trigger: "blur" }],
        productno: [{ required: true, message: "产品编号不能为空", trigger: "blur" }],
        officeId: [{ required: true, message: "所属门店不能为空", trigger: "blur" }],
        salePrice: [{ required: true, message: "产品售价不能为空", trigger: "blur" }],
        type: [{ required: true, message: "产品类型不能为空", trigger: "blur" }],
        productUnit: [{ required: true, message: "产品单位不能为空", trigger: "blur" }],
        status: [{ required: true, message: "状态:0、停售 1、在售不能为空", trigger: "blur" }],
        brandId: [{ required: true, message: "产品品牌不能为空", trigger: "blur" }],
        catFirst: [{ required: true, message: "一级分类不能为空", trigger: "blur" }],
        catSecond: [{ required: true, message: "二级分类不能为空", trigger: "blur" }],
        productForm: [{ required: true, message: "产品形态不能为空", trigger: "blur" }],
        capacity: [{ required: true, message: "产品容量不能为空", trigger: "blur" }],
        capacityUnit: [{ required: true, message: "容量单位不能为空", trigger: "blur" }],
        qualityPeriod: [{ required: true, message: "保质期不能为空", trigger: "blur" }],
        // images: [{ required: true, message: "产品配图不能为空", trigger: "blur" }],
        content: [{ required: true, message: "产品简介不能为空", trigger: "blur" }]
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
    getCategory() {
      API.common.getCategoryList().then(({ data }) => {
        if (data && data.code === 0) {
          this.productList = data.list["products"];
        }
      });
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        }
      });
      API.sysdict.getlist().then(({ data }) => {
        if (data && data.code === 0) {
          const group = _.groupBy(data.list, obj => obj.type);
          this.productTypeList = group["productType"];
          this.productCapacityList = group["productCapacity"];
          this.productFormList = group["productForm"];
        }
      });
      API.productbrand.queryProductBrandList().then(({ data }) => {
        if (data && data.code === 0) {
          this.productBrandList = data.list;
        }
      });
    },
    getShopName(officeId) {
      const shopList = this.shopList;
      for (let i = 0; i < shopList.length; i++) {
        if (shopList[i].id === +officeId) {
          return shopList[i].name;
        }
      }
      return "";
    },
    onImagesUploadSuccess(path) {
      this.dataForm.images = path;
    },
    onCatFirstChange(id) {
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].id === id) {
          this.productList2 = this.productList[i].categoryList;
          break;
        }
      }
    },
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.getCategory();
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.serviceproduct.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.serviceProduct.name;
              this.dataForm.productno = data.serviceProduct.productno;
              this.dataForm.officeId = +data.serviceProduct.officeId;
              this.dataForm.salePrice = data.serviceProduct.salePrice;
              this.dataForm.type = data.serviceProduct.type;
              this.dataForm.productUnit = data.serviceProduct.productUnit;
              this.dataForm.status = data.serviceProduct.status;
              this.dataForm.brandId = data.serviceProduct.brandId;
              this.dataForm.catFirst = data.serviceProduct.catFirst;
              this.dataForm.catSecond = data.serviceProduct.catSecond;
              this.dataForm.productForm = data.serviceProduct.productForm;
              this.dataForm.capacity = data.serviceProduct.capacity;
              this.dataForm.capacityUnit = data.serviceProduct.capacityUnit;
              this.dataForm.qualityPeriod = data.serviceProduct.qualityPeriod;
              this.dataForm.images = data.serviceProduct.images;
              this.dataForm.content = data.serviceProduct.content;
              this.dataForm.createBy = data.serviceProduct.createBy;
              this.dataForm.createDate = data.serviceProduct.createDate;
              this.dataForm.updateBy = data.serviceProduct.updateBy;
              this.dataForm.updateDate = data.serviceProduct.updateDate;
              this.dataForm.remarks = data.serviceProduct.remarks;
              this.dataForm.delFlag = data.serviceProduct.delFlag;
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
            productno: this.dataForm.productno,
            officeId: this.dataForm.officeId,
            salePrice: this.dataForm.salePrice,
            type: this.dataForm.type,
            productUnit: this.dataForm.productUnit,
            status: this.dataForm.status,
            brandId: this.dataForm.brandId,
            catFirst: this.dataForm.catFirst,
            catSecond: this.dataForm.catSecond,
            productForm: this.dataForm.productForm,
            capacity: this.dataForm.capacity,
            capacityUnit: this.dataForm.capacityUnit,
            qualityPeriod: this.dataForm.qualityPeriod,
            images: this.dataForm.images,
            content: this.dataForm.content,
            createBy: this.dataForm.createBy,
            createDate: this.dataForm.createDate,
            updateBy: this.dataForm.updateBy,
            updateDate: this.dataForm.updateDate,
            remarks: this.dataForm.remarks,
            delFlag: this.dataForm.delFlag
          };
          var tick = !this.dataForm.id ? API.serviceproduct.add(params) : API.serviceproduct.update(params);
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


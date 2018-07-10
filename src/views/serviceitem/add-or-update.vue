<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目编号" prop="itemno">
        <el-input v-model="dataForm.itemno" placeholder="项目编号"></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId">
        <el-select v-model="dataForm.officeId" placeholder="请选择">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="售价" prop="salePrice">
        <el-input v-model="dataForm.salePrice" placeholder="售价"></el-input>
      </el-form-item>
      <el-form-item label="项目时长" prop="itemTime">
        <el-input v-model="dataForm.itemTime" placeholder="项目时长"></el-input>
      </el-form-item>
      <el-form-item label="一级分类" prop="catFirst">
        <el-select v-model="dataForm.catFirst" placeholder="请选择" @change="onCatFirstChange">
          <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="catSecond">
        <el-select v-model="dataForm.catSecond" placeholder="请选择">
          <el-option v-for="item in items2" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否可预约" prop="isOrder">
        <el-radio-group v-model="dataForm.isOrder">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="体验价" prop="experiencePrice">
        <el-input v-model="dataForm.experiencePrice" placeholder="体验价"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio label="0">停业</el-radio>
          <el-radio label="1">在售</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目配图" prop="images">
        <el-input v-model="dataForm.images" placeholder="项目配图"></el-input>
        <img-upload :path="dataForm.images" @success="onImagesUploadSuccess"></img-upload>
      </el-form-item>
      <el-form-item label="项目内容" prop="content">
        <el-input v-model="dataForm.content" placeholder="项目内容"></el-input>
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
export default {
  components: { imgUpload },
  data() {
    return {
      visible: false,
      items: [],
      items2: [],
      shopList: [],
      dataForm: {
        id: 0,
        name: "",
        itemno: "",
        officeId: "",
        salePrice: "",
        itemTime: "",
        catFirst: "",
        catSecond: "",
        isOrder: "",
        experiencePrice: "",
        status: "",
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
        name: [{ required: true, message: "项目名称不能为空", trigger: "blur" }],
        itemno: [{ required: true, message: "项目编号不能为空", trigger: "blur" }],
        officeId: [{ required: true, message: "所属门店不能为空", trigger: "blur" }],
        salePrice: [{ required: true, message: "售价不能为空", trigger: "blur" }],
        itemTime: [{ required: true, message: "项目时长不能为空", trigger: "blur" }],
        catFirst: [{ required: true, message: "一级分类不能为空", trigger: "blur" }],
        catSecond: [{ required: true, message: "二级分类不能为空", trigger: "blur" }],
        isOrder: [{ required: true, message: "是否可预约：0、否 1、是不能为空", trigger: "blur" }],
        experiencePrice: [{ required: true, message: "体验价不能为空", trigger: "blur" }],
        status: [{ required: true, message: "状态：0、停售  1、在售不能为空", trigger: "blur" }],
        // images: [{ required: true, message: "项目配图不能为空", trigger: "blur" }],
        content: [{ required: true, message: "项目内容不能为空", trigger: "blur" }]
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
        this.items = data.list["items"];
      });
      API.common.getOfficeList().then(({ data }) => {
        this.shopList = data.list;
      });
    },
    onCatFirstChange(id) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
          this.items2 = this.items[i].categoryList;
          break;
        }
      }
    },
    onImagesUploadSuccess(path) {
      this.dataForm.images = path;
    },
    init(id) {
      this.getCategory();
      this.dataForm.id = +id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.serviceitem.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = data.serviceItem;
              this.dataForm.officeId = +data.serviceItem.officeId;
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
            itemno: this.dataForm.itemno,
            officeId: this.dataForm.officeId,
            salePrice: this.dataForm.salePrice,
            itemTime: this.dataForm.itemTime,
            catFirst: this.dataForm.catFirst,
            catSecond: this.dataForm.catSecond,
            isOrder: this.dataForm.isOrder,
            experiencePrice: this.dataForm.experiencePrice,
            status: this.dataForm.status,
            images: this.dataForm.images,
            content: this.dataForm.content,
            createBy: this.dataForm.createBy,
            createDate: this.dataForm.createDate,
            updateBy: this.dataForm.updateBy,
            updateDate: this.dataForm.updateDate,
            remarks: this.dataForm.remarks,
            delFlag: this.dataForm.delFlag
          };
          var tick = !this.dataForm.id ? API.serviceitem.add(params) : API.serviceitem.update(params);
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

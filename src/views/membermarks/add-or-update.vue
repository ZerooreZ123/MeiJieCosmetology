<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="会员名" prop="memberId">
        <!-- <el-input v-model="dataForm.memberId" placeholder="会员ID"></el-input> -->
        <el-select v-model="dataForm.memberId" placeholder="请选择" @change="getmemberInfo(dataForm.memberId)">
          <el-option v-for="item in memberIdList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId" v-if="this.addmemberId">
        <!-- <el-input v-model="dataForm.officeId" placeholder="所属门店"></el-input> -->
        <el-select v-model="dataForm.officeId" placeholder="请选择">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属门店" v-if="!this.addmemberId">
        <!-- <el-input v-model="dataForm.officeId" placeholder="所属门店"></el-input> -->
        <el-input v-model="this.dataInfo" :disabled="true"></el-input>
      </el-form-item>
      <!-- <el-form-item label="创建者" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="dataForm.createDate" type="date" placeholder="创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新者" prop="updateBy">
        <el-input v-model="dataForm.updateBy" placeholder="更新者"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateDate">
        <el-date-picker value-format="yyyy-MM-dd" v-model="dataForm.updateDate" type="date" placeholder="更新时间"></el-date-picker>
      </el-form-item> -->
      <el-form-item label="备注信息" prop="remarks">
        <el-input type="textarea" :rows="4" v-model="dataForm.remarks" placeholder="备注信息"></el-input>
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
export default {
  data() {
    return {
      visible: false,
      shopList: [],
      memberIdList: [],
      addmemberId: false,
      dataInfo: "",
      dataOfficeId: "",
      dataForm: {
        id: 0,
        memberId: "",
        officeId: "",
        // createBy: "",
        // createDate: "",
        // updateBy: "",
        // updateDate: "",
        remarks: ""
        // delFlag: ""
      },
      dataRule: {
        memberId: [{ required: true, message: "会员ID不能为空", trigger: "blur" }],
        officeId: [{ required: true, message: "所属门店不能为空", trigger: "blur" }],
        // createBy: [{ required: true, message: "创建者不能为空", trigger: "blur" }],
        // createDate: [{ required: true, message: "创建时间不能为空", trigger: "blur" }],
        // updateBy: [{ required: true, message: "更新者不能为空", trigger: "blur" }],
        // updateDate: [{ required: true, message: "更新时间不能为空", trigger: "blur" }],
        remarks: [{ required: true, message: "备注信息不能为空", trigger: "blur" }]
        // delFlag: [{ required: true, message: "删除标记不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    getmemberInfo(val) {
      if (!this.addmemberId) {
        API.member.info(val).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataInfo = data.member.officeName;
            this.dataOfficeId = data.member.officeId;
          }
        });
      }
    },
    getCategory() {
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        } else {
          this.shopList = [];
        }
      });
      API.member.queryMemberList().then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data);
          this.memberIdList = data.list;
        } else {
          this.memberIdList = [];
        }
      });
    },
    init(id) {
      this.getCategory();
      this.dataForm.id = id || 0;
      this.addmemberId = id;
      this.dataInfo = "";
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.membermarks.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.memberId = parseInt(data.memberMarks.memberId, 10);
              this.dataForm.officeId = parseInt(data.memberMarks.officeId, 10);
              // this.dataForm.createBy = data.membermarks.createBy;
              // this.dataForm.createDate = data.membermarks.createDate;
              // this.dataForm.updateBy = data.membermarks.updateBy;
              // this.dataForm.updateDate = data.membermarks.updateDate;
              this.dataForm.remarks = data.memberMarks.remarks;
              // this.dataForm.delFlag = data.membermarks.delFlag;
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
            memberId: this.dataForm.memberId,
            officeId: this.dataForm.officeId || this.dataOfficeId,
            // createBy: this.dataForm.createBy,
            // createDate: this.dataForm.createDate,
            // updateBy: this.dataForm.updateBy,
            // updateDate: this.dataForm.updateDate,
            remarks: this.dataForm.remarks
            // delFlag: this.dataForm.delFlag
          };
          var tick = !this.dataForm.id ? API.membermarks.add(params) : API.membermarks.update(params);
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

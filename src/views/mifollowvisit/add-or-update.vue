<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="150px">
      <el-form-item label="会员" prop="memberId">
        <el-select v-model="dataForm.memberId" placeholder="请选择会员" filterable allow-create style="width:300px;">
          <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回访类型" prop="visitType">
        <el-select v-model="dataForm.visitType" placeholder="请选择">
          <el-option v-for="item in visitTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回访时间类型" prop="visitTimeType">
        <el-select v-model="dataForm.visitTimeType" placeholder="请选择">
          <el-option v-for="item in visitTimeTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划跟进回访时间" prop="visitTime">
        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="dataForm.visitTime" type="datetime" placeholder="回访时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回访形式" prop="visitForm">
        <el-select v-model="dataForm.visitForm" placeholder="请选择">
          <el-option v-for="item in visitFormList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系结果" prop="concatResult">
        <el-select v-model="dataForm.concatResult" placeholder="请选择">
          <el-option v-for="item in concatResultList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="dataForm.status">
          <el-option value="1" label="待回访">待回访</el-option>
          <el-option value="2" label="已回访">已回访</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跟进回访模板规则" prop="visitResult">
        <span>回访内容：******回访结果：*****</span><br>
        <span>内容描述：******客户反馈：******计划回访：******</span><br>
        <span>客户已拍项目：******客户主诉：******面诊设计：****** 专业建议：****** 开发项目：******最终方案：******</span>
      </el-form-item>
      <el-form-item label="跟进回访" prop="visitResult">
        <el-input type="textarea" :rows="5" v-model="dataForm.visitResult" placeholder="跟进回访"></el-input>
      </el-form-item>
      <!-- <el-form-item label="创建者" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
      </el-form-item> -->
      <el-form-item label="回访人" prop="updateBy">
        <el-select v-model="dataForm.updateBy" placeholder="请选择">
          <el-option v-for="item in userList" :key="item.userId" :label="item.name" :value="item.userId">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="更新时间" prop="updateDate">
        <el-input v-model="dataForm.updateDate" placeholder="更新时间"></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="备注信息"></el-input>
      </el-form-item>
      <el-form-item label="删除标记" prop="delFlag">
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
import _ from "lodash";
export default {
  data() {
    return {
      visible: false,
      memberList: [],
      userList: [],
      visitTypeList: [],
      visitTimeTypeList: [],
      visitFormList: [],
      concatResultList: [],
      dataForm: {
        id: 0,
        memberId: "",
        visitType: "",
        visitTimeType: "",
        visitTime: "",
        visitForm: "",
        concatResult: "",
        status: "",
        visitResult: "",
        createBy: "",
        createDate: "",
        updateBy: "",
        updateDate: "",
        remarks: "",
        delFlag: ""
      },
      dataRule: {
        // memberId: [{ required: true, message: "会员ID不能为空", trigger: "blur" }],
        visitType: [{ required: true, message: "回访类型不能为空", trigger: "blur" }],
        visitTimeType: [{ required: true, message: "回访时间类型不能为空", trigger: "blur" }],
        visitTime: [{ required: true, message: "计划跟进回访时间不能为空", trigger: "blur" }],
        visitForm: [{ required: true, message: "回访形式不能为空", trigger: "blur" }],
        concatResult: [{ required: true, message: "联系结果不能为空", trigger: "blur" }],
        status: [{ required: true, message: "状态：1、待回访 2、已回访不能为空", trigger: "blur" }]
        // visitResult: [{ required: true, message: "跟进回访不能为空", trigger: "blur" }],
        // createBy: [{ required: true, message: "创建者不能为空", trigger: "blur" }],
        // createDate: [{ required: true, message: "创建时间不能为空", trigger: "blur" }],
        // updateBy: [{ required: true, message: "回访人不能为空", trigger: "blur" }],
        // updateDate: [{ required: true, message: "更新时间不能为空", trigger: "blur" }],
        // remarks: [{ required: true, message: "备注信息不能为空", trigger: "blur" }],
        // delFlag: [{ required: true, message: "删除标记不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    getCategory() {
      API.member.queryMemberList().then(({ data }) => {
        if (data && data.code === 0) {
          this.memberList = data.list;
        } else {
          this.memberList = [];
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
          this.visitTypeList = group["visitType"];
          this.visitTimeTypeList = group["visitTimeType"];
          this.visitFormList = group["visitForm"];
          this.concatResultList = group["concatResult"];
        }
      });

      API.user.getList().then(({ data }) => {
        if (data && data.code === 0) {
          this.userList = data.list;
        } else {
          this.userList = [];
        }
      });
    },
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.getCategory();
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.mifollowvisit.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.memberId = data.miFollowVisit.memberId;
              this.dataForm.visitType = data.miFollowVisit.visitType;
              this.dataForm.visitTimeType = data.miFollowVisit.visitTimeType;
              this.dataForm.visitTime = data.miFollowVisit.visitTime;
              this.dataForm.visitForm = data.miFollowVisit.visitForm;
              this.dataForm.concatResult = data.miFollowVisit.concatResult;
              this.dataForm.status = data.miFollowVisit.status;
              this.dataForm.visitResult = data.miFollowVisit.visitResult;
              this.dataForm.createBy = data.miFollowVisit.createBy;
              this.dataForm.createDate = data.miFollowVisit.createDate;
              this.dataForm.updateBy = data.miFollowVisit.updateBy;
              this.dataForm.updateDate = data.miFollowVisit.updateDate;
              this.dataForm.remarks = data.miFollowVisit.remarks;
              this.dataForm.delFlag = data.miFollowVisit.delFlag;
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
            visitType: this.dataForm.visitType,
            visitTimeType: this.dataForm.visitTimeType,
            visitTime: this.dataForm.visitTime,
            visitForm: this.dataForm.visitForm,
            concatResult: this.dataForm.concatResult,
            status: this.dataForm.status,
            visitResult: this.dataForm.visitResult,
            createBy: this.dataForm.createBy,
            createDate: this.dataForm.createDate,
            updateBy: this.dataForm.updateBy,
            updateDate: this.dataForm.updateDate,
            remarks: this.dataForm.remarks,
            delFlag: this.dataForm.delFlag
          };
          var tick = !this.dataForm.id ? API.mifollowvisit.add(params) : API.mifollowvisit.update(params);
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

<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <!-- <el-form-item label="预约单号" prop="appointNo">
        <el-input v-model="dataForm.appointNo" placeholder="预约单号"></el-input>
      </el-form-item> -->
      <el-form-item label="所属门店" prop="officeId">
        <el-select v-model="dataForm.officeId" placeholder="请选择">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约人姓名" prop="name">
        <el-select v-model="dataForm.memberId" placeholder="请选择会员" filterable allow-create style="width:300px;" @change="onSelectMember">
          <el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约人电话" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="预约人电话"></el-input>
      </el-form-item>
      <el-form-item label="预约人数" prop="nums">
        <!-- <el-input v-model="dataForm.nums" placeholder="预约人数"></el-input> -->
        <el-input-number v-model="dataForm.nums" :min="1" label="预约人数"></el-input-number>
      </el-form-item>
      <el-form-item label="添加项目">
        <div class="w-list">
          <el-tag @close="handleRemove(index)" closable v-for="(item, index) in dataForm.appointDeatailLsit" :key="item.serviceId">
            {{item.serviceName}}
          </el-tag>
          <el-button @click="openPanel()">添加</el-button>
        </div>
      </el-form-item>
      <el-form-item label="预约日期" prop="appointDate">
        <!-- <el-input v-model="dataForm.appointDate" placeholder="预约日期"></el-input> -->
        <el-date-picker value-format="yyyy-MM-dd" v-model="dataForm.appointDate" type="date" placeholder="预约日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到店时间" prop="reachTime">
        <el-select v-model="dataForm.reachTime" placeholder="到店时间">
          <el-option v-for="item in getTimeList('10:00', '18:00', 15)" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="预约结束时间" prop="endTime">
        <el-select v-model="dataForm.endTime" placeholder="到店时间">
          <el-option v-for="item in getTimeList('10:00', '18:00', 15)" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="操作人员" prop="technician">
        <el-select v-model="dataForm.technician" placeholder="请选择">
          <el-option v-for="item in userList" :key="item.userId" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否指定" prop="isSpecify">
        <el-radio-group v-model="dataForm.isSpecify">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择房间" prop="roomId">
        <el-select v-model="dataForm.roomId" placeholder="请选择">
          <el-option v-for="item in roomList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input type="textarea" :rows="2" v-model="dataForm.remarks" placeholder="备注信息"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="btnStatus" type="primary" @click="dataFormSubmit(1)">新增会员并保存</el-button>
      <el-button v-if="btnStatus2" type="primary" @click="dataFormSubmit(2)">确定</el-button>
    </span>
    <product-selector :member-id="dataForm.memberId" v-if="showPanel" @selected="list => handleProductSelected(list)" @cancel="showPanel=false"></product-selector>
  </el-dialog>
</template>

<script>
import API from "@/api";
import { isMobile } from "@/utils/validate";
import { getTimeList } from "@/utils/index";
import productSelector from "@/components/productSelector";

export default {
  components: { productSelector },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      showPanel: false,
      shopList: [],
      userList: [],
      roomList: [],
      memberList: [],
      btnStatus: true,
      btnStatus2: true,
      dataForm: {
        id: 0,
        appointDeatailLsit: [],
        appointNo: "",
        officeId: "",
        name: "",
        memberId: "",
        mobile: "",
        nums: "",
        appointDate: "",
        reachTime: "",
        endTime: "",
        technician: "",
        isSpecify: "",
        roomId: "",
        serialno: "",
        createBy: "",
        createDate: "",
        updateBy: "",
        updateDate: "",
        remarks: "",
        delFlag: ""
      },
      dataRule: {
        appointNo: [{ required: true, message: "预约单号不能为空", trigger: "blur" }],
        officeId: [{ required: true, message: "所属机构不能为空", trigger: "blur" }],
        // memberId: [{ required: true, message: "预约人姓名不能为空", trigger: "blur" }],
        mobile: [{ required: true, message: "预约人电话不能为空", trigger: "blur" }, { validator: validateMobile, trigger: "blur" }],
        nums: [{ required: true, message: "预约人数不能为空", trigger: "blur" }],
        appointDate: [{ required: true, message: "预约日期不能为空", trigger: "blur" }],
        reachTime: [{ required: true, message: "到店时间不能为空", trigger: "blur" }]
        // roomId: [{ required: true, message: "房间不能为空", trigger: "blur" }],
        // name: [{ required: true, message: "预约人姓名不能为空", trigger: "blur" }]
        // technician: [{ required: true, message: "操作人员不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    getTimeList: getTimeList,
    onSelectMember(id) {
      this.btnStatus = true;
      this.btnStatus2 = true;
      for (let i = 0; i < this.memberList.length; i++) {
        if (this.memberList[i].id === id) {
          this.btnStatus = false;
          this.btnStatus2 = true;
          break;
        }
      }
      if (this.btnStatus && this.btnStatus2) {
        this.btnStatus = true;
        this.btnStatus2 = false;
      }
      console.info(this.dataForm.memberId);
    },
    getCategory() {
      API.common.getOfficeList().then(({ data }) => {
        if (data && data.code === 0) {
          this.shopList = data.list;
        } else {
          this.shopList = [];
        }
      });
      API.user.getList().then(({ data }) => {
        if (data && data.code === 0) {
          this.userList = data.list;
        } else {
          this.userList = [];
        }
      });
      API.room.queryRoomList().then(({ data }) => {
        if (data && data.code === 0) {
          this.roomList = data.list;
        } else {
          this.roomList = [];
        }
      });
      API.member.queryMemberList().then(({ data }) => {
        if (data && data.code === 0) {
          this.memberList = data.list;
        } else {
          this.memberList = [];
        }
      });
    },

    openPanel() {
      this.showPanel = true;
    },
    handleProductSelected(list) {
      this.showPanel = false;
      const newList = list.map(obj => ({
        serviceType: obj.serviceType,
        serviceId: obj.id,
        serviceName: obj.name
      }));
      this.dataForm.appointDeatailLsit = this.dataForm.appointDeatailLsit.concat(newList);
    },
    handleRemove(index) {
      this.dataForm.appointDeatailLsit.splice(index, 1);
    },
    init(id) {
      this.getCategory();
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          API.appointment.info(this.dataForm.id).then(({ data }) => {
            if (data && data.code === 0) {
              // console.log(JSON.stringify(data));
              this.dataForm.appointNo = data.appointment.appointNo;
              this.dataForm.officeId = data.appointment.officeId;
              this.dataForm.name = data.appointment.name;
              this.dataForm.memberId = data.appointment.memberId;
              this.dataForm.mobile = data.appointment.mobile;
              this.dataForm.nums = data.appointment.nums;
              this.dataForm.appointDate = data.appointment.appointDate;
              // this.dataForm.reachTime = data.appointment.reachTime;
              this.dataForm.endTime = data.appointment.endTime;
              this.$set(this.dataForm, "reachTime", data.appointment.reachTime);
              this.dataForm.technician = data.appointment.technician;
              this.dataForm.isSpecify = data.appointment.isSpecify;
              this.dataForm.roomId = data.appointment.roomId;
              this.dataForm.serialno = data.appointment.serialno;
              this.dataForm.createBy = data.appointment.createBy;
              this.dataForm.createDate = data.appointment.createDate;
              this.dataForm.updateBy = data.appointment.updateBy;
              this.dataForm.updateDate = data.appointment.updateDate;
              this.dataForm.remarks = data.appointment.remarks;
              this.dataForm.delFlag = data.appointment.delFlag;
              this.dataForm.appointDeatailLsit = data.appointment.appointDeatailLsit || [];
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit(type) {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          var params = {
            id: this.dataForm.id || undefined,
            appointDeatailLsit: this.dataForm.appointDeatailLsit,
            appointNo: this.dataForm.appointNo,
            officeId: this.dataForm.officeId,
            memberId: this.dataForm.memberId,
            mobile: this.dataForm.mobile,
            nums: this.dataForm.nums,
            appointDate: this.dataForm.appointDate,
            reachTime: this.dataForm.reachTime,
            endTime: this.dataForm.endTime,
            technician: this.dataForm.technician,
            isSpecify: this.dataForm.isSpecify,
            roomId: this.dataForm.roomId,
            serialno: this.dataForm.serialno,
            createBy: this.dataForm.createBy,
            createDate: this.dataForm.createDate,
            updateBy: this.dataForm.updateBy,
            updateDate: this.dataForm.updateDate,
            remarks: this.dataForm.remarks,
            delFlag: this.dataForm.delFlag
          };

          if (type === 1) {
            params.name = this.dataForm.memberId;
            params.memberId = "";
          }
          if (type === 2) {
            for (let i = 0; i < this.memberList.length; i++) {
              if (+this.memberList[i].id === +this.dataForm.memberId) {
                params.name = this.memberList[i].name;
                break;
              }
            }
          }
          if (params.name === "") {
            this.$alert("预约人姓名不能为空");
            return;
          }

          console.log(JSON.stringify(params));
          var tick = !this.dataForm.id ? API.appointment.add(params) : API.appointment.update(params);
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

<style scoped lang="scss">
.w-list {
  span {
    margin-right: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
}
</style>

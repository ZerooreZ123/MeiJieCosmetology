<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="订单号" prop="orderNo">
        <el-input v-model="dataForm.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="订单类型：1、开单 2、开卡购卡 3、卡充值" prop="orderType">
        <el-input v-model="dataForm.orderType" placeholder="订单类型：1、开单 2、开卡购卡 3、卡充值"></el-input>
      </el-form-item>
      <el-form-item label="会员ID" prop="memberId">
        <el-input v-model="dataForm.memberId" placeholder="会员ID"></el-input>
      </el-form-item>
      <el-form-item label="会员数量" prop="memberNums">
        <el-input v-model="dataForm.memberNums" placeholder="会员数量"></el-input>
      </el-form-item>
      <el-form-item label="总价" prop="totalPrice">
        <el-input v-model="dataForm.totalPrice" placeholder="总价"></el-input>
      </el-form-item>
      <el-form-item label="实际金额" prop="realPrice">
        <el-input v-model="dataForm.realPrice" placeholder="实际金额"></el-input>
      </el-form-item>
      <el-form-item label="剩余支付费用" prop="needPay">
        <el-input v-model="dataForm.needPay" placeholder="剩余支付费用"></el-input>
      </el-form-item>
      <el-form-item label="状态：1、待付款 2、已付款 3、尾款单 4、已取消 5、已退单" prop="status">
        <el-input v-model="dataForm.status" placeholder="状态：1、待付款 2、已付款 3、尾款单 4、已取消 5、已退单"></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId">
        <el-input v-model="dataForm.officeId" placeholder="所属门店"></el-input>
      </el-form-item>
      <el-form-item label="流水单号" prop="serialNo">
        <el-input v-model="dataForm.serialNo" placeholder="流水单号"></el-input>
      </el-form-item>
      <el-form-item label="支付时间" prop="payTime">
        <el-input v-model="dataForm.payTime" placeholder="支付时间"></el-input>
      </el-form-item>
      <el-form-item label="退单时间" prop="refundTime">
        <el-input v-model="dataForm.refundTime" placeholder="退单时间"></el-input>
      </el-form-item>
      <el-form-item label="创建者" prop="createBy">
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
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="备注信息"></el-input>
      </el-form-item>
      <el-form-item label="删除标记" prop="delFlag">
        <el-input v-model="dataForm.delFlag" placeholder="删除标记"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import API from '@/api'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          orderNo: '',
          orderType: '',
          memberId: '',
          memberNums: '',
          totalPrice: '',
          realPrice: '',
          needPay: '',
          status: '',
          officeId: '',
          serialNo: '',
          payTime: '',
          refundTime: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          orderNo: [
            { required: true, message: '订单号不能为空', trigger: 'blur' }
          ],
          orderType: [
            { required: true, message: '订单类型：1、开单 2、开卡购卡 3、卡充值不能为空', trigger: 'blur' }
          ],
          memberId: [
            { required: true, message: '会员ID不能为空', trigger: 'blur' }
          ],
          memberNums: [
            { required: true, message: '会员数量不能为空', trigger: 'blur' }
          ],
          totalPrice: [
            { required: true, message: '总价不能为空', trigger: 'blur' }
          ],
          realPrice: [
            { required: true, message: '实际金额不能为空', trigger: 'blur' }
          ],
          needPay: [
            { required: true, message: '剩余支付费用不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态：1、待付款 2、已付款 3、尾款单 4、已取消 5、已退单不能为空', trigger: 'blur' }
          ],
          officeId: [
            { required: true, message: '所属门店不能为空', trigger: 'blur' }
          ],
          serialNo: [
            { required: true, message: '流水单号不能为空', trigger: 'blur' }
          ],
          payTime: [
            { required: true, message: '支付时间不能为空', trigger: 'blur' }
          ],
          refundTime: [
            { required: true, message: '退单时间不能为空', trigger: 'blur' }
          ],
          createBy: [
            { required: true, message: '创建者不能为空', trigger: 'blur' }
          ],
          createDate: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateBy: [
            { required: true, message: '更新者不能为空', trigger: 'blur' }
          ],
          updateDate: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          remarks: [
            { required: true, message: '备注信息不能为空', trigger: 'blur' }
          ],
          delFlag: [
            { required: true, message: '删除标记不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            API.miorder.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderNo = data.miorder.orderNo
                this.dataForm.orderType = data.miorder.orderType
                this.dataForm.memberId = data.miorder.memberId
                this.dataForm.memberNums = data.miorder.memberNums
                this.dataForm.totalPrice = data.miorder.totalPrice
                this.dataForm.realPrice = data.miorder.realPrice
                this.dataForm.needPay = data.miorder.needPay
                this.dataForm.status = data.miorder.status
                this.dataForm.officeId = data.miorder.officeId
                this.dataForm.serialNo = data.miorder.serialNo
                this.dataForm.payTime = data.miorder.payTime
                this.dataForm.refundTime = data.miorder.refundTime
                this.dataForm.createBy = data.miorder.createBy
                this.dataForm.createDate = data.miorder.createDate
                this.dataForm.updateBy = data.miorder.updateBy
                this.dataForm.updateDate = data.miorder.updateDate
                this.dataForm.remarks = data.miorder.remarks
                this.dataForm.delFlag = data.miorder.delFlag
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var params = {
              'id': this.dataForm.id || undefined,
              'orderNo': this.dataForm.orderNo,
              'orderType': this.dataForm.orderType,
              'memberId': this.dataForm.memberId,
              'memberNums': this.dataForm.memberNums,
              'totalPrice': this.dataForm.totalPrice,
              'realPrice': this.dataForm.realPrice,
              'needPay': this.dataForm.needPay,
              'status': this.dataForm.status,
              'officeId': this.dataForm.officeId,
              'serialNo': this.dataForm.serialNo,
              'payTime': this.dataForm.payTime,
              'refundTime': this.dataForm.refundTime,
              'createBy': this.dataForm.createBy,
              'createDate': this.dataForm.createDate,
              'updateBy': this.dataForm.updateBy,
              'updateDate': this.dataForm.updateDate,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            }
            var tick = !this.dataForm.id ? API.miorder.add(params) : API.miorder.update(params)
            tick.then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>

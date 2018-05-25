<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="订单ID" prop="orderId">
        <el-input v-model="dataForm.orderId" placeholder="订单ID"></el-input>
      </el-form-item>
      <el-form-item label="服务类型：1、项目 2、产品 3、套餐 4、附加费 5、开卡购卡 6、充值" prop="serviceType">
        <el-input v-model="dataForm.serviceType" placeholder="服务类型：1、项目 2、产品 3、套餐 4、附加费 5、开卡购卡 6、充值"></el-input>
      </el-form-item>
      <el-form-item label="服务ID：当为附加费赋值0" prop="serviceId">
        <el-input v-model="dataForm.serviceId" placeholder="服务ID：当为附加费赋值0"></el-input>
      </el-form-item>
      <el-form-item label="服务名称" prop="serviceName">
        <el-input v-model="dataForm.serviceName" placeholder="服务名称"></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="servicePrice">
        <el-input v-model="dataForm.servicePrice" placeholder="单价"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="nums">
        <el-input v-model="dataForm.nums" placeholder="数量"></el-input>
      </el-form-item>
      <el-form-item label="剩余需支付费用" prop="serviceNeedPay">
        <el-input v-model="dataForm.serviceNeedPay" placeholder="剩余需支付费用"></el-input>
      </el-form-item>
      <el-form-item label="小计" prop="subtotal">
        <el-input v-model="dataForm.subtotal" placeholder="小计"></el-input>
      </el-form-item>
      <el-form-item label="折扣点数：7、7折 8、8折" prop="discount">
        <el-input v-model="dataForm.discount" placeholder="折扣点数：7、7折 8、8折"></el-input>
      </el-form-item>
      <el-form-item label="服务技师" prop="serviceTechnician">
        <el-input v-model="dataForm.serviceTechnician" placeholder="服务技师"></el-input>
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
          orderId: '',
          serviceType: '',
          serviceId: '',
          serviceName: '',
          servicePrice: '',
          nums: '',
          serviceNeedPay: '',
          subtotal: '',
          discount: '',
          serviceTechnician: ''
        },
        dataRule: {
          orderId: [
            { required: true, message: '订单ID不能为空', trigger: 'blur' }
          ],
          serviceType: [
            { required: true, message: '服务类型：1、项目 2、产品 3、套餐 4、附加费 5、开卡购卡 6、充值不能为空', trigger: 'blur' }
          ],
          serviceId: [
            { required: true, message: '服务ID：当为附加费赋值0不能为空', trigger: 'blur' }
          ],
          serviceName: [
            { required: true, message: '服务名称不能为空', trigger: 'blur' }
          ],
          servicePrice: [
            { required: true, message: '单价不能为空', trigger: 'blur' }
          ],
          nums: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          serviceNeedPay: [
            { required: true, message: '剩余需支付费用不能为空', trigger: 'blur' }
          ],
          subtotal: [
            { required: true, message: '小计不能为空', trigger: 'blur' }
          ],
          discount: [
            { required: true, message: '折扣点数：7、7折 8、8折不能为空', trigger: 'blur' }
          ],
          serviceTechnician: [
            { required: true, message: '服务技师不能为空', trigger: 'blur' }
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
            API.miorderdetail.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderId = data.miorderdetail.orderId
                this.dataForm.serviceType = data.miorderdetail.serviceType
                this.dataForm.serviceId = data.miorderdetail.serviceId
                this.dataForm.serviceName = data.miorderdetail.serviceName
                this.dataForm.servicePrice = data.miorderdetail.servicePrice
                this.dataForm.nums = data.miorderdetail.nums
                this.dataForm.serviceNeedPay = data.miorderdetail.serviceNeedPay
                this.dataForm.subtotal = data.miorderdetail.subtotal
                this.dataForm.discount = data.miorderdetail.discount
                this.dataForm.serviceTechnician = data.miorderdetail.serviceTechnician
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
              'orderId': this.dataForm.orderId,
              'serviceType': this.dataForm.serviceType,
              'serviceId': this.dataForm.serviceId,
              'serviceName': this.dataForm.serviceName,
              'servicePrice': this.dataForm.servicePrice,
              'nums': this.dataForm.nums,
              'serviceNeedPay': this.dataForm.serviceNeedPay,
              'subtotal': this.dataForm.subtotal,
              'discount': this.dataForm.discount,
              'serviceTechnician': this.dataForm.serviceTechnician
            }
            var tick = !this.dataForm.id ? API.miorderdetail.add(params) : API.miorderdetail.update(params)
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

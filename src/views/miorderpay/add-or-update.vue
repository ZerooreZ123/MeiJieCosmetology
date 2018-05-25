<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="订单明细ID" prop="orderDetailId">
        <el-input v-model="dataForm.orderDetailId" placeholder="订单明细ID"></el-input>
      </el-form-item>
      <el-form-item label="付款方式" prop="payMethod">
        <el-input v-model="dataForm.payMethod" placeholder="付款方式"></el-input>
      </el-form-item>
      <el-form-item label="付款金额" prop="payPrice">
        <el-input v-model="dataForm.payPrice" placeholder="付款金额"></el-input>
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
          orderDetailId: '',
          payMethod: '',
          payPrice: ''
        },
        dataRule: {
          orderDetailId: [
            { required: true, message: '订单明细ID不能为空', trigger: 'blur' }
          ],
          payMethod: [
            { required: true, message: '付款方式不能为空', trigger: 'blur' }
          ],
          payPrice: [
            { required: true, message: '付款金额不能为空', trigger: 'blur' }
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
            API.miorderpay.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderDetailId = data.miorderpay.orderDetailId
                this.dataForm.payMethod = data.miorderpay.payMethod
                this.dataForm.payPrice = data.miorderpay.payPrice
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
              'orderDetailId': this.dataForm.orderDetailId,
              'payMethod': this.dataForm.payMethod,
              'payPrice': this.dataForm.payPrice
            }
            var tick = !this.dataForm.id ? API.miorderpay.add(params) : API.miorderpay.update(params)
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

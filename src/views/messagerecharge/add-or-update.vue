<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="所属门店" prop="officeId">
        <el-input v-model="dataForm.officeId" placeholder="所属门店"></el-input>
      </el-form-item>
      <el-form-item label="订单号" prop="orderNo">
        <el-input v-model="dataForm.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="采购日期" prop="purchaseDate">
        <el-input v-model="dataForm.purchaseDate" placeholder="采购日期"></el-input>
      </el-form-item>
      <el-form-item label="套餐ID" prop="mealId">
        <el-input v-model="dataForm.mealId" placeholder="套餐ID"></el-input>
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
          officeId: '',
          orderNo: '',
          purchaseDate: '',
          mealId: ''
        },
        dataRule: {
          officeId: [
            { required: true, message: '所属门店不能为空', trigger: 'blur' }
          ],
          orderNo: [
            { required: true, message: '订单号不能为空', trigger: 'blur' }
          ],
          purchaseDate: [
            { required: true, message: '采购日期不能为空', trigger: 'blur' }
          ],
          mealId: [
            { required: true, message: '套餐ID不能为空', trigger: 'blur' }
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
            API.messagerecharge.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.officeId = data.messagerecharge.officeId
                this.dataForm.orderNo = data.messagerecharge.orderNo
                this.dataForm.purchaseDate = data.messagerecharge.purchaseDate
                this.dataForm.mealId = data.messagerecharge.mealId
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
              'officeId': this.dataForm.officeId,
              'orderNo': this.dataForm.orderNo,
              'purchaseDate': this.dataForm.purchaseDate,
              'mealId': this.dataForm.mealId
            }
            var tick = !this.dataForm.id ? API.messagerecharge.add(params) : API.messagerecharge.update(params)
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

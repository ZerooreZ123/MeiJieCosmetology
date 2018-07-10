<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="卡ID" prop="cardId">
        <el-input v-model="dataForm.cardId" placeholder="卡ID"></el-input>
      </el-form-item>
      <el-form-item label="赠送类型:0.开卡赠送,1.充值赠送" prop="giveType">
        <el-input v-model="dataForm.giveType" placeholder="赠送类型:0.开卡赠送,1.充值赠送"></el-input>
      </el-form-item>
      <el-form-item label="服务类型：1、项目 2、产品 3、套餐 4、开卡购卡" prop="serviceType">
        <el-input v-model="dataForm.serviceType" placeholder="服务类型：1、项目 2、产品 3、套餐 4、开卡购卡"></el-input>
      </el-form-item>
      <el-form-item label="服务ID" prop="serviceId">
        <el-input v-model="dataForm.serviceId" placeholder="服务ID"></el-input>
      </el-form-item>
      <el-form-item label="服务名称" prop="serviceName">
        <el-input v-model="dataForm.serviceName" placeholder="服务名称"></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="servicePrice">
        <el-input v-model="dataForm.servicePrice" placeholder="单价"></el-input>
      </el-form-item>
      <el-form-item label="赠送次数" prop="frequency">
        <el-input v-model="dataForm.frequency" placeholder="赠送次数"></el-input>
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
          cardId: '',
          giveType: '',
          serviceType: '',
          serviceId: '',
          serviceName: '',
          servicePrice: '',
          frequency: ''
        },
        dataRule: {
          cardId: [
            { required: true, message: '卡ID不能为空', trigger: 'blur' }
          ],
          giveType: [
            { required: true, message: '赠送类型:0.开卡赠送,1.充值赠送不能为空', trigger: 'blur' }
          ],
          serviceType: [
            { required: true, message: '服务类型：1、项目 2、产品 3、套餐 4、开卡购卡不能为空', trigger: 'blur' }
          ],
          serviceId: [
            { required: true, message: '服务ID不能为空', trigger: 'blur' }
          ],
          serviceName: [
            { required: true, message: '服务名称不能为空', trigger: 'blur' }
          ],
          servicePrice: [
            { required: true, message: '单价不能为空', trigger: 'blur' }
          ],
          frequency: [
            { required: true, message: '赠送次数不能为空', trigger: 'blur' }
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
            API.servicecardgive.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.cardId = data.servicecardgive.cardId
                this.dataForm.giveType = data.servicecardgive.giveType
                this.dataForm.serviceType = data.servicecardgive.serviceType
                this.dataForm.serviceId = data.servicecardgive.serviceId
                this.dataForm.serviceName = data.servicecardgive.serviceName
                this.dataForm.servicePrice = data.servicecardgive.servicePrice
                this.dataForm.frequency = data.servicecardgive.frequency
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
              'cardId': this.dataForm.cardId,
              'giveType': this.dataForm.giveType,
              'serviceType': this.dataForm.serviceType,
              'serviceId': this.dataForm.serviceId,
              'serviceName': this.dataForm.serviceName,
              'servicePrice': this.dataForm.servicePrice,
              'frequency': this.dataForm.frequency
            }
            var tick = !this.dataForm.id ? API.servicecardgive.add(params) : API.servicecardgive.update(params)
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

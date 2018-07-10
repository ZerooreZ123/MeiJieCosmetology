<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="卡ID" prop="cardId">
        <el-input v-model="dataForm.cardId" placeholder="卡ID"></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId">
        <el-input v-model="dataForm.officeId" placeholder="所属门店"></el-input>
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
      <el-form-item label="折扣类型:0.减价,1.打折" prop="discountType">
        <el-input v-model="dataForm.discountType" placeholder="折扣类型:0.减价,1.打折"></el-input>
      </el-form-item>
      <el-form-item label="" prop="discountNum">
        <el-input v-model="dataForm.discountNum" placeholder=""></el-input>
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
          officeId: '',
          serviceType: '',
          serviceId: '',
          serviceName: '',
          discountType: '',
          discountNum: ''
        },
        dataRule: {
          cardId: [
            { required: true, message: '卡ID不能为空', trigger: 'blur' }
          ],
          officeId: [
            { required: true, message: '所属门店不能为空', trigger: 'blur' }
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
          discountType: [
            { required: true, message: '折扣类型:0.减价,1.打折不能为空', trigger: 'blur' }
          ],
          discountNum: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
            API.servicecardcontent.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.cardId = data.servicecardcontent.cardId
                this.dataForm.officeId = data.servicecardcontent.officeId
                this.dataForm.serviceType = data.servicecardcontent.serviceType
                this.dataForm.serviceId = data.servicecardcontent.serviceId
                this.dataForm.serviceName = data.servicecardcontent.serviceName
                this.dataForm.discountType = data.servicecardcontent.discountType
                this.dataForm.discountNum = data.servicecardcontent.discountNum
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
              'officeId': this.dataForm.officeId,
              'serviceType': this.dataForm.serviceType,
              'serviceId': this.dataForm.serviceId,
              'serviceName': this.dataForm.serviceName,
              'discountType': this.dataForm.discountType,
              'discountNum': this.dataForm.discountNum
            }
            var tick = !this.dataForm.id ? API.servicecardcontent.add(params) : API.servicecardcontent.update(params)
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

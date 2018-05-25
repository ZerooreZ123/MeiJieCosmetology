<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="预约记录ID" prop="appointId">
        <el-input v-model="dataForm.appointId" placeholder="预约记录ID"></el-input>
      </el-form-item>
      <el-form-item label="预约明细服务类型：1、项目 2、产品 3、套餐" prop="serviceType">
        <el-input v-model="dataForm.serviceType" placeholder="预约明细服务类型：1、项目 2、产品 3、套餐"></el-input>
      </el-form-item>
      <el-form-item label="服务ID" prop="serviceId">
        <el-input v-model="dataForm.serviceId" placeholder="服务ID"></el-input>
      </el-form-item>
      <el-form-item label="服务名称" prop="serviceName">
        <el-input v-model="dataForm.serviceName" placeholder="服务名称"></el-input>
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
          appointId: '',
          serviceType: '',
          serviceId: '',
          serviceName: ''
        },
        dataRule: {
          appointId: [
            { required: true, message: '预约记录ID不能为空', trigger: 'blur' }
          ],
          serviceType: [
            { required: true, message: '预约明细服务类型：1、项目 2、产品 3、套餐不能为空', trigger: 'blur' }
          ],
          serviceId: [
            { required: true, message: '服务ID不能为空', trigger: 'blur' }
          ],
          serviceName: [
            { required: true, message: '服务名称不能为空', trigger: 'blur' }
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
            API.appointdeatail.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.appointId = data.appointdeatail.appointId
                this.dataForm.serviceType = data.appointdeatail.serviceType
                this.dataForm.serviceId = data.appointdeatail.serviceId
                this.dataForm.serviceName = data.appointdeatail.serviceName
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
              'appointId': this.dataForm.appointId,
              'serviceType': this.dataForm.serviceType,
              'serviceId': this.dataForm.serviceId,
              'serviceName': this.dataForm.serviceName
            }
            var tick = !this.dataForm.id ? API.appointdeatail.add(params) : API.appointdeatail.update(params)
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

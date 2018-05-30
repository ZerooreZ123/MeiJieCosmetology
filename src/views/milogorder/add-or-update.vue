<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="订单ID" prop="orderId">
        <el-input v-model="dataForm.orderId" placeholder="订单ID"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="logContent">
        <el-input v-model="dataForm.logContent" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item label="操作人" prop="logUserId">
        <el-input v-model="dataForm.logUserId" placeholder="操作人"></el-input>
      </el-form-item>
      <el-form-item label="操作类型" prop="logType">
        <el-input v-model="dataForm.logType" placeholder="操作类型"></el-input>
      </el-form-item>
      <el-form-item label="操作时间" prop="logTime">
        <el-input v-model="dataForm.logTime" placeholder="操作时间"></el-input>
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
          logContent: '',
          logUserId: '',
          logType: '',
          logTime: ''
        },
        dataRule: {
          orderId: [
            { required: true, message: '订单ID不能为空', trigger: 'blur' }
          ],
          logContent: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          logUserId: [
            { required: true, message: '操作人不能为空', trigger: 'blur' }
          ],
          logType: [
            { required: true, message: '操作类型不能为空', trigger: 'blur' }
          ],
          logTime: [
            { required: true, message: '操作时间不能为空', trigger: 'blur' }
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
            API.milogorder.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderId = data.milogorder.orderId
                this.dataForm.logContent = data.milogorder.logContent
                this.dataForm.logUserId = data.milogorder.logUserId
                this.dataForm.logType = data.milogorder.logType
                this.dataForm.logTime = data.milogorder.logTime
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
              'logContent': this.dataForm.logContent,
              'logUserId': this.dataForm.logUserId,
              'logType': this.dataForm.logType,
              'logTime': this.dataForm.logTime
            }
            var tick = !this.dataForm.id ? API.milogorder.add(params) : API.milogorder.update(params)
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

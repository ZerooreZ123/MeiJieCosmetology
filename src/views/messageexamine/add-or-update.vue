<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="短信模板ID" prop="templateId">
        <el-input v-model="dataForm.templateId" placeholder="短信模板ID"></el-input>
      </el-form-item>
      <el-form-item label="发送短信数量" prop="messageNum">
        <el-input v-model="dataForm.messageNum" placeholder="发送短信数量"></el-input>
      </el-form-item>
      <el-form-item label="发送会员数量" prop="memberNum">
        <el-input v-model="dataForm.memberNum" placeholder="发送会员数量"></el-input>
      </el-form-item>
      <el-form-item label="审核状态(0:未通过,1通过)" prop="examineStatus">
        <el-input v-model="dataForm.examineStatus" placeholder="审核状态(0:未通过,1通过)"></el-input>
      </el-form-item>
      <el-form-item label="发送状态(0:异常,1正常)" prop="sendStatus">
        <el-input v-model="dataForm.sendStatus" placeholder="发送状态(0:异常,1正常)"></el-input>
      </el-form-item>
      <el-form-item label="发送时间" prop="sendTime">
        <el-input v-model="dataForm.sendTime" placeholder="发送时间"></el-input>
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
          templateId: '',
          messageNum: '',
          memberNum: '',
          examineStatus: '',
          sendStatus: '',
          sendTime: ''
        },
        dataRule: {
          templateId: [
            { required: true, message: '短信模板ID不能为空', trigger: 'blur' }
          ],
          messageNum: [
            { required: true, message: '发送短信数量不能为空', trigger: 'blur' }
          ],
          memberNum: [
            { required: true, message: '发送会员数量不能为空', trigger: 'blur' }
          ],
          examineStatus: [
            { required: true, message: '审核状态(0:未通过,1通过)不能为空', trigger: 'blur' }
          ],
          sendStatus: [
            { required: true, message: '发送状态(0:异常,1正常)不能为空', trigger: 'blur' }
          ],
          sendTime: [
            { required: true, message: '发送时间不能为空', trigger: 'blur' }
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
            API.messageexamine.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.templateId = data.messageExamine.templateId
                this.dataForm.messageNum = data.messageExamine.messageNum
                this.dataForm.memberNum = data.messageExamine.memberNum
                this.dataForm.examineStatus = data.messageExamine.examineStatus
                this.dataForm.sendStatus = data.messageExamine.sendStatus
                this.dataForm.sendTime = data.messageExamine.sendTime
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
              'templateId': this.dataForm.templateId,
              'messageNum': this.dataForm.messageNum,
              'memberNum': this.dataForm.memberNum,
              'examineStatus': this.dataForm.examineStatus,
              'sendStatus': this.dataForm.sendStatus,
              'sendTime': this.dataForm.sendTime
            }
            var tick = !this.dataForm.id ? API.messageexamine.add(params) : API.messageexamine.update(params)
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

<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="所属门店" prop="officeId">
        <el-input v-model="dataForm.officeId" placeholder="所属门店"></el-input>
      </el-form-item>
      <el-form-item label="短信库存数量" prop="messageStock">
        <el-input v-model="dataForm.messageStock" placeholder="短信库存数量"></el-input>
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
          messageStock: ''
        },
        dataRule: {
          officeId: [
            { required: true, message: '所属门店不能为空', trigger: 'blur' }
          ],
          messageStock: [
            { required: true, message: '短信库存数量不能为空', trigger: 'blur' }
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
            API.messageoffice.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.officeId = data.messageoffice.officeId
                this.dataForm.messageStock = data.messageoffice.messageStock
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
              'messageStock': this.dataForm.messageStock
            }
            var tick = !this.dataForm.id ? API.messageoffice.add(params) : API.messageoffice.update(params)
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

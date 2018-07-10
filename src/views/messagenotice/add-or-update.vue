<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="短信模板ID" prop="templateId">
        <el-input v-model="dataForm.templateId" placeholder="短信模板ID"></el-input>
      </el-form-item>
      <el-form-item label="会员ID" prop="memberId">
        <el-input v-model="dataForm.memberId" placeholder="会员ID"></el-input>
      </el-form-item>
      <el-form-item label="审核ID" prop="examineId">
        <el-input v-model="dataForm.examineId" placeholder="审核ID"></el-input>
      </el-form-item>
      <el-form-item label="短信内容" prop="content">
        <el-input v-model="dataForm.content" placeholder="短信内容"></el-input>
      </el-form-item>
      <el-form-item label="状态:0.可售,1.只可用不可售" prop="status">
        <el-input v-model="dataForm.status" placeholder="状态:0.可售,1.只可用不可售"></el-input>
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
          templateId: '',
          memberId: '',
          examineId: '',
          content: '',
          status: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          templateId: [
            { required: true, message: '短信模板ID不能为空', trigger: 'blur' }
          ],
          memberId: [
            { required: true, message: '会员ID不能为空', trigger: 'blur' }
          ],
          examineId: [
            { required: true, message: '审核ID不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '短信内容不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态:0.可售,1.只可用不可售不能为空', trigger: 'blur' }
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
            API.messagenotice.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.templateId = data.messageNotice.templateId
                this.dataForm.memberId = data.messageNotice.memberId
                this.dataForm.examineId = data.messageNotice.examineId
                this.dataForm.content = data.messageNotice.content
                this.dataForm.status = data.messageNotice.status
                this.dataForm.createBy = data.messageNotice.createBy
                this.dataForm.createDate = data.messageNotice.createDate
                this.dataForm.updateBy = data.messageNotice.updateBy
                this.dataForm.updateDate = data.messageNotice.updateDate
                this.dataForm.remarks = data.messageNotice.remarks
                this.dataForm.delFlag = data.messageNotice.delFlag
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
              'memberId': this.dataForm.memberId,
              'examineId': this.dataForm.examineId,
              'content': this.dataForm.content,
              'status': this.dataForm.status,
              'createBy': this.dataForm.createBy,
              'createDate': this.dataForm.createDate,
              'updateBy': this.dataForm.updateBy,
              'updateDate': this.dataForm.updateDate,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            }
            var tick = !this.dataForm.id ? API.messagenotice.add(params) : API.messagenotice.update(params)
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

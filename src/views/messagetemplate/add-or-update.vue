<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="所属门店" prop="officeId">
        <el-input v-model="dataForm.officeId" placeholder="所属门店"></el-input>
      </el-form-item>
      <el-form-item label="模板CODE" prop="code">
        <el-input v-model="dataForm.code" placeholder="模板CODE"></el-input>
      </el-form-item>
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="模板名称"></el-input>
      </el-form-item>
      <el-form-item label="模板内容" prop="content">
        <el-input v-model="dataForm.content" placeholder="模板内容"></el-input>
      </el-form-item>
      <el-form-item label="短信类型(0:客户提醒,1:商户提醒)" prop="type">
        <el-input v-model="dataForm.type" placeholder="短信类型(0:客户提醒,1:商户提醒)"></el-input>
      </el-form-item>
      <el-form-item label="短信参数" prop="params">
        <el-input v-model="dataForm.params" placeholder="短信参数"></el-input>
      </el-form-item>
      <el-form-item label="是否启用(0:禁用,1:启用)" prop="isEnable">
        <el-input v-model="dataForm.isEnable" placeholder="是否启用(0:禁用,1:启用)"></el-input>
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
          officeId: '',
          code: '',
          name: '',
          content: '',
          type: '',
          params: '',
          isEnable: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          officeId: [
            { required: true, message: '所属门店不能为空', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '模板CODE不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '模板名称不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '模板内容不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '短信类型(0:客户提醒,1:商户提醒)不能为空', trigger: 'blur' }
          ],
          params: [
            { required: true, message: '短信参数不能为空', trigger: 'blur' }
          ],
          isEnable: [
            { required: true, message: '是否启用(0:禁用,1:启用)不能为空', trigger: 'blur' }
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
            API.messagetemplate.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.officeId = data.messagetemplate.officeId
                this.dataForm.code = data.messagetemplate.code
                this.dataForm.name = data.messagetemplate.name
                this.dataForm.content = data.messagetemplate.content
                this.dataForm.type = data.messagetemplate.type
                this.dataForm.params = data.messagetemplate.params
                this.dataForm.isEnable = data.messagetemplate.isEnable
                this.dataForm.createBy = data.messagetemplate.createBy
                this.dataForm.createDate = data.messagetemplate.createDate
                this.dataForm.updateBy = data.messagetemplate.updateBy
                this.dataForm.updateDate = data.messagetemplate.updateDate
                this.dataForm.remarks = data.messagetemplate.remarks
                this.dataForm.delFlag = data.messagetemplate.delFlag
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
              'code': this.dataForm.code,
              'name': this.dataForm.name,
              'content': this.dataForm.content,
              'type': this.dataForm.type,
              'params': this.dataForm.params,
              'isEnable': this.dataForm.isEnable,
              'createBy': this.dataForm.createBy,
              'createDate': this.dataForm.createDate,
              'updateBy': this.dataForm.updateBy,
              'updateDate': this.dataForm.updateDate,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            }
            var tick = !this.dataForm.id ? API.messagetemplate.add(params) : API.messagetemplate.update(params)
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

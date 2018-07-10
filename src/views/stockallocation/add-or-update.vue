<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="类型(申请调拨/调拨他人)" prop="type">
        <el-input v-model="dataForm.type" placeholder="类型(申请调拨/调拨他人)"></el-input>
      </el-form-item>
      <el-form-item label="发货部门" prop="consignorOffice">
        <el-input v-model="dataForm.consignorOffice" placeholder="发货部门"></el-input>
      </el-form-item>
      <el-form-item label="接收部门" prop="receiveOffice">
        <el-input v-model="dataForm.receiveOffice" placeholder="接收部门"></el-input>
      </el-form-item>
      <el-form-item label="经办人" prop="transactor">
        <el-input v-model="dataForm.transactor" placeholder="经办人"></el-input>
      </el-form-item>
      <el-form-item label="审核人" prop="auditor">
        <el-input v-model="dataForm.auditor" placeholder="审核人"></el-input>
      </el-form-item>
      <el-form-item label="审核状态" prop="status">
        <el-input v-model="dataForm.status" placeholder="审核状态"></el-input>
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
          type: '',
          consignorOffice: '',
          receiveOffice: '',
          transactor: '',
          auditor: '',
          status: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          type: [
            { required: true, message: '类型(申请调拨/调拨他人)不能为空', trigger: 'blur' }
          ],
          consignorOffice: [
            { required: true, message: '发货部门不能为空', trigger: 'blur' }
          ],
          receiveOffice: [
            { required: true, message: '接收部门不能为空', trigger: 'blur' }
          ],
          transactor: [
            { required: true, message: '经办人不能为空', trigger: 'blur' }
          ],
          auditor: [
            { required: true, message: '审核人不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '审核状态不能为空', trigger: 'blur' }
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
            API.stockallocation.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.type = data.stockallocation.type
                this.dataForm.consignorOffice = data.stockallocation.consignorOffice
                this.dataForm.receiveOffice = data.stockallocation.receiveOffice
                this.dataForm.transactor = data.stockallocation.transactor
                this.dataForm.auditor = data.stockallocation.auditor
                this.dataForm.status = data.stockallocation.status
                this.dataForm.createBy = data.stockallocation.createBy
                this.dataForm.createDate = data.stockallocation.createDate
                this.dataForm.updateBy = data.stockallocation.updateBy
                this.dataForm.updateDate = data.stockallocation.updateDate
                this.dataForm.remarks = data.stockallocation.remarks
                this.dataForm.delFlag = data.stockallocation.delFlag
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
              'type': this.dataForm.type,
              'consignorOffice': this.dataForm.consignorOffice,
              'receiveOffice': this.dataForm.receiveOffice,
              'transactor': this.dataForm.transactor,
              'auditor': this.dataForm.auditor,
              'status': this.dataForm.status,
              'createBy': this.dataForm.createBy,
              'createDate': this.dataForm.createDate,
              'updateBy': this.dataForm.updateBy,
              'updateDate': this.dataForm.updateDate,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            }
            var tick = !this.dataForm.id ? API.stockallocation.add(params) : API.stockallocation.update(params)
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

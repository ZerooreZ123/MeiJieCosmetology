<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="会员ID" prop="memberId">
        <el-input v-model="dataForm.memberId" placeholder="会员ID"></el-input>
      </el-form-item>
      <el-form-item label="卡ID" prop="cardId">
        <el-input v-model="dataForm.cardId" placeholder="卡ID"></el-input>
      </el-form-item>
      <el-form-item label="卡编号" prop="cardno">
        <el-input v-model="dataForm.cardno" placeholder="卡编号"></el-input>
      </el-form-item>
      <el-form-item label="订单ID" prop="orderId">
        <el-input v-model="dataForm.orderId" placeholder="订单ID"></el-input>
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
          memberId: '',
          cardId: '',
          cardno: '',
          orderId: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          memberId: [
            { required: true, message: '会员ID不能为空', trigger: 'blur' }
          ],
          cardId: [
            { required: true, message: '卡ID不能为空', trigger: 'blur' }
          ],
          cardno: [
            { required: true, message: '卡编号不能为空', trigger: 'blur' }
          ],
          orderId: [
            { required: true, message: '订单ID不能为空', trigger: 'blur' }
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
            API.membercard.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.memberId = data.membercard.memberId
                this.dataForm.cardId = data.membercard.cardId
                this.dataForm.cardno = data.membercard.cardno
                this.dataForm.orderId = data.membercard.orderId
                this.dataForm.createBy = data.membercard.createBy
                this.dataForm.createDate = data.membercard.createDate
                this.dataForm.updateBy = data.membercard.updateBy
                this.dataForm.updateDate = data.membercard.updateDate
                this.dataForm.remarks = data.membercard.remarks
                this.dataForm.delFlag = data.membercard.delFlag
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
              'memberId': this.dataForm.memberId,
              'cardId': this.dataForm.cardId,
              'cardno': this.dataForm.cardno,
              'orderId': this.dataForm.orderId,
              'createBy': this.dataForm.createBy,
              'createDate': this.dataForm.createDate,
              'updateBy': this.dataForm.updateBy,
              'updateDate': this.dataForm.updateDate,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            }
            var tick = !this.dataForm.id ? API.membercard.add(params) : API.membercard.update(params)
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

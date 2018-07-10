<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="采购部门" prop="officeId">
        <el-input v-model="dataForm.officeId" placeholder="采购部门"></el-input>
      </el-form-item>
      <el-form-item label="采购日期" prop="purchaseDate">
        <el-input v-model="dataForm.purchaseDate" placeholder="采购日期"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="dataForm.type" placeholder="类型"></el-input>
      </el-form-item>
      <el-form-item label="办理人" prop="transactor">
        <el-input v-model="dataForm.transactor" placeholder="办理人"></el-input>
      </el-form-item>
      <el-form-item label="供应商" prop="supplierId">
        <el-input v-model="dataForm.supplierId" placeholder="供应商"></el-input>
      </el-form-item>
      <el-form-item label="采购金额" prop="purchaseAmount">
        <el-input v-model="dataForm.purchaseAmount" placeholder="采购金额"></el-input>
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
          purchaseDate: '',
          type: '',
          transactor: '',
          supplierId: '',
          purchaseAmount: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          officeId: [
            { required: true, message: '采购部门不能为空', trigger: 'blur' }
          ],
          purchaseDate: [
            { required: true, message: '采购日期不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          transactor: [
            { required: true, message: '办理人不能为空', trigger: 'blur' }
          ],
          supplierId: [
            { required: true, message: '供应商不能为空', trigger: 'blur' }
          ],
          purchaseAmount: [
            { required: true, message: '采购金额不能为空', trigger: 'blur' }
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
            API.stockpurchase.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.officeId = data.stockpurchase.officeId
                this.dataForm.purchaseDate = data.stockpurchase.purchaseDate
                this.dataForm.type = data.stockpurchase.type
                this.dataForm.transactor = data.stockpurchase.transactor
                this.dataForm.supplierId = data.stockpurchase.supplierId
                this.dataForm.purchaseAmount = data.stockpurchase.purchaseAmount
                this.dataForm.createBy = data.stockpurchase.createBy
                this.dataForm.createDate = data.stockpurchase.createDate
                this.dataForm.updateBy = data.stockpurchase.updateBy
                this.dataForm.updateDate = data.stockpurchase.updateDate
                this.dataForm.remarks = data.stockpurchase.remarks
                this.dataForm.delFlag = data.stockpurchase.delFlag
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
              'purchaseDate': this.dataForm.purchaseDate,
              'type': this.dataForm.type,
              'transactor': this.dataForm.transactor,
              'supplierId': this.dataForm.supplierId,
              'purchaseAmount': this.dataForm.purchaseAmount,
              'createBy': this.dataForm.createBy,
              'createDate': this.dataForm.createDate,
              'updateBy': this.dataForm.updateBy,
              'updateDate': this.dataForm.updateDate,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            }
            var tick = !this.dataForm.id ? API.stockpurchase.add(params) : API.stockpurchase.update(params)
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

<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="消耗门店" prop="officeId">
        <el-input v-model="dataForm.officeId" placeholder="消耗门店"></el-input>
      </el-form-item>
      <el-form-item label="消耗日期" prop="consumeDate">
        <el-input v-model="dataForm.consumeDate" placeholder="消耗日期"></el-input>
      </el-form-item>
      <el-form-item label="盘点人" prop="inventory">
        <el-input v-model="dataForm.inventory" placeholder="盘点人"></el-input>
      </el-form-item>
      <el-form-item label="消耗类型" prop="consumeType">
        <el-input v-model="dataForm.consumeType" placeholder="消耗类型"></el-input>
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
          consumeDate: '',
          inventory: '',
          consumeType: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          officeId: [
            { required: true, message: '消耗门店不能为空', trigger: 'blur' }
          ],
          consumeDate: [
            { required: true, message: '消耗日期不能为空', trigger: 'blur' }
          ],
          inventory: [
            { required: true, message: '盘点人不能为空', trigger: 'blur' }
          ],
          consumeType: [
            { required: true, message: '消耗类型不能为空', trigger: 'blur' }
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
            API.stockconsume.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.officeId = data.stockconsume.officeId
                this.dataForm.consumeDate = data.stockconsume.consumeDate
                this.dataForm.inventory = data.stockconsume.inventory
                this.dataForm.consumeType = data.stockconsume.consumeType
                this.dataForm.createBy = data.stockconsume.createBy
                this.dataForm.createDate = data.stockconsume.createDate
                this.dataForm.updateBy = data.stockconsume.updateBy
                this.dataForm.updateDate = data.stockconsume.updateDate
                this.dataForm.remarks = data.stockconsume.remarks
                this.dataForm.delFlag = data.stockconsume.delFlag
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
              'consumeDate': this.dataForm.consumeDate,
              'inventory': this.dataForm.inventory,
              'consumeType': this.dataForm.consumeType,
              'createBy': this.dataForm.createBy,
              'createDate': this.dataForm.createDate,
              'updateBy': this.dataForm.updateBy,
              'updateDate': this.dataForm.updateDate,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            }
            var tick = !this.dataForm.id ? API.stockconsume.add(params) : API.stockconsume.update(params)
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

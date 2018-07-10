<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="订单ID" prop="orderId">
        <el-input v-model="dataForm.orderId" placeholder="订单ID"></el-input>
      </el-form-item>
      <el-form-item label="卡ID" prop="cardId">
        <el-input v-model="dataForm.cardId" placeholder="卡ID"></el-input>
      </el-form-item>
      <el-form-item label="会员购卡ID" prop="memberCardId">
        <el-input v-model="dataForm.memberCardId" placeholder="会员购卡ID"></el-input>
      </el-form-item>
      <el-form-item label="服务类型：1、项目 2、产品 3、套餐 4、开卡购卡" prop="serviceType">
        <el-input v-model="dataForm.serviceType" placeholder="服务类型：1、项目 2、产品 3、套餐 4、开卡购卡"></el-input>
      </el-form-item>
      <el-form-item label="服务ID" prop="serviceId">
        <el-input v-model="dataForm.serviceId" placeholder="服务ID"></el-input>
      </el-form-item>
      <el-form-item label="服务名称" prop="serviceName">
        <el-input v-model="dataForm.serviceName" placeholder="服务名称"></el-input>
      </el-form-item>
      <el-form-item label="赠送次数" prop="frequency">
        <el-input v-model="dataForm.frequency" placeholder="赠送次数"></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="servicePrice">
        <el-input v-model="dataForm.servicePrice" placeholder="单价"></el-input>
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
          orderId: '',
          cardId: '',
          memberCardId: '',
          serviceType: '',
          serviceId: '',
          serviceName: '',
          frequency: '',
          servicePrice: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          orderId: [
            { required: true, message: '订单ID不能为空', trigger: 'blur' }
          ],
          cardId: [
            { required: true, message: '卡ID不能为空', trigger: 'blur' }
          ],
          memberCardId: [
            { required: true, message: '会员购卡ID不能为空', trigger: 'blur' }
          ],
          serviceType: [
            { required: true, message: '服务类型：1、项目 2、产品 3、套餐 4、开卡购卡不能为空', trigger: 'blur' }
          ],
          serviceId: [
            { required: true, message: '服务ID不能为空', trigger: 'blur' }
          ],
          serviceName: [
            { required: true, message: '服务名称不能为空', trigger: 'blur' }
          ],
          frequency: [
            { required: true, message: '赠送次数不能为空', trigger: 'blur' }
          ],
          servicePrice: [
            { required: true, message: '单价不能为空', trigger: 'blur' }
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
            API.ordercargive.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderId = data.ordercargive.orderId
                this.dataForm.cardId = data.ordercargive.cardId
                this.dataForm.memberCardId = data.ordercargive.memberCardId
                this.dataForm.serviceType = data.ordercargive.serviceType
                this.dataForm.serviceId = data.ordercargive.serviceId
                this.dataForm.serviceName = data.ordercargive.serviceName
                this.dataForm.frequency = data.ordercargive.frequency
                this.dataForm.servicePrice = data.ordercargive.servicePrice
                this.dataForm.createBy = data.ordercargive.createBy
                this.dataForm.createDate = data.ordercargive.createDate
                this.dataForm.updateBy = data.ordercargive.updateBy
                this.dataForm.updateDate = data.ordercargive.updateDate
                this.dataForm.remarks = data.ordercargive.remarks
                this.dataForm.delFlag = data.ordercargive.delFlag
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
              'cardId': this.dataForm.cardId,
              'memberCardId': this.dataForm.memberCardId,
              'serviceType': this.dataForm.serviceType,
              'serviceId': this.dataForm.serviceId,
              'serviceName': this.dataForm.serviceName,
              'frequency': this.dataForm.frequency,
              'servicePrice': this.dataForm.servicePrice,
              'createBy': this.dataForm.createBy,
              'createDate': this.dataForm.createDate,
              'updateBy': this.dataForm.updateBy,
              'updateDate': this.dataForm.updateDate,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            }
            var tick = !this.dataForm.id ? API.ordercargive.add(params) : API.ordercargive.update(params)
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

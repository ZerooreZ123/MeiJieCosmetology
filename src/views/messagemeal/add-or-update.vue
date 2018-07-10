<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="套餐价格" prop="price">
        <el-input v-model="dataForm.price" placeholder="套餐价格"></el-input>
      </el-form-item>
      <el-form-item label="短信数量" prop="number">
        <el-input v-model="dataForm.number" placeholder="短信数量"></el-input>
      </el-form-item>
      <el-form-item label="套餐名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="套餐名称"></el-input>
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
          price: '',
          number: '',
          name: ''
        },
        dataRule: {
          price: [
            { required: true, message: '套餐价格不能为空', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '短信数量不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '套餐名称不能为空', trigger: 'blur' }
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
            API.messagemeal.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.price = data.messagemeal.price
                this.dataForm.number = data.messagemeal.number
                this.dataForm.name = data.messagemeal.name
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
              'price': this.dataForm.price,
              'number': this.dataForm.number,
              'name': this.dataForm.name
            }
            var tick = !this.dataForm.id ? API.messagemeal.add(params) : API.messagemeal.update(params)
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

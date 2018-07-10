<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="库存ID" prop="stockId">
        <el-input v-model="dataForm.stockId" placeholder="库存ID"></el-input>
      </el-form-item>
      <el-form-item label="产品编号" prop="productCode">
        <el-input v-model="dataForm.productCode" placeholder="产品编号"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="dataForm.brand" placeholder="品牌"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model="dataForm.unit" placeholder="单位"></el-input>
      </el-form-item>
      <el-form-item label="消耗数量" prop="consumeNum">
        <el-input v-model="dataForm.consumeNum" placeholder="消耗数量"></el-input>
      </el-form-item>
      <el-form-item label="入库数量" prop="warehousNum">
        <el-input v-model="dataForm.warehousNum" placeholder="入库数量"></el-input>
      </el-form-item>
      <el-form-item label="当前库存" prop="currentStock">
        <el-input v-model="dataForm.currentStock" placeholder="当前库存"></el-input>
      </el-form-item>
      <el-form-item label="产品售价" prop="salePrice">
        <el-input v-model="dataForm.salePrice" placeholder="产品售价"></el-input>
      </el-form-item>
      <el-form-item label="采购价" prop="purchasePrice">
        <el-input v-model="dataForm.purchasePrice" placeholder="采购价"></el-input>
      </el-form-item>
      <el-form-item label="类型(1.采购,2.消耗,3.调拨)" prop="type">
        <el-input v-model="dataForm.type" placeholder="类型(1.采购,2.消耗,3.调拨)"></el-input>
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
          stockId: '',
          productCode: '',
          name: '',
          brand: '',
          unit: '',
          consumeNum: '',
          warehousNum: '',
          currentStock: '',
          salePrice: '',
          purchasePrice: '',
          type: ''
        },
        dataRule: {
          stockId: [
            { required: true, message: '库存ID不能为空', trigger: 'blur' }
          ],
          productCode: [
            { required: true, message: '产品编号不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '商品名称不能为空', trigger: 'blur' }
          ],
          brand: [
            { required: true, message: '品牌不能为空', trigger: 'blur' }
          ],
          unit: [
            { required: true, message: '单位不能为空', trigger: 'blur' }
          ],
          consumeNum: [
            { required: true, message: '消耗数量不能为空', trigger: 'blur' }
          ],
          warehousNum: [
            { required: true, message: '入库数量不能为空', trigger: 'blur' }
          ],
          currentStock: [
            { required: true, message: '当前库存不能为空', trigger: 'blur' }
          ],
          salePrice: [
            { required: true, message: '产品售价不能为空', trigger: 'blur' }
          ],
          purchasePrice: [
            { required: true, message: '采购价不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型(1.采购,2.消耗,3.调拨)不能为空', trigger: 'blur' }
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
            API.stockconsumedetails.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.stockId = data.stockconsumedetails.stockId
                this.dataForm.productCode = data.stockconsumedetails.productCode
                this.dataForm.name = data.stockconsumedetails.name
                this.dataForm.brand = data.stockconsumedetails.brand
                this.dataForm.unit = data.stockconsumedetails.unit
                this.dataForm.consumeNum = data.stockconsumedetails.consumeNum
                this.dataForm.warehousNum = data.stockconsumedetails.warehousNum
                this.dataForm.currentStock = data.stockconsumedetails.currentStock
                this.dataForm.salePrice = data.stockconsumedetails.salePrice
                this.dataForm.purchasePrice = data.stockconsumedetails.purchasePrice
                this.dataForm.type = data.stockconsumedetails.type
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
              'stockId': this.dataForm.stockId,
              'productCode': this.dataForm.productCode,
              'name': this.dataForm.name,
              'brand': this.dataForm.brand,
              'unit': this.dataForm.unit,
              'consumeNum': this.dataForm.consumeNum,
              'warehousNum': this.dataForm.warehousNum,
              'currentStock': this.dataForm.currentStock,
              'salePrice': this.dataForm.salePrice,
              'purchasePrice': this.dataForm.purchasePrice,
              'type': this.dataForm.type
            }
            var tick = !this.dataForm.id ? API.stockconsumedetails.add(params) : API.stockconsumedetails.update(params)
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

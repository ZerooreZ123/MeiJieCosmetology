<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="资源类型：1、文章 2、图片 3、视频" prop="resourceType">
        <el-input v-model="dataForm.resourceType" placeholder="资源类型：1、文章 2、图片 3、视频"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="点击次数" prop="clickCounts">
        <el-input v-model="dataForm.clickCounts" placeholder="点击次数"></el-input>
      </el-form-item>
      <el-form-item label="图片地址" prop="imagePath">
        <el-input v-model="dataForm.imagePath" placeholder="图片地址"></el-input>
      </el-form-item>
      <el-form-item label="视频地址" prop="videoPath">
        <el-input v-model="dataForm.videoPath" placeholder="视频地址"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="dataForm.content" placeholder="内容"></el-input>
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
          resourceType: '',
          name: '',
          clickCounts: '',
          imagePath: '',
          videoPath: '',
          content: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          resourceType: [
            { required: true, message: '资源类型：1、文章 2、图片 3、视频不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          clickCounts: [
            { required: true, message: '点击次数不能为空', trigger: 'blur' }
          ],
          imagePath: [
            { required: true, message: '图片地址不能为空', trigger: 'blur' }
          ],
          videoPath: [
            { required: true, message: '视频地址不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
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
            API.knowledge.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.resourceType = data.knowledge.resourceType
                this.dataForm.name = data.knowledge.name
                this.dataForm.clickCounts = data.knowledge.clickCounts
                this.dataForm.imagePath = data.knowledge.imagePath
                this.dataForm.videoPath = data.knowledge.videoPath
                this.dataForm.content = data.knowledge.content
                this.dataForm.createBy = data.knowledge.createBy
                this.dataForm.createDate = data.knowledge.createDate
                this.dataForm.updateBy = data.knowledge.updateBy
                this.dataForm.updateDate = data.knowledge.updateDate
                this.dataForm.remarks = data.knowledge.remarks
                this.dataForm.delFlag = data.knowledge.delFlag
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
              'resourceType': this.dataForm.resourceType,
              'name': this.dataForm.name,
              'clickCounts': this.dataForm.clickCounts,
              'imagePath': this.dataForm.imagePath,
              'videoPath': this.dataForm.videoPath,
              'content': this.dataForm.content,
              'createBy': this.dataForm.createBy,
              'createDate': this.dataForm.createDate,
              'updateBy': this.dataForm.updateBy,
              'updateDate': this.dataForm.updateDate,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            }
            var tick = !this.dataForm.id ? API.knowledge.add(params) : API.knowledge.update(params)
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

<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="会员编号" prop="memberno">
        <el-input v-model="dataForm.memberno" placeholder="会员编号"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="dataForm.sex" placeholder="性别"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="渠道来源" prop="umtSource">
        <el-input v-model="dataForm.umtSource" placeholder="渠道来源"></el-input>
      </el-form-item>
      <el-form-item label="所属门店" prop="officeId">
        <el-input v-model="dataForm.officeId" placeholder="所属门店"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-input v-model="dataForm.birthday" placeholder="生日"></el-input>
      </el-form-item>
      <el-form-item label="年龄段" prop="ageRange">
        <el-input v-model="dataForm.ageRange" placeholder="年龄段"></el-input>
      </el-form-item>
      <el-form-item label="入会时间" prop="joinTime">
        <el-input v-model="dataForm.joinTime" placeholder="入会时间"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="headimage">
        <el-input v-model="dataForm.headimage" placeholder="头像"></el-input>
      </el-form-item>
      <el-form-item label="推荐人" prop="recommendPeople">
        <el-input v-model="dataForm.recommendPeople" placeholder="推荐人"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="identityno">
        <el-input v-model="dataForm.identityno" placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item label="" prop="email">
        <el-input v-model="dataForm.email" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="qq">
        <el-input v-model="dataForm.qq" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="微信号" prop="wechatno">
        <el-input v-model="dataForm.wechatno" placeholder="微信号"></el-input>
      </el-form-item>
      <el-form-item label="客户职业" prop="profession">
        <el-input v-model="dataForm.profession" placeholder="客户职业"></el-input>
      </el-form-item>
      <el-form-item label="客户地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="客户地址"></el-input>
      </el-form-item>
      <el-form-item label="身高（cm）" prop="height">
        <el-input v-model="dataForm.height" placeholder="身高（cm）"></el-input>
      </el-form-item>
      <el-form-item label="体重（kg）" prop="weight">
        <el-input v-model="dataForm.weight" placeholder="体重（kg）"></el-input>
      </el-form-item>
      <el-form-item label="血型" prop="bloodType">
        <el-input v-model="dataForm.bloodType" placeholder="血型"></el-input>
      </el-form-item>
      <el-form-item label="累计消费" prop="totalConsume">
        <el-input v-model="dataForm.totalConsume" placeholder="累计消费"></el-input>
      </el-form-item>
      <el-form-item label="微信授权openId" prop="openId">
        <el-input v-model="dataForm.openId" placeholder="微信授权openId"></el-input>
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
          memberno: '',
          name: '',
          sex: '',
          mobile: '',
          umtSource: '',
          officeId: '',
          birthday: '',
          ageRange: '',
          joinTime: '',
          headimage: '',
          recommendPeople: '',
          identityno: '',
          email: '',
          qq: '',
          wechatno: '',
          profession: '',
          address: '',
          height: '',
          weight: '',
          bloodType: '',
          totalConsume: '',
          openId: '',
          createBy: '',
          createDate: '',
          updateBy: '',
          updateDate: '',
          remarks: '',
          delFlag: ''
        },
        dataRule: {
          memberno: [
            { required: true, message: '会员编号不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          umtSource: [
            { required: true, message: '渠道来源不能为空', trigger: 'blur' }
          ],
          officeId: [
            { required: true, message: '所属门店不能为空', trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: '生日不能为空', trigger: 'blur' }
          ],
          ageRange: [
            { required: true, message: '年龄段不能为空', trigger: 'blur' }
          ],
          joinTime: [
            { required: true, message: '入会时间不能为空', trigger: 'blur' }
          ],
          headimage: [
            { required: true, message: '头像不能为空', trigger: 'blur' }
          ],
          recommendPeople: [
            { required: true, message: '推荐人不能为空', trigger: 'blur' }
          ],
          identityno: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          qq: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          wechatno: [
            { required: true, message: '微信号不能为空', trigger: 'blur' }
          ],
          profession: [
            { required: true, message: '客户职业不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '客户地址不能为空', trigger: 'blur' }
          ],
          height: [
            { required: true, message: '身高（cm）不能为空', trigger: 'blur' }
          ],
          weight: [
            { required: true, message: '体重（kg）不能为空', trigger: 'blur' }
          ],
          bloodType: [
            { required: true, message: '血型不能为空', trigger: 'blur' }
          ],
          totalConsume: [
            { required: true, message: '累计消费不能为空', trigger: 'blur' }
          ],
          openId: [
            { required: true, message: '微信授权openId不能为空', trigger: 'blur' }
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
            API.member.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.memberno = data.member.memberno
                this.dataForm.name = data.member.name
                this.dataForm.sex = data.member.sex
                this.dataForm.mobile = data.member.mobile
                this.dataForm.umtSource = data.member.umtSource
                this.dataForm.officeId = data.member.officeId
                this.dataForm.birthday = data.member.birthday
                this.dataForm.ageRange = data.member.ageRange
                this.dataForm.joinTime = data.member.joinTime
                this.dataForm.headimage = data.member.headimage
                this.dataForm.recommendPeople = data.member.recommendPeople
                this.dataForm.identityno = data.member.identityno
                this.dataForm.email = data.member.email
                this.dataForm.qq = data.member.qq
                this.dataForm.wechatno = data.member.wechatno
                this.dataForm.profession = data.member.profession
                this.dataForm.address = data.member.address
                this.dataForm.height = data.member.height
                this.dataForm.weight = data.member.weight
                this.dataForm.bloodType = data.member.bloodType
                this.dataForm.totalConsume = data.member.totalConsume
                this.dataForm.openId = data.member.openId
                this.dataForm.createBy = data.member.createBy
                this.dataForm.createDate = data.member.createDate
                this.dataForm.updateBy = data.member.updateBy
                this.dataForm.updateDate = data.member.updateDate
                this.dataForm.remarks = data.member.remarks
                this.dataForm.delFlag = data.member.delFlag
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
              'memberno': this.dataForm.memberno,
              'name': this.dataForm.name,
              'sex': this.dataForm.sex,
              'mobile': this.dataForm.mobile,
              'umtSource': this.dataForm.umtSource,
              'officeId': this.dataForm.officeId,
              'birthday': this.dataForm.birthday,
              'ageRange': this.dataForm.ageRange,
              'joinTime': this.dataForm.joinTime,
              'headimage': this.dataForm.headimage,
              'recommendPeople': this.dataForm.recommendPeople,
              'identityno': this.dataForm.identityno,
              'email': this.dataForm.email,
              'qq': this.dataForm.qq,
              'wechatno': this.dataForm.wechatno,
              'profession': this.dataForm.profession,
              'address': this.dataForm.address,
              'height': this.dataForm.height,
              'weight': this.dataForm.weight,
              'bloodType': this.dataForm.bloodType,
              'totalConsume': this.dataForm.totalConsume,
              'openId': this.dataForm.openId,
              'createBy': this.dataForm.createBy,
              'createDate': this.dataForm.createDate,
              'updateBy': this.dataForm.updateBy,
              'updateDate': this.dataForm.updateDate,
              'remarks': this.dataForm.remarks,
              'delFlag': this.dataForm.delFlag
            }
            var tick = !this.dataForm.id ? API.member.add(params) : API.member.update(params)
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

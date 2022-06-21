<template>
  
  <el-form label-width="100px" ref="addForm" :model="addForm" :rules="rules">
    <el-header style="background-color: aliceblue;margin:20px">
      <el-col>新增用户：</el-col>
    </el-header>
    <el-form-item class="form_item" label="用户名：" prop="login_name">
      <el-input placeholder="请输入名称" v-model="addForm.login_name"></el-input>
    </el-form-item>
    <el-form-item class="form_item" label="密码：" prop="passwd">
      <el-input placeholder="请输入密码" v-model="addForm.passwd" show-password></el-input>
    </el-form-item>
    <el-form-item class="form_item" label="手机号：" prop="email">
      <el-input placeholder="请输入手机号" v-model="addForm.email"></el-input>
    </el-form-item>
    <el-form-item class="form_item" label="角色：">
      <el-select v-model="addForm.user_power" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
       </el-select>
    </el-form-item>
    <el-button class="userAddButton" type="primary" plain @click="submitForm('addForm')">保存</el-button>
    <el-button class="userAddButton" plain @click="reset">重置</el-button>
  </el-form>
</template>

<script>

  export default {
    inject: ['reload'],
    
    data() {
      let checkName =(rule,value,callback) => {
        this.axios.get(
          '/user/queryCount',
          {
            params:{login_name:value,user_id:''}
          }).then(res => {
          if(res.data > 0){
            callback(new Error('用户名已存在'));
          }else{
            callback();
          }
        })
      };
      const validatePhone = (rule,value,callback)=>{
        if (!value){
          callback(new Error('手机号不能为空！'));
        }
        //使用正则表达式进行验证手机号码
        if (!/^1[3456789]\d{9}$/.test(value)){
          callback(new Error('手机号不正确！'));
        }
        this.axios.get(
          '/user/checkPhone',
          {
            params:{
              email:this.addForm.email
            }
          }).then(res => {
            if(res.data ==="已存在"){
              callback(new Error('手机号已注册'));
            }else{
              callback();
            }
          })
    }
      return {
        addForm:{
          login_name:'',
          passwd:'',
          email:'',
          user_power:'管理员'
        },
        options:[{
          value:'管理员',
          label:'管理员'
        },{
          value:'普通用户',
          label:'普通用户'
        }],
        rules: {
          login_name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '输入不少于三位的字母和数字', trigger: 'blur' },
          {max: 10, message: '输入不大于十位的字母和数字',trigger: 'blur'},
            { validator: checkName, trigger: 'blur' }
          ],
          passwd:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6,  message: '输入不少于六位的字母和数字', trigger: 'blur' },
          {max: 16, message: '输入不大于十六位的字母和数字',trigger: 'blur'}
          ],
          email:[
            {required: true, validator:validatePhone,trigger: 'blur' }
          ]
          
        }
      };
      
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.get(
              '/user/insert',
              {
                params:this.addForm
              }
            ).then(res => {
              if(res.data == "新增成功"){
                this.$message({
                  message:'添加成功',
                  type:'success',
                  center:true
                });
                this.reload();
              }else{
                this.$message({
                  message:'添加失败,请联系管理员',
                  type:'info',
                  center:true
                });
              }
              
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      reset() {
        this.add.login_name='';
        this.add.passwd='';
        this.add.email='';
        this.add.user_power='管理员';
      },
    }
  };
</script>

<style>
  .form_item{
    margin-top: 50px;
    width: 50%;
    position: relative;
    left: 20%;
  }
  .userAddButton{
    position: relative;
    margin-left: 40px;
    left: 40%;
  }
</style>

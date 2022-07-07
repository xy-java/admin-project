<template>
  
  <el-form label-width="100px" ref="userInfoEditForm" :model="userInfoEditForm" :rules="rules">
    <el-header style="background-color: aliceblue;margin:20px">
      <el-col style="line-height: 55px;">用户信息修改：</el-col>
    </el-header>
    <el-form-item class="form_item" label="用户名：" prop="login_name" >
      <el-input placeholder="请输入名称" v-model="userInfoEditForm.login_name"></el-input>
    </el-form-item>
    <el-form-item class="form_item" label="密码：" prop="passwd">
      <el-input placeholder="请输入密码" v-model="userInfoEditForm.passwd" show-password></el-input>
    </el-form-item>
    <el-form-item class="form_item" label="手机号：" prop="email">
      <el-input placeholder="请输入名称" v-model="userInfoEditForm.email"  prop="email"></el-input>
    </el-form-item>
    <el-form-item class="form_item" label="角色：">
      <el-select v-model="userInfoEditForm.user_power" placeholder="请选择" disabled>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
       </el-select>
    </el-form-item>
    <el-button class="userInfoEditButton" type="primary" plain @click="submitForm('userInfoEditForm')">保存</el-button>
    <el-button class="userInfoEditButton" plain @click="reset">重置</el-button>
  </el-form>
</template>

<script>

  export default {
    data() {
      let checkName =(rule,value,callback) => {
        this.axios.get(
          '/user/queryCount',
          {
            params:{login_name:value,user_id:window.sessionStorage.getItem('user_id')}
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
        else{
          callback();
        }
    }
      return {
        userInfoEditForm:{
          login_name:'',
          passwd:'',
          email:'',
          user_power:'普通用户'
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
            { validator:validatePhone, trigger: 'blur' }
          ]
          
        }
      };
      
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('此操作将修改该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
              this.axios.get(
                '/user/update',
                {
                  params:this.userInfoEditForm
                }
              ).then(res => {
                if(res.data == "修改成功"){
                  
                  this.$message({
                    message:'修改成功',
                    type:'success',
                    center:true
                  });
                  if(this.userInfoEditForm.login_name!=window.sessionStorage.getItem('login_name')){
                    window.sessionStorage.setItem('login_name',this.userInfoEditForm.login_name);
                    window.sessionStorage.setItem('passwd',this.userInfoEditForm.passwd);
                  }
                  this.$router.push('/');
                  this.$router.go(0);

                }else{
                  this.$message({
                    message:'修改失败,请联系管理员',
                    type:'info',
                    center:true
                  });
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消修改'
              });          
          });
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
        this.userInfoEditForm.login_name='';
        this.userInfoEditForm.passwd='';
        this.userInfoEditForm.email='';
        this.userInfoEditForm.user_power='普通用户';
      },
    },
    created() {
        this.axios.get(
          '/user/queryById',
          {
            params:{user_id:window.sessionStorage.getItem('user_id')}
          }
        ).then(res => {
          console.log(res.data);
          this.userInfoEditForm = res.data;
        })
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
  .userInfoEditButton{
    position: relative;
    margin-left: 40px;
    left: 40%;
  }
</style>

<template>
  <div class="login_page">
    <div class="logo">
      <img class="img" src="../../assets/logo.png" alt="">
    </div>
    <div class="login-container">
      <h3>后台管理平台</h3>
      <el-form label-width="100px" v-model="login">
        <el-form-item label="用户名">
          <el-input v-model="login.name" clearable placeholder="输入不少于三位的字母和数字"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="login.pwd" show-password clearable placeholder="输入不少于六位的字母和数字"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" size="medium" native-type="button" @click="loginHandler" style="background: #191970;border: none">登录</el-button>
            <el-button type="danger" size="medium" native-type="button" @click="cover" style="border: none">重置</el-button>
            <el-button plain @click="toIndex">返回主页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
 
<script>

export default {
  name:'AdminLogin',
  data () {
    return {
      login: {
        name: '',
        pwd: ''
      },
      options:[{
        value:'管理员',
        label:'管理员'
      },{
        value:'普通用户',
        label:'普通用户'
      }],
      value: '管理员',
      remember: false
    }
  },
  methods: {
    loginHandler () {
      this.axios.get(
        '/user/login',
        {
          params: {
            login_name: this.login.name,
            passwd: this.login.pwd,
            user_power: this.value
          }
        }
      ).then(result =>{
        if(result.data.login_name === this.login.name){
          this.$message(
            {
              message:'登陆成功',
              type:'success',
              center:true
            }
          );
          window.sessionStorage.setItem('login_name', result.data.login_name);
          window.sessionStorage.setItem('user_id', result.data.user_id);
          this.$router.push({name:'Container',params:{login_name:result.data.login_name}});
        }else{
          this.$message( {
              message:'登陆失败,请检查用户名和密码',
              type:'info',
              center:true
            });
        }

      }).catch(error=>{
        console.log(error);
      })
    },
    toIndex(){
      location.href='/';
    },
    cover () {
      this.login.name = ''
      this.login.pwd = ''
    }
  }
}
</script>
 
<style scoped>
  .login_page {
    height: 100%;
    width: 100%;
    background-size: cover;
  }
  .logo{
    display: flex;
    /* width: 100px; */
    height: 100px;
    border-radius: 50%;
    position: relative;
    top: 20%;
    justify-content: center;
  }
  
  .img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 20px;
  }
  .login-container {
    border: 1px darkgray solid;
    width: 400px;
    height: 320px;
    position: relative;
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0%);
    border-radius: 20px 20px 20px 20px;
    overflow: hidden;
  }
  .login-container h3 {
    margin: 0;
    padding: 15px;
    background-color:#00688B;
    color: white;
    text-align: center;
  }
  .el-row {
    padding: 10px;
  }
  .title {
    border: 1px red solid;
    text-align: left;
    padding-left: 20px;
  }
  .el-form{
    padding: 20px;
  }
 
</style>
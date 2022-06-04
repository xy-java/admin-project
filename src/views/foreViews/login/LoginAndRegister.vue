<template>
   <el-tabs class="elTab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane  name="login" >
       <span slot="label">
             <i class="el-icon-s-grid" style="margin:0 80px 0 80px">
                 <span style="padding-left: 8px">登陆</span>
             </i>
        </span>
        <el-form class="elFrom" label-width="100px" :model="loginForm" ref="loginForm">
          <el-form-item label="用户名:"  style="padding-left: 40px;">
            <el-input v-model="loginForm.name" class="inputStyle" clearable placeholder="输入不少于三位的字母和数字"></el-input>
          </el-form-item>
          <el-form-item label="密码:" style="padding-left: 40px;">
            <el-input v-model="loginForm.passwd" class="inputStyle" show-password clearable placeholder="输入不少于六位的字母和数字"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" style="padding-left: 40px;">
            123
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" native-type="button" @click="loginHandler" style="background: #191970;border: none">登录</el-button>
            <el-button type="danger" size="medium" native-type="button" @click="reset" style="border: none">重置</el-button>
            <el-button plain @click="toIndex">返回主页</el-button>
        </el-form-item>
        </el-form>
    </el-tab-pane>
    <el-tab-pane name="register">
      <span slot="label">
             <i class="el-icon-thumb" style="margin:0 80px 0 80px">
                 <span style="padding-left: 8px">注册</span>
             </i>
        </span>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default{
  name:'LoginAndRegister',
  data() {
    return {
      loginForm:{
        name:'',
        passwd:''
      },
      activeName : window.sessionStorage.getItem('status')===null? 'login' :window.sessionStorage.getItem('status'),
    }
  },
  methods: {
     handleClick(tab, event) {
        console.log(tab, event);
        console.log(window.sessionStorage.getItem('status'));
    },
    loginHandler(){

    },
    reset(){
      this.loginForm.name='';
      this.loginForm.passwd='';
    },
    toIndex(){
      this.$router.push('/');
    }
  },
  beforeDestroy() {
    window.sessionStorage.removeItem('status');
  }
}
</script>

<style>
  .elTab{
    border: 1px solid #e6e6e6;
    width: 465px;
    position: relative;
    left: 40%;
    height: 460px;
    top: 10%;
  }
  .elFrom{
    margin-top: 30px;
  }
  .inputStyle{
    width: 250px;
  }
</style>
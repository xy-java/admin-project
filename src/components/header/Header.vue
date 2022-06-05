<template>
  <el-header class="header">
    <el-row class="positionFirst">
        <el-link class="margin-left" :underline="false" @click="()=>{this.$router.push('/')}" ><span class="link">首页</span></el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link class="margin-left" :underline="false" @click="toLogin"><span class="link">后台管理</span></el-link>
    </el-row>
    <el-link class="cart-mini" :underline="false" :icon="count > 0 ? isFull : empty" href="/">购物车<span>({{count}})</span></el-link>
    <el-row class="positionLogin" v-if="isLogin">
      <el-link class="margin-left" :underline="false" @click="toLoginPage('login')"><span class="link">登陆</span></el-link>
      <el-divider direction="vertical"></el-divider>
      <el-link class="margin-left" :underline="false" @click="toLoginPage('register')"><span class="link">注册</span></el-link>
    </el-row>
    <el-row class="login_name" v-else="!isLogin">
     <span>当前登陆：{{login_name}}</span>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-left: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="loginout()">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      
    </el-row>

  </el-header>
</template>

<script>
export default {
  name:'Header',
  data() {
    return {
      count: 0,
      isFull: 'el-icon-shopping-cart-full',
      empty: 'el-icon-shopping-cart-2',
      isLogin: true,
      login_name: '',
    }
  },
  methods: {
    toLogin () {
      this.$router.push({name:'AdminLogin'});
    },
    toLoginPage (status) {
      //放入session
      window.sessionStorage.setItem('status', status);
      this.$router.push({name:'LoginAndRegister',params:{status:status}});
    },
    loginout(){
      window.sessionStorage.removeItem('login_name');
      window.sessionStorage.removeItem('user_id');
      window.sessionStorage.removeItem('isLogin');
      window.sessionStorage.removeItem('passwd');
      window.sessionStorage.removeItem('user_power');
      this.$router.go('/');
    }
  },
  mounted() {
    this.isLogin=!(window.sessionStorage.getItem('isLogin'));
    this.login_name=window.sessionStorage.getItem('login_name');
    console.log(this.isLogin);
  },
}
</script>


<style>
  .el-divider{
    color: #424242;
    margin-left: 1em;
    margin-right: 0.3em;
  }
  .margin-left{
    margin-left: 10px;
  }
  .header{
    background-color: #333;
    font-size: 12px;
    max-height: 40px;
  }
  .positionFirst{
    position: relative;
    left: 420px;
    float: left;
    line-height: 40px;
  }
  .positionLogin{
    position: relative;
    display: block;
    height: 40px;
    float: right;
    line-height: 40px;
  }
  .login_name{
    color: #b0b0b0;
    font-size: 12px;
    position: relative;
    display: block;
    float: right;
    line-height: 40px;
    left: 40px;
  }
  
  .cart-mini{
    position: relative;
    display: block;
    right: 240px;
    float: right;
    height: 40px;
    width: 140px;
    line-height: 40px;
    color: #b0b0b0;
    background: #424242;
    text-align: center;
    transition: all .2s;
  }
   .cart-mini:hover{
    background: #fff;
  }
  
  .link{
    font-size: 14px;
    color: #b0b0b0;
  }
  .link:hover{
    color: #fff;
  }
</style>
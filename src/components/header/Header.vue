<template>
  <el-header class="header">
    <el-row class="positionFirst">
        <el-link class="margin-left" :underline="false" href="/" ><span class="link">首页</span></el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link class="margin-left" :underline="false" @click="toLogin"><span class="link">后台管理</span></el-link>
    </el-row>
    <el-link class="cart-mini" :underline="false" :icon="count > 0 ? isFull : empty" href="/">购物车<span>({{count}})</span></el-link>
    <el-row class="positionLogin">
      <el-link class="margin-left" :underline="false" href="/"><span class="link">登陆</span></el-link>
      <el-divider direction="vertical"></el-divider>
      <el-link class="margin-left" :underline="false" href="/"><span class="link">注册</span></el-link>
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
      empty: 'el-icon-shopping-cart-2'
    }
  },
  methods: {
    toLogin () {
      this.$router.push({name:'AdminLogin'});
    }
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
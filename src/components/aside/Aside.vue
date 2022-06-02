<template>
    <el-aside class="aside">
        <el-link class="aside-link" :underline="false" href="/">
          <el-col class="el-icon-user position font-size"></el-col>个人中心
        </el-link>
        <el-link class="aside-link"  :underline="false" href="/">
          <el-col class="el-icon-shopping-cart-2 position font-size"></el-col>购物车
        </el-link>
        <el-link class="aside-link"  :underline="false" href="/">
          <el-col class="el-icon-setting position font-size"></el-col>售后服务
        </el-link>
        <el-link class="aside-link position" :underline="false" href="/" :style="true ? '' : isShow">
          <el-col class="el-icon-top position font-size"></el-col>回顶部
        </el-link>
    </el-aside>
</template>

<script>

export default {
  name: 'Aside',
  data() {
      return {
        isShow:{
          display:'none'
        }
      };
  },
  methods: {}
}
</script>


<style>
  
  .aside{
    width: 100px !important;
    height: 480px;
    position: fixed;
    right: 30px;
    bottom: 80px;
  }
  .aside-link{
    text-align: center;
    display: block;
    border: 1px #f5f5f5 solid; 
    height: 90px;
    background-color: #fff;
    line-height: 40px;
  }
  .position{
    margin-top: 20px;
  }
  .font-size{
    font-size: 25px;
  }
  
</style>
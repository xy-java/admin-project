<template>
    <el-aside class="aside" id="asides">
        <div class="aside-link">
          <el-link class="linkAside" href="#/personalCenter">
            <el-col class="el-icon-user position"></el-col>个人中心
          </el-link>
        </div>
        <el-link class="aside-link" href="#/cartPage">
          <el-col class="el-icon-shopping-cart-2 position"></el-col>购物车
        </el-link>
        <el-link class="aside-link" href="/">
          <el-col class="el-icon-setting position"></el-col>售后服务
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
  methods: {
   
  }
}
</script>


<style>
  .aside{
    width: 100px !important;  
    height: 410px;
    position: fixed;
    right: 40px;
    bottom: 80px;
  }
  .aside-link{
    text-align: center;
    display: block;
    box-shadow: none;
    border: 1px #f5f5f5 solid; 
    height: 90px;
    background-color: #fff;
    line-height: 40px;
    box-shadow: 6px 6px 6px rgba(.12,.12,.12, .12);
  }
  .linkAside{
    width: 100%;
    height: 100%;
  }
  
  .position{
    margin-top: 20px;
  }
  .font-size{
    font-size: 25px;
  }
  
</style>
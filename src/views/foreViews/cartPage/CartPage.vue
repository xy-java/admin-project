<template>
  <div>
    <div>
      <img src="@/assets/logo.png" class="img">
      <span class="bar">我的购物车</span>
      <el-divider></el-divider>
    </div>
    <div class="mainContext" v-if="true">
      <el-table :data="cartData" class="eltable">
        <el-table-column type="selection" label="全选"></el-table-column>
        <el-table-column label="商品名称"></el-table-column>
        <el-table-column label="单价"></el-table-column>
        <el-table-column label="数量"></el-table-column>
        <el-table-column label="小计"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-row class="sum"> 
        <a href="#" class="goBuy">继续购物</a>
        <span class="divider">已选择2件</span>
        <span class="money">合计：999元</span>
        <el-button class="button" @click="handleClick">去结算</el-button>
      </el-row>
    </div>
    <div class="empty" v-else>
      <span>您的购物车是空的</span>
      <a href="/" class="toMain">马上去购物</a>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'CartPage',
    data() {
      return {
        cartData:[]
      }
    },
  }
</script>

<style scoped>
  .toMain{
    display: block;
    text-decoration: none;
    border: 1px solid #ff6700;
    color: #ff6700;
    padding-top: 8px;
    font-size: 14px;
    width: 120px;
    height: 35px;
    text-align: center;
    margin-left: 100px;
    margin-top: 50px;
  }
  .empty{
    width: 400px;
    height: 200px;
    display: inline-block;
    position: relative;
    left: 40%;
    margin-top: 80px;    
  }
  .empty span{
    font-size: 40px;
    display: block;
    margin-bottom: 20px;
  }
  .img{
    display: inline-block;
    height: 50px;
    width:50px;
    position: relative;
    left: 10%;
    top: 15px;
  }
  .bar{
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    position: relative;
    left: 13%;
  }
  .el-divider{
    background-color: #ff6700;
  }
  .divider{
    border-left: 1px solid rgb(196, 196, 196);
    padding-left: 10px;
    margin-left: 20px;
    display: inline-block;
    margin-top: 15px;
    font-size: 14px;
    color: #757575;
  }
  .goBuy{
    margin-left: 20px;
    text-decoration: none;
    color: #757575;
    font-size: 14px;
  }
  .goBuy:hover{
    color: #ff6700;
  }
  .money{
    position: relative;
    left: 1000px;
    color: #ff6700;
    font-size: 24px;
  }
  .mainContext{
    padding: 38px 0;
  }
  .eltable{
    border: 1px solid #B3C0D1;
    width: 80%;
    position: relative;
    left: 10%;
  }

  .sum{
    width: 80%;
    position: relative;
    margin-top: 40px;
    left: 10%;
    border: 1px solid #B3C0D1;
  }
  .button{
    background-color: #ff6700;
    color: white;
    border-radius: 0;
    width: 150px;
    height: 50px;
    float: right;
  }
</style>
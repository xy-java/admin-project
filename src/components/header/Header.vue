<template>
  <el-header class="header">
    <el-row class="positionFirst">
        <el-link class="margin-left" :underline="false" @click="()=>{this.$router.push('/')}" ><span class="link">首页</span></el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link class="margin-left" :underline="false" @click="toLogin"><span class="link">后台管理</span></el-link>
    </el-row>
    <el-popover
    placement="top-end"
    width="350"
    trigger="hover">
    <el-table :data="cartInfoList">
      <span slot="empty" style="font-size: 10px;">购物车没有商品,赶紧选购吧！</span>
      <el-table-column >
         <template slot-scope="scope">
          <img :src="['http://localhost:8081/' + scope.row.skuInfo.img]" style="width: 40px;height:40px">
          <span style="display: inline-block;position: absolute;top: 20px;">{{scope.row.skuInfo.sku_name}}</span>
         </template>
      </el-table-column>
      <el-table-column width="100px">
         <template slot-scope="scope">
          <span style="display: inline-block;">{{scope.row.skuInfo.price}}元×{{scope.row.cartInfo.cart_num}}</span>
         </template>
      </el-table-column>
      <el-table-column  width="80px">
         <template slot-scope="scope">
           <el-button icon="el-icon-close" size="small" @click="del(scope.row.cartInfo.cart_id)" circle></el-button>
         </template>
      </el-table-column>
    </el-table>
    <!-- 立即结算 -->
    <el-button type="primary" @click="toPay" style="width: 100%;" v-show="isShow">去购物车结算</el-button>
    <el-link  slot="reference" class="cart-mini" :underline="false" :icon="count > 0 ? isFull : empty" href="#/cartPage">购物车<span>({{count}})</span></el-link>
  </el-popover>

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
      cartInfoList: [],
    }
  },
  computed: {
    isShow() {
      return this.cartInfoList.length > 0 ? true : false;
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
    toPay () {
      this.$router.push('/cartPage');
    },
    del(cart_id){
        this.axios.get('/cart/deleteCartById',{
          params:{
            cart_id
          }
        }).then(res=>{
          this.loadCart();
        })
      },
    loginout(){
      window.sessionStorage.removeItem('login_name');
      window.sessionStorage.removeItem('user_id');
      window.sessionStorage.removeItem('isLogin');
      window.sessionStorage.removeItem('passwd');
      window.sessionStorage.removeItem('user_power');
      this.$router.push('/');
      this.$router.go(0);
    },
    loadCart(){
      if(window.sessionStorage.getItem('user_id')!=null){
        this.axios.get(
        '/cart/findCartByUserId',
        {
          params:{
            user_id:window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res=>{
        this.cartInfoList = res.data;
        this.count = res.data.length;
      }).catch(err=>{
        console.log(err);
      })
      }
    },
  },
  created() {
    this.isLogin=!(window.sessionStorage.getItem('isLogin'));
    this.login_name=window.sessionStorage.getItem('login_name');
    this.loadCart();
  },
  beforeDestroy() {
    window.sessionStorage.clear();
  }
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
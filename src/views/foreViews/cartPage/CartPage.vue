<template>
  <div>
    <div>
      <img src="@/assets/logo.png" class="img">
      <span class="bar">我的购物车</span>
      <el-divider></el-divider>
    </div>
    <div class="mainContext" v-if="isFull">
      <el-table ref="cartTable" :data="cartData" class="eltable"  @select="change()" @select-all="change()" :header-cell-style="{'text-align':'center'}" >
        <el-table-column type="selection" label="全选"></el-table-column>
        <el-table-column label="商品名称" width="500px">
           <template slot-scope="scope">
              <img :src="['http://localhost:8081/'+scope.row.skuInfo.img]" width="80px" height="120px">
              <span style="display: inline-block;position: absolute;top: 50px;">{{scope.row.skuInfo.sku_name}}
                <span v-if="scope.row.skuInfo.sku_type==='电脑'">&nbsp;&nbsp;{{scope.row.cartInfo.sku_cp}}</span>
                <span v-if="scope.row.skuInfo.sku_type==='手机'">&nbsp;&nbsp;{{scope.row.cartInfo.sku_version}}&nbsp;&nbsp;{{scope.row.cartInfo.sku_color}}</span>
                <span v-if="scope.row.skuInfo.sku_type==='手表'">&nbsp;&nbsp;{{scope.row.cartInfo.sku_series}}</span>
              </span>
           </template>
        </el-table-column>
        <el-table-column label="单价（￥）" prop="skuInfo.price" align="center"></el-table-column>
        <el-table-column label="数量"  align="center">
          <template slot-scope="scope">
            <el-input-number style="position: relative;" size="small" @change="getNum(scope.row.cartInfo.cart_id,scope.row.cartInfo.cart_num)" v-model="scope.row.cartInfo.cart_num" :min="1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计（￥）" prop="sku_sum" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-close" size="small" @click="del(scope.row.cartInfo.cart_id)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="sum"> 
        <a href="/" class="goBuy">继续购物</a>
        <span class="divider">已选择{{num}}件</span>
        <span class="money">合计：{{sumPrice}}元</span>
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
import qs from 'qs'

  export default {
    name: 'CartPage',
    data() {
      return {
        cartData:[],
        isFull: true,
        sumPrice: 0,
        num : 0,
        cart_num: 1,
      }
    },
    methods: {
      change(){
        this.num = this.$refs.cartTable.selection.length;
        this.sumPrice = this.$refs.cartTable.selection.reduce((total,item)=>{
          return total + item.sku_sum;
        },0);
      },
      getNum(cart_id,cart_num){
        this.axios.get('/cart/updateCart',{
          params:{
            cart_id,
            cart_num
          }
        }).then(res=>{
            location.reload()
        })
      },
      del(cart_id){
        this.axios.get('/cart/deleteCartById',{
          params:{
            cart_id
          }
        }).then(res=>{
          this.loadCart();
          this.num = 0
          this.sumPrice = 0
          location.reload()
        })
      },
      loadCart(){
        this.axios.get(
          '/cart/findCartByUserId',
          {
            params:{
              user_id:window.sessionStorage.getItem('user_id')
            }
          }
        ).then(res=>{
          if(res.data.length <= 0){
            this.isFull = false;
          }else{
            this.isFull = true;
            this.cartData = res.data;
            console.log(this.cartData);
            for (let i = 0; i < res.data.length; i++) {
              this.cartData[i].sku_sum = res.data[i].cartInfo.cart_num * res.data[i].skuInfo.price;
              this.cart_num = res.data[i].cartInfo.cart_num;
            }
            
            
          }
          
        })
      },
      handleClick(){
        let ids = "";
        for (let index = 0; index < this.$refs.cartTable.selection.length; index++) {
            //通过逗号加到字符串里
            ids += this.$refs.cartTable.selection[index].cartInfo.cart_id + ",";
        }
        console.log(ids)
        this.axios.get(
          '/orderInfo/insertOrderInfo',
          {
            params:{
              cart_ids:ids,
              user_id:window.sessionStorage.getItem('user_id'),
              sku_id:''
            }
          }
        ).then(res=>{

        })

      }
    },
   
    created() {
      this.loadCart();
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
    left: 980px;
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
    text-align: center;
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
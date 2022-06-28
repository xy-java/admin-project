<template>
  <div>
    <img src="@/assets/logo.png" class="img">
    <span class="bar">我的订单</span>
      <el-divider></el-divider>
    <div class="border">
      <el-steps :active="active" finish-status="success" :space="800" align-center>
        <el-step title="确认订单"></el-step>
        <el-step title="付款"></el-step>
      </el-steps>
      <div v-if="active==0" class="commonDiv">
          <div>收货地址：</div>
          <el-radio-group style="display:inline-block;margin-top:20px;margin-right: 10px;" v-for="(item,index) in addressList" :key="index" v-model="addressInfo">
              <el-radio class="radioButton" border :label="index">
                <span style="font-size: 18px;font-weight:bold;">{{item.derive_name}}</span>
                <span style="display: block;margin-top: 10px;">{{CodeToText[item.address_level1]}}&nbsp;{{CodeToText[item.address_level2]}}&nbsp;{{CodeToText[item.address_level3]}}</span>
                <span style="display: block;margin-top: 10px;">{{item.address_info}}</span>
              </el-radio> 
          </el-radio-group>
          <el-button class="button" @click="addressAdd"><i class="el-icon-circle-plus-outline"></i>添加新地址</el-button>
          <el-dialog
          title="新增地址"
          :visible.sync="dialogVisible"
          width="40%" append-to-body>
            <el-form ref="addData" :model="addData" label-width="80px">
              <el-form-item label="收货人">
                 <template slot-scope="scope">
                    <el-input v-model="addData.derive_name" placeholder="请输入收货人"></el-input>
                 </template>
              </el-form-item>
              <el-form-item label="收货地址">
                 <template slot-scope="scope">
                  <el-cascader
                      placeholder="请选择"
                      @change="handleAddressNode"
                      v-model="selectedOptions"
                      :options="options"
                      filterable
                  ></el-cascader>
                </template>
              </el-form-item>
              <el-form-item label="详细地址">
                <template slot-scope="scope">
                  <el-input v-model="addData.address_info" placeholder="请输入详细地址"></el-input>
                </template>
              </el-form-item>
              <el-form-item >
                <template slot-scope="scope">
                  <el-radio
                      v-model= "addData.address_status" label="0">
                    设为默认
                  </el-radio>
                </template>
              </el-form-item>
            </el-form>
          <span slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="mkSure('addData')">确 定</el-button>
          </span>
        </el-dialog>
        <div style="margin-top:  20px;">商品：</div>
        <el-table :data="skuInfo">
          <el-table-column width="600px">
            <template slot-scope="scope">
              <img :src="['api/'+scope.row.img]" width="80px" height="80px">
              <span style="display: inline-block;position: absolute;top: 40px;">{{scope.row.sku_name}}
                <span v-if="scope.row.sku_type==='电脑'">&nbsp;&nbsp;{{scope.row.sku_cp}}</span>
                <span v-if="scope.row.sku_type==='手机'">&nbsp;&nbsp;{{scope.row.sku_version}}&nbsp;&nbsp;{{scope.row.sku_color}}</span>
                <span v-if="scope.row.sku_type==='手表'">&nbsp;&nbsp;{{scope.row.sku_series}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <span>{{scope.row.order_price}}元×{{scope.row.order_num}}个</span>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <span>{{scope.row.order_price*scope.row.order_num}}元</span>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:  20px;">配送方式：<span style="margin-left:20px;color:#ff6700;">包邮</span></div>
        <div style="margin-top:  20px;">支付方式：<span style="margin-left:20px;color:#ff6700;">在线支付</span></div>
        <div style="margin-top:  20px;">商品件数：<span style="margin-left:20px;color:#ff6700;">{{sku_num}}个</span></div>
        <div style="margin-top:  20px;">总价：<span style="margin-left:20px;color:#ff6700;">{{sku_price}}元</span></div>
        <!-- 返回购物车 -->
        <el-button class="backButton" @click="goBack"><i class="el-icon-arrow-left"></i>返回购物车</el-button>
        <el-button class="orderButton" @click="orderSure">立即下单</el-button>
      </div>
      <div v-else-if="active==1" class="commonDiv">
        <!-- 您的订单已提交成功，请尽快付款 -->
        <div style="text-align: center;">您的订单已提交成功，请尽快付款</div>
        <!-- 金额 -->
        <div style="text-align: center;">金额：<span style="margin-left:20px;color:#ff6700;">{{sku_price}}元</span></div>
        <span style="margin-left: 80px;display: inline-block;vertical-align: middle;padding-top: 15px;">支付方式：</span>
        <!-- 支付按钮，模拟支付操作 -->
        <el-radio-group style="display:inline-block;margin-top:20px;margin-right: 10px;" v-model="checkPay">
            <el-radio border label="1"><img src="@/assets/120_348_白底.png" style="height: 80%; width:80%;display: inline-block;vertical-align: middle;"></el-radio>
            <!-- <el-radio border label="2" style="vertical-align: top;">微信支付</el-radio> -->
        </el-radio-group>
        <el-dialog :title="'支付成功'" :visible.sync="dialog" width="16%" center>
          <div>
            <p style="margin-top: 20px;text-align: center;">点击按钮继续</p>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handlePay">确定</el-button>
            </span>
          </div>
        </el-dialog>
        
        <el-button class="backButton" @click="goBackPay" style="position: relative;top:480px;left: 480px;"><i class="el-icon-arrow-left"></i>返回购物车</el-button>
        <el-button class="orderButton" @click="payment" style="position: relative;top:480px;left: 500px;">立即支付</el-button>
      </div>
      <div v-else class="commonDiv">
        <div style="text-align: center;">订单完成，将于{{time}}秒后跳转至首页</div>
        <el-button class="backButton" @click="goBackMain" style="position: relative;top:480px;left: 480px;"><i class="el-icon-arrow-left"></i>返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { regionData,CodeToText } from "element-china-area-data";

export default {
  name:'OrderPage',
  data() {
      return {
        active: 0,
        addressList:[],
        time:5,
        addressInfo : 0,
        CodeToText:CodeToText,
        dialogVisible: false,
        dialog: false,
        checkPay:"1",
        addData:{
          user_id:window.sessionStorage.getItem('user_id'),
          address_status:'1',
        },
        selectOptions: [],
        options: regionData,
        skuInfo:[],
        sku_num:0,
        sku_price:0,
        order_id: '',
      };
    },

    methods: {
      next() {
        if(this.active++>1){
          this.active = 0 ;
        }
          sessionStorage.setItem('active', this.active );
      },
      
      payment(){
        let info = {
            order_id : this.order_id,
            sku_info: this.skuInfo,
        }
        this.dialog = true;
        console.log(JSON.stringify(info));
        this.axios.post(
          '/orderInfo/paySuccess',
          JSON.stringify(info),
          {
          //设置请求头
            headers:{
              'Content-Type':'application/json'
            }
          }
        ).then(res=>{
          
        })
      },
      loadAddress(){
        this.axios.get(
          '/address/queryAddress',
          {
            params:{
              user_id:window.sessionStorage.getItem('user_id')
            }
          }
        ).then(res=>{
          this.addressList = res.data;
        })
      },
      addressAdd(){
        this.dialogVisible = true;
      },
      mkSure(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.addData);
          if (valid) {
            this.axios.get(
              '/address/insertAddress',
              {
                params:this.addData
              }
            ).then(res => {
                this.dialogVisible = false;
                if(res.data == '增加成功'){
                  this.$message({
                      message: '新增成功',
                      type: 'success'
                  });
                } else {
                  this.$message({
                      message: '新增失败',
                      type: 'error'
                  });
                }
                this.loadAddress();
              });
            }
        })
      },
      handleAddressNode() {
        this.addData.address_level1 = this.selectedOptions[0];
        this.addData.address_level2 = this.selectedOptions[1];
        this.addData.address_level3 = this.selectedOptions[2];
      },
      handlePay(){
        this.dialog = false;
        this.next();
        sessionStorage.setItem('active', this.active );
        let timer = setInterval(()=>{
          if(this.time > 0){
            this.time--;
          } else {
            clearInterval(timer);
            this.goBackMain();
          }
        },1000);
      },
      loadTable(){
        this.axios.get(
          '/orderInfo/selectSkuInfo',
          {
            params:{
              cart_id:window.sessionStorage.getItem('cart_id')
            }
          }
        ).then(res=>{
          this.skuInfo = res.data;
          for(let i=0;i<this.skuInfo.length;i++){
            this.sku_num += parseInt(this.skuInfo[i].order_num);
            this.sku_price += parseInt(this.skuInfo[i].order_price*this.skuInfo[i].order_num);
          }
        })
      },
      goBack(){
        //提示返回后数据会丢失
        this.$confirm('返回后订单会丢失，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/cartPage');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      goBackPay(){
        this.$confirm('订单尚未支付，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/cartPage');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      goBackMain(){
          this.time = 0;
          this.$router.push('/');
          //刷新首页
          this.$emit('refresh');
      },
      orderSure(){
        let sel = {
            user_id:window.sessionStorage.getItem('user_id'),
            address_id:this.addressList[this.addressInfo].address_id,
            sku_info: this.skuInfo,
          }
        this.axios.post(
          '/orderInfo/insertOrderInfo',
        JSON.stringify(sel),
        {
          
        //设置请求头
          headers:{
            'Content-Type':'application/json'
          }
        }
        ).then(res=>{
          if(res.data !== 'fail'){
            this.$message({
              message: '下单成功',
              type: 'success'
            });
            this.order_id = res.data;
            this.bus.$emit("loadCart")
            this.next();
          } else {
            this.$message({
              message: '下单失败',
              type: 'error'
            });
          }
        })

      },
    },

    created() {
      this.loadAddress();
      this.loadTable();
    },
    mounted() {
      this.active = parseInt(sessionStorage.getItem("active")) ;
    },
    beforeDestroy() {
      sessionStorage.setItem('active',0);
    },
}
</script>

<style scoped>
.radioButton{
  width: 250px;
  height: 130px;
}
.orderButton{
    background-color: #ff6700;
    color: white;
    border-radius: 0;
    width: 150px;
    height: 50px;
    position: relative;
    left: 74%;
}
.backButton{
    border-radius: 0;
    position: relative;
    left: 73%;
    width: 150px;
    height: 50px;
}
.dialog-footer{

  position: relative;
  left: 90px;
}
.button{
  width: 250px;
  height: 130px;
  position: relative;
  top: 10px;

}
.commonDiv{
  width: 80%;
  position: relative;
  left: 10%;
}
.border{
  width: 80%;
  position: relative;
  left: 10%;
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
</style>
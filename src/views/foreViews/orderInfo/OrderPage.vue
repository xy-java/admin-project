<template>
  <div>
    <img src="@/assets/logo.png" class="img">
    <span class="bar">我的订单</span>
      <el-divider></el-divider>
    <div class="border">
      <el-steps :active="active" finish-status="success" :space="800" align-center>
        <el-step title="确认订单"></el-step>
        <el-step title="付款"></el-step>
        <el-step title="出库发货"></el-step>
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
              <img :src="['http://localhost:8081/'+scope.row.img]" width="80px" height="80px">
              <span style="display: inline-block;position: absolute;top: 40px;">{{scope.row.sku_name}}</span>
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
      <div v-else-if="active==1" class="commonDiv">2</div>
      <div v-else-if="active==2" class="commonDiv">3</div>
      <div v-else class="commonDiv">订单完成</div>




      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
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
        addressInfo : 0,
        CodeToText:CodeToText,
        dialogVisible: false,
        addData:{
          user_id:window.sessionStorage.getItem('user_id'),
          address_status:'1',
        },
        selectOptions: [],
        options: regionData,
        skuInfo:[],
        sku_num:0,
        sku_price:0,
      };
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
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
          console.log(res.data);
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
      loadTable(){
        this.axios.get(
          '/orderInfo/selectSkuInfo',
          {
            params:{
              order_id:window.sessionStorage.getItem('order_id')
            }
          }
        ).then(res=>{
          console.log(res.data);
          this.skuInfo = res.data;
          for(let i=0;i<this.skuInfo.length;i++){
            this.sku_num += parseInt(this.skuInfo[i].order_num);
            this.sku_price += parseInt(this.skuInfo[i].order_price*this.skuInfo[i].order_num);
          }
        })
      },
      goBack(){
        this.$router.push('/cartPage');
      },
      orderSure(){
        this.axios.get(
          '/orderInfo/updateAddress',
          {
            params:{
              address_id:this.addressList[this.addressInfo].address_id,
              order_id:window.sessionStorage.getItem('order_id')
            }
          }
        ).then(res=>{
          if(res.data === '修改成功'){
            this.next();
          }
        })

      }
    },

    created() {
      this.loadAddress();
      this.loadTable();
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
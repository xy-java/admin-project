<template>
  <div>
    <el-header style="background-color: aliceblue;margin:20px">
      <el-col style="line-height: 55px;">订单管理：</el-col>
    </el-header>
    <el-table :data="orderList">
      <el-table-column label="订单编号" prop="order_id"></el-table-column>
      <el-table-column label="订单状态" prop="order_status">
        <template slot-scope="scope">
          {{scope.row.order_status===1?'已支付':'未支付'}}
        </template>
      </el-table-column>
      <el-table-column label="订单金额" prop="total_amount">
         <template slot-scope="scope">
          {{scope.row.total_amount}}元
        </template>
      </el-table-column>
      <el-table-column label="订单时间" prop="create_time" :formatter="formatData"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="getDetail(scope.row)">查看详情</el-button>
          <el-dialog :title="'订单详情'" :visible.sync="dialogDetail" width="60%" center>
            <div>订单编号：{{order_id}}</div>
            <div>地址信息：</div>
            <el-card class="box-card">
              <div>收货人：{{derive_name}}</div>
              <div>收货地址：{{address_level1}}&nbsp;&nbsp;{{address_level2}}&nbsp;&nbsp;{{address_level3}}</div>
              <div>详细地址：{{address_info}}</div>
            </el-card>
            <div>订单状态：{{order_status===1?'已支付':'未支付'}}</div>
            <div>订单详情：</div>
            <el-table :data="detailList">
              <el-table-column width="600px">
                <template slot-scope="scope">
                  <img :src="['http://localhost:8081/'+scope.row.img]" width="80px" height="80px">
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
            
            <div>订单时间：{{new Date(create_time).toLocaleString()}}</div>
            <el-button type="text" class="buttonInfo" v-if="order_status===0" @click="payNow(scope.row.order_id)">立即支付</el-button>
            <el-button class="buttonCancel"  v-if="order_status===0" @click="deleteOrder(scope.row.order_id)">取消订单</el-button>
            <el-button class="buttonInfo"  v-else @click="deleteOrder(scope.row.order_id)">确认收货</el-button>
          </el-dialog>
          
          <el-button type="text" class="button" size="small" v-if="scope.row.order_status===0" @click="payNow(scope.row.order_id)">立即支付</el-button>
          <el-dialog :title="'支付成功'" :visible.sync="dialog" width="16%" center>
          <div>
            <p style="margin-top: 20px;text-align: center;">点击按钮继续</p>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="payment" style="margin-left: 90px;">确定</el-button>
            </span>
          </div>
        </el-dialog>
          <el-button class="button"  type="text" size="small" v-if="scope.row.order_status===0" @click="deleteOrder(scope.row.order_id)">取消订单</el-button>
          <el-button class="button" type="text" size="small" v-else @click="deleteOrder(scope.row.order_id)">确认收货</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { regionData,CodeToText } from "element-china-area-data";

export default {
  name: 'OrderConfig',
  data() {
      return {
        orderList: [],
        dialog: false,
        dialogDetail: false,
        order_id: '',
        order_id1: '',
        derive_name: '',
        address_level1: '',
        address_level2: '',
        address_level3: '',
        address_info: '',
        order_status: 0,
        create_time: '',
        detailList: [],
      };
  },
  methods: {
    loadOrderList(){
      this.axios.get(
        '/orderInfo/selectOrderInfoByUserId',
        {
          params: {
            user_id: window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res=>{
        this.orderList = res.data;
      })
    },
    loadDetailList(order_id){
      this.axios.get(
        '/orderInfo/getDetailList',
        {
          params: {
            order_id: order_id
          }
        }
      ).then(res=>{
        this.detailList = res.data;
        console.log(this.detailList)
      })
    },
    loadAddress(address_id){
      this.axios.get(
        '/address/selectById',
        {
          params: {
            address_id: address_id
          }
        }
      ).then(res=>{
        this.derive_name = res.data[0].derive_name;
        this.address_level1 = CodeToText[res.data[0].address_level1];
        this.address_level2 = CodeToText[res.data[0].address_level2];
        this.address_level3 = CodeToText[res.data[0].address_level3];
        this.address_info = res.data[0].address_info;

      })
    },
    getDetail(scope){
      this.dialogDetail = true;
      this.order_id = scope.order_id;
      this.order_status = scope.order_status;
      this.create_time = scope.create_time;
      this.loadAddress(scope.address_id);
      this.loadDetailList(scope.order_id);
    },
    formatData(row, column, cellValue, index) {
      var s = new Date(cellValue).toLocaleString();
      return s;
    },
    deleteOrder(order_id){
      //确认操作
      this.$confirm('请确认操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.get(
          '/orderInfo/deleteOrderInfoById',
          {
            params: {
              order_id: order_id
            }
          }
        ).then(res=>{
          if(res.data === '删除成功'){
            this.dialogDetail = false;
            this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.loadOrderList();
          }
        })
      })
    },
    payNow(order_id){
      this.dialog = true;
      this.order_id = order_id;
    },
    payment(){
        this.dialog = false;
        this.dialogDetail = false;
        this.axios.get(
          '/orderInfo/payOrder',
          {
            params:{
              order_id:this.order_id
            }
          }
        ).then(res=>{
          this.loadOrderList();
        })
      },
  },
  created() {
    this.loadOrderList();
  },
}
</script>

<style scoped>
.button{
  margin-left: 10px;
}
.box-card{
  width:30%
}
.buttonInfo{
  background-color: #ff6700;
  color: white;
  border-radius: 0;
  width: 150px;
  height: 50px;
  margin-top: 50px;
}
.buttonCancel{
  border-radius: 0;
  width: 150px;
  height: 50px;
}
</style>
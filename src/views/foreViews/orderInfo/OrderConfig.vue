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
          <el-button type="text" size="small">查看详情</el-button>
          
          <el-button type="text" size="small" v-if="scope.row.order_status===0" @click="payNow(scope.row.order_id)">立即支付</el-button>
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

export default {
  name: 'OrderConfig',
  data() {
      return {
        orderList: [],
        dialog: false,
        order_id: ''
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
</style>
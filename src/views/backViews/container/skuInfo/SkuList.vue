<template>
  <el-main>
    <el-header class="sku_Header">
      <el-col>商品信息：</el-col>
        商品名：<el-input class="sku_Input"
            placeholder="请输入内容"
            v-model="skuName">
        </el-input>
        <el-button class="skuelButton" type="primary" @click="queryList">查询</el-button>
        <el-button class="skuelButton" plain @click="reset">重置</el-button>
        <el-button class="skuelButton" type="danger" @click="deleteAll">删除</el-button>
        <el-button class="skuelButton" type="success" @click="onSelfClick">上架</el-button>
    </el-header>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="已上架" name="first">
      <el-table border ref="elskuTable" :data="showData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column type="selection"/>
        <el-table-column prop="sku_id" v-if="false" label="商品id"></el-table-column>
        <el-table-column prop="sku_name" label="商品名"></el-table-column>
        <el-table-column prop="sku_desc" width="500px" label="商品描述" ></el-table-column>
        <el-table-column prop="price" label="商品售价" ></el-table-column>
        <el-table-column prop="store" label="商品库存"></el-table-column>
        <el-table-column prop="sku_type" label="商品类型"></el-table-column>
        <el-table-column label="商品图片">
           <template slot-scope="scope">
              <img :src="['http://localhost:8081/'+scope.row.img]" width="100px" height="100px">
           </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="toSkuEdit(scope.row.sku_id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="未上架" name="second">
      <el-table ref="elskuNoTable" :data="notshowData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column type="selection"/>
        <el-table-column prop="sku_id" v-if="false" label="商品id"></el-table-column>
        <el-table-column prop="sku_name" label="商品名"></el-table-column>
        <el-table-column prop="sku_desc" width="500px" label="商品描述" ></el-table-column>
        <el-table-column prop="price" label="商品售价" ></el-table-column>
        <el-table-column prop="store" label="商品库存"></el-table-column>
        <el-table-column prop="sku_type" label="商品类型"></el-table-column>
        <el-table-column label="商品图片">
           <template slot-scope="scope">
              <img :src="['http://localhost:8081/'+scope.row.img]" width="100px" height="100px">
           </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="toSkuEdit(scope.row.sku_id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>

    </el-tab-pane>
  </el-tabs>
     
     
    </el-main>
</template>

<script>

export default{
    data(){
      return {
        showData: [],
        notshowData: [],
        currentPage:1,
        pagesize:10,
        total:0,
        skuName:'',
        activeName: 'first',
        
      }
    },
    methods: {
      handleClick(){
        this.reset();
      },
      handleList(){
        this.axios.get(
          '/sku/selectSkuByStatus',
          {
            params: {
              sku_status : this.activeName=='first'? 0 : 1
            }
          }
        ).then(result=>{
          if(this.activeName=='first'){
            this.showData = result.data
            this.total = result.data.length;
          }else{
            this.notshowData = result.data
            this.total = result.data.length;
          }
        })
      },
       handleSizeChange(val) {
            this.pagesize=val;
        },
      handleCurrentChange(val) {
          this.currentPage = val;
      },
      queryList(){
        this.axios.get(
          '/sku/queryByName',
          {
            params: {
              sku_name:this.skuName
            }
          }
        ).then(result=>{
          console.log(result.data);
          if(result.data.length>0){
            for(var i=0;i<result.data.length;i++){
              if(result.data[i].sku_status==0){
                //重新赋值
                this.activeName = 'first';
                this.showData=[]
                this.showData[i] = result.data[i];
                console.log(this.showData[i]);
                this.total = this.showData.length;

              }else{
                this.activeName = 'second';
                this.notshowData=[];
                this.notshowData[i] = result.data[i];
                this.total = this.notshowData.length;
              }
            }
          }else{
            this.$message({
              message: '没有查询到相关商品',
              type: 'warning'
            });
            this.showData=[]
            this.notshowData=[];
          }
        })
      },
      reset(){
        this.skuName = '';
        this.handleList();
      },
      onSelfClick(){},
      deleteAll(){
        if(this.$refs.elskuTable.selection.length>0){
          this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i =0;i < this.$refs.elskuTable.selection.length;i++){
            if(this.$refs.elskuTable.selection[i].user_id == window.sessionStorage.getItem('user_id')){
              this.$message({
                message: '不能删除自己',
                type: 'warning'
              });
            }else{
              this.axios.get(
              '/user/deleteById',
              {
                params: {
                  user_id: this.$refs.elskuTable.selection[i].user_id
                }
              }).then(result=>{
                console.log(result);
                this.queryList();
              })
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }else{
          this.$message({
            message: '请选择要删除的用户',
            type: 'warning',
            showClose: true
          });
        }
        
      },
      toSkuEdit(sku_id){
        this.$router.push({name:'SkuEdit',params:{sku_id:sku_id}});
        console.log(sku_id);
      }
    },
    created() {
      this.handleList()
    },
  }
</script>

<style>
  .sku_Header{
    background-color: aliceblue;
  }
  .sku_Input{
    width:200px;
  }
  .el-col{
    text-align: left;
    width: 100px;
  }
  .skuelButton{
    margin-left: 20px;
  }
</style>
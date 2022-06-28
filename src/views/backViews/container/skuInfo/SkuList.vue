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
        <el-button class="skuelButton" type="success" @click="onSelfClick" v-show="activeName=='second'">上架</el-button>
        <el-button class="skuelButton" type="success" @click="onSelfClick" v-show="activeName=='first'">下架</el-button>
    </el-header>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="已上架" name="first">
      <el-table border ref="elskuTable" :data="showData.slice((currentPage1-1)*pagesize1,currentPage1*pagesize1)">
        <el-table-column type="selection"/>
        <el-table-column prop="sku_id" v-if="false" label="商品id"></el-table-column>
        <el-table-column prop="sku_name" label="商品名"></el-table-column>
        <el-table-column prop="sku_desc" width="500px" label="商品描述" ></el-table-column>
        <el-table-column prop="price" label="商品售价" ></el-table-column>
        <el-table-column prop="store" label="商品库存"></el-table-column>
        <el-table-column prop="sku_type" label="商品类型"></el-table-column>
        <el-table-column label="商品图片">
           <template slot-scope="scope">
              <img :src="['api/'+scope.row.img]" width="100px" height="100px">
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
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :page-sizes="[5, 10, 20]"
            :page-size="pagesize1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total1">
        </el-pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="未上架" name="second">
      <el-table ref="elskuNoTable" :data="notshowData.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)">
        <el-table-column type="selection"/>
        <el-table-column prop="sku_id" v-if="false" label="商品id"></el-table-column>
        <el-table-column prop="sku_name" label="商品名"></el-table-column>
        <el-table-column prop="sku_desc" width="500px" label="商品描述" ></el-table-column>
        <el-table-column prop="price" label="商品售价" ></el-table-column>
        <el-table-column prop="store" label="商品库存"></el-table-column>
        <el-table-column prop="sku_type" label="商品类型"></el-table-column>
        <el-table-column label="商品图片">
           <template slot-scope="scope">
              <img :src="['api/'+scope.row.img]" width="100px" height="100px">
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
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :page-sizes="[5, 10, 20]"
            :page-size="pagesize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total2">
        </el-pagination>
      </div>

    </el-tab-pane>
  </el-tabs>
     
     
    </el-main>
</template>

<script>

export default{
    inject: ['reload'],
    data(){
      return {
        showData: [],
        notshowData: [],
        currentPage1:1,
        currentPage2:1,
        pagesize1:10,
        pagesize2:10,
        total1:0,
        total2:0,
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
            this.total1 = result.data.length;
          }else{
            this.notshowData = result.data
            this.total2 = result.data.length;
          }
        })
      },
       handleSizeChange1(val) {
            this.pagesize1=val;
        },
      handleCurrentChange1(val) {
          this.currentPage1 = val;
      },
      handleSizeChange2(val) {
            this.pagesize2=val;
        },
      handleCurrentChange2(val) {
          this.currentPage2 = val;
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
                this.total1 = this.showData.length;

              }else{
                this.activeName = 'second';
                this.notshowData=[];
                this.notshowData[i] = result.data[i];
                this.total2 = this.notshowData.length;
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
      onSelfClick(){
        if(this.$refs.elskuTable.selection.length>0 || this.$refs.elskuNoTable.selection.length>0){
          this.$confirm('此操作将改变该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.$refs.elskuTable.selection.length>0){
            for(let i =0;i < this.$refs.elskuTable.selection.length;i++){
              this.axios.get(
              '/sku/updateStatusById',
              {
                params: {
                  sku_id: this.$refs.elskuTable.selection[i].sku_id,
                  sku_status: 0
                }
              }).then(result=>{
                console.log(result);
                this.reload();
              })
            }
          }else if(this.$refs.elskuNoTable.selection.length>0){
            for(let i =0;i < this.$refs.elskuNoTable.selection.length;i++){
                this.axios.get(
                  '/sku/updateStatusById',
                {
                  params: {
                    sku_id: this.$refs.elskuNoTable.selection[i].sku_id,
                    sku_status : 1
                  }
                }).then(result=>{
                  this.reload();
                })
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消改变'
          });          
        });
        }else{
          this.$message({
            message: '请选择要改变的商品',
            type: 'warning',
            showClose: true
          });
        }
      },
      deleteAll(){
        if(this.$refs.elskuTable.selection.length>0 || this.$refs.elskuNoTable.selection.length>0){
          this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.$refs.elskuTable.selection.length>0){
            for(let i =0;i < this.$refs.elskuTable.selection.length;i++){
              this.axios.get(
              '/sku/deleteSkuById',
              {
                params: {
                  sku_id: this.$refs.elskuTable.selection[i].sku_id
                }
              }).then(result=>{
                this.reload();
              })
            }
          }else if(this.$refs.elskuNoTable.selection.length>0){
            for(let i =0;i < this.$refs.elskuNoTable.selection.length;i++){
                this.axios.get(
                  '/sku/deleteSkuById',
                {
                  params: {
                    sku_id: this.$refs.elskuNoTable.selection[i].sku_id
                  }
                }).then(result=>{
                  this.reload();
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
            message: '请选择要删除的商品',
            type: 'warning',
            showClose: true
          });
        }
        
      },
      toSkuEdit(sku_id){
        this.$router.push({name:'SkuEdit',params:{sku_id:sku_id}});
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
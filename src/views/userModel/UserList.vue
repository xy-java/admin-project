<template>
  <el-main>
    <el-header class="userListHeader">
      <el-col>用户信息：</el-col>
        用户名：<el-input class="userListInput"
            placeholder="请输入内容"
            v-model="input_name">
        </el-input>
        邮箱：<el-input class="userListInput"
            placeholder="请输入内容"
            v-model="input_email">
        </el-input>
        <el-button class="userListButton" type="primary" @click="queryList">查询</el-button>
        <el-button class="userListButton" plain @click="reset">重置</el-button>
        <el-button class="userListButton" type="danger" @click="deleteAll">删除</el-button>
    </el-header>
      <el-table ref="elTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column type="selection"/>
        <el-table-column prop="user_id" label="用户Id" v-if="false"></el-table-column>
        <el-table-column prop="login_name" label="用户名称"></el-table-column>
        <el-table-column prop="passwd" label="用户密码" ></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="user_power" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button type="primary" @click="toUserEdit(scope.row.user_id)">修改</el-button>
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
    </el-main>
</template>

<script>

  let DataShow =  {
    name: 'DataShow',
    data(){
      return {
        tableData: [],
        currentPage:1,
        pagesize:10,
        total:0,
        input_name:'',
        input_email:''
      }
    },
    methods: {
      handleList(){
        this.axios.get(
          '/user/getAllUsers'
        ).then(result=>{
          console.log(result);
          this.tableData = result.data;
          this.total = result.data.length;
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
          '/user/queryByName',
          {
            params: {
              login_name: this.input_name,
              email :this.input_email
            }
          }
        ).then(result=>{
          console.log(result);
          this.tableData = result.data;
          this.total = result.data.length;
        })
      },
      reset(){
        this.input_name = '';
        this.input_email = '';
        this.queryList();
      },
      deleteAll(){
        if(this.$refs.elTable.selection.length>0){
          this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i =0;i < this.$refs.elTable.selection.length;i++){
            if(this.$refs.elTable.selection[i].user_id == window.sessionStorage.getItem('user_id')){
              this.$message({
                message: '不能删除自己',
                type: 'warning'
              });
            }else{
              this.axios.get(
              '/user/deleteById',
              {
                params: {
                  user_id: this.$refs.elTable.selection[i].user_id
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
      toUserEdit(user_id){
        this.$router.push({name:'UserEdit',params:{user_id:user_id}});
        console.log(user_id);
      }
    },
    created() {
      this.handleList()
    },
  }

  export default DataShow;
</script>

<style>
  .userListHeader{
    background-color: aliceblue;
  }
  .userListInput{
    width:200px;
  }
  .el-col{
    text-align: left;
    width: 100px;
  }
  .userListButton{
    margin-left: 20px;
  }
</style>
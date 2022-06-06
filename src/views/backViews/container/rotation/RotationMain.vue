<template>
  <el-main>
    <el-header class="rotationHeader">
      <el-col>轮播图信息：</el-col>
    </el-header>
    <el-table ref="rotationTable" :data="rotationTable">
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column  label="图片">
        <template slot-scope="scope">
          <img :src="['http://localhost:8081/images/'+scope.row.rotation_url]" width="200px" height="150px">
        </template>
      </el-table-column>
      <el-table-column  label="类型">
        <template slot-scope="scope">
          {{scope.row.rotation_type}}
        </template>
      </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-upload :show-file-list="false" :on-success="onSuccess" action="http://localhost:8081/rotation/upload" :data="{rotation_id:scope.row.rotation_id}" :limit="1">
              <el-button type="primary">修改图片</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import axios from 'axios';

  export default{
    name:'RotationMain',
    data() {
      return {
        rotationTable:[]
      }
    },
    methods: {
     onSuccess(){
        axios.get(
          '/rotation/selectAllList'
        ).then(res=>{
          this.rotationTable = res.data;
        })
     }
    },
    mounted() {
      this.onSuccess();
    },
  }
</script>

<style>
.rotationHeader{
  background-color: aliceblue;
  text-align: left;
}
</style>
<template>
  <!-- 轮播图 -->
  <el-carousel :interval="4000" type="card" height="350px" class="elCarousel">
    <el-carousel-item v-for="item in this.carousels" :key="item.rotation_url">
      <img :src="'http://localhost:8081/images/'+item.rotation_url" style="height:100%;width:100%;" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import axios from 'axios';

export default{
  name:'Carousel',
  data() {
    return {
      carousels: []
    }
  },
  mounted() {
      axios.get(
        '/rotation/selectAllList'
      ).then(res=>{
        this.carousels = res.data;
      })
    },
}
</script>

<style>
  .elCarousel{
    border: 1px solid #d3dce6;
    width: 80%;
    position: relative;
    left: 10%;
  }
  .medium {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
</style>
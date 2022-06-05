<template>
  <!-- 轮播图 -->
  <el-carousel :interval="4000" type="card" height="350px" class="elCarousel">
    <el-carousel-item v-for="item in this.carousels" :key="item">
      <img :src="item" style="height:100%;width:100%;" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default{
  name:'Carousel',
  data() {
    return {
      carousels: [
          require('@/assets/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'),
          require('@/assets/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'),
          require('@/assets/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'),
          require('@/assets/e27858e973f5d7d3904835f46abbdjpeg.jpeg'),
          require('@/assets/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'),
          require('@/assets/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg')
        ]
    }
  }
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
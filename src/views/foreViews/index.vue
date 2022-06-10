<template>
  <el-container class="containerIndex">
    <Header></Header>
    <!-- 主体部分 -->
    <el-main id="main" class="main">
      <div v-show="$route.meta.showfater">
        <SearchBar></SearchBar>
        <Carousel></Carousel>
        <SkuList></SkuList>
        <Aside></Aside>
      </div>
      <!-- 到顶部 -->
      <div>
          <el-backtop :visibility-height="200" class="rowTop" target=".main" :bottom="180" :right="30"><div class="el-icon-top font-size"></div></el-backtop>
      </div>
      <router-view></router-view>
    </el-main>
    <el-footer class="footer">
      <div class="bgImg"></div>
    </el-footer>
  </el-container>
</template>

<script>
import Header from '@/components/header/Header.vue';
import Aside from '@/components/aside/Aside.vue';
import Carousel from '@/components/containerMain/Carousel.vue';
import SearchBar from '@/components/containerMain/SearchBar.vue';
import SkuList from '@/components/mainPage/SkuList.vue';

export default {
    data() {
        return {
          
        };
    },
    methods: {
     
    },
    components: { Header, Aside,Carousel,SearchBar,SkuList }
    
}
</script>


<style>
  .containerIndex{
    height: 120%;
    width: 100%;
  }
  .main{
    border: 0px solid red;
  }
  .footer{
    background-color: #fafafa;
  }
  .bgImg{
    height: 100%;
    background: url(https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/global/slogan2020.png) no-repeat center ;
  }
</style>
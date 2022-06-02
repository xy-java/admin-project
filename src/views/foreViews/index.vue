<template>
  <el-container class="container">
    <Header></Header>
    <!-- 主体部分 -->
    <el-main class="main">
      main
    </el-main>
    <Aside></Aside>
    <el-footer class="footer">
      <div class="bgImg"></div>
    </el-footer>
  </el-container>
</template>

<script>
import Header from '@/components/header/Header.vue';
import Aside from '@/components/aside/Aside.vue';

export default {
    data() {
        return {
        };
    },
    methods: {},
    components: { Header, Aside }
}
</script>


<style>
  .container{
    height: 120%;
    width: 100%;
  }
  .main{
    border: 1px solid red;
  }
  .footer{
    background-color: #fafafa;
  }
  .bgImg{
    height: 100%;
    background: url(https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/global/slogan2020.png) no-repeat center ;
  }
</style>
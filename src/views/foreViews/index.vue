<template>
  <el-container class="container">
    <Header></Header>
    <!-- 主体部分 -->
    <el-main id="main" class="main">
      <div style="height: 10000px;"></div>
      <Aside></Aside>
      <div>
          <el-backtop class="rowTop" visibility-height="500" target=".main" :bottom="180" :right="30"><div class="el-icon-top font-size"></div></el-backtop>
      </div>
    </el-main>
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
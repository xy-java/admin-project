<template>
<el-container style="height: 100%; border: 1px solid #eee">
  <el-aside  width="200px" style="background-color: rgb(238, 241, 246);">
    <el-menu  :default-openeds="['1']"  :default-active="$route.path" router>
      <el-submenu index="1">
        <template  slot="title"><i class="el-icon-user"></i>个人信息</template>
        <el-menu-item-group>
          <el-menu-item index="/" @click="checkLogin">查看个人信息</el-menu-item>
          <el-menu-item index="/" @click="checkLogin">修改个人信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/" @click="checkLogin">
         <template slot="title"><i class="el-icon-more"></i>收货地址管理</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header class="personHeader" style="text-align: right; font-size: 12px">
      <span style="font-size:15px">当前登陆：{{login_name}}</span>
    </el-header>
    <router-view v-if="isRouterAlive"></router-view>

  </el-container>
</el-container>
</template>

<script>
export default  {
    name:'PersonalCenter',
    data() {
      return {
        login_name: '',
        isRouterAlive: true,
      }
    },
    provide(){
      return {
        reload:this.reload
      }
    },
    created() {
      this.login_name = window.sessionStorage.getItem('login_name');
      this.$router.push('/personalCenter');
    },
    methods: {
      checkLogin(){
        if(window.sessionStorage.getItem('login_name') ==null){
          this.$message({
            message: '请先登陆',
            type: 'warning'
          });
          this.$router.push('/');
        }
      },
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
      }
    },
  }
</script>

<style>
  .personHeader {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
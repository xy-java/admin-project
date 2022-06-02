<template>
<el-container style="height: 120%; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['2']"  :default-active="$route.path" router>
      <el-menu-item index="/dataShow" @click="checkLogin">
        <template slot="title"><i class="el-icon-pie-chart"></i>总体数据</template>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-user"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="/userList" @click="checkLogin">用户信息总览</el-menu-item>
          <el-menu-item index="/userAdd" @click="checkLogin">新增用户信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-takeaway-box"></i>订单管理</template>
        <el-menu-item-group>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-shopping-cart-2"></i>购物车管理</template>
        <el-menu-item-group>
          <el-menu-item index="5-1">选项1</el-menu-item>
          <el-menu-item index="5-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span style="font-size:15px">当前登陆：{{login_name}}</span>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-left: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="loginout()">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <router-view v-if="isRouterAlive"></router-view>

  </el-container>
</el-container>
</template>

<script>
 let container =  {
    name:'Container',
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
      this.$router.push('/container');
    },
    methods: {
      loginout() {
        window.sessionStorage.removeItem('login_name');
        window.sessionStorage.removeItem('user_id');
        this.$router.push('/AdminLogin');
      },
      checkLogin(){
        if(window.sessionStorage.getItem('login_name') ==null){
          this.$message({
            message: '请先登陆',
            type: 'warning'
          });
          this.$router.push('/AdminLogin');
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
   export default container;
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-main {
    text-align: center;
  }
  .el-aside {
    color: #333;
  }
</style>
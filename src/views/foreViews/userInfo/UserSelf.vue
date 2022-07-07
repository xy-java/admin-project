<template>
  <el-form label-width="100px" ref="userInfoForm" :model="userInfoForm">
    <el-header style="background-color: aliceblue;margin:20px">
      <el-col style="line-height: 55px;">用户信息：</el-col>
    </el-header>
    <el-form-item class="user-form-item" label="用户名：" prop="login_name">
      <el-input placeholder="请输入名称" v-model="userInfoForm.login_name" disabled></el-input>
    </el-form-item>
    <el-form-item class="user-form-item" label="密码：" prop="passwd">
      <el-input placeholder="请输入密码" v-model="userInfoForm.passwd" show-password disabled></el-input>
    </el-form-item>
    <el-form-item class="user-form-item" label="手机号：" prop="email">
      <el-input placeholder="请输入名称" v-model="userInfoForm.email"  prop="email" disabled></el-input>
    </el-form-item>
    <el-form-item class="user-form-item" label="角色：" >
      <el-select v-model="userInfoForm.user_power" placeholder="请选择" disabled>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
       </el-select>
    </el-form-item>
  </el-form>
</template>

<script>

  export default {
    inject: ['reload'],
    data() {
      
      return {
        userInfoForm:{
          user_id:'',
          login_name:'',
          passwd:'',
          email:'',
          user_power:''
        },
        options:[{
          value:'管理员',
          label:'管理员'
        },{
          value:'普通用户',
          label:'普通用户'
        }]
      };
    },
    methods: {
    },
    created() {
        this.axios.get(
          '/user/queryById',
          {
            params:{user_id:window.sessionStorage.getItem('user_id')}
          }
        ).then(res => {
          console.log(res.data);
          this.userInfoForm = res.data;
        })
    }
  };
</script>

<style>
  .user-form-item{
    margin-top: 50px;
    width: 50%;
    position: relative;
    left: 20%;
  }
  .userInfoButton{
    position: relative;
    margin-left: 40px;
    left: 40%;
  }
</style>

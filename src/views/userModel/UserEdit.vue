<template>
  <el-form label-width="100px" ref="editForm" :model="editForm" :rules="rules">
    <el-header style="background-color: aliceblue;margin:20px">
      <el-col>修改用户：</el-col>
    </el-header>
    <el-form-item class="edit-form-item" label="用户名：" prop="login_name">
      <el-input placeholder="请输入名称" v-model="editForm.login_name"></el-input>
    </el-form-item>
    <el-form-item class="edit-form-item" label="密码：" prop="passwd">
      <el-input placeholder="请输入密码" v-model="editForm.passwd" show-password></el-input>
    </el-form-item>
    <el-form-item class="edit-form-item" label="邮箱：" prop="email">
      <el-input placeholder="请输入名称" v-model="editForm.email"  prop="email"></el-input>
    </el-form-item>
    <el-form-item class="edit-form-item" label="角色：">
      <el-select v-model="editForm.user_power" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
       </el-select>
    </el-form-item>
    <el-button class="userEditButton" type="primary" plain @click="submitForm('editForm')">保存</el-button>
    <el-button class="userEditButton" plain @click="toList">取消</el-button>
  </el-form>
</template>

<script>

  export default {
    inject: ['reload'],
    data() {
      let checkName =(rule,value,callback) => {
        this.axios.get(
          '/user/queryCount',
          {
            params:{login_name:value,user_id:this.editForm.user_id}
          }).then(res => {
          if(res.data > 0){
            callback(new Error('用户名已存在'));
          }else{
            callback();
          }
        })
      };
      return {
        editForm:{
          user_id:'',
          login_name:'',
          passwd:'',
          email:'',
          user_power:'管理员'
        },
        options:[{
          value:'管理员',
          label:'管理员'
        },{
          value:'普通用户',
          label:'普通用户'
        }],
        rules: {
          login_name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { validator: checkName, trigger: 'blur' }
          ],
          passwd:[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          email:[
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
          
        }
      };
      
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$confirm('此操作将修改该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
              this.axios.get(
                '/user/update',
                {
                  params:{
                    user_id:this.editForm.user_id,
                    login_name:this.editForm.login_name,
                    passwd:this.editForm.passwd,
                    email:this.editForm.email,
                    user_power:this.editForm.user_power
                  }
                }
              ).then(res => {
                if(res.data == "修改成功"){
                  this.$message({
                    message:'修改成功',
                    type:'success',
                    center:true
                  });
                  this.$router.push('/userList');
                }else{
                  this.$message({
                    message:'修改失败,请联系管理员',
                    type:'info',
                    center:true
                  });
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消修改'
              });          
          });
          } else {
            console.log('error submit!!');
            return false;
          }
          
        });
      },
      
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toList() {
        this.$router.push('/userList');
      },
    },
    created() {
        this.axios.get(
          '/user/queryById',
          {
            params:{user_id:this.$route.params.user_id}
          }
        ).then(res => {
          console.log(res.data);
          this.editForm = res.data;
        })
    }
  };
</script>

<style>
  .edit-form-item{
    margin-top: 50px;
    width: 50%;
    position: relative;
    left: 20%;
  }
  .userEditButton{
    position: relative;
    margin-left: 40px;
    left: 40%;
  }
</style>

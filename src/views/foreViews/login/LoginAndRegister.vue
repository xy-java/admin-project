<template>
   <el-tabs class="elTab" v-model="activeName">
    <el-tab-pane  name="login" >
       <span slot="label">
             <i class="el-icon-s-grid" style="margin:0 80px 0 80px">
                 <span style="padding-left: 8px">登陆</span>
             </i>
        </span>
        <el-form class="elFrom" label-width="100px" :model="loginForm" ref="loginForm" :rules="loginLules">
          <el-form-item label="用户名:" prop="name" style="padding-left: 40px;">
            <el-input v-model="loginForm.name" class="inputStyle" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="passwd" style="padding-left: 40px;">
            <el-input v-model="loginForm.passwd" class="inputStyle" show-password clearable placeholder="请输入密码"></el-input>
          </el-form-item>
          
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" size="medium" native-type="button" @click="loginHandler('loginForm')" style="background: #191970;border: none">登录</el-button>
            <el-button type="danger" size="medium" native-type="button" @click="reset" style="border: none">重置</el-button>
            <el-button plain @click="toIndex">返回主页</el-button>
        </el-form-item>
        </el-form>
    </el-tab-pane>
    <el-tab-pane name="register">
        <span slot="label">
              <i class="el-icon-thumb" style="margin:0 80px 0 80px">
                  <span style="padding-left: 8px">注册</span>
              </i>
        </span>
        <el-form class="elFrom" label-width="100px" :model="registerForm" ref="registerForm" :rules="registRules">
          <el-form-item label="用户名:" prop="name" style="padding-left: 40px;">
            <el-input v-model="registerForm.name" class="inputStyle" clearable placeholder="输入不少于三位的字母和数字"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="passwd" style="padding-left: 40px;">
            <el-input v-model="registerForm.passwd" class="inputStyle" show-password clearable placeholder="输入不少于六位的字母和数字"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="email" style="padding-left: 40px;">
            <el-input v-model="registerForm.email" class="inputStyle"  clearable placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label=" " class="identifyForm">
            <el-input v-model="registerForm.verifycode"  placeholder="验证码" class="identifyinput"></el-input>
              <!-- <div class="identifybox" @click="refreshCode">
                <Sidentify :identifyCode="identifyCode"></Sidentify>
              </div> -->
              <el-button type="primary" :disabled="codebtn" style="margin-left:20px;" @click="getCode('registerForm')">
                <span>{{ sendCode}}</span>
                
              </el-button>
          </el-form-item>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" size="medium" native-type="button" @click="registerHander('registerForm')" style="background: #191970;border: none">注册</el-button>
            <el-button type="danger" size="medium" native-type="button" @click="reset" style="border: none">重置</el-button>
            <el-button plain @click="toIndex">返回主页</el-button>
          </el-form-item>
        </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Sidentify from '../../../components/Sidentify.vue'



export default{
  name:'LoginAndRegister',
  components:{
    Sidentify
  },
  data() {
    const checkName = (rule, value, callback)=>{
      this.axios.get(
          '/user/queryCount',
          {
            params:{login_name:value,user_id:''}
          }).then(res => {
          if(res.data > 0){
            callback(new Error('用户名已存在'));
          }else{
            callback();
          }
        })
    }
    const validatePhone = (rule,value,callback)=>{
        if (!value){
          callback(new Error('手机号不能为空！'));
        }
        //使用正则表达式进行验证手机号码
        if (!/^1[3456789]\d{9}$/.test(value)){
          callback(new Error('手机号不正确！'));
        }
        this.axios.get(
          '/user/checkPhone',
          {
            params:{
              email:this.registerForm.email
            }
          }).then(res => {
            if(res.data ==="已存在"){
              callback(new Error('手机号已注册'));
            }else{
              callback();
            }
          })
    }
    return {
      loginForm:{
        name:'',
        passwd:'',
        user_power:'普通用户'
      },
      identifyCodes: "1234567890", //验证码的数字库
      identifyCode: "",  // 验证码组件传值
      sendCode: "获取验证码",
      time_count: 60, // 倒计时时间
      codebtn: false,  // 是否可以点击获取验证码按钮
      timer: null,
      code: "",
      registerForm:{
        name:'',
        passwd:'',
        email:'',
        verifycode:'',
        user_power:'普通用户'
      },
      loginLules:{
        name:[
          {required: true,message: '请输入用户名', trigger: 'blur'}
        ],
        passwd:[
          {required: true,message: '请输入密码', trigger: 'blur'}
        ]
      },
      registRules:{
        name:[
          {required: true,message: '请输入用户名', trigger: 'blur'},
          { min: 3, message: '输入不少于三位的字母和数字', trigger: 'blur' },
          {max: 10, message: '输入不大于十位的字母和数字',trigger: 'blur'},
          { validator: checkName, trigger: 'blur' }
        ],
        passwd:[
          {required: true,message: '请输入密码', trigger: 'blur'},
          { min: 6,  message: '输入不少于六位的字母和数字', trigger: 'blur' },
          {max: 16, message: '输入不大于十六位的字母和数字',trigger: 'blur'}
        ],
        email:[
          {required: true,message: '请输入手机号', trigger: 'blur'},
          { validator:validatePhone, trigger: 'blur' }
        ]
      },
      activeName : window.sessionStorage.getItem('status')===null? 'login' :window.sessionStorage.getItem('status'),
    }
  },
  methods: {
    loginHandler(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.axios.get(
              '/user/login',
              {
                params:{
                  login_name:this.loginForm.name,
                  passwd:this.loginForm.passwd,
                  user_power:this.loginForm.user_power
                }
              }
            ).then(res => {
              console.log(res)
              if(res.data != ''){
                this.$message({
                  message:'登陆成功',
                  type:'success',
                  center:true
                });
                window.sessionStorage.setItem('login_name', res.data.login_name);
                window.sessionStorage.setItem('user_id', res.data.user_id);
                window.sessionStorage.setItem('user_power', res.data.user_power);
                window.sessionStorage.setItem('passwd', res.data.passwd);
                window.sessionStorage.setItem('isLogin', true);
                this.$router.push('/');
                this.$router.go(0);
              }else{
                this.$message({
                  message:'登陆失败,请检查用户名和密码',
                  type:'info',
                  center:true
                });
              }
              
            })
        }else {
            console.log('error submit!!');
            return false;
        }
      })
    },
    registerHander(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.axios.get(
            '/user/insert',
            {
              params:{
                login_name:this.registerForm.name,
                passwd:this.registerForm.passwd,
                email:this.registerForm.email,
                user_power:this.registerForm.user_power,
                verifycode:this.registerForm.verifycode,
                code:this.code
              }
            }
          ).then(res=>{
            console.log(res.data)
            if(res.data==='新增成功'){
              this.$message({
                message:'注册成功',
                type:'success',
                center:true
              });
              this.loginForm.name = this.registerForm.name;
              this.loginForm.passwd = this.registerForm.passwd;
              this.activeName = 'login';
            }else if(res.data === '验证码错误'){
              this.$message({
                message:'验证码错误',
                type:'warning',
                center:true
              });
            }else if(res.data==='该手机号已存在'){
              this.$message({
                message:'该手机号已存在',
                type:'warning',
                center:true
              });
            }
          }).catch(err=>{

          })
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    },
    getCode(formName){
      if(this.registerForm.email !== ""){
            this.axios.get(
            '/user/sendCode',
            {
              params:{
                phoneNumber:this.registerForm.email
              }
            }
          ).then(
            res=>{
              this.code = res.data;
              this.$message({
                message:'验证码已发送,请注意查收!',
                type:'success',
                center:true
              })
              let that = this;
              if(!that.timer){
                that.timer = setInterval(() => {

                  if (that.time_count > 0) {

                    this.codebtn = true;

                    that.time_count--;

                    that.sendCode = "重新发送" + that.time_count + "s";

                  } else {
                    that.sendCode = "获取验证码";
                    clearInterval(that.timer);
                    that.timer = null;
                    that.time_count = 60;
                    this.codebtn = false;
                  }
                }, 1000);
          }
        }
      )
      }else{
        this.$message({
          message:'请输入手机号',
          type:'warning',
          center:true
          });
      }
   
    },
   
    reset(){
      this.loginForm.name='';
      this.loginForm.passwd='';
      this.loginForm.verifycode='';
    },
    toIndex(){
      this.$router.push('/');
    },
    //验证码----start
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    //验证码----end
  },
  beforeDestroy() {
    window.sessionStorage.removeItem('status');
  },
  created() {
    this.refreshCode(); //初始化验证码
  }
}
</script>

<style>
  .elTab{
    border: 1px solid #e6e6e6;
    width: 465px;
    position: relative;
    left: 40%;
    height: 460px;
    top: 10%;
  }
  .elFrom{
    margin-top: 30px;
  }
  .inputStyle{
    width: 250px;
  }
  .identifybox{
    width: 130px;
    border: 1px #e6e6e6 solid;
    position: absolute;
    right: 75px;
    border-radius: 5px;
  }
  .identifyinput{
    float: left;
    width: 152px;
  }
  .identifyForm{
    height: 40px;
  }
</style>
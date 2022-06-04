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
          <!-- 随机验证码 -->
          <el-form-item label=" " prop="verifycode" class="identifyForm">
            <el-input v-model="loginForm.verifycode" ref="verifycode" placeholder="验证码" class="identifyinput"></el-input>
              <div class="identifybox" @click="refreshCode">
                <Sidentify :identifyCode="identifyCode"></Sidentify>
              </div>
          </el-form-item>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" size="medium" native-type="button" @click="loginHandler" style="background: #191970;border: none">登录</el-button>
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
          <el-form-item label="邮箱:" prop="email" style="padding-left: 40px;">
            <el-input v-model="registerForm.email" class="inputStyle"  clearable placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label=" " prop="verifycode" class="identifyForm">
            <el-input v-model="registerForm.verifycode" ref="verifycode" placeholder="验证码" class="identifyinput"></el-input>
              <div class="identifybox" @click="refreshCode">
                <Sidentify :identifyCode="identifyCode"></Sidentify>
              </div>
          </el-form-item>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" size="medium" native-type="button" @click="registerHander" style="background: #191970;border: none">注册</el-button>
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
    const validateVerifycode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        console.log('验证码:', value);
        callback(new Error('验证码不正确!'))
      } else {
        callback()
      }
    }
    return {
      loginForm:{
        name:'',
        passwd:'',
        verifycode:''
      },
      identifyCodes: "1234567890", //验证码的数字库
      identifyCode: "",  // 验证码组件传值
      registerForm:{
        name:'',
        passwd:'',
        email:''
      },
      loginLules:{
        verifycode:[
          { required: true, trigger: 'blur', validator: validateVerifycode }
        ],
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
          {max: 10, message: '输入不大于十位的字母和数字',}
        ],
        passwd:[
          {required: true,message: '请输入密码', trigger: 'blur'},
          { min: 6,  message: '输入不少于六位的字母和数字', trigger: 'blur' },
          {max: 16, message: '输入不大于十六位的字母和数字',}
        ],
        email:[
          {required: true,message: '请输入邮箱', trigger: 'blur'},
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      activeName : window.sessionStorage.getItem('status')===null? 'login' :window.sessionStorage.getItem('status'),
    }
  },
  methods: {
    loginHandler(){
      console.log(this.loginForm);
    },
    registerHander(){
      alert('注册成功');
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
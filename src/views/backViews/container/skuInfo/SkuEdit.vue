<template>
  <el-form label-width="100px" ref="skuEditForm" :model="skuEditForm" :rules="rules">
    <el-header style="background-color: aliceblue;margin:20px">
      <el-col>修改商品：</el-col>
    </el-header>
    <el-form-item class="skuEditFormItem" label="商品名：" prop="sku_name">
      <el-input placeholder="请输入商品名称" v-model="skuEditForm.sku_name" ></el-input>
    </el-form-item>
    <el-form-item class="skuEditFormItem" label="商品描述：">
      <el-input type="textarea" placeholder="请输入商品描述：" v-model="skuEditForm.sku_desc"></el-input>
    </el-form-item>
    <el-form-item  class="skuEditFormItem" label="售价：" prop="price">
      <el-input style="width: 200px;" placeholder="请输入售价" v-model.number="skuEditForm.price"></el-input>￥
    </el-form-item>
    <el-form-item class="skuEditFormItem" label="库存：" prop="store">
      <el-input style="width: 200px;" placeholder="请输入库存数" v-model.number="skuEditForm.store"></el-input>
    </el-form-item>
    <el-form-item label="商品图片：" class="skuEditFormItem" >
      <el-upload 
        class="avatar-uploader"
        action="http://localhost:8081/sku/upload"
        :show-file-list="false"
        ref="upload"
        :on-success="handleAvatarSuccess"
        :auto-upload="false"
        :on-change="uploadFile">
        <img v-if="this.imgUrl=='' ? this.skuEditForm.img : this.imgUrl" :src="this.imgUrl=='' ? this.skuEditForm.img : this.imgUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item class="skuEditFormItem"  label="商品类型：">
      <el-select v-model="skuEditForm.sku_type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
       </el-select>
    </el-form-item>
    <el-form-item class="skuEditFormItem"  label="直接上架：">
      <el-switch active-value="0" inactive-value="1" v-model="skuEditForm.sku_status"></el-switch>
    </el-form-item>
   
      <el-button class="skuEditFormButton" type="primary" plain @click="submitForm('skuEditForm')">保存</el-button>
      <el-button class="skuEditFormButton" plain @click="resetForm">重置</el-button>

  </el-form>
</template>

<script>


  export default {
    inject: ['reload'],
    data() {
      let checkName =(rule,value,callback) => {
        
      };
      return {
        skuEditForm:{
          sku_id:'',
          sku_name:'',
          price:'',
          sku_desc:'',
          store:'',
          salcount:'',
          img:'',
          sku_type:'',
          sku_status: '',
        },
        imgUrl: '',
        options:[{
          value:'手机',
          label:'手机'
        },{
          value:'电脑',
          label:'电脑'
        },{
          value:'手表',
          label:'手表'
        }],
        rules: {
          sku_name: [
            { required: true, message: '请输入商品名', trigger: 'blur' },
            { min: 3, message: '输入不少于三位的字母和数字', trigger: 'blur' }
          ],
          price:[
            { required: true, message: '请输入售价',trigger: 'blur'},
            {type:'number',message:'请输入数字',trigger: 'blur'}
          ],
          store:[
            { required: true, message: '请输入库存',trigger: 'blur'},
            {type:'number',message:'请输入数字',trigger: 'blur'}
          ],
        }
      };
      
    },
    methods: {
      resetForm() {
        this.skuEditForm = {
          sku_id:'',
          sku_name:'',
          price:'',
          sku_desc:'',
          store:'',
          salcount:0,
          img:'',
          sku_summary:'',
          parameter_id:'',
          sku_type:'手机',
          sku_status:'0',
        }
      },
      handleAvatarSuccess(res,file){
        this.skuEditForm.img = file.response;
      },
      uploadFile(file){
        this.imgUrl= URL.createObjectURL(file.raw);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           
            this.$refs.upload.submit();
            
            setTimeout(() => {
                  this.axios.get('/sku/updateSku',
                {
                  params:this.skuEditForm
                }
                ).then(res => {
                if(res.data == '修改成功'){
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.$router.push('/skuList');
                  this.reload();
                }else{
                    
                  this.$message({
                    message: '修改失败',
                    type: 'error'
                  });
                }
              })
            }, 1000);

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {
      this.axios.get('/sku/selectByIds',
        {
          params:{
            sku_id:this.$route.params.sku_id
          }
        }
      ).then(res => {
        console.log(res);
        this.skuEditForm = res.data[0];
        this.skuEditForm.sku_status = String(res.data[0].sku_status);
        this.skuEditForm.img = 'http://localhost:8081/'+res.data[0].img;

      }).catch(err => {
        console.log(err);
      })
    },
  };
</script>

<style>
  .skuEditFormItem{
    width: 50%;
    position: relative;
    left: 20%;
  }
  .skuEditFormButton{
    position: relative;
    left: 40%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

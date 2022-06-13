<template>
    <div>
      <SearchBar></SearchBar>
      <el-row>
        <!-- 放图片 -->
        <el-col :span="7" :push="3">
          <img :src="imgUrl" style="width:100%;height: 100%;" />
        </el-col>
        <!-- 放产品信息 -->
        <el-col :span="11" :push="3">
          <el-row class="padding-left"><h2>{{this.skuInfoList.sku_name}}</h2></el-row>
          <el-row class="sku-desc padding-left">{{this.skuInfoList.sku_desc}}</el-row>
          <el-row class="price padding-left font-size">{{this.skuInfoList.price}}元</el-row>
          <el-row><div style="border-bottom: 1px solid #e0e0e0;margin:20px 0 20px 12px;"></div></el-row>
          <el-row class="address padding-left">
            <div class="el-icon-location"></div>
            <span>北京</span>
            <span style="margin-left: 20px;">北京市</span>
            <span style="margin-left: 20px;">海淀区</span>
            <span style="margin-left: 20px;">清河街道</span>
            <el-button type="text" class="update" @click="dialogVisible = true">修改</el-button>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="40%">
              <span>这是一段信息</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>

            <div style="color: #ff6700;margin-top: 10px;">{{this.haveStore}}</div>
          </el-row>
          <el-row v-if="this.skuInfoList.sku_type=='手机'" class="font-size padding-left chosePro">选择版本</el-row>
          <el-row v-if="this.skuInfoList.sku_type=='手机'" class="version">
            <el-radio-group v-for="(item,index) in versionList" :key="index" v-model="versionBase">
              <el-radio-button class="versionRadio" :label="index">{{item}}</el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row v-if="this.skuInfoList.sku_type=='手机'" class="font-size padding-left chosePro">选择颜色</el-row>
          <el-row v-if="this.skuInfoList.sku_type=='手机'" class="version">
            <el-radio-group  class="versionRadio" v-for="(item,index) in colorList" :key="index" v-model="colorBase">
              <el-radio-button :label="index">{{item}}</el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row v-if="this.skuInfoList.sku_type=='电脑'" class="font-size padding-left chosePro">选择配置</el-row>
          <el-row v-if="this.skuInfoList.sku_type=='电脑'" class="version">
            
          </el-row>

          <el-row v-if="this.skuInfoList.sku_type=='手表'" class="font-size padding-left chosePro">选择表系列</el-row>
          <el-row v-if="this.skuInfoList.sku_type=='手表'" class="version">
            
          </el-row>

          <el-row class="info padding-left">
            <div class="desc">
              {{this.skuInfoList.sku_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{this.versionList[versionBase]}}&nbsp;&nbsp;&nbsp;&nbsp;{{this.colorList[colorBase]}}
              <span style="margin-left:400px">{{this.skuInfoList.price}}元</span>
            </div>
            <div class="sum">总计：{{this.skuInfoList.price}}元</div>
          </el-row>
          <el-row class="padding-left cartButton">
            <el-button class="buttonCart" type="primary">加入购物车</el-button>
            <el-button class="buyButton">立即购买</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import SearchBar from '@/components/containerMain/SearchBar.vue';

export default{
  name:'BuyPage',
  data() {
    return {
      parameterList:[],
      skuInfoList : [],
      versionList:[],
      colorList:[],
      cpList:[],
      seriesList:[],
      imgUrl:'',
      versionBase:0,
      colorBase:0,
      haveStore:'',
      dialogVisible: false
    }
  },
  methods: {
    changeColor(){

    }
  },
  // beforeDestroy() {
  //   window.sessionStorage.removeItem("sku_id");
  // },
  created() {
    this.axios.get(
      '/sku/selectSkuInfoBuy',
      {
        params:{
          sku_id:window.sessionStorage.getItem("sku_id")
        }
      }
    ).then(res=>{
      this.parameterList=res.data[0].paramterInfo[0];
      this.versionList = this.parameterList.parameter_versions.split(',');
      this.colorList = this.parameterList.parameter_color.split(',');
      this.cpList = this.parameterList.parameter_cp.split(',');
      this.seriesList = this.parameterList.parameter_series.split(',');
      this.skuInfoList = res.data[0].skuInfo[0];
      this.imgUrl = 'http://localhost:8081/' + this.skuInfoList.img;
      this.haveStore = res.data[0].skuInfo[0].store > 0 ? '有现货' : '无现货';
    })
  },
  components:{
    SearchBar
  },
}
</script>

<style>
  .update{
    color: #ff6700 !important;
    margin-left: 20px;
  }
  .border{
    border: 1px solid red;
  }
  .h2{
    margin: 0;
    font-size: 24px;
    font-weight: 400;
    color: #212121;
  }
  .padding-left{
    padding-left: 12px;
  }
  .sku-desc{
    margin: 0;
    line-height: 1.5;
    padding-top: 8px;
    color: #b0b0b0;
  }
  .price{
    line-height: 1;
    color: #ff6700;
    padding-top: 12px;
  }
  .address{
    margin-left: 13px;
    border: 1px solid #e0e0e0;
    background: #fafafa;
    padding: 30px 50px;
  }
  .info{
    margin-left: 13px;
    margin-top: 30px;
    height: 150px;
    border: 1px solid #e0e0e0;
    background: #fafafa;
    padding: 30px 50px;
  }
  .font-size{
    font-size: 18px;
  }
  .chosePro{
    margin-top: 20px;
  }
  .version{
    margin-top: 20px;
    margin-left: 12px;
  }
  .cartButton{
    margin-top: 30px;
  }
  .buttonCart{
    border-radius: 0;
    width: 180px;
    height: 50px;
  }
  .buyButton{
    background: #ff6700;
    color: #fff;
    border: 1px solid #ff6700;
    border-radius: 0;
    width: 220px;
    height: 50px;
  }
  .versionRadio{
    margin-right: 40px;
  }
  .sum{
    margin-top: 30px;
    color: #ff6700;
    font-size: 25px;
  }
  .desc{
    color:#616161;
    font-size: 14px;
  }
 
</style>
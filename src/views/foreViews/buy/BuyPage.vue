<template>
    <div>
      <SearchBar></SearchBar>
      <el-row>
        <!-- 放图片 -->
        <el-col :span="7" :push="3">
          <img :src="'http://localhost:8081/' + this.skuInfoList.img" style="width:100%;height: 100%;" />
        </el-col>
        <!-- 放产品信息 -->
        <el-col :span="11" :push="3">
          <el-row class="padding-left"><h2>{{this.skuInfoList.sku_name}}</h2></el-row>
          <el-row class="sku-desc padding-left">{{this.skuInfoList.sku_desc}}</el-row>
          <el-row class="price padding-left font-size">{{this.skuInfoList.price}}元</el-row>
          <el-row><div style="border-bottom: 1px solid #e0e0e0;margin:20px 0 20px 12px;"></div></el-row>
          <el-row class="address padding-left">地址</el-row>
          <el-row class="font-size padding-left chosePro">选择版本</el-row>
          <el-row class="version">
            
          </el-row>
          <el-row class="font-size padding-left chosePro">选择颜色</el-row>
          <el-row class="version">
            
          </el-row>
          <el-row class="info padding-left">购买详情</el-row>
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
      active:true,
      before:'ulList',
      after:'ulListActive',
    }
  },
  methods: {
    
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
      console.log(res.data);
      this.parameterList=res.data[0].paramterInfo[0];
      this.versionList = this.parameterList.parameter_versions.split(',');
      this.colorList = this.parameterList.parameter_color.split(',');
      this.cpList = this.parameterList.parameter_cp.split(',');
      this.seriesList = this.parameterList.parameter_series.split(',');
      this.skuInfoList = res.data[0].skuInfo[0];
      console.log(this.versionList);
    })
  },
  components:{
    SearchBar
  },
}
</script>

<style>
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
    height: 200px;
    border: 1px red solid;
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
</style>
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
            <span v-if="userLogin == null ? false : true">
              <span style="margin-left: 20px;">{{this.address_level1}}</span>
              <span style="margin-left: 20px;">{{this.address_level2}}</span>
              <span style="margin-left: 20px;">{{this.address_level3}}</span>
              <span style="margin-left: 20px; margin-right: 20px;">{{this.address_info}}</span>
            </span>
            <span v-else>
              <span style="margin-left: 20px;">北京市</span>
              <span style="margin-left: 20px;">市辖区</span>
              <span style="margin-left: 20px;margin-right: 20px;">西城区</span>
            </span>
            <el-button type="text" @click="dialogVisible = true">修改</el-button>
            <el-dialog
              title="我的收货地址"
              :visible.sync="dialogVisible"
              width="40%">
               <el-table highlight-current-row :data="addressData" style="width: 100%"  @current-change="handleCurrentChange">
               <div slot="empty">请<a href="#/loginAndRegister" style="text-decoration: none; color:#ff6700;">登陆</a>查看</div>
                  <el-table-column type="index" label="序号"></el-table-column>
                  <el-table-column prop="address_id"  label="地址id"  v-if="false"></el-table-column>
                  <el-table-column prop="derive_name" label="收货人"></el-table-column>
                  <el-table-column label="收货地址" prop="address" align="center"></el-table-column>
                  <el-table-column prop="address_info" label="详细地址" align="center"></el-table-column>
                  <el-table-column
                      prop="address_status"
                      label="默认地址">
                    <template slot-scope="scope">
                      <el-tag  v-if="scope.row.address_status==0" type="success" size="mini" >默认</el-tag>
                    </template>
                  </el-table-column>
                </el-table>

              <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="buttonAddressId" :disabled="buttonDisabled">确 定</el-button>
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
            <el-radio-group  class="cpRadio" v-for="(item,index) in cpList" :key="index" v-model="cpBase">
              <el-radio-button :label="index">{{item}}</el-radio-button>
            </el-radio-group>
          </el-row>

          <el-row v-if="this.skuInfoList.sku_type=='手表'" class="font-size padding-left chosePro">选择表系列</el-row>
          <el-row v-if="this.skuInfoList.sku_type=='手表'" class="version">
            <el-radio-group  class="cpRadio" v-for="(item,index) in seriesList" :key="index" v-model="seriesBase">
              <el-radio-button :label="index">{{item}}</el-radio-button>
            </el-radio-group>
          </el-row>

          <el-row class="info padding-left">
            <div class="desc">
              {{this.skuInfoList.sku_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{this.versionList[versionBase]}}&nbsp;&nbsp;&nbsp;&nbsp;{{this.colorList[colorBase]}}
              <span style="margin-left:400px">{{this.skuInfoList.price}}元</span>
            </div>
            <div class="sum">总计：{{this.skuInfoList.price}}元</div>
          </el-row>
          <el-row class="padding-left cartButton">
            <el-button class="buttonCart" type="primary" @click="addCart">加入购物车</el-button>
            <el-button class="buyButton" @click="buyOrder">立即购买</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import SearchBar from '@/components/containerMain/SearchBar.vue';

import { regionData,CodeToText } from "element-china-area-data";

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
      cpBase:0,
      seriesBase:0,
      haveStore:'',
      dialogVisible: false,
      address_level1:'',
      address_level2:'',
      address_level3:'',
      address_info:'',
      address_id:'',
      userLogin:window.sessionStorage.getItem('user_id'),
      addressData:[],
      buttonDisabled:true,
      selectAddressData:{},
      
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(val != null){
        this.selectAddressData = val;
        this.buttonDisabled = false;
      }
    },
    addCart(){
      if(window.sessionStorage.getItem('login_name') ==null){
        this.$message({
          message: '请先登陆',
          type: 'warning'
        });
      }else{
        let buyInfo = {
          address_id:this.address_id,
          version : this.versionList[this.versionBase],
          color : this.colorList[this.colorBase],
          cp : this.cpList[this.cpBase],
          series : this.seriesList[this.seriesBase]
        }
        window.sessionStorage.setItem('buyInfo',JSON.stringify(buyInfo));
        
        this.$router.push('/cartPage');
      }
    },
    buyOrder(){
      if(window.sessionStorage.getItem('login_name') ==null){
        this.$message({
          message: '请先登陆',
          type: 'warning'
        });
        this.$router.push('/buyPage');
      }else{
        let buyInfo = {
          address_id:this.address_id,
          version : this.versionList[this.versionBase],
          color : this.colorList[this.colorBase],
          cp : this.cpList[this.cpBase],
          series : this.seriesList[this.seriesBase]
        }
        window.sessionStorage.setItem('buyInfo',JSON.stringify(buyInfo));
      }
    },
    buttonAddressId(){
      this.dialogVisible = false;
      this.axios.get(
        '/address/selectById',
        {
          params:{
            address_id:this.selectAddressData.address_id
          }
        }
      ).then(res=>{
        this.address_level1 = CodeToText[res.data[0].address_level1];
        this.address_level2 = CodeToText[res.data[0].address_level2];
        this.address_level3 = CodeToText[res.data[0].address_level3];
        this.address_id = res.data[0].address_id;
        this.address_info = res.data[0].address_info;
      })
    },
    addressLoad(){
      this.axios.get(
        '/address/queryStatusById',
        {
          params: {
            user_id: window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res=>{
        this.address_level1 = CodeToText[res.data[0].address_level1];
        this.address_level2 = CodeToText[res.data[0].address_level2];
        this.address_level3 = CodeToText[res.data[0].address_level3];
        this.address_id = res.data[0].address_id;
        this.address_info = res.data[0].address_info;
      })
    },
    loadAddressData() {
      this.axios.get(
        '/address/queryAddress',
        {
          params:{
            user_id:window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res => {
        this.addressData = res.data;
        this.addressData.forEach(item => {
          item.address = CodeToText[item.address_level1] + "/" + CodeToText[item.address_level2] + "/" + CodeToText[item.address_level3];
        });
      });
    },
  },
  created() {
    this.loadAddressData();
    this.addressLoad();
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

<style scoped>
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
  .cpRadio{
    margin-right: 20px;
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
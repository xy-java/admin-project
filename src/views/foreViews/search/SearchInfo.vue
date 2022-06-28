<template>
  <div class="searchMainDiv" >
    <el-row  v-for="type in types" :key="type">
      <el-col class="mobile">{{type}}</el-col>
      <el-col :span="5" v-for="(item,index) in searchTable" v-if="item.sku_type===type" :key="index" :offset="0">
        <a href="#/buyPage" class="ahoverList" @click="getSkuId(item)">
          <el-card class="elCard2">
            <img :src="['http://localhost:8081/' + item.img]" class="imageList">
            <div style="text-align:center; font-size: smaller;">
              <span>{{item.sku_name}}</span>
            </div>
            <div style="padding: 4px;text-align:center;">
              <span style="color: #ff6700;">￥{{item.price}}</span>
            </div>
        </el-card>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default{
  name:'SearchInfo',
  data() {
    return {
      searchTable:[],
      types:[]
    }
  },
  methods: {
    getSkuId(item){
      window.sessionStorage.setItem("sku_id",item.sku_id);
    }
  },
  created() {
    this.searchTable = JSON.parse(window.sessionStorage.getItem("skuInfoList"));
    let type = new Set();
    for(let i=0;i<this.searchTable.length;i++){
      type.add(this.searchTable[i].sku_type);
    }
    this.types = type;
  },
  
}
</script>

<style>
  .searchMainDiv{
    position: relative;
    margin-top: 50px;
    left: 18%;
    width: 80%;
  }
  .imageList{
    width: 200px;
    height:200px;
    border: 1px solid #f5f5f5;
  }
  .mobile{
    font-size: larger;
    line-height: 40px;
  }
  .elCard2{
    height: 300px;
    width: 250px;
  }
  .ahoverList{
    display: block;
    height: 300px;
    margin-bottom: 20px;
    margin-right: 20px;
    width: 250px;
    text-decoration: none;
  }
  .ahoverList:hover{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.411);
    transition: all .2s linear;
  }
</style>
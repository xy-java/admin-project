<template>
  <div class="mainDiv" >
    <el-row  v-for="type in types" :key="type">
      <el-col class="mobilephone">{{type}}</el-col>
      <el-col :span="5" v-for="(item,index) in skuTable" v-if="item.sku_type===type" :key="index" :offset="0">
        <a class="ahover" @click="toBuyPage(item.sku_id)">
          <el-card class="elCard">
            <img :src="['http://localhost:8081/' + item.img]" class="image">
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
  name:'SkuList',
  data() {
    return {
      skuTable:[],
      types:[]
    }
  },
  methods: {
    createdHeadle(){
      this.axios.get(
        '/sku/selectSkuAll'
      ).then(res=>{
        this.skuTable=res.data;
        let type = new Set();
        for(let i=0;i<this.skuTable.length;i++){
          type.add(this.skuTable[i].sku_type);
        }
        this.types = type;
      })
    },
    toBuyPage(sku_id){
      window.sessionStorage.setItem("sku_id",sku_id);
      this.$router.push('buyPage');
    }
  },
  created() {
    this.createdHeadle();
  },
}
</script>

<style>
  .mainDiv{
    position: relative;
    margin-top: 50px;
    left: 18%;
    width: 80%;
  }
  .image{
    width: 200px;
    height:200px;
    border: 1px solid #f5f5f5;
  }
  .backgroundColor{
    background-color: #f5f5f5;
  }
  .mobilephone{
    font-size: larger;
    line-height: 40px;
  }
  .elCard{
    height: 300px;
    width: 250px;
  }
  .ahover{
    display: block;
    height: 300px;
    margin-bottom: 20px;
    margin-right: 20px;
    width: 250px;
    text-decoration: none;
  }
  .ahover:hover{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.411);
    transition: all .2s linear;
  }
</style>
<template>
  <!-- 搜索框模块 -->
  <el-row class="elAutocomplete">
    <img src="@/assets/logo.png" class="imgComplete">
    <el-row class="positionCol">
      <el-autocomplete v-model="inputName" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
      <el-button class="autoButton" @click="handleClick"><i class="el-icon-search"></i></el-button>
    </el-row>
  </el-row>
</template>

<script>
export default{
  name:'SearchBar',
  data() {
    return {
      skuInfoList: [],
      inputName: ''
    }
  },
  methods: {
      loadAll() {
        this.axios.get(
          '/sku/searchSkuName',
        ).then(res => {
          var skuInfo = res.data.map((terminal) => {
            return{
              value: terminal.sku_name,
              name: terminal.sku_id
            }
          })
          this.skuInfoList = skuInfo;
        })
      },
      querySearchAsync(queryString, cb) {
        let results = this.skuInfoList;
        results = queryString ? results.filter(this.createStateFilter(queryString)) : results;
        cb(results);
      },
      createStateFilter(queryString) {
        return (item) => {
          return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
      },
      handleSelect(item) {

      },
      handleClick(){
        this.axios.get(
          '/sku/queryByNameStatus',
          {
            params: {
              sku_name: this.inputName
            }
          }
        ).then(res => {
          if(res.data.length>0){
            window.sessionStorage.setItem("skuInfoList",JSON.stringify(res.data));
            this.$router.push('/searchInfo');
          }
        })

      }
    },
    mounted() {
      this.loadAll();
    },
}
</script>

<style scoped>
.positionCol{
  position: relative;
  left: 74%;
  display: inline-block;
}
.imgComplete{
  display: inline-block;
  height: 50px;
  width:50px;
  position: relative;
  left: 10%;
  top: 15px;
}
.elAutocomplete{
  margin-bottom: 40px;
}
.autoButton{
  border-radius: 0;
}
</style>
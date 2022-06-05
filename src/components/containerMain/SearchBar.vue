<template>
  <!-- 搜索框模块 -->
  <el-row class="elAutocomplete">
    <img src="@/assets/logo.png" class="imgComplete">
    <el-row class="positionCol">
      <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
      <el-button class="autoButton" @click="handleClick"><i class="el-icon-search"></i></el-button>
    </el-row>
  </el-row>
</template>

<script>
export default{
  name:'SearchBar',
  data() {
    return {
      restaurants: [],
       state: ''
    }
  },
  methods: {
      loadAll() {
        return [
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        cb(results);
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handleClick(){
        console.log("搜索");
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>

<style>
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
<template>
  <div class="mainDiv" >
    <el-row :key="type" v-for="type in types">
      <el-col class="mobilephone">{{type}}</el-col>
      <el-col :span="5" v-for="item in skuTable" v-if="item.sku_type===type" :key="item" :offset="0">
        <a href="/" class="ahover">
          <el-card class="elCard">
            <img :src="item.img" class="image">
            <div style="padding: 10px;text-align:center;">
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
      skuTable:[
        {sku_name:'手机1',price:'1120',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/211bb83776a8e0c8358732c3f3aa2864.png?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'手机'},
        {sku_name:'手机1',price:'1120',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5713971c4bb6512743dfd06023080268.png?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'手机'},
        {sku_name:'手机1',price:'1120',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7fccce9e65aff2d7c913e40f4bee1b0b.png?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'手机'},
        {sku_name:'手机1',price:'1120',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bcd64f412dfb5e15695fa96d21ecb23.png?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'手机'},
        {sku_name:'手机1',price:'1120',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bcd64f412dfb5e15695fa96d21ecb23.png?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'手机'},
        {sku_name:'手机1',price:'1120',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bcd64f412dfb5e15695fa96d21ecb23.png?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'手机'},
        {sku_name:'手机2',price:'1560',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bcd64f412dfb5e15695fa96d21ecb23.png?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'手机'},
        {sku_name:'手机3',price:'1680',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bcd64f412dfb5e15695fa96d21ecb23.png?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'手机'},
        {sku_name:'手机4',price:'1750',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b8259e8fb355acf168c66f75d375c6af.jpg?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'手表'},
        {sku_name:'手机5',price:'2100',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b8259e8fb355acf168c66f75d375c6af.jpg?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'手表'},
        {sku_name:'手机6',price:'2300',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0f8abb2bc3947c4679e3f1b2aafc28c0.jpg?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'电脑'},
        {sku_name:'手机6',price:'2300',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0f8abb2bc3947c4679e3f1b2aafc28c0.jpg?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'电脑'},
        {sku_name:'手机6',price:'2300',sku_desc:'小米手机一号',img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0f8abb2bc3947c4679e3f1b2aafc28c0.jpg?thumb=1&w=200&h=200&f=webp&q=90',sku_type:'电脑'}
      ],
      types:['手机','电脑','手表']
    }
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
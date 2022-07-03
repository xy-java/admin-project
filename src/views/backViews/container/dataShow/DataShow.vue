<template>
  <div style="width:100%;height:100%;">
    <div class="main">
      <el-card class="elcard1" shadow="hover">用户人数：{{count}}人</el-card>
      <el-card class="elcard2" shadow="hover">销售总额：{{sumPrice}}元</el-card>
    </div>
    
    <div class="myecharts">
      <div id="main" class="echarts"></div>
      <div id="main1" class="echarts"></div>
      <div id="main2" class="echarts"></div>
    </div>
  </div>

</template>

<script>

  export default {
      data() {
        return {
          option1:{},
          option2:{},
          option3:{},
          count:0,
          sumPrice:0,
        }
      },
      methods: {
        loadCount(){
          this.axios.get(
            'sqoop/userCount'
          ).then(res=>{
            this.count = res.data.count;
            this.sumPrice = res.data.sumPrice;
          })
        },
        getDataList(){
          var categoryData =[];
          var time = new Date();
          //7天前
          var time1 = new Date(time.getTime() - 7 * 24 * 60 * 60 * 1000);
          //YY-MM-DD
          var time2 = time1.getFullYear() + "-" + (time1.getMonth() + 1) + "-" + time1.getDate();
          for (var i = 0; i <= 7; i++) {
            var time3 = new Date(time1.getTime() + i * 24 * 60 * 60 * 1000);
            var time4 = (time3.getMonth() + 1) + "-" + time3.getDate();
            categoryData.push(time4);
          }
          return categoryData;
        },
        load(){
          var chartDom = document.getElementById('main');
          var chartDom1 = document.getElementById('main1');
          var chartDom2 = document.getElementById('main2');
          var myChart = this.echarts.init(chartDom);
          var myChart1 = this.echarts.init(chartDom1);
          var myChart2 = this.echarts.init(chartDom2);
          this.option1 = {
            title: {
              left: 'center',
              bottom:'bottom',
              text: '最近7日销售分析'
            },
            toolbox: {
              show: true,
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              name: "日期",
              data: this.getDataList(),
              
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
              }
            ]
          };
          this.option2 = {
            title: {
              left: 'center',
              bottom:'bottom',
              text: '产品类型年销售情况'
            },
            legend: {},
            tooltip: {},
            dataset: {
              dimensions: ['product', '2015', '2016', '2017'],
              source: [
                { product: '手机', 2015: 43, 2016: 85, 2017: 93 },
                { product: '手表', 2015: 83, 2016: 73, 2017: 55 },
                { product: '电脑', 2015: 86, 2016: 65, 2017: 82 }
              ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
          };
          this.option3 = {
            title: {
              left: 'center',
              bottom:'bottom',
              text: '产品类型总购买情况'
            },
             tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                name: '购买占比',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: 1048, name: '手机' },
                  { value: 735, name: '电脑' },
                  { value: 580, name: '手表' }
                ]
              }
            ]
          }
          myChart.setOption(this.option1);
          myChart1.setOption(this.option2);
          myChart2.setOption(this.option3);
        }
      },
      mounted() {
        this.load();
        this.loadCount();
      },
  }
</script>

<style scoped>
  .border{
    border: 1px red solid;
  }
  .main{
    height: 25%;
  }
  .myecharts{
    height: 75%;
  }
  .elcard1{
    width: 250px;
    height: 115px;
    border:1px slategray solid;
    text-align: center;
    font-size: 26px;
    display: inline-block;
    padding-top: 35px;
    position: relative;
    top: 20%;
    left: 20%;
  }
  .elcard2{
    width: 350px;
    height: 115px;
    border:1px slategray solid;
    text-align: center;
    font-size: 26px;
    display: inline-block;
    padding-top: 35px;
    position: relative;
    top: 20%;
    left: 40%;
  }
  .echarts{
    width:33%;
    height:100%;
    display: inline-block;
  }
</style>
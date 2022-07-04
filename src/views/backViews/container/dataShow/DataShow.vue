<template>
  <div style="width:100%;height:100%;">
    <el-button id="analys"
      type="primary"
      @click="openFullScreen2" v-if="false">
      分析数据
    </el-button>
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
          week:[],
          weekcount:[]
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
        openFullScreen2() {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.axios.get(
            '/sqoop/execLinux'
          ).then(res=>{
            if(res.data==='success'){
              loading.close();
            }else{
              loading.close();
              this.$message.error('执行失败');
            }
          })
          
        },
        load(){
          this.axios.get(
            '/sqoop/getTypePrice'
          ).then(res=>{
            let type = [];
            let typeDate = [];
            for(let key in res.data[0]){
              type.push(key);
              typeDate.push(res.data[0][key]);
            }
            var chartDom1 = document.getElementById('main1');
            var myChart1 = this.echarts.init(chartDom1);
            this.option2 = {
              title: {
                left: 'center',
                bottom:'bottom',
                text: '产品类型总销售金额'
              },
              xAxis: {
                type: 'category',
                data: type
              },
              yAxis: {
                type: 'value'
              },
              
              series: [
                {
                  data: typeDate,
                  type: 'bar',
                  itemStyle:{
                    normal:{
                      label:{
                        formatter:"{c}" + "元",
                        show:true,
                        position:'top'
                      }
                    }
                  },
                }
              ]
            };
            
            myChart1.setOption(this.option2);
            })
          
        },
        loadNum(){
          this.axios.get(
            '/sqoop/getTypeNum'
          ).then(res=>{
          var chartDom2 = document.getElementById('main2');
          var myChart2 = this.echarts.init(chartDom2);
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
                  data: res.data
                }
              ]
            }
            myChart2.setOption(this.option3);
          })
        },
        loadDate(){
          this.axios.get(
            '/sqoop/getTypeDate'
          ).then(res=>{
            let week1 = [];
            let weekcount1 = [];
            for(let key in res.data[0]){
              week1.push(key.substring(5,10));
              weekcount1.push(res.data[0][key]);
            }
            var chartDom = document.getElementById('main');
            var myChart = this.echarts.init(chartDom);
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
                data: week1,
                axisLabel:{
                  interval: 0,//X轴信息全部展示
                },
                axisTick: {
                  alignWithLabel: true
                }
              },
              yAxis: {
                type: 'value'
              },
              tooltip : {
                trigger: 'axis',
                
              },
              series: [
                {
                  data: weekcount1,
                  type: 'line'
                }
              ]
            };
            myChart.setOption(this.option1);
          })
        }
      },
      
      mounted() { 
        this.load();
        this.loadCount();
        this.loadDate();
        this.loadNum();
      },
  }
</script>

<style scoped>
  .border{
    border: 1px red solid;
  }
  .main{
    height: 20%;
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
    top: 10%;
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
    top: 10%;
    left: 40%;
  }
  .echarts{
    width:33%;
    height:100%;
    display: inline-block;
  }
</style>
<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="main">
      <span>12345</span>
      <span>17<i class="el-icon-caret-top" style="color:cyan"></i><i class="el-icon-caret-bottom" style="color:red"></i></span>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  data () {
    return {

    }
  },
  components: {

  },
  mounted() {
    let lineCharts=echarts.init(this.$refs.charts)
    lineCharts.setOption({
        xAxis:{show:false,type:'category'},
        yAxis:{show:false},
        series:[
            {
                type:'line',
                data:[90,17,33,67,21,51],
                itemStyle:{opacity:0},
                lineStyle:{color:'purple'},
                areaStyle:{
                    color:{
                        type:'liner',
                        x:0,
                        y:0,
                        x2:0,
                        y2:1,
                        colorStops:[
                            {
                                offset:0,
                                color:'purple'
                            },
                            {
                                offset:1,
                                color:'#fff'
                            },
                        ],
                        global:false,
                    }
                }
            }
        ],
        grid:{
            left:0,
            top:0,
            right:0,
            bottom:0,
        },
    })
  },
  methods: {

  },
}

</script>
<style scoped lang='css'>
i{
  color:#d9d9d9;
  margin-left: 10px;
}
.main span:first-child{
  margin-right: 20px;
  font-style: 100px;
}
.main{
  margin-top: 20px;
}
.charts{
  width: 100%;
  height: 50px;
}
</style>
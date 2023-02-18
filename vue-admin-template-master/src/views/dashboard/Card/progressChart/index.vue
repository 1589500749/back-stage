<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts';
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
        xAxis:{show:false,min:0,max:100},
        yAxis:{show:false,type:'category'},
        series:[
            {
                type:'bar',
                data:[78],
                color:'pink',
                barWidth:10,
                showBackground:true,
                label:{
                    show:true,
                    position:'right',
                    formatter:'|'
                },
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
.charts{
    width: 100%;
    height: 100%;
}
</style>
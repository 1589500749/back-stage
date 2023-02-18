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
        xAxis:{show:false,type:'category'},
        yAxis:{show:false},
        series:[
            {
                type:'bar',
                data:[90,17,33,67,21,51,44,9],
                color:'skyblue',
            }
        ],
        grid:{
            left:0,
            top:0,
            right:0,
            bottom:0,
        },
        tooltip:{},
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
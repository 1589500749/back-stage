<template>
  <div>
    <el-card class="box-card" style="margin: 10px, 0">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- v-model="activeName" @tab-click="handleClick" -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="date"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 内容 -->
      <div>
        <el-row :gutter="10">
          <el-col :span="20">
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="4">
            <h4>门店{{title}}排名</h4>
            <ul>
                <li>
                    <span>0</span>
                    <span>肯德基</span>
                    <span>12345</span>
                </li>
                <li>
                    <span>0</span>
                    <span>肯德基</span>
                    <span>12345</span>
                </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import * as dayjs from "dayjs";
export default {
  name: "",
  data() {
    return {
      activeName: "sale",
      mycharts:null,
      date:[],//收集日历组件的数据
    };
  },
  components: {},
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
        title:{
            text:`${this.title}趋势`,
        },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月","八月","九月","十月","十一月","十二月"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220,110,98,167,123,44],
        },
      ],
    });
  },
  methods: {
    setDay(){
        const day=dayjs().format('YYYY-MM-DD')
        this.date=[day,day]
    },
    setWeek(){
        const start=dayjs().day(1).format('YYYY-MM-DD')
        const end=dayjs().day(7).format('YYYY-MM-DD')
        this.date=[start,end]
    },
    setMonth(){
        const start=dayjs().startOf('month').format('YYYY-MM-DD')
        const end=dayjs().endOf('month').format('YYYY-MM-DD')
        this.date=[start,end]
    },
    setYear(){
        const start=dayjs().startOf('year').format('YYYY-MM-DD')
        const end=dayjs().endOf('year').format('YYYY-MM-DD')
        this.date=[start,end]
    },
  },
  computed:{
    title(){
        return this.activeName=='sale'?"销售额":"访问量"
    },
  },
  watch:{
    title(){
        this.mycharts.setOption({
            title:{
                text:this.title
            }
        })
    }
  },
};
</script>
<style scoped lang='css'>
>>> .el-card__header {
  border-bottom: none;
  padding-bottom: 0;
}
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 200px;
  padding: 0px;
  box-sizing: border-box;
}
.right span {
  margin: 0 20px;
}
.charts {
  width: 100%;
  height: 300px;
}
h4{
    margin: 0;
}
ul{
    list-style: none;
    height: 300px;
    padding-left: 0;
}
ul li{
    height: 8%;
    display: flex;
    justify-content: space-between;
}
/* .date /deep/ el-range-input{
    width: 69px;
} */
.el-date-editor /deep/ .el-range-input{
    width: 68%;
}
</style>
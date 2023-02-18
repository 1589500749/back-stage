<template>
  <div>
    <el-row :gutter="10">
        <el-col :span="6">
            <el-card>
                <Detail title="总销售额" count='￥126560'>
                    <template slot="charts">
                        <span>周同比 56.67% <i class="el-icon-caret-top" style="color:cyan"></i></span>
                        <span>日同比 19.96% <i class="el-icon-caret-bottom" style="color:red"></i></span>
                    </template>
                    <template slot="footer">
                        <span>日销售额￥1234</span>
                   </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title="访问量" count='88460'>
                    <template slot="charts">
                        <lineChart></lineChart>
                    </template>
                    <template slot="footer">
                        <span>日访问量1234</span>
                   </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title='支付笔数' count='88460'>
                    <template slot="charts">
                        <barChart></barChart>
                    </template>
                    <template slot="footer">
                        <span>转化率65%</span>
                   </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title="运营活动效果" count='78%'>
                    <template slot="charts">
                        <progressChart></progressChart>
                    </template>
                    <template slot="footer">
                        <span>周同比 56.67% <i class="el-icon-caret-top" style="color:cyan"></i></span>
                        <span>日同比 19.96% <i class="el-icon-caret-bottom" style="color:red"></i></span>
                   </template>
                </Detail>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail';
import lineChart from './lineChart';
import barChart from './barChart';
import progressChart from './progressChart';
export default {
  name: '',
  data () {
    return {

    }
  },
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart,
  },
  mounted() {

  },
  methods: {

  },
}

</script>
<style scoped lang='less'>
</style>
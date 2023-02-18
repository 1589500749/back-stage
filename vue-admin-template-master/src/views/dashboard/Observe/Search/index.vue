<template>
  <div>
    <el-card slot="header" class="clearfix">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-more el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus"
              >狮子头</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-circle-plus-outline"
              >螺蛳粉</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check"
              >蚵仔煎</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-divider></el-divider>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <lineChart></lineChart>
          </el-col>
          <el-col :span="12">
            <lineChart></lineChart>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
        >
          <el-table-column  label="排名"  width="80" type="index">
          </el-table-column>
          <el-table-column label="搜索关键字" width="180">
          </el-table-column>
          <el-table-column  label="用户数" sortable>
          </el-table-column>
          <el-table-column  label="周涨幅" sortable>
          </el-table-column>
        </el-table>
        <el-pagination
        small
        layout="prev, pager, next"
        :total="50"
        class="pagination">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import lineChart from "./lineChart";
export default {
  name: "",
  data() {
    return {
        tableData:[{}],
    };
  },
  components: {
    lineChart,
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='css'>
.search-header {
  display: flex;
  justify-content: space-between;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.pagination{
    float: right;
}
</style>
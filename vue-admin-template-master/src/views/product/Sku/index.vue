<template>
  <div>
    <el-table :data="records" style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="80" type="index" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width:80px;height:80px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="success" icon="el-icon-bottom" title="下架" v-if="row.isSale==0" @click="cancelSale(row)"></el-button>
          <el-button type="success" icon="el-icon-top" title="上架" v-if="row.isSale==1" @click="sale(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" title="编辑" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-info" title="详情" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" title="删除"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        style="margin-top: 20px; textalign: center"
        :current-page="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        :pager-count="9"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
    </el-pagination>
    <el-drawer  :visible.sync="drawer" :direction="direction" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col></el-col>
        <el-col :span="16">
            <el-tag type="success" v-for="(item) in skuInfo.skuAttrValueList" :key="item.id" style="margin-right:10px;margin-bottom:10px">{{item.attrId}}--{{item.valueId}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
           <el-carousel height="600px" type="card">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id" style="background-repeat:no-repeat;background-size:cover">
              <img :src="item.imgUrl" >
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data () {
    return {
      page:1,
      limit:8,
      records:[],
      total:0,
      skuInfo:{},
      drawer:false,
      direction: 'rtl',
    }
  },
  components: {

  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    async getSkuList(){
      let result=await this.$API.default.sku.reqSkuList1(this.page,this.limit)
      if(result.code==200){
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleCurrentChange(pager) {
      this.page = pager;
      this.getSkuList();
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    // 下架
    async cancelSale(row){
      try {
        let result = await this.$API.default.sku.reqCancel(row.id)
        if(result.code==200){
          this.$message({type:'success',message:'下架成功'})
          row.isSale=!row.isSale
        }
      } catch (error) {
        this.$message({type:'danger',message:'下架失败'})
      }
    },
    // 上架
    async sale(row){
      try {
        let result = await this.$API.default.sku.reqSale(row.id)
        if(result.code==200){
          this.$message({type:'success',message:'上架成功'})
          row.isSale=!row.isSale
        }
      } catch (error) {
        this.$message({type:'danger',message:'上架失败'})
      }
    },
    // 编辑
    edit(){
      this.$message('待开发')
    },
    // 获取详情
    async getSkuInfo(row){
      this.drawer=true
      let result = await this.$API.default.sku.reqSkuById(row.id)
      if(result.code==200){
          this.skuInfo=result.data
        }
    },
  },
}

</script>
<style scoped lang='css'>
  .el-row .el-col-5{
    font-size: 18px;
    text-align: right;
  }
  .el-col{
    margin: 10px 10px;
  }
</style>

<style lang="css">
     .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
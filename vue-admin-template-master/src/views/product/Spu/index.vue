<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene!=0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 展示SPU列表 -->
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button
        >
        <el-table :data="records" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HintButton
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></HintButton>
              <HintButton
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></HintButton>
              <HintButton
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的sku列表"
                @click="handler(row)"
              ></HintButton>
              <el-popconfirm :title="`确定删除吗？`" :ref="$index" @onConfirm='deleteSpu(row)'>
                <HintButton
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                  title="删除spu"
                  
                ></HintButton>
              </el-popconfirm>
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
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <!-- 点击添加spu和修改spu后展示的部分 -->
      <SpuForm v-show="scene==1" @changeScene='changeScene' ref="spu"></SpuForm>
      <!-- 点击添加sku后展示的部分 -->
      <SkuForm v-show="scene==2" ref="sku" @changeScene1='changeScene1'></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="skuList" style="width:100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="150"></el-table-column>
        <el-table-column prop="price" label="价格" width="200"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column label="默认图片" width="width" >
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 8,
      records: [],
      total: 0,
      scene: 0, //0代表展示spu列表，1代表添加或修改spu,2代表添加sku
      dialogTableVisible:false,//控制对话框显示与隐藏
      spu:{},
      skuList:[],//用来存储sku列表的数据
      loading:true,
    };
  },
  components: {
    SpuForm,
    SkuForm,
  },
  mounted() {},
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else if (level == 3) {
        this.category3Id = categoryId;
        // level=3意味着第三级分类发生改变，前两级分类的id都有了，于是可以发送请求
        this.getSpuList();
      }
    },
    async getSpuList() {
      const { page, limit, category3Id } = this;
      let result = await this.$API.default.spu.reqSpuList(
        page,
        limit,
        category3Id
      );
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleCurrentChange(pager) {
      this.page = pager;
      this.getSpuList();
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    // 添加spu
    addSpu(){
      this.scene=1
      this.$refs.spu.addSpuData(this.category3Id)
    },
    // 修改spu
    updateSpu(row) {
      this.scene=1
      this.$refs.spu.initSpuDate(row)
    },
    // 子组件SpuForm的自定义事件的回调函数
    changeScene({scene,flag}){
      // flag用来区分是保存按钮是"添加SPU"触发的还是"修改SPU"触发的
      this.scene=scene
      // 再次获取SPU列表进行展示，如果是修改，停留在当前页，如果是添加，则默认回到第一页
      if(flag=='修改'){
        this.getSpuList(this.page)
      }else{
        this.getSpuList()
      }
    },
    // 子组件SkuForm的自定义事件的回调函数
    changeScene1(scene){
      this.scene=scene
    },
    // 删除spu
    async deleteSpu(row){
      let result=await this.$API.default.spu.reqDeleteSpu(row.id)
      if(result.code==200){
        this.$message({type:'success',message:'删除成功'})
        this.getSpuList(this.records.length>1?this.page:this.page-1)
      }
    },
    // 添加sku
    addSku(row){
      this.scene=2
      this.$refs.sku.getData(this.category1Id,this.category2Id,row)
    },
    // 查看sku详情
    async handler(spu){
      this.dialogTableVisible=true
      // 保存选中的spu的信息
      this.spu=spu
      // 获取sku列表数据来展示
      let result=await this.$API.default.sku.reqSkuList(spu.id)
      if(result.code==200){
        this.skuList=result.data
        this.loading=false
      }
    },
    // 关闭dialog的回调
    close(done){
      this.loading=true
      // 清除sku列表的数据
      this.skuList=[]
      // 关闭dialog
      done()
    },
  },
};
</script>
<style scoped lang='less'>
</style>
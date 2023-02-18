<template>
<!-- 添加sku -->
  <div >
    <el-form ref="form"  label-width="80px">
      <el-form-item label="SPU名称">
        {{spu.spuName}}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input  placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input  placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input  placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form"  label-width="80px" :inline="true">
          <el-form-item :label="item.attrName" v-for="(item) in attrInfoList" :key="item.id">
            <el-select  placeholder="请选择" v-model="item.attrIdAndValueId">
              <el-option :label="item1.valueName" :value="`${item.id}:${item1.id}`" v-for="(item1) in item.attrValueList" :key="item1.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form"  label-width="80px" :inline="true">
          <el-form-item :label="item.saleAttrName" v-for="(item) in spuSaleAttrList" :key="item.id">
            <el-select  placeholder="请选择" v-model="item.attrIdAndValueId">
              <el-option :label="item1.saleAttrValueName" :value="`${item.id}:${item1.id}`" v-for="(item1) in item.spuSaleAttrValueList" :key="item1.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%" border :data='spuImageList'  @selection-change="handleSelectionChange">
          <el-table-column
            prop="prop"
            type="selection"
            width="80">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="图片"
            width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column
            prop="imgName"
            label="名称"
            width="width">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      // 获取服务器发来的图片
      spuImageList:[],
      spuSaleAttrList:[],
      attrInfoList:[],
      skuInfo:{
        category3Id:0,
        spuId:0,
        tmId:0,
        skuName:'',
        price:0,
        weight:0,
        skuDesc:'',
        skuDefaultImg:'',
        skuImageList:[],
        skuSaleAttrValueList:[],
        skuAttrValueList:[]
      },
      spu:{},
      // 收集el-table中选择的图片
      imageList:[],
    }
  },
  components: {

  },
  mounted() {

  },
  methods: {
    // 获取skuform数据
    async getData(category1Id,category2Id,spu){
      this.skuInfo.category3Id=spu.category3Id
      this.skuInfo.spuId=spu.id
      this.skuInfo.tmId=spu.tmId
      this.spu=spu
      let result1=await this.$API.default.sku.reqSpuImageList(spu.id)
      if(result1.code==200){
        let list=result1.data
        list.forEach(item=>{
          item.isDefault=0
        })
        this.spuImageList=list
      }
      let result2=await this.$API.default.sku.reqSpuSaleAttrList(spu.id)
      if(result2.code==200){
        this.spuSaleAttrList=result2.data
      }
      let result3=await this.$API.default.sku.reqAttrInfoList(category1Id,category2Id,spu.category3Id)
      if(result3.code==200){
        this.attrInfoList=result3.data
      }
    },
    // table表格复选框按钮的事件
    handleSelectionChange(params){
      this.imageList=params
    },
    // “设置默认”按钮的排他操作
    changeDefault(row){
      this.spuImageList.forEach(item=>item.isDefault=0)
      row.isDefault=1
      this.skuInfo.skuDefaultImg=row.imgUrl
    },
    // "取消"按钮
    cancel(){
      this.$emit('changeScene1',0)
      Object.assign(this._data,this.$options.data())
    },
    // "保存"按钮
    async save(){
      // 整理即将发送给服务器保存的数据
      const {attrInfoList,skuInfo,imageList}=this
          // 整理平台属性
          let arr=[]
          attrInfoList.forEach(item=>{
            // 如果用户进行了
            if(item.attrIdAndValueId){
              const [attrId,valueId]=item.attrIdAndValueId.split(':')
              let obj={attrId,valueId}
              arr.push(obj)
            }
          })
          skuInfo.skuAttrValueList=arr
          // 整理销售属性
          skuInfo.skuSaleAttrValueList=this.spuSaleAttrList.reduce((prev,item)=>{
            if(item.attrIdAndValueId){
              const[saleAttrId,saleAttrValueId]=item.attrIdAndValueId.split(':')
              prev.push({saleAttrId,saleAttrValueId})
            }
            return prev
          },[])
          // 整理图片的数据
          skuInfo.skuImageList=imageList.map(item=>{
            return{
              imgName:item.imgName,
              imgUrl:item.imgUrl,
              isDefault:item.isDefault,
              spuImgId:item.id
            }
          })
      // 发请求
      try {
        let result=await this.$API.default.sku.reqAddSku(skuInfo)
        if(result.code==200){
          this.$message({type:'success',message:'保存成功'})
          Object.assign(this._data,this.$options.data())
          this.$emit('changeScene1',0)
        }
      } catch (error) {
        this.$message('保存失败')
      }
    },
  },
}

</script>
<style scoped lang='less'>
</style>
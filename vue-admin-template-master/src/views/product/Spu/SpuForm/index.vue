<template>
  <!-- 添加spu和修改spu -->
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="item.tmName"
            :value="item.id"
            v-for="item in tradeMarkList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="照片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="this.spuImageList"
          :on-success='handlerSuccess'
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="item.name" :value="`${item.id}:${item.name}`" v-for="(item) in unSelectSaleAttr" :key="item.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            align="center"
            prop="prop"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
              
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
                @keyup.enter.native="$event.target.blur"
                
              >
              <!-- @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              </el-input>
              <el-button
                v-if="!row.inputVisible"
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >+ 添加</el-button
              >
              <!-- @click="showInput" -->
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
          >
          <template slot-scope="{row,$index}">
            <el-button type="danger" icon="el-icon-delete" size='mini' @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
          </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 收集未选择的销售属性的id和名字
      attrIdAndAttrName:'',
      // spu对象是点击保存后发给服务器的数据集合
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "",
        spuImageList: [
          //   {
          //     id:'',
          //     imgName:'',
          //     imgUrl:'',
          //     spuId:'',
          // }
        ],
        spuSaleAttrList: [
          // {
            // baseSaleAttrId:1,
          //   id:0,
            // saleAttrName:'颜色',
            // spuId:8964,
            // spuSaleAttrValueList:[
              // {
                // baseSaleAttrId:1,
          //       id:0,
          //       isChecked:'',
                // saleAttrName:'颜色',
                // saleAttrValueName:'哈哈哈',
                // spuId:8964,
              // }
            // ],
          // }
        ],
      },
      tradeMarkList: [],
      spuImageList: [],
      saleAttrList: [],
    };
  },
  components: {},
  computed:{
    // 计算还未选择的销售属性
    unSelectSaleAttr(){
      // 相当于两层for循环
      let result=this.saleAttrList.filter(item1=>{
        return this.spu.spuSaleAttrList.every(item2=>{
          return item1.name!=item2.saleAttrName
        })
      })
      return result
    },
  },
  mounted() {},
  methods: {
    //图片上传本地成功的回调函数
    handlerSuccess(response,file,fileList){
      // 成功上传的图片对象会被elementUI自动添加上name和url字段
      this.spuImageList=fileList
    },
    handleRemove(file, fileList) {
      // file是删除的那张图，fileList是剩余的其他图
      // 显示出来的图片由于elementUI的使用标准，我们在本地为其增加了name和url字段，将来收集图片数据发送给服务器前要将这两个字段处理掉
      this.spuImageList=fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 初始化spu组件的数据
    async initSpuDate(spu) {
      // 获取spu的信息
      let spuResult = await this.$API.default.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      // 获取品牌的信息
      let tradeMarkResult = await this.$API.default.spu.reqTradeMarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取spu图片的数据
      let spuImageResult = await this.$API.default.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        listArr.forEach((item) => {
          // 将服务器返回的数据赋值给两个新属性name、url，因为elementUI的照片墙组件规范是这两个名字
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.default.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 添加销售属性
    addSaleAttr(){
      const [baseSaleAttrId,saleAttrName]=this.attrIdAndAttrName.split(':')
      let newSaleAttr={baseSaleAttrId,saleAttrName,spuSaleAttrList:[]}
      this.spu.spuSaleAttrList.push(newSaleAttr)
      // 添加完成则将下拉框置空
      this.attrIdAndAttrName=''
    },
    // 添加销售属性值
    addSaleAttrValue(row){
      // 添加响应式数据inputVisible来控制input标签和button标签的切换
      this.$set(row,'inputVisible',true)
      // 添加响应式数据inputValue来收集input标签的内容
      this.$set(row,'inputValue','')
    },
    // 添加销售属性值的input标签失焦
    handleInputConfirm(row){
      const {baseSaleAttrId,inputValue}=row
      // 属性值不能为空
      if(inputValue.trim()==''){
        this.$message('属性值不能为空')
        row.inputVisible=false
        return;
      }
      // 属性值不能重复
      // if(row.spuSaleAttrValueList){
      //   let result=row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue)
      //   if(!result){
      //     this.$message('属性值不能重复')
      //     row.inputValue=false
      //     return;
      //   }
      // }
      let newSaleAttrValue={baseSaleAttrId,saleAttrValueName:inputValue}
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible=false
    },
    // 保存按钮的回调
    async addOrUpdateSpu(){
      // 整理参数
      this.spu.spuImageList=this.spuImageList.map(item=>{
        return {
          imgName:item.name,
          imgUrl:item.imgUrl?item.imgUrl:item.response.data
        }
      })
      try {
        let result=await this.$API.default.spu.reqAddOrUpdateSpu(this.spu)
        if(result.code==200){
          this.$message({type:'success',message:'保存成功'})
          this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'})
        }
      } catch (error) {
        this.$message('保存失败')
      }
      Object.assign(this._data,this.$options.data())
    },
    // 添加SPU
    async addSpuData(category3Id){
      this.category3Id=category3Id
      // 获取品牌的信息
      let tradeMarkResult = await this.$API.default.spu.reqTradeMarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取平台全部的销售属性
      let saleResult = await this.$API.default.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 点击取消按钮
    cancel(){
      this.$emit('changeScene', {scene:0,flag:''})
      // 清理掉没有提交保存的数据
      Object.assign(this._data,this.$options.data())
    },
  },
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
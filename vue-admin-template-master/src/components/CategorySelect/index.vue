<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <!-- label是显示的内容，value是被v-model收集后传给data的内容， -->
        <el-select  placeholder="请选择" v-model="cForm.category1Id" @change="handler1" :disabled="show">
          <el-option :label="item1.name" :value="item1.id" v-for="(item1) in list1" :key="item1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择" v-model="cForm.category2Id" @change="handler2" :disabled="show">
          <el-option :label="item2.name" :value="item2.id" v-for="(item2) in list2" :key="item2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择" v-model="cForm.category3Id" @change="handler3" :disabled="show">
          <el-option :label="item3.name" :value="item3.id" v-for="(item3) in list3" :key="item3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      list1:[],
      list2:[],
      list3:[],
      cForm:{
        category1Id:'',
        category2Id:'',
        category3Id:'',
      },
    };
  },
  components: {},
  mounted() {
    this.getCategory1List()
  },
  methods: {
    async getCategory1List(){
      let result=await this.$API.default.attr.reqCategory1List()
      if(result.code==200){
        this.list1=result.data
      }
    },
    async handler1(){
      this.list2=[]
      this.list3=[]
      this.cForm.category2Id=''
      this.cForm.category3Id=''
      const {category1Id}=this.cForm
      // 将一级分类的id传给父组件Attr
      this.$emit('getCategoryId',{categoryId:category1Id,level:1})
      let result=await this.$API.default.attr.reqCategory2List(category1Id)
      if(result.code==200){
        this.list2=result.data
      }
    },
    async handler2(){
      this.list3=[]
      this.cForm.category3Id=''
      const {category2Id}=this.cForm
      // 将二级分类的id传给父组件Attr
      this.$emit('getCategoryId',{categoryId:category2Id,level:2})
      let result=await this.$API.default.attr.reqCategory3List(category2Id)
      if(result.code==200){
        this.list3=result.data
      }
    },
    handler3(){
      const {category3Id}=this.cForm
      // 将三级分类的id传给父组件Attr
      this.$emit('getCategoryId',{categoryId:category3Id,level:3})
    },
  },
};
</script>
<style scoped lang='less'>
</style>
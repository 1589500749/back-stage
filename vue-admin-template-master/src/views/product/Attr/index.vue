<template>
  <div>
    <el-card style="margin: 20px 0">
      <!-- 通过自定义事件获得子组件传来的各级分类的id -->
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 0 20px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
             <el-popconfirm :title="`确定删除' ${row.attrName} '吗？`" :ref="$index" @onConfirm="deleteAttr($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form ref="form" label-width="80px" :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button>取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            align="center"
            prop="prop"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="属性值名称"
          >
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <!--  这里将span设置成块级元素是因为块级元素独占一行，点空白处也能触发事件。给span设置高度是块级元素由内容撑开高度，若没有高度，则输入为空失焦后无法再次聚焦-->
              <span
                v-if="!row.flag"
                @click="toEdit(row, $index)"
                style="display: block; height: 20px"
                >{{ row.valueName || "" }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="操作"
          >
            <template slot-scope="{ row, $index }">
              <el-popconfirm :title="`确定删除' ${row.valueName} '吗？`" :ref="$index" @onConfirm="deleteAttrValue($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      // 用于修改或添加
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categorylevel: 3,
      },
    };
  },
  components: {},
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
        this.getAttrList();
      }
    },
    // 获取需要渲染的平台属性的数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.default.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        // 属性的id，如果是已有属性，则用this.attrInfo.id，如果是新属性，则用undefined
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      })
      // this.$nextTick(() =>
      // {
      //   this.$refs[this.attrInfo.attrValueList.length-1].focus()          
      // } );
      
    },
    // 添加属性
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categorylevel: 3,
      };
    },
    // 修改属性
    updateAttr(row) {
      this.isShowTable = false;
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) =>
        this.$set(item, "flag", false)
      );
    },
    // input标签失焦后触发
    toLook(row) {
      row.flag = false;
      if (row.valueName.trim() == "") {
        this.$message("输入不能为空");
        return;
      }
      // 新增的属性不能和已有属性重复
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        // 先将"和当前新增属性的数组索引"不同的数组元素筛出来
        if (row != item) {
          // 再判断他们的属性值是否一样
          return row.valueName == item.valueName;
        }
      });
      if (isRepeat) return;
    },
    // input标签聚焦后触发
    toEdit(row, index) {
      row.flag = true;
      this.$nextTick(() =>
      {
        this.$refs[index].focus()          
      } );
    },
    // 属性值“删除”按钮的"确定"选项
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index,1)
    },
    // 属性“删除”按钮的"确定"选项
    deleteAttr(index){
      this.attrList.splice(index,1)
    },
    // “保存”按钮
    async addOrUpdateAttr(){
      // 先过滤掉用户输入为空的属性值
      this.attrInfo.attrValueList=this.attrInfo.attrValueList.filter(item=>{
        if(item.valueName!=''){
          // 再去除掉不应该带给服务器的冗余字段"flag"
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.default.attr.reqAddOrUpdateAttr(this.attrInfo.attrValueList)
        this.isShowTable=true
        this.$message({type:'success',message:'保存成功'})
        this.getAttrList()
      } catch (error) {
        this.$message({message:'保存失败'})
      }
    },
  },
};
</script>
<style scoped lang='less'>
</style>
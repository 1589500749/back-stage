import request from '@/utils/request'

// 获取一级分类
export function reqCategory1List(){
    return request({
    url:`/admin/product/getCategory1`,
    method:'get',
})};
// 获取二级分类
export function reqCategory2List(category1Id){
    return request({
    url:`/admin/product/getCategory2/${category1Id}`,
    method:'get',
})};
// 获取三级分类
export function reqCategory3List(category2Id){
    return request({
    url:`/admin/product/getCategory3/${category2Id}`,
    method:'get',
})};
// 获取平台属性数据
export function reqAttrList(category1Id,category2Id,category3Id){
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method:'get',
    })
}
// 添加(修改)属性和属性值
export function reqAddOrUpdateAttr(data){
    return request({
        url:`/admin/product/saveAttrInfo`,
        method:'post',
        data,
    })
}
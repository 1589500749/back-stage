import request from '@/utils/request'

// 获取SPU列表数据
export function reqSpuList(page,limit,category3Id){
    return request({
    url:`/admin/product/${page}/${limit}`,
    method:'get',
    params:{category3Id}
})};

// SpuForm组件的接口
// 获取SPU信息
export function reqSpu(spuId){
    return request({
    url:`/admin/product/getSpuById/${spuId}`,
    method:'get',
})};
// 获取品牌信息
export function reqTradeMarkList(){
    return request({
    url:`/admin/product/baseTrademark/getTrademarkList`,
    method:'get',
})};
// 获取SPU图标的信息
export function reqSpuImageList(spuId){
    return request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:'get',
})};
// 获取平台全部销售属性
export function reqBaseSaleAttrList(){
    return request({
    url:`/admin/product/baseSaleAttrList`,
    method:'get',
})};
// 修改或添加SPU
export function reqAddOrUpdateSpu(spuInfo){
    if(spuInfo.id){
        return request({
            url:`/admin/product/updateSpuInfo`,
            method:'post',
            data:spuInfo,
        })
    }else{
        return request({
            url:`/admin/product/saveSpuInfo`,
            method:'post',
            data:spuInfo,
        })
    }
    };
// 删除spu
export function reqDeleteSpu(spuId){
    return request({
    url:`/admin/product/deleteSpu/${spuId}`,
    method:'delete',
})};
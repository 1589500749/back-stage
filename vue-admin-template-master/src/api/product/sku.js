import request from '@/utils/request'

// SPU页面中添加sku用到的接口
        // 获取图片
        export function reqSpuImageList(spuId){
            return request({
            url:`/admin/product/spuImageList/${spuId}`,
            method:'get',
        })};
        // 获取销售属性
        export function reqSpuSaleAttrList(spuId){
            return request({
            url:`/admin/product/spuSaleAttrList/${spuId}`,
            method:'get',
        })};
        // 获取平台属性
        export function reqAttrInfoList(category1Id,category2Id,category3Id){
            return request({
            url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
            method:'get',
        })};
        // 提交保存sku
        export function reqAddSku(skuInfo){
            return request({
            url:`/admin/product/saveSkuInfo`,
            method:'post',
            data:skuInfo,
        })};
// SPU页面中查看sku详情
export function reqSkuList(spuId){
    return request({
    url:`/admin/product/findBySpuId/${spuId}`,
    method:'get',
})};


// SKU页面用到的接口
        // 获取sku列表
        export function reqSkuList1(page,limit){
            return request({
            url:`/admin/product/list/${page}/${limit}`,
            method:'get',
        })};
        // 上架
        export function reqSale(skuId){
            return request({
            url:`/admin/product/onSale/${skuId}`,
            method:'get',
        })};
        // 下架
        export function reqCancel(skuId){
            return request({
            url:`/admin/product/cancelSale/${skuId}`,
            method:'get',
        })};
        // 获取sku详情
        export function reqSkuById(skuId){
            return request({
            url:`/admin/product/getSkuById/${skuId}`,
            method:'get',
        })};
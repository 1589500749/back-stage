import request from '@/utils/request'

// 获取品牌列表
export function reqTradeMarkList(page,limit){
    return request({
    url:`/admin/product/baseTrademark/${page}/${limit}`,
    method:'get',
})};
// 添加或者修改品牌
export function reqAddOrUpdateTradeMark(tradeMark){
    if(tradeMark.id){
        return request({
            url:`/admin/product/baseTrademark/update`,
            method:'put',
            data:tradeMark,
        })
    }else{
        return request({
            url:`/admin/product/baseTrademark/save`,
            method:'post',
            data:tradeMark,
        })
    }
};

// 删除品牌
export function reqDeleteTradeMark(id){
    return request({
        url:`/admin/product/baseTrademark/remove/${id}`,
        method:'delete',
    })
};


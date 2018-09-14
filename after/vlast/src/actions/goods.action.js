/**
 * Author：tantingting
 * Time：2017/12/27
 * Description：Description
 */
import { axiosAjax } from '../public/index'
import {Goods} from '../constants/index'
// 专栏goods列表
export const getColumnGoodsList = (arg, fn) => {
    return (dispatch) => {
        axiosAjax('GET', '/api_column_goods', arg, function (res) {
            let data = []
            if (res.code === 200) {
                if (fn) {
                    fn(res.data)
                }
                data = !res.data ? [] : res.data
            }
            let onSale = data.filter((item, index) => {
                return parseInt(item.lk_goods_static) === 1
            })
            let offSale = data.filter((item, index) => {
                return parseInt(item.lk_goods_static) === 2
            })
            dispatch(addGoodsList(data))
            dispatch(addGoodsData({onSale: onSale, offSale: offSale}))
        })
    }
}
// 专栏goods列表 排序
export const editColumnGoodsSort = (arg, index, fn) => {
    return (dispatch) => {
        axiosAjax('GET', '/api_goods_sort', arg, function (res) {
            // let data = []
            if (res.code === 200) {
                if (fn) {
                    fn(res.data)
                }
                // data = !res.data ? [] : res.data
                // dispatch(edittGoodsList(arg, index))
                dispatch(getColumnGoodsList({lk_column_id: arg.lk_column_id}))
            }
        })
    }
}
export const addGoodsList = (data) => {
    return {type: Goods.GET_LIST, data}
}
export const addGoodsData = (data) => {
    return {type: Goods.ADD_DATA, data}
}
export const edittGoodsList = (data, index, status) => {
    return {type: Goods.EDIT_LIST, data, index, status}
}

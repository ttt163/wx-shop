/**
 * Author：tantingting
 * Time：2017/8/25
 * Description：Description
 */
import { axiosAjax } from '../public/index'

import {Order} from '../constants/index'

/*
* 订单列表
*
* */
export const getOrderList = (arg, fun) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_order_list', arg, function (res) {
            let data = res.data
            const actionData = data.data === '' ? [] : data.data
            if (fun) {
                fun(data)
            }
            dispatch({
                type: Order.GET_LIST,
                actionData
            })
        })
    }
}

/*
* 订单详情
*
* */
export const getOrderInfo = (arg) => {
    return (dispatch) => {
        axiosAjax('GET', '/api_column_add', arg, function (data) {
            console.log(data)
        })
    }
}

export const addOrderData = (data) => {
    return {type: Order.ADD_DATA, data}
}
export const addOrderQuery = (data) => {
    return {type: Order.ADD_QUERY, data}
}

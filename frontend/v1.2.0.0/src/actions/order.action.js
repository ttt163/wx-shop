/**
 * Author：tantingting
 * Time：2017/8/25
 * Description：Description
 */
import { ajaxGet } from '../public/index'
import { Order } from '../constants/index'
/*
* 订单信息
* */
export const getOrderList = (sendData) => {
    return (dispatch) => {
        ajaxGet('/api_user_order', sendData, function (data) {
            let actionData = data.data
            if (data.code !== 200 || !actionData) {
                dispatch(addOrderList([]))
            } else {
                dispatch(addOrderList(actionData))
            }
        })
    }
}

export const addOrderData = (data) => {
    return {type: Order.ADD_DATA, data}
}
export const addOrderList = (data) => {
    return {type: Order.LIST_DATA, data}
}

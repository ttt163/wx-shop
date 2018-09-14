/**
 * Author：tantingting
 * Time：2017/8/25
 * Description：Description
 */
import { ajaxGet } from '../public/index'
import { Order } from '../constants/index'
import { showLogin } from './login.action'
import { hashHistory } from 'react-router'
import {addOtherData} from './index'
/*
* 订单信息
* */
export const getOrderList = (sendData, fn) => {
    return (dispatch) => {
        ajaxGet('/api_user_order', sendData, function (data) {
            let actionData = data.data
            if (data.code === -606) {
                hashHistory.push('/')
                dispatch(showLogin(true))
            }
            if (data.code !== 200 || !actionData) {
                dispatch(addOrderList([]))
            } else {
                dispatch(addOrderList(actionData))
                if (fn) {
                    fn(data)
                }
            }
            dispatch(addOtherData({'LoadingShow': false}))
        })
    }
}

export const addOrderData = (data) => {
    return {type: Order.ADD_DATA, data}
}
export const addOrderList = (data) => {
    return {type: Order.LIST_DATA, data}
}

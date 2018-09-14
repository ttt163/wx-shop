/**
 * Author：tantingting
 * Time：2017/8/23
 * Description：Description
 */
// import { hashHistory } from 'react-router'
import { ajaxGet } from '../public/index'

import { Index } from '../constants/index'
import {addOtherData} from './index'

/*
export const login = (sendData) => {
    return (dispatch) => {
        ajaxGet('/web_login', sendData, function (data) {
            const actionData = data.data
            dispatch({
                type: LOGIN,
                actionData
            })
            hashHistory.push('/')
        })
    }
}
*/
/*
* 获取导航
* */
export const getTabData = (sendData) => {
    return (dispatch) => {
        ajaxGet('/web_column_list', sendData, function (data) {
            let actionData = data.data
            dispatch(addTabData(actionData))
            /* dispatch({type: Index.TAP_DATA, actionData})
            dispatch(getGoodsData({'lk_column_id': actionData[0].lk_column_id}))
            dispatch(addIndexData({'columnName': actionData[0].lk_column_name, 'columnId': actionData[0].lk_column_id}) ) */
        })
    }
}
/*
* 获取导航下的商品
* */
/* export const getGoodsData = (sendData) => {
    return (dispatch) => {
        ajaxGet('/web_goods_list', sendData, function (data) {
            let actionData = data.data
            if (data.code !== 200 || !actionData) {
                actionData = []
                dispatch({type: Index.LIST_DATA, actionData})
            } else {
                dispatch({type: Index.LIST_DATA, actionData})
            }
        })
    }
} */
/*
* 获取所有的商品
* */
export const getAllGoodsData = (sendData, fn) => {
    return (dispatch) => {
        dispatch(getTabData({}))
        ajaxGet('/web_goods_list', sendData, (data) => {
            let actionData = data.data
            // console.log(data)
            // console.log(fn)
            /* let tabData = []
            let goodsData = []
            for (let [key, item] of Object.entries(actionData)) {
                tabData = [...tabData, {'lk_column_id': key, 'lk_column_name': item[0].lk_column_name}]
                goodsData = [...goodsData, {
                    'lk_column_id': key,
                    'lk_column_name': item[0].lk_column_name,
                    'goods': item
                }]
            } */
            // dispatch(addTabData(tabData))
            dispatch(addListsData(actionData))
            dispatch(addOtherData({'LoadingShow': false}))
            if (fn) {
                fn(data.datim)
            }
        })
    }
}
export const addIndexData = (data) => {
    return {type: Index.ADD_DATA, data}
}
export const addTabData = (actionData) => {
    return {type: Index.TAP_DATA, actionData}
}
export const addListsData = (actionData) => {
    return {type: Index.LIST_DATA, actionData}
}

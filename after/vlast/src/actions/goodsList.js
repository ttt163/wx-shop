/**
 * Author：zhoushuanglong
 * Time：2017/8/15
 * Description：goods list actions
 */

import { hashHistory } from 'react-router'
import { axiosAjax, axiosFormData } from '../public/index'
import { message } from 'antd'

import {
    SELECTGOOD,
    GOODSDEL,
    // GOODSTATUS
    // GOODSDWON,
    GOODSLIST
    // GOODSSEARCH
} from '../constants/index'

export const goodsListGet = (arg, fn) => {
    return (dispatch) => {
        axiosAjax('GET', '/api_goods_list', arg, function (data) {
            // let data = res.data
            const goodsData = data.data === '' ? [] : data.data
            if (fn) {
                fn(data)
            }
            dispatch({
                type: GOODSLIST,
                goodsData
            })
        })
    }
}

export const goodsAdd = (arg) => {
    return (dispatch) => {
        axiosFormData('POST', '/api_goods_add', arg, function () {
            message.warning('添加成功')
            hashHistory.push('/goods-list')
        })
    }
}

export const goodsUpdate = (arg) => {
    return (dispatch) => {
        axiosFormData('POST', '/api_goods_up', arg, function () {
            goodsListGet(arg)
            message.warning('修改成功')
            hashHistory.push('/goods-list')
        })
    }
}

export const goodsStatus = (arg, fn) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_goods_shlev', arg, function (data) {
            // dispatch(goodsListGet(value))
            fn()
        })
    }
}

export const goodsDelete = (arg, values) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_goods_del', arg, function (data) {
            dispatch({
                type: GOODSDEL
            })
            if (String(data.code).indexOf('2') === -1) {
                message.warning(data.message)
            } else {
                message.warning('删除成功')
            }
            dispatch(goodsListGet(values))
        })
    }
}

export const selectGoodGet = (arg) => {
    let selectData = arg
    return (dispatch) => {
        dispatch({
            type: SELECTGOOD,
            selectData
        })
    }
}

/**
 * Author：tantingting
 * Time：2017/8/24
 * Description：Description
 */
// import { hashHistory } from 'react-router'
import { axiosAjax, axiosFormData } from '../public/index'
import { message } from 'antd'

import {Recommend} from '../constants/index'

/*
* 推荐位数据
* */
export const getRecommendList = () => {
    return (dispatch) => {
        axiosAjax('GET', '/api_recom_list', {}, function (data) {
            const actionData = data.data === '' ? [] : data.data
            dispatch({
                type: Recommend.GET_LIST,
                actionData
            })
        })
    }
}
/*
* 商品列表
* */
export const getGoodsList = (sendData) => {
    return (dispatch) => {
        axiosAjax('GET', '/api_goods_list', sendData, function (data) {
            // let data = res.data
            const actionData = data.data === '' ? [] : data.data
            dispatch({
                type: Recommend.GET_GOODS_LIST,
                actionData
            })
        })
    }
}
/*
* 添加专栏
* */
export const addRecommendItem = (arg) => {
    return (dispatch) => {
        axiosFormData('POST', '/api_recom_add', arg, function (data) {
            message.warning('添加成功')
            dispatch(getRecommendList())
        })
    }
}
/*
* 修改专栏
* */
export const editRecommendItem = (_data, id, index) => {
    return (dispatch) => {
        axiosFormData('POST', '/api_recom_up', _data, function (data) {
            // goodsListGet(arg)
            dispatch(editListItem(_data, index))
            message.warning('修改成功')
            dispatch(getRecommendList())
            // hashHistory.push('/goods-list')
        })
    }
}
/*
* 修改专栏顺序
* */
export const editRecommendSort = (_data, id, index) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_recom_sort', {..._data, 'lk_recom_id': id}, function (data) {
            // goodsListGet(arg)
            dispatch(editListItem(_data, index))
            dispatch(getRecommendList())
            // message.warning('修改成功')
            // hashHistory.push('/goods-list')
        })
    }
}
/*
* 专栏删除
* */
export const delRecommendItem = (data, index) => {
    console.log(data, index)
    return (dispatch) => {
        axiosAjax('GET', '/api_recom_del', data, function (data) {
            dispatch({
                type: Recommend.DEL_DATA, index
            })
            message.warning('删除成功')
            // hashHistory.push('/goods-list')
        })
    }
}

export const editListItem = (data, index) => {
    return {type: Recommend.EDIT_LIST, data, index}
}
export const addRecommend = (data) => {
    return {type: Recommend.ADD_DATA, data}
}
export const addRecommendQuery = (data) => {
    return {type: Recommend.ADD_QUERY, data}
}

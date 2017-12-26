/**
 * Author：tantingting
 * Time：2017/8/24
 * Description：Description
 */
// import { hashHistory } from 'react-router'
import { axiosAjax } from '../public/index'
import { message } from 'antd'

import {Column} from '../constants/index'

/*
* 获取专栏数据
* */
export const getColumnList = () => {
    return (dispatch) => {
        axiosAjax('GET', '/api_column_list', {}, function (data) {
            // console.log(data)
            const actionData = data.data === '' ? [] : data.data
            dispatch({
                type: Column.GET_LIST,
                actionData
            })
        })
    }
}
/*
* 添加专栏
* */
export const addColimnItem = (arg) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_column_add', arg, function (data) {
            message.warning('添加成功')
            dispatch(getColumnList())
        })
    }
}
/*
* 修改显示顺序
* */
export const editColimnSort = (_data, index, id) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_column_sort', {'lk_column_id': id, ..._data}, function (data) {
            // goodsListGet(arg)
            dispatch(editListItem(_data, index))
            dispatch(getColumnList())
            // message.warning('修改成功')
            // hashHistory.push('/goods-list')
        })
    }
}
/*
* 修改专栏
* */
export const editColimnItem = (_data, index, id) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_column_up', {..._data, 'lk_column_id': id}, function (data) {
            // goodsListGet(arg)
            dispatch(editListItem(_data, index))
            // message.warning('修改成功')
            // hashHistory.push('/goods-list')
        })
    }
}
/*
* 专栏删除
* */
export const delColimnItem = (data, index) => {
    // console.log(data, index)
    return (dispatch) => {
        axiosAjax('GET', '/api_column_del', data, function (data) {
            if (data.code === 200) {
                dispatch({
                    type: Column.DEL_DATA, index
                })
                message.warning('删除成功')
            } else {
                message.warning(data.message)
            }
            // hashHistory.push('/goods-list')
        })
    }
}

export const editListItem = (data, index) => {
    return {type: Column.EDIT_LIST, data, index}
}
export const addColumn = (data) => {
    return {type: Column.ADD_DATA, data}
}
export const addColumnQuery = (data) => {
    return {type: Column.ADD_QUERY, data}
}

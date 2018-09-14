/**
 * Author：tantingting
 * Time：2017/12/27
 * Description：Description
 */
// import { hashHistory } from 'react-router'
import { axiosAjax } from '../public/index'
import { message } from 'antd'

import {testUser} from '../constants/index'

/*
* 测试用户列表
* */
export const getTestUserList = (obj) => {
    return (dispatch) => {
        axiosAjax('GET', '/test_user_list', !obj ? {} : obj, function (res) {
            // console.log(data)
            let actionData = []
            if (res.code === 200) {
                actionData = !res.data ? [] : res.data
            }
            dispatch({
                type: testUser.GET_LIST,
                actionData
            })
        })
    }
}
/*
* 搜索测试用户
* */
export const searchUser = (obj) => {
    return (dispatch) => {
        axiosAjax('GET', '/test_user_search', !obj ? {} : obj, function (res) {
            // console.log(data)
            let actionData = []
            if (res.code === 200) {
                // actionData.push(res.data)
                actionData = res.data
            } else {
                actionData = []
            }
            // console.log(actionData)
            dispatch({
                type: testUser.GET_LIST,
                actionData
            })
        })
    }
}
/*
* 添加测试用户
* */
export const addTestUser = (arg) => {
    return (dispatch) => {
        axiosAjax('GET', '/test_user_add', arg, function (res) {
            if (res.code === 200) {
                message.warning('添加成功!')
                dispatch(getTestUserList())
            } else {
                message.warning(res.message)
            }
            // dispatch(addData({'query': {}}))
        })
    }
}
/*
* 删除测试用户
* */
export const delTestUser = (data, index) => {
    return (dispatch) => {
        axiosAjax('GET', '/test_user_del', data, function (res) {
            if (res.code === 200) {
                dispatch({
                    type: testUser.DEL_DATA, index
                })
                message.warning('删除成功')
            } else {
                message.warning(res.message)
            }
        })
    }
}

export const editList = (data, index) => {
    return {type: testUser.EDIT_LIST, data, index}
}
export const addData = (data) => {
    return {type: testUser.ADD_DATA, data}
}
export const addQuery = (data) => {
    return {type: testUser.ADD_QUERY, data}
}

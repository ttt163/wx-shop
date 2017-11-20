/**
 * Author：zhoushuanglong
 * Time：2017/8/15
 * Description：goods list actions
 */

// import { hashHistory } from 'react-router'
import { axiosAjax } from '../public/index'
import { message } from 'antd'

import {
    PERMISSION_LIST
} from '../constants/index'

export const permissionGet = () => {
    return (dispatch) => {
        axiosAjax('GET', '/api_member_list', {}, function (data) {
            const permissionList = data.data === '' ? [] : data.data
            dispatch({
                type: PERMISSION_LIST,
                permissionList
            })
        })
    }
}

export const permissionAdd = (arg) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_member_add', arg, function (data) {
            if (data.code === 200) {
                message.warning('添加成功')
            } else {
                message.warning(data.message)
            }
            dispatch(permissionGet())
        })
    }
}

export const permissionUpdate = (arg) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_member_up', arg, function (data) {
            if (data.code === 200) {
                message.warning('修改成功')
                dispatch(permissionGet())
            } else {
                message.warning(data.message)
            }
        })
    }
}
//
// export const goodsStatus = (arg, value) => {
//     return (dispatch) => {
//         axiosAjax('POST', '/api_goods_shlev', arg, function (data) {
//             dispatch(goodsListGet(value))
//         })
//     }
// }
//
// export const goodsDelete = (arg, values) => {
//     return (dispatch) => {
//         axiosAjax('POST', '/api_goods_del', arg, function (data) {
//             dispatch({
//                 type: GOODSDEL
//             })
//             if (String(data.code).indexOf('2') === -1) {
//                 message.warning(data.message)
//             } else {
//                 message.warning('删除成功')
//             }
//             dispatch(goodsListGet(values))
//         })
//     }
// }
//
// export const selectGoodGet = (arg) => {
//     let selectData = arg
//     return (dispatch) => {
//         dispatch({
//             type: SELECTGOOD,
//             selectData
//         })
//     }
// }

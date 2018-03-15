/**
 * Author：zhoushuanglong
 * Time：2017/8/15
 * Description：goods list actions
 */

// import { hashHistory } from 'react-router'
import { axiosAjax } from '../public/index'
import { message } from 'antd'

import {
    PERMISSION_LIST,
    Permission
} from '../constants/index'

export const permissionGet = () => {
    return (dispatch) => {
        axiosAjax('GET', '/api_member_list', {}, function (data) {
            let permissionList = []
            if (data.code === 200) {
                permissionList = data.data
            } else {
                permissionList = []
            }
            dispatch({
                type: PERMISSION_LIST,
                permissionList
            })
        })
    }
}

// 搜索
export const permissionSearch = (sendData) => {
    return (dispatch) => {
        axiosAjax('GET', '/api_member_search', sendData, function (data) {
            let permissionList = []
            if (data.code === 200) {
                permissionList = data.data
            } else {
                permissionList = []
            }
            dispatch({
                type: PERMISSION_LIST,
                permissionList
            })
        })
    }
}

export const permissionAdd = (arg, fn) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_member_add', arg, function (data) {
            if (data.code === 200) {
                message.warning('添加成功')
                fn()
                dispatch(permissionGet())
            } else {
                message.warning(data.message)
            }
        })
    }
}

export const permissionUpdate = (arg, fn) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_member_up', arg, function (data) {
            if (data.code === 200) {
                message.warning('修改成功')
                dispatch(permissionGet())
                if (fn) {
                    fn()
                }
            } else {
                message.warning(data.message)
            }
        })
    }
}

// 项目权限
export const permissionConfig = (arg, fn) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_deploy_add', arg, function (data) {
            if (data.code === 200) {
                message.warning('配置成功！')
                dispatch(permissionGet())
                if (fn) {
                    fn()
                }
            } else {
                message.warning(data.message)
            }
        })
    }
}
// , {'Content-type': 'application/json'}
// 部门
export const getDepList = () => {
    return (dispatch) => {
        axiosAjax('GET', '/division_list', {}, function (res) {
            let data = []
            let depObj = null
            if (res.code === 200) {
                data = res.data
                data.map((item) => {
                    depObj = {
                        ...depObj,
                        [item.division_id]: item.division_name
                    }
                })
            }
            dispatch({
                type: Permission.ADD_DEP_DATA,
                data
            })
            dispatch({
                type: Permission.ADD_DEP_OBJ,
                depObj
            })
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

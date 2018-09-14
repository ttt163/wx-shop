/**
 * Author：tantingting
 * Time：2017/8/23
 * Description：Description
 */
import { ajaxGet } from '../public/index'
import { Detail } from '../constants/index'
import { addAlertData, addOtherData } from './index'
/*
* 获取区服信息
* */
export const getWebServerData = (sendData) => {
    return (dispatch) => {
        ajaxGet('/web_server_list', sendData, function (data) {
            let actionData = data.data
            if (data.code !== 200 || !actionData) {
                actionData = []
                dispatch({type: Detail.WEB_SERVER_DATA, actionData})
            } else {
                dispatch({type: Detail.WEB_SERVER_DATA, actionData})
            }
        })
    }
}
/*
* 获取角色
* */
export const getRoleData = (sendData) => {
    return (dispatch) => {
        ajaxGet('/web_get_rolelist', sendData, function (data) {
            let actionData = data.data
            if (data.code !== 200 || !actionData) {
                actionData = []
                dispatch({type: Detail.WEB_ROLE_DATA, actionData})
                dispatch(addAlertData({
                    'isShow': true,
                    'msg': '您在本区没有角色',
                    'callBack': function () {
                        dispatch(addQueryData({'server_id': ''}))
                        dispatch(addAlertData({'callBack': null}))
                    }
                }))
                // dispatch(addQueryData({'server_id': ''}))
            } else {
                dispatch({type: Detail.WEB_ROLE_DATA, actionData})
            }
        })
    }
}
/*
 * 获取商品详情
 * */
export const getDetailInfo = (sendData, fn) => {
    return (dispatch) => {
        ajaxGet('/web_carpic_list', sendData, function (data) {
            if (data.code === 200) {
                dispatch(addDetailInfo(data.data[0]))
                dispatch(addOtherData({'LoadingShow': false}))
                if (fn) {
                    fn(data)
                }
            }
        })
    }
}
export const addDetailInfo = (data) => {
    return {type: Detail.ADD_INFO, data}
}
export const addDetailData = (data) => {
    return {type: Detail.ADD_DATA, data}
}
export const addQueryData = (data) => {
    return {type: Detail.ADD_QUERY, data}
}

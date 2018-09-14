/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：index actions
 */

// import { hashHistory } from 'react-router'
import { ajaxGet } from '../public/index'

import {Login} from '../constants/index'
import Cookies from 'js-cookie'

export const login = (sendData, error, fn) => {
    return (dispatch) => {
        ajaxGet('/web_login', sendData, function (data) {
            // const actionData = data
            if (data.code === 200) {
                /* dispatch({
                    type: Login.LOGIN,
                    actionData
                }) */
                dispatch(addLoginData({'isLogin': true}))
                Cookies.set('isLogin', true)
                Cookies.set('loginCookie', { passportName: sendData.passportName, password: sendData.password })
                dispatch(showLogin(false))
                if (fn) {
                    fn()
                }
                // hashHistory.push('/')
            } else {
                /// alert(data.message)
                error(data.message)
            }
        })
    }
}

export const addLoginQuery = (query) => {
    return {type: Login.ADD_QUERY, query}
}
export const showLogin = (bool) => {
    return {type: Login.SHOW_LOGIN, bool}
}
export const addLoginData = (actionData) => {
    return {type: Login.LOGIN, actionData}
}

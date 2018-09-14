/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：index actions
 */

import { hashHistory } from 'react-router'
import $ from 'jquery'
import { axiosAjax } from '../public/index'
import {message} from 'antd'
import {addNavData} from './other.action'

import {
    LOGIN,
    GAMELIST,
    BREADCRUMB,
    NAVIGATION
} from '../constants/index'

export const login = (email, password) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_login', {
            email: email,
            password: password
        }, function (data) {
            if (data.code === 200) {
                const actionData = data.data
                $.cookie('email', actionData.email)
                $.cookie('password', actionData.password)
                $.cookie('role', actionData.role)
                dispatch({
                    type: LOGIN,
                    actionData
                })
                if (parseInt(actionData.role) !== 1) {
                    // let allNavObj = {'114': ['2', '3', '4', '5', '6', '7', '8', '9', '10'], '163': ['2', '3', '4', '5', '6', '7', '8', '9', '10'], '174': ['2', '3', '4', '5', '6', '7', '8', '9', '10']}
                    let navObj = JSON.parse(actionData.power_id)
                    dispatch(addNavData(navObj))
                }
                hashHistory.push('/')
            } else {
                message.error(data.message)
            }
        })
    }
}

export const gameList = () => {
    return (dispatch) => {
        axiosAjax('GET', '/api_game_list', {}, function (data) {
            const actionData = data.data
            dispatch({
                type: GAMELIST,
                actionData
            })
        })
    }
}

export const breadcrumb = (arr) => {
    return {
        type: BREADCRUMB,
        arr
    }
}

export const navigation = (selectkey, openkey) => {
    return {
        type: NAVIGATION,
        selectkey,
        openkey
    }
}

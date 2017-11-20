/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：public function
 */

import axios from 'axios'
import { hashHistory } from 'react-router'

export const ajaxGet = (url, params, fn) => {
    axios.get(url, {
        params: params
    }).then(function (response) {
        const data = response.data
        if (data.code === -102) {
            hashHistory.push('/login')
        } else {
            if (fn) {
                fn.call(this, data)
            }
        }
        /* if (data.code === 200 || data.code === 1) {
            fn.call(this, data)
        } else {
            if (data.code === -102) {
                hashHistory.push('/login')
            }
            alert(data.message)
        } */
    }).catch(function (error) {
        console.log(error)
        // alert(error)
    })
}
export const ajaxPost = (url, params, fn) => {
    axios.post(url, params
    ).then(function (response) {
        const data = response.data
        if (data.code === -102) {
            hashHistory.push('/login')
        } else {
            if (fn) {
                fn.call(this, data)
            }
        }
    }).catch(function (error) {
        console.log(error)
        // alert(error)
    })
}
export const toFixed2 = (val) => {
    return Number(val).toFixed(2)
}
export const formatDate = (val, str) => {
    if (!val) {
        return 0
    }
    let _str = !str ? '-' : str
    let _time = new Date(val * 1000)
    let y = _time.getFullYear()
    let M = _time.getMonth() + 1
    let d = _time.getDate()
    let h = _time.getHours()
    let m = _time.getMinutes()
    let s = _time.getSeconds()
    return y + _str + add0(M) + _str + add0(d) + ' ' + add0(h) + ':' + add0(m) + ':' + add0(s)
}
export const add0 = (m) => {
    return m < 10 ? '0' + m : m
}
// export const phoneReg = /((^1(3|4|5|7|8)\d{9}$)|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
export const phoneReg = /^1(3|4|5|7|8)\d{9}$/
export const URL = 'http://wechatstore.linekong.com'
// export const URL = ''

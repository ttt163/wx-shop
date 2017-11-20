/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：public function
 */

import axios from 'axios'
import {hashHistory} from 'react-router'
import {message} from 'antd'
import $ from 'jquery'
export const URL = 'http://dev-wechatstore.linekong.com'
// export const URL = ''
export const axiosAjax = (type, url, params, fn) => {
    axios({
        method: type,
        url: url,
        params: params
    }).then(function (response) {
        const data = response.data
        if (data.code === -102) {
            hashHistory.push('/login')
        } else {
            fn.call(this, data)
        }
        /* if (data.code === 200) {

        } else {

            message.warning(data.message)
        } */
    }).catch(function (error) {
        message.error(error)
    })
}
export const axiosFormData = (type, url, params, fn) => {
    axios({
        method: type,
        url: url,
        data: params,
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(function (response) {
        // console.log(response)
        const data = response.data
        if (data.code === 200) {
            fn.call(this, data)
        } else {
            if (data.code === -102) {
                hashHistory.push('/login')
            }
            message.warning(data.message)
        }
    }).catch(function (error) {
        message.error(error)
    })
}
export const gameIdCookie = () => {
    if (!$.cookie('gameId')) {
        hashHistory.push('/')
        message.warning('请选择游戏！')
    }
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
export const formatDateToDay = (val, str) => {
    if (!val) {
        return 0
    }
    let _str = !str ? '-' : str
    let _time = new Date(val)
    let y = _time.getFullYear()
    let M = _time.getMonth() + 1
    let d = _time.getDate()
    return y + _str + add0(M) + _str + add0(d)
}
export const add0 = (m) => {
    return m < 10 ? '0' + m : m
}
export const toFixed2 = (val) => {
    return Number(val).toFixed(2)
}
export const GOODSTYPE = {
    '1': '普通商品',
    '2': '账号货币'
}
export const HOTTYPE = {
    1: '无',
    2: '热卖'
}

export const DAYKEY = {
    '7day': '七天',
    '1month': '一月',
    '0.5years': '半年'
}

export const fomatUrlQuery = (obj) => {
    let _query = ''
    for (let [key, val] of Object.entries(obj)) {
        _query += `${key}=${val}&`
    }
    return _query.slice(0, _query.lastIndexOf('&'))
}

// 双轴line
export function towYAxisChartOpt (xData, legendData, color, yAxis, series) {
    let option = {
        toolbox: {
            show: true,
            orient: 'vertical',
            top: '40px',
            right: '40px',
            feature: {
                magicType: {type: ['line', 'bar']},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        color: color,
        xAxis: [
            {
                type: 'category',
                position: 'bottom',
                boundaryGap: false,
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value}'
                },
                data: xData
            }
        ],
        yAxis: yAxis,
        series: series
    }

    let leg = Array.isArray(legendData) ? {data: legendData} : {...legendData}
    return {...option, legend: leg}
}

export function oneLineOpt (yAxisName, timeData, legendData, series, color) {
    let opt = {
        toolbox: {
            show: true,
            orient: 'vertical',
            top: '40px',
            right: '40px',
            feature: {
                magicType: {type: ['line', 'bar']},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%']
            }
        },
        legend: {
            data: legendData,
            center: 'center'
        },
        /* dataZoom: [{
            type: 'inside',
            start: 0,
            end: 20
            /!* startValue: '2017/02/14 00:00',
            endValue:'2017/02/14 08:00' *!/
        }, {
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }], */
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: timeData
        },
        yAxis: {
            name: yAxisName,
            type: 'value'
        },
        series: series
    }
    if (color.length) {
        opt.color = color
    }
    return opt
}
export const formatXAxisDate = (val, str) => {
    if (!val) {
        return 0
    }
    let _str = !str ? '-' : str
    let _time = new Date(val)
    // let y = _time.getFullYear()
    let M = _time.getMonth() + 1
    let d = _time.getDate()
    // return y + _str + add0(M) + _str + add0(d)
    return add0(M) + _str + add0(d)
}
// 根据起始时间和结束时间，返回对应的时间和时间戳区间(每天一个点)
export function getDateRange (start, end) {
    let temp = 1000 * 60 * 60 * 24
    let timeList = []
    let timev = []
    let startTime = parseInt(new Date(start.replace(/-/g, '/')).getTime())
    let endTime = parseInt(new Date(end.replace(/-/g, '/')).getTime())
    let timeDef = (endTime - startTime) / temp
    // console.log(timeDef)
    for (let i = 0; i <= timeDef; i++) {
        timeList.push(formatXAxisDate(startTime + i * temp))
        // let tmpTime = startTime + i * temp
        let tmpTime = formatDateToDay(startTime + i * temp).replace(/-/g, '')
        timev.push(tmpTime)
    }
    // console.log({'time_list': timeList, 'timev': timev})
    return {'time_list': timeList, 'timev': timev}
}

// 半年
export function getPastHalfYear (str) {
    // 先获取当前时间
    let curDate = (new Date()).getTime()
    // 将半年的时间单位换算成毫秒
    let halfYear = 365 / 2 * 24 * 3600 * 1000
    let pastResult = curDate - halfYear
    return formatDateToDay(pastResult, str)
}

// 前一个月
export function getPrevMonth (str) {
    let _str = !str ? '-' : str
    let _time = new Date()
    let y = _time.getFullYear()
    let M = _time.getMonth()
    if (parseInt(M) === 0) {
        M = 12
        y = y - 1
    }
    let d = _time.getDate()
    return y + _str + add0(M) + _str + add0(d)
}

// 前七天
export function getSevenDay () {
    // 先获取当前时间
    let curDate = (new Date()).getTime()
    let sevenDate = 7 * 24 * 3600 * 1000
    let pastResult = curDate - sevenDate
    return formatDateToDay(pastResult)
}

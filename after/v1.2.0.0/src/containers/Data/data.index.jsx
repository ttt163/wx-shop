/**
 * Author：tantingting
 * Time：2017/11/10
 * Description：数据概览页
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Row, Col, DatePicker} from 'antd'
import {towYAxisChartOpt, getDateRange, oneLineOpt, DAYKEY, getPastHalfYear, getPrevMonth, getSevenDay, formatDateToDay, axiosAjax, toFixed2} from '../../public/index'
import './index.scss'
import echarts from 'echarts'
import 'echarts/theme/infographic.js'

const {RangePicker} = DatePicker

class Data extends Component {
    constructor () {
        super()
        this.state = {
            amountDateKey: '7day',
            orderDateKey: '7day',
            userDateKey: '7day',
            'orderSum': 0,
            'orderPay': 0,
            'orderUnpay': 0,
            'orderDist': 0,
            'orderRental': 0,
            'orderDayRental': 0,
            'webCountDay': 0
        }
    }
    componentWillMount () {
        this.getDataInfo()
    }
    componentDidMount () {
        let start = getSevenDay() // 默认前七天的数据
        this.getAmountInfo(start)
        this.getOrderInfo(start)
        this.getUserInfo(start)
    }
    // 实时数据
    getDataInfo () {
        axiosAjax('post', '/report_gather', {}, (res) => {
            // console.log(res)
            if (res.code === 200) {
                let _data = res.data
                this.setState({
                    'orderSum': _data.order_sum,
                    'orderPay': _data.order_pay,
                    'orderUnpay': _data.order_unpay,
                    'orderDist': _data.order_dist,
                    'orderRental': _data.order_rental,
                    'orderDayRental': _data.order_day_rental,
                    'webCountDay': _data.web_count_day
                })
            }
        })
    }
    changDate (val, str, type) {
        if (type === 'amount') {
            this.getAmountInfo(str[0], str[1])
        } else if (type === 'order') {
            this.getOrderInfo(str[0], str[1])
        } else {
            this.getUserInfo(str[0], str[1])
        }
    }

    getChartBydateKeys (key, type) {
        this.setState({
            [`${type}DateKey`]: key
        })
        let start = 0
        // let end = formatDateToDay(new Date().getTime())
        if (key === '1month') {
            start = getPrevMonth()
        } else if (key === '0.5years') {
            start = getPastHalfYear()
        } else {
            start = getSevenDay()
        }
        /* console.log({
            'start': start,
            'end': end
        }) */
        if (type === 'amount') {
            this.getAmountInfo(start)
        } else if (type === 'order') {
            this.getOrderInfo(start)
        } else {
            this.getUserInfo(start)
        }
    }

    // 销售金额走势数据
    getAmountInfo (start, end) {
        let sendData = {}
        let _end = ''
        if (!end) {
            sendData = {'begin_time': start}
            _end = formatDateToDay(new Date().getTime())
        } else {
            sendData = {'begin_time': start, 'end_time': end}
            _end = end
        }
        axiosAjax('post', '/order_rental', {...sendData}, (res) => {
            // console.log(res)
            if (res.code === 200) {
                let _data = res.data
                let all = _data.rental_all
                let payed = _data.rental_pay
                let dataTime = getDateRange(start, _end)
                let timev = dataTime.timev
                let timeList = dataTime.time_list
                let amount = this.formartChartData(timev, payed)
                let amountTotal = this.formartChartData(timev, all, (val) => {
                    return this.formatToWan(val)
                })
                this.initAmountChart(timeList, amountTotal, amount)
            }
        })
    }
    // 销售订单
    getOrderInfo (start, end) {
        let sendData = {}
        let _end = ''
        if (!end) {
            sendData = {'begin_time': start}
            _end = formatDateToDay(new Date().getTime())
        } else {
            sendData = {'begin_time': start, 'end_time': end}
            _end = end
        }
        axiosAjax('post', '/order_trend', {...sendData}, (res) => {
            // console.log(res)
            if (res.code === 200) {
                let _data = res.data
                let all = _data.order_all
                let payed = _data.order_pay
                let dataTime = getDateRange(start, _end)
                let timev = dataTime.timev
                let timeList = dataTime.time_list
                let _payed = this.formartChartData(timev, payed)
                let _all = this.formartChartData(timev, all)
                this.initOrderChart(timeList, _all, _payed)
            }
        })
    }
    // 付费用户走势
    getUserInfo (start, end) {
        let sendData = {}
        let _end = ''
        if (!end) {
            sendData = {'begin_time': start}
            _end = formatDateToDay(new Date().getTime())
        } else {
            sendData = {'begin_time': start, 'end_time': end}
            _end = end
        }
        axiosAjax('post', '/pay_user', {...sendData}, (res) => {
            // console.log(res)
            if (res.code === 200) {
                let _data = res.data
                let all = _data.pay_user
                let dataTime = getDateRange(start, _end)
                let timev = dataTime.timev
                let timeList = dataTime.time_list
                let amount = this.formartChartData(timev, all)
                this.initUserChart(timeList, amount)
            }
        })
    }
    // 格式化图表数据
    formartChartData (timev, data, fn) {
        let resData = []
        for (var i = 0; i < timev.length; i++) {
            let _index = data.findIndex((item, index, arr) => {
                return item.date_day === timev[i]
            })
            if (_index === -1) {
                resData.push(0)
            } else {
                let _val = data[_index].all_rental + ''
                if (fn) {
                    resData.push(fn(_val))
                } else {
                    if (_val.indexOf('.') !== -1) {
                        resData.push(toFixed2(Number(_val)))
                    } else {
                        resData.push(_val)
                    }
                }
            }
        }
        return resData
    }

    // 格式化万元
    formatToWan (val) {
        return toFixed2(Number(val) / 10000)
    }

    // 销售金额走势
    initAmountChart (timeList, amountTotal, amount) {
        let series = [{
            name: '日销售金额',
            type: 'line',
            smooth: true,
            data: amount
        }, {
            name: '累计销售金额',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            data: amountTotal
        }]
        let yAxis = [
            {
                type: 'value',
                name: '元',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '万元',
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ]
        let opt = towYAxisChartOpt(timeList, [], ['#6cbd40', '#d98642'], yAxis, series)
        let optLen = opt.legend
        let grid = {right: '10%', left: '5%'}
        /* let le = {
            ...optLen,
            top: '40%',
            right: '20px',
            orient: 'horizontal'
        } */
        let sendTimeChart = echarts.init(document.getElementById('amountChrat'), 'macarons')
        sendTimeChart.setOption({...opt, 'legend': optLen, 'grid': grid})
    }

    // 销售订单走势
    initOrderChart (timeList, all, paied) {
        let series = [{
            name: '全部 ',
            type: 'line',
            smooth: true,
            data: all
        }, {
            name: '已支付',
            type: 'line',
            smooth: true,
            data: paied
        }]
        /* let yAxis = [
            {
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ] */
        // let opt = towYAxisChartOpt(timeList, [], ['#6cbd40', '#d98642'], yAxis, series)
        let opt = oneLineOpt('', timeList, [], series, ['#6cbd40', '#d98642'])
        let optLen = opt.legend
        let grid = {right: '10%', left: '5%'}
        let sendTimeChart = echarts.init(document.getElementById('orderChrat'), 'macarons')
        sendTimeChart.setOption({...opt, 'legend': optLen, 'grid': grid})
    }

    // 付费用户走势
    initUserChart (timeList, amount) {
        let series = [{
            name: '付费用户走势',
            type: 'line',
            smooth: true,
            data: amount
        }]
        let opt = oneLineOpt('', timeList, [], series, ['#6cbd40'])
        // let opt = towYAxisChartOpt(timeList, ['日销售金额', '累计销售金额'], ['#6cbd40', '#d98642'], yAxis, series)
        let optLen = opt.legend
        let grid = {right: '10%', left: '5%'}
        let sendTimeChart = echarts.init(document.getElementById('userChrat'), 'macarons')
        sendTimeChart.setOption({...opt, 'legend': optLen, 'grid': grid})
    }

    render () {
        const {amountDateKey, orderDateKey, userDateKey, orderSum, orderPay, orderUnpay, orderDist, orderRental, orderDayRental, webCountDay} = this.state
        return <div className="data-wrap">
            {/* 实时数据 */}
            <div className="mb30">
                <div className="data-title"><i className="icon-data"></i>实时数据</div>
                <div className="items-block clearfix">
                    <div className="item">
                        <div className="item-icon bg_greenblue"><i className="data-icon-visit"/></div>
                        <div>当日首页访问次数</div>
                        <span className="num">{!parseInt(webCountDay) ? 0 : webCountDay}</span>
                    </div>
                    <div className="item">
                        <div className="item-icon bg_blue"><i className="data-icon-sale"/></div>
                        <div>当日销售总额</div>
                        <span className="num">{toFixed2(orderDayRental)}</span>
                    </div>
                    <div className="item">
                        <div className="item-icon bg_pink"><i className="data-icon-order"/></div>
                        <div>当日订单总数</div>
                        <span className="num">{orderSum}</span>
                    </div>
                    <div className="item">
                        <div className="item-icon bg_yellow"><i className="data-icon-payed"/></div>
                        <div>当日支付订单</div>
                        <span className="num">{orderPay}</span>
                    </div>
                    <div className="item">
                        <div className="item-icon bg_blue"><i className="data-icon-nopay"/></div>
                        <div>当日未支付订单</div>
                        <span className="num">{orderUnpay}</span>
                    </div>
                    <div className="item">
                        <div className="item-icon bg_pink"><i className="data-icon-user"/></div>
                        <div>当日付费用户总数</div>
                        <span className="num">{orderDist}</span>
                    </div>
                    <div className="item">
                        <div className="item-icon bg_greenblue"><i className="data-icon-money"/></div>
                        <div>累积销售总额</div>
                        <span className="num">{toFixed2(orderRental)}</span>
                    </div>
                </div>
            </div>
            {/* 销售金额走势 */}
            <div className="charts-box">
                <div>
                    <div className="charts-top">
                        <Row>
                            <Col span={8}>
                                <div className="data-title"><i className="icon-sale"></i>销售金额走势（日销售金额&nbsp;<span className="red-color">单位：元 </span>/ 累计销售金额&nbsp;<span className="red-color">单位：万元</span>）</div>
                            </Col>
                            <Col span={16} className="text-right">
                                <RangePicker style={{'width': '400px'}} format="YYYY-MM-DD" onChange={(val, str) => this.changDate(val, str, 'amount')}/>
                                {
                                    Object.keys(DAYKEY).map((key, index) => (
                                        <a onClick={() => this.getChartBydateKeys(key, 'amount')} key={key} className={amountDateKey === key ? 'active' : ''} href="javascript:void(0)">{DAYKEY[key]}</a>
                                    ))
                                }
                                {/* <a className="active" href="javascript:void(0)">七天</a>
                                <a href="javascript:void(0)">一月</a>
                                <a href="javascript:void(0)">半年</a> */}
                            </Col>
                        </Row>
                    </div>
                    <div className="data-charts" id="amountChrat"></div>
                </div>
            </div>
            {/* 销售订单走势 */}
            <div className="charts-box">
                <div>
                    <div className="charts-top">
                        <Row>
                            <Col span={8}>
                                <div className="data-title"><i className="icon-order"></i>销售订单走势（全部 / 已支付）</div>
                            </Col>
                            <Col span={16} className="text-right">
                                <RangePicker style={{'width': '400px'}} format="YYYY-MM-DD" onChange={(val, str) => this.changDate(val, str, 'order')}/>
                                {
                                    Object.keys(DAYKEY).map((key, index) => (
                                        <a onClick={() => this.getChartBydateKeys(key, 'order')} key={key} className={orderDateKey === key ? 'active' : ''} href="javascript:void(0)">{DAYKEY[key]}</a>
                                    ))
                                }
                            </Col>
                        </Row>
                    </div>
                    <div className="data-charts" id="orderChrat"></div>
                </div>
            </div>
            {/* 付费用户走势 */}
            <div className="charts-box">
                <div>
                    <div className="charts-top">
                        <Row>
                            <Col span={8}>
                                <div className="data-title"><i className="icon-user"></i>付费用户走势</div>
                            </Col>
                            <Col span={16} className="text-right">
                                <RangePicker style={{'width': '400px'}} format="YYYY-MM-DD" onChange={(val, str) => this.changDate(val, str, 'user')}/>
                                {
                                    Object.keys(DAYKEY).map((key, index) => (
                                        <a onClick={() => this.getChartBydateKeys(key, 'user')} key={key} className={userDateKey === key ? 'active' : ''} href="javascript:void(0)">{DAYKEY[key]}</a>
                                    ))
                                }
                            </Col>
                        </Row>
                    </div>
                    <div className="data-charts" id="userChrat"></div>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo
    }
}

export default connect(mapStateToProps)(Data)

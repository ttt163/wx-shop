/**
 * Author：tantingting
 * Time：2017/8/22
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Radio, Form, Button, Input, Table, Row, Col, DatePicker, Modal } from 'antd'
import './index.scss'
import '../Config/config.scss'
import { gameIdCookie, formatDate, toFixed2, URL, GOODSTYPE, fomatUrlQuery, axiosAjax, QUOTATYPE } from '../../public/index'
import { goodsPlatform } from '../../public/config'
import { getOrderList, addOrderData, addOrderQuery } from '../../actions/order.action'
import $ from 'jquery'
import '../../public/iconfont.scss'
const { RangePicker } = DatePicker

/* 订单状态 */
const orderState = {
    '0': '未支付',
    '1': '已支付'
}
/* 商品状态 */
const goodsState = {
    '1': '出售中',
    '2': '已下架'
}
/* 限购类型 */
// const quotaType = {
//     'r': '角色',
//     'w': '周',
//     'd': '日'
// }
let columns = []
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
}
class OrderMange extends Component {
    constructor () {
        super()
        this.state = {
            'visible': false,
            'currPage': 1,
            'pageSize': 10,
            'totalCount': 0,
            'orderTotal': 0,
            'all': '',
            'payed': '',
            'noPay': ''
        }
    }

    componentDidMount () {
        const { dispatch } = this.props
        gameIdCookie()
        // 搜索
        let _data = {'lk_game_id': $.cookie('gameId'), 'page': '1'}
        this.getList(_data)
        dispatch(addOrderQuery({'lk_game_id': $.cookie('gameId')}))
    }

    componentWillMount () {
        const { dispatch } = this.props
        this.getOrderSum()
        // 表格数据渲染
        columns = [{
            title: '订单信息',
            key: 'lk_order_id',
            colSpan: 3,
            render: (text, record) => {
                return <div>
                    <div className="mb5">订单编号：{record.lk_order_id}</div>
                    <div>下单时间：{formatDate(record.lk_order_time)}</div>
                </div>
            }
        }, {
            title: '商品信息',
            key: 'lk_goods_name',
            colSpan: 0,
            width: '30%',
            render: (text, record) => {
                return <div className="user-info">
                    <div className="img-box mr15"><img src={`${URL}${record.lk_goods_file}`} /></div>
                    <div>
                        <div className="mb5">{record.lk_goods_name}</div>
                        <div className="flex-inline-between">
                            <span className="mr15">￥{toFixed2(record.lk_goods_sprice)}</span>
                            <span>X {record.lk_nummber}</span>
                        </div>
                    </div>
                </div>
            }
        }, {
            title: '用户信息',
            key: 'lk_role_name',
            colSpan: 0,
            width: '15%',
            render: (text, record) => {
                return <div>
                    <div className="mb5"><span className="mr15">{record.lk_role_name}</span><span>{record.lk_tel}</span></div>
                    <div>{record.lk_passportName}</div>
                </div>
            }
        }, {
            title: '订单状态',
            key: 'lk_order_status',
            render: (text, record) => {
                return <div>
                    <div className={!parseInt(record.lk_order_status) ? 'mb5 red-color' : 'mb5'}>{orderState[record.lk_order_status]}</div>
                    <a onClick={() => {
                        this.setState({ 'visible': true })
                        dispatch(addOrderData({'orderInfo': record}))
                    }}>订单详情</a>
                </div>
            }
        }, {
            title: '收款信息',
            key: 'lk_nummber',
            render: (text, record) => {
                // return <span>￥{record.lk_goods_asales}</span>
                return <span>￥{toFixed2(record.lk_goods_sprice * record.lk_nummber)}</span>
            }
        }]
    }
    getList (sendData) {
        const { dispatch } = this.props
        dispatch(getOrderList(sendData, (res) => {
            this.setState({
                'totalCount': res.total,
                'pageSize': res.per_page,
                'orderTotal': !res.order_pay_sum ? 0 : toFixed2(res.order_pay_sum)
            })
        }))
    }
    // 订单汇总数据
    getOrderSum () {
        axiosAjax('post', '/order_sum', {}, (res) => {
            if (res.code === 200) {
                let _data = res.data
                this.setState({
                    'all': _data.order_all,
                    'payed': _data.order_top,
                    'noPay': _data.order_lower
                })
            }
        })
    }
    /* 搜索 */
    searchOrder = (arg) => {
        const { form, dispatch } = this.props
        let _this = this
        form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            // console.log(fieldsValue)
            const rangeTimeValue = fieldsValue['lk_order_time']
            let values = {
                ...fieldsValue,
                'order_begin_time': !rangeTimeValue || !rangeTimeValue.length ? '' : rangeTimeValue[0].format('YYYY-MM-DD'),
                'order_end_time': !rangeTimeValue || !rangeTimeValue.length ? '' : rangeTimeValue[1].format('YYYY-MM-DD'),
                ...arg
            }
            delete values.lk_order_time
            let sendQuery = {...values, 'lk_game_id': $.cookie('gameId')}
            // 搜索
            dispatch(addOrderQuery(sendQuery))
            // dispatch(getOrderList({...sendQuery, 'page': '1'}))
            _this.getList({...sendQuery, 'page': '1'})
            // form.resetFields()
        })
    }
    export () {
        const {query} = this.props
        // console.log(query)
        let _url = '/api_export'
        let searchQuery = fomatUrlQuery(query)
        // console.log(searchQuery)
        window.location = `${_url}?${searchQuery}`
    }
    createMarkup (_str) {
        return {__html: _str}
    }
    changePage (page) {
        const {query} = this.props
        this.setState({'currPage': page})
        this.getList({...query, 'page': page})
    }
    render () {
        const {getFieldDecorator} = this.props.form
        const {list, orderInfo} = this.props
        const {all, payed, noPay} = this.state
        return <div className="common order">
            <div>
                {/* <FormItem>
                    <RadioGroup size="large" onChange={(e) => { console.log(e); dispatch(addOrderData({'type': e.target.value})) }}>
                        <RadioButton value="all">全部订单</RadioButton>
                        <RadioButton value="success">交易成功</RadioButton>
                        <RadioButton value="deviant">交易异常</RadioButton>
                    </RadioGroup>
                </FormItem> */}
                <Form layout="horizontal">
                    <FormItem>
                        {getFieldDecorator('lk_order_status', {
                            initialValue: ''
                        })(
                            <RadioGroup size="large" onChange={(e) => this.searchOrder({'lk_order_status': e.target.value})}>
                                <RadioButton value="">全部订单&nbsp;&nbsp;{all}</RadioButton>
                                <RadioButton value="1">已支付&nbsp;&nbsp;{payed}</RadioButton>
                                <RadioButton value="0">未支付&nbsp;&nbsp;{noPay}</RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <Row>
                        <Col span={6}>
                            <FormItem label="订单编号" {...formItemLayout}>
                                {getFieldDecorator('lk_order_id', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="下单时间" labelCol={{'span': 4}} wrapperCol={{'span': 18}}>
                                {getFieldDecorator('lk_order_time', {
                                    initialValue: ''
                                })(<RangePicker style={{'width': '100%'}} format="YYYY-MM-DD" onChange={this.onChange} />)}
                            </FormItem>
                        </Col>
                        {/* <Col span={6}>
                            <FormItem label="订单状态" {...formItemLayout}>
                                {getFieldDecorator('lk_order_status', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col> */}
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem label="蓝港账号" {...formItemLayout}>
                                {getFieldDecorator('lk_passportName', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="商品名称" {...formItemLayout}>
                                {getFieldDecorator('lk_goods_name', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        {/* <Col span={6}>
                            <FormItem label="买家昵称" {...formItemLayout}>
                                {getFieldDecorator('lk_order_nick', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="蓝港账号" labelCol={{'span': 12}} wrapperCol={{'span': 12}}>
                                {getFieldDecorator('lk_passportName', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="商品名称" labelCol={{'span': 8}} wrapperCol={{'span': 16}}>
                                {getFieldDecorator('lk_goods_name', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col> */}
                    </Row>
                    <Row>
                        <Col span="20" offset="2">
                            <Button type="primary" htmlType="submit" className="login-form-button mr15" onClick={() => this.searchOrder({})}>搜索</Button>
                            <Button type="primary" className="login-form-button" onClick={() => this.export()}>导出</Button>
                        </Col>
                    </Row>
                </Form>
                <div className="mt30">
                    {/* <Row>
                        <Col span="1" offset="22">
                            <Button type="primary" className="login-form-button mb5" onClick={() => this.export({})}>导出</Button>
                        </Col>
                    </Row> pagination={false} */}
                    <Table columns={columns} dataSource={list.map((item, index) => ({...item, 'key': index}))} bordered pagination={{current: this.state.currPage, total: this.state.totalCount, pageSize: this.state.pageSize, onChange: (page) => this.changePage(page)}}/>
                    {parseInt(this.props.form.getFieldValue('lk_order_status')) !== 1 ? '' : <div style={{'marginTop': !list.length ? '0' : '-50px'}} className="or-total">汇总：<span>{this.state.orderTotal}元</span></div>}
                </div>
            </div>
            {/*
                订单详情
            */}
            <Modal className="common order" width={900} title="订单详情" visible={this.state.visible} onOk={() => this.setState({ 'visible': false })} onCancel={() => this.setState({ 'visible': false })} okText="确认" cancelText="取消">
                <div className="order-info">
                    <div>订单编号：{orderInfo.lk_order_id}</div>
                    <div>下单时间：{formatDate(orderInfo.lk_order_time)}</div>
                    <div>交易状态：<span className={!parseInt(orderInfo.lk_order_status) ? 'red-color' : ''}>{orderState[orderInfo.lk_order_status]}</span></div>
                </div>
                <div className="block mt20">
                    <div className="title"><h4>购买信息</h4></div>
                    <div className="box">
                        <Row>
                            <Col span="21">
                                <Row>
                                    {/* <Col className="form-label" span={3} >买家昵称：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_passportName}</Col> */}
                                    <Col className="form-label" span={3} >蓝港账号：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_passportName}</Col>
                                    <Col className="form-label" span={3} >选择平台：</Col>
                                    <Col className="lh32" span={5} >{!orderInfo.lk_terrace ? 'iOS' : goodsPlatform[orderInfo.lk_terrace]}</Col>
                                    <Col className="form-label" span={3} >联系电话：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_tel}</Col>
                                </Row>
                                {
                                    orderInfo.lk_goods_type === '3' ? (
                                        <Row>
                                            <Col className="form-label" span={3} >兑换码：</Col>
                                            <Col className="lh32" span={5} >{orderInfo.lk_act_code}</Col>
                                        </Row>
                                    ) : (
                                        <Row>
                                            <Col className="form-label" span={3} >选择区服：</Col>
                                            <Col className="lh32" span={5} >{orderInfo.lk_server_name}</Col>
                                            <Col className="form-label" span={3} >选择角色：</Col>
                                            <Col className="lh32" span={5} >{orderInfo.lk_role_name}</Col>
                                        </Row>
                                    )
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
                {/* 商品信息 */}
                <div className="block mt20">
                    <div className="title"><h4>商品信息</h4></div>
                    <div className="box">
                        <Row className="bbdot">
                            <Col span="21">
                                <Row>
                                    <Col className="form-label" span={3} >商品名称：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_goods_name}</Col>
                                    <Col className="form-label" span={3} >商品类型：</Col>
                                    <Col className="lh32" span={5} >{!orderInfo.lk_goods_type ? '' : GOODSTYPE[orderInfo.lk_goods_type]}</Col>
                                    <Col className="form-label" span={3} >专栏类型：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_column_name}</Col>
                                </Row>
                                <Row>
                                    <Col className="form-label" span={3} >商品状态：</Col>
                                    <Col className="lh32" span={5} >{goodsState[orderInfo.lk_goods_static]}</Col>
                                    <Col className="form-label" span={3} >限购平台：</Col>
                                    <Col className="lh32" span={5} >{!orderInfo.lk_terrace ? 'iOS' : goodsPlatform[orderInfo.lk_terrace]}</Col>
                                    {/* <Col className="form-label" span={3} >{orderInfo.lk_goods_type !== '1' ? '' : '限购数量：'}</Col> */}
                                    <Col className="form-label" span={3} >限购数量：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_goods_type !== '1' || orderInfo.lk_quota_type === 'n' ? '不限购' : `每${QUOTATYPE[orderInfo.lk_quota_type]}限购${orderInfo.lk_quota_count}个`}</Col>
                                </Row>
                                <Row>
                                    <Col className="form-label" span={3} >商品原价：</Col>
                                    <Col className="lh32" span={5} >¥{toFixed2(orderInfo.lk_goods_oprice)}</Col>
                                    <Col className="form-label" span={3} >商品售价：</Col>
                                    <Col className="lh32" span={5} >¥{toFixed2(orderInfo.lk_goods_sprice)}</Col>
                                    <Col className="form-label" span={3} >购买数量：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_nummber}</Col>
                                </Row>
                            </Col>
                            <Col span="3">
                                <div>
                                    <img src={`${URL}${orderInfo.lk_goods_file}`}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="21">
                                <Row>
                                    <Col className="form-label" offset="16" span={3} >订单金额：</Col>
                                    <Col className="lh32" span={3} >¥{toFixed2(orderInfo.lk_rental)}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                {/* 商品描述 */}
                <div className="block mt20">
                    <div className="title"><h4>商品描述</h4></div>
                    <div className="box">
                        <Row>
                            <Col span="21">
                                {/* <p className="lh32">{orderInfo.lk_goods_describe}</p> */}
                                <div dangerouslySetInnerHTML={this.createMarkup(orderInfo.lk_mob_desc)}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        query: state.order.query,
        order: state.order,
        list: state.order.list,
        orderInfo: state.order.orderInfo
    }
}

export default connect(mapStateToProps)(Form.create()(OrderMange))

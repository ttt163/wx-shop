/**
 * Author：zhoushuanglong
 * Time：2017/8/16
 * Description：index
 */

import React, { Component } from 'react'
import TabOrder from '../../components/Tab/order.tap'
import { connect } from 'react-redux'
import './index.scss'
import noOrder from './img/no-order.png'
import Title from 'react-title-component'
import { Link, hashHistory } from 'react-router'
import { addOtherData } from '../../actions/index'
import {getOrderList} from '../../actions/order.action'
// import {getDetailInfo} from '../../actions/detail.action'
import { URL, toFixed2, formatDate } from '../../public/index'
import Cookies from 'js-cookie'
const tapData = [
    {'lk_column_id': 1, 'lk_column_name': '全部订单', 'status': 'allOrder'},
    {'lk_column_id': 2, 'lk_column_name': '正常订单', 'status': 'normalOrder'},
    {'lk_column_id': 3, 'lk_column_name': '异常订单', 'status': 'unusualOrder'}
]

class Order extends Component {
    constructor (props) {
        super(props)
        this.state = {
            'currOrder': []
        }
    }
    componentWillMount () {
        const {dispatch} = this.props
        dispatch(addOtherData({'title': '我的订单'}))
        dispatch(addOtherData({'LoadingShow': true}))
        dispatch(getOrderList({}, (res) => {
            this.setState({'currOrder': res.data})
        }))
    }
    selectTap (id, name, status) {
        // status === '' ? this.getOrder() : this.getOrder({'lk_order_status': status})
        this.setState(
            {'currOrder': this.props[status]}
        )
    }
    getOrder (data) {
        const {dispatch} = this.props
        dispatch(getOrderList(data))
    }
    render () {
        const {other} = this.props
        const {currOrder} = this.state
        let gameCookie = Cookies.getJSON('gameInfo')
        return <div className="order-main">
            <Title render={other.title}/>
            <div className="order-tab">
                <TabOrder data={tapData} selectTap={(id, name, status) => this.selectTap(id, name, status)}/>
                {!currOrder.length ? <div className="not-order">
                    {/* 没有订单 */}
                    <div className="no-data"><div><img className="no-order" src={noOrder} /></div><h4>您还没有相关订单！</h4></div>
                    <Link to={{pathname: `/`}}>
                        <i className="iconfont icon-goumai"></i>
                        <span>继续逛逛</span>
                    </Link>
                </div>
                    : <div className="item-box">
                        {/* 订单信息 */}
                        {currOrder.map((item, index) => (
                            <div key={index} className="items">
                                <div className="order-info">
                                    <div>
                                        <div><img src={`${URL}${gameCookie.web_game_icon}`}/></div>
                                        <span>{gameCookie.web_game_name}</span>
                                    </div>
                                    <span>订单编号：{item.lk_order_id}</span>
                                </div>
                                <div className="goods-item">
                                    <div>
                                        <div className="goods-block">
                                            <img src={`${URL}${item.lk_goods_file}`}/>
                                            {parseInt(item.lk_goods_hot) === 2 ? <div className="hot-img"></div> : ''}
                                            <div className="goods-root">{item.lk_terrace === 'Android' ? '仅限安卓' : '仅限iOS'}</div>
                                        </div>
                                        <span>{item.lk_goods_name}</span>
                                    </div>
                                    <div>
                                        <div><i className="iconfont icon-yuan"></i><span>{toFixed2(item.lk_goods_sprice)}</span></div>
                                        <span>x{item.lk_nummber}</span>
                                    </div>
                                </div>
                                <div className="buy-info">
                                    <span>购买&nbsp;{item.lk_nummber}&nbsp;件</span>
                                    <span className="buy-count">合计&nbsp;&nbsp;<i className="iconfont icon-yuan"></i><span>{toFixed2((item.lk_goods_sprice) * (item.lk_nummber))}</span></span>
                                </div>
                                <div className="goods-info">
                                    <div>选择平台：{!item.lk_terrace ? 'iOS' : item.lk_terrace}</div>
                                    <div>选择区服：{item.lk_server_name}</div>
                                    <div>选择角色：{item.lk_role_name}</div>
                                    <div>订单状态：{!item.lk_order_status ? '未支付' : '已支付'}</div>
                                    <div>联系电话：{item.lk_tel}</div>
                                    <div>下单时间：{formatDate(item.lk_order_time)}</div>
                                </div>
                                <div className="btns-block">
                                    <a target="_blank" href="http://www.sobot.com/chat/pc/index.html?sysNum=e6efa4beafc34bcfb47fdceedc0cc132">
                                        <i className="iconfont icon-kefu"></i>
                                        <span>联系客服</span>
                                    </a>
                                    {/*
                                        <a href="javascript:void(0)" onClick={() => { dispatch(getDetailInfo({'lk_goods_id': item.lk_goods_id}, () => hashHistory.push({pathname: `/detail`}))) }}>

                                    */}
                                    <a href="javascript:void(0)" onClick={() => { hashHistory.push({pathname: `/detail`, query: {'lk_goods_id': item.lk_goods_id}}) }}>
                                        <i className="iconfont icon-goumai"></i>
                                        <span>再次购买</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                        {/* <div className="items">
                            <div className="order-info">
                                <div>
                                    <div><img src={user}/></div>
                                    <span>黎明之光</span>
                                </div>
                                订单编号：XXXXX
                            </div>
                            <div className="goods-item">
                                <div>
                                    <div className="goods-block">
                                        <img src={list1}/>
                                        <div className="role android"></div>
                                    </div>
                                    <span>商品名称1</span>
                                </div>
                                <div>
                                    <div><i className="iconfont icon-yuan"></i><span>98</span></div>
                                    <span>X1</span>
                                </div>
                            </div>
                            <div className="buy-info">
                                <span>购买&nbsp;1&nbsp;件</span>
                                <span>合计&nbsp;&nbsp;98</span>
                            </div>
                            <div className="goods-info">
                                <div>选择平台：XX</div>
                                <div>选择区服：XX</div>
                                <div>选择角色：XX</div>
                                <div>订单状态：XX</div>
                                <div>联系电话：XX</div>
                            </div>
                            <div className="btns-block">
                                <a href="#">
                                    <i className="icon-contact"></i>
                                    <span>联系客服</span>
                                </a>
                                <a href="#">
                                    <i className="iconfont icon-goumai"></i>
                                    <span>再次购买</span>
                                </a>
                            </div>
                        </div> */}
                    </div>}
            </div>
            <Link className="home-bth" to={{pathname: `/`, query: {'game_id': gameCookie.web_game_id}}}></Link>
        </div>
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        other: state.other,
        order: state.order,
        list: state.order.list,
        loginInfo: state.login.info,
        allOrder: state.order.list,
        normalOrder: state.order.list.filter((item, index) => {
            return parseInt(item.lk_order_status) === 1
        }),
        unusualOrder: state.order.list.filter((item, index) => {
            return parseInt(item.lk_order_status) === 0
        })
    }
}
export default connect(mapStateToProps)(Order)

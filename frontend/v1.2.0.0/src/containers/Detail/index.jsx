/**
 * Author：zhoushuanglong
 * Time：2017/8/16
 * Description：index
 */

import React, { Component } from 'react'
import './index.scss'
import { connect } from 'react-redux'
import Alert from '../../components/Alert/index'
import { getWebServerData, getRoleData, addQueryData, addDetailData, getDetailInfo } from '../../actions/detail.action'
import { showAlert, addOtherData, addAlertData } from '../../actions/index'
import { ajaxPost, phoneReg, URL, toFixed2 } from '../../public/index'
import Title from 'react-title-component'
// import { hashHistory } from 'react-router'
import { showLogin } from '../../actions/login.action'
import Login from '../Login/index'
import Cookies from 'js-cookie'

const quotaType = {
    'r': '角色',
    'w': '周',
    'd': '日'
}

/* function onBridgeReady () {
    window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            'appId': 'wx2421b1c4370ec43b', // 公众号名称，由商户传入
            'timeStamp': '1395712654', // 时间戳，自1970年以来的秒数
            'nonceStr': 'e61463f8efa94090b1f366cccfbbb444', // 随机串
            'package': 'prepay_id=u802345jgfjsdfgsdg888',
            'signType': 'MD5', // 微信签名方式：
            'paySign': '70EA570631E4BB79628FBCA90534C63FF7FADD89' // 微信签名
        },
        function (res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        }
    )
} */
class Detail extends Component {
    componentDidMount () {
        const {dispatch} = this.props
        dispatch(getWebServerData())
        dispatch(addQueryData({'num': 1}))
        /* if (!info.lk_goods_id) {
            dispatch(addAlertData({
                'isShow': true,
                'msg': '商品不存在！',
                'callBack': function () {
                    hashHistory.goBack()
                    dispatch(addAlertData({'callBack': null}))
                }
            }))
        } */
        // console.log(window.wx)
    }

    componentWillMount () {
        const {dispatch, location} = this.props
        dispatch(addOtherData({'title': '支付'}))
        dispatch(getDetailInfo({'lk_goods_id': location.query.lk_goods_id}))
    }

    componentWillUnmount () {
        const {dispatch} = this.props
        dispatch(addDetailData({'info': {}, 'query': {}}))
    }

    /* 选择区服 */
    selectSever (e) {
        const {dispatch, serverData} = this.props
        let index = e.target.selectedIndex
        dispatch(addQueryData({'server_id': e.target.value, 'lk_server_name': serverData[index - 1].server_name}))
        dispatch(getRoleData({'gateway_id': serverData[index - 1].server_id}))
    }

    /* 选择角色 */
    selectRole (e) {
        const {dispatch, roleData} = this.props
        let index = e.target.selectedIndex
        dispatch(addQueryData({'role_id': e.target.value, 'lk_role_name': roleData[index - 1].role_name}))
    }

    /* 改变数量 */
    changeNum (type, num) {
        const {dispatch} = this.props
        if (isNaN(num)) {
            return
        }
        if (type === 'reduce') {
            dispatch(addQueryData({'num': (!num ? 0 : parseInt(num)) - 1}))
        } else if (type === 'add') {
            dispatch(addQueryData({'num': (!num ? 0 : parseInt(num)) + 1}))
        } else {
            dispatch(addQueryData({'num': num}))
        }
    }

    /* 去支付 */
    goPay () {
        /* console.log(window)
        console.log(window.wx) */
        // onBridgeReady ()
        const {dispatch, query, info} = this.props
        let msg = ''
        let _data = {}
        let sendData = {}
        if (!query.server_id) {
            msg = '请先选择区服！'
            _data = {'isShow': true, 'msg': msg}
            dispatch(showAlert(_data))
            return
        }
        if (info.lk_goods_type !== '2') {
            if (!query.role_id) {
                msg = '请先选择角色！'
                _data = {'isShow': true, 'msg': msg}
                dispatch(showAlert(_data))
                return
            }
        }
        if (!parseInt(query.num)) {
            msg = '请填写购买数量！'
            _data = {'isShow': true, 'msg': msg}
            dispatch(showAlert(_data))
            return
        } else if (query.num > info.lk_quota_count) {
            msg = '购买商品已超出限购范围！'
            _data = {'isShow': true, 'msg': msg}
            dispatch(showAlert(_data))
            return
        }
        /* if (!query.phone) {
            msg = '请输入联系电话！'
            _data = {'isShow': true, 'msg': msg}
            dispatch(showAlert(_data))
            return
        } else */
        if (!!query.phone && !phoneReg.test(query.phone)) {
            msg = '电话号码有误！'
            _data = {'isShow': true, 'msg': msg}
            dispatch(showAlert(_data))
            return
        }
        sendData = {
            'lk_column_id': info.lk_column_id,
            'lk_goods_id': info.lk_goods_id,
            'lk_server': query.server_id.substring(0, query.server_id.indexOf('&&')),
            'lk_server_name': query.lk_server_name,
            'lk_nummber': query.num,
            'lk_tel': query.phone
        }
        if (info.lk_goods_type !== '2') {
            sendData = {...sendData, 'lk_role_name': query.lk_role_name, 'lk_role_id': query.role_id.substring(0, query.role_id.indexOf('&&'))}
        }
        ajaxPost('/web_pay', sendData, function (data) {
        // ajaxPost('/web_pay_test', sendData, function (data) {
            if (data.code === 200) {
                window.location.href = `${URL}/pay/api_pay?lk_order_id=${data.data}`
            } else {
                let alertData = {'isShow': true, 'msg': data.message}
                dispatch(showAlert(alertData))
            }
        })
    }

    createMarkup (_str) {
        // let _str = '<div data-contents=""><div data-block="true" data-editor="eqrjo" data-offset-key="1tgjc-0-0"><div data-offset-key="1tgjc-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="1tgjc-0-0" style="font-weight: bold; color: rgb(255, 0, 0);"><span data-text="true">dssdafdasfdasd</span></span></div></div><div data-block="true" data-editor="eqrjo" data-offset-key="ehpkh-0-0"><div data-offset-key="ehpkh-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="ehpkh-0-0" style="font-weight: bold; color: rgb(255, 127, 0); font-style: italic;"><span data-text="true">safafafaf</span></span></div></div></div>'
        return {__html: _str}
    }

    render () {
        const {dispatch, serverData, roleData, query, alert, other, info} = this.props
        const _lquery = info
        return <div>
            <Title render={other.title}/>
            <div className="detail-main">
                <div className="goods-box">
                    <div className="goods-block">
                        <img src={`${URL}${_lquery.lk_goods_file}`}/>
                        {parseInt(_lquery.lk_goods_hot) === 2 ? <div className="hot-img"></div> : ''}
                        <div className="goods-root">{_lquery.lk_goods_quota === 'android' ? '仅限安卓' : '仅限IOS'}</div>
                    </div>
                    <div className="goods-info">
                        <h4>{_lquery.lk_goods_name}</h4>
                        <div><i
                            className="iconfont icon-yuan"></i>{toFixed2(_lquery.lk_goods_sprice)}<span>{!_lquery.lk_goods_oprice ? '' : toFixed2(_lquery.lk_goods_oprice)}</span>
                        </div>
                    </div>
                </div>
                <div className="goods-detail">
                    <p>礼包内容：</p>
                    <div dangerouslySetInnerHTML={this.createMarkup(_lquery.lk_mob_desc)}/>
                    {/* <div>{_lquery.lk_goods_describe}</div> */}
                </div>
                <div className="h69 platform">
                    <span>选择平台</span>
                    <div className="btns">
                        {/* <a className="android active" href="#">
                        <i className="iconfont icon-anzhuo"></i>安卓
                        <div className="gou-bg"></div>
                    </a> */}
                        <a className="ios active" href="javascript:void(0)"><i className="iconfont icon-ios"></i>iOS
                            <div className="gou-bg"></div>
                        </a>
                    </div>
                </div>
                <div className="h69">
                    <span>选择区服</span>
                    <div className="select-box">
                        <i className="iconfont icon-zhedie" ></i>
                        <select value={query.server_id}
                            onClick={() => !Cookies.get('isLogin') ? dispatch(showLogin(true)) : ''}
                            onChange={(e) => this.selectSever(e)}>
                            <option>点击选择区服</option>
                            {serverData.map((item, index) => (
                                <option key={index} value={`${item.server_id}&&${index}`}>{item.server_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {
                    _lquery.lk_goods_type !== '2' ? (
                        <div className="h69">
                            <span>选择角色</span>
                            <div className="select-box">
                                <i className="iconfont icon-zhedie"></i>
                                <select value={query.role_id}
                                    onClick={() => !Cookies.get('isLogin') ? dispatch(showLogin(true)) : !query.server_id ? dispatch(showAlert({'isShow': true, 'msg': '请先选择区服'})) : ''}
                                    onChange={(e) => !Cookies.get('isLogin') || !query.server_id ? '' : this.selectRole(e)}>
                                    <option>点击选择角色</option>
                                    {roleData.map((item, index) => <option
                                        key={index}
                                        value={`${item.role_id}&&${index}`}>{item.role_name}</option>)}
                                </select>
                            </div>
                        </div>
                    ) : ''
                }
                <div className="h69 edit-count">
                    <span>购买数量</span>
                    <div>
                        <span>每{!info.lk_quota_type ? '' : quotaType[info.lk_quota_type]}限购{info.lk_quota_count}个</span>
                        <div>
                            <a className={_lquery.lk_goods_type === '2' || query.num < 2 ? 'disabled' : ''} href="javascript:void(0)" onClick={() => _lquery.lk_goods_type === '2' || query.num < 2 ? '' : this.changeNum('reduce', query.num)}>
                                <i className="iconfont icon-jian"></i>
                            </a>
                            <input disabled={_lquery.lk_goods_type === '2'} value={query.num} onChange={(e) => this.changeNum('', e.target.value)}/>
                            <a className={_lquery.lk_goods_type === '2' || query.num >= info.lk_quota_count ? 'disabled' : ''} href="javascript:void(0)" onClick={() => _lquery.lk_goods_type === '2' || query.num >= info.lk_quota_count ? '' : this.changeNum('add', query.num)}>
                                <i className="iconfont icon-jia"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="h69">
                    <span>联系电话</span>
                    <input value={query.phone} placeholder="选填，方便订单异常时与您联系" onChange={(e) => dispatch(addQueryData({'phone': e.target.value}))}/>
                </div>
                <div className="pay">
                    <div>合计&nbsp;
                        <i className="iconfont icon-yuan"></i>
                        <span>{!_lquery.lk_goods_sprice ? 0 : toFixed2(_lquery.lk_goods_sprice * (!query.num ? 0 : query.num))}</span>
                    </div>
                    <a onClick={() => !Cookies.get('isLogin') ? dispatch(showLogin(true)) : this.goPay()}>去付款</a>
                </div>
            </div>
            <Alert data={{...alert}} onClose={() => dispatch(addAlertData({'isShow': false}))}/>
            <Login/>
        </div>
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        other: state.other,
        detailInfo: state.detailInfo,
        query: state.detailInfo.query,
        serverData: state.detailInfo.serverData,
        roleData: state.detailInfo.roleData,
        info: state.detailInfo.info,
        alert: state.other.alert
    }
}
export default connect(mapStateToProps)(Detail)

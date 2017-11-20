/**
 * Author：zhoushuanglong
 * Time：2017/8/16
 * Description：index
 */

import React, { Component } from 'react'
import './index.scss'
// import {addIndexData, getTabData, getGoodsData, getAllGoodsData} from '../../actions/index.action'
import {addIndexData, getAllGoodsData} from '../../actions/index.action'
// import {addDetailInfo} from '../../actions/detail.action'
import { hashHistory } from 'react-router'
import CarouselIndex from '../../components/Carousel/index'
import TabIndex from '../../components/Tab/index'
import UserIndex from './index.user'
import { connect } from 'react-redux'
import noData from './img/no-data.png'
// import { Link } from 'react-router'
import Login from '../Login/index'
import Title from 'react-title-component'
import {addOtherData, showAlert} from '../../actions/index'
import {showLogin, addLoginData} from '../../actions/login.action'
import {ajaxGet, URL, toFixed2} from '../../public/index'
import Alert from '../../components/Alert/index'
import Swiper from 'swiper'
import Cookies from 'js-cookie'
// import $ from 'jquery'

class Index extends Component {
    constructor (props) {
        super(props)
        // console.log(props)
        this.state = {
            'carpicList': [],
            'currTapId': 0
        }
    }
    componentWillReceiveProps () {
        const { tapData } = this.props
        if (tapData.length !== 0 && this.state.currTapId === 0) {
            this.setTapId(tapData[0].lk_column_id)
        }
    }
    /* componentDidMount () {
        var obj = document.getElementsByClassName('index-tab-cont')[0]
        alert(1)
        var overscroll = function (el) {
            el.addEventListener('touchstart', function () {
                var top = el.scrollTop, totalScroll = el.scrollHeight, currentScroll = top + el.offsetHeight
                if (top === 0) {
                    el.scrollTop = 1
                } else if (currentScroll === totalScroll) {
                    el.scrollTop = top - 1
                }
            })
            el.addEventListener('touchmove', function (evt) {
                if (el.offsetHeight < el.scrollHeight) {
                    evt._isScroller = true
                }
            })
        }
        overscroll(obj)
        document.body.addEventListener('touchmove', function (evt) {
            if (!evt._isScroller) {
                evt.preventDefault()
            }
        })
    } */
    componentWillMount () {
        // const {dispatch, location, other, loginInfo} = this.props
        const {dispatch, location} = this.props
        dispatch(addOtherData({'title': '微信商城'}))
        // dispatch(getTabData({}))
        // const _this = this
        let gameCookie = Cookies.getJSON('gameInfo')
        if (!location.query.game_id) {
            if (!gameCookie || !gameCookie.web_game_id) {
                return
            }
            dispatch(addLoginData({'web_game_id': gameCookie.lk_game_id, 'web_game_name': gameCookie.lk_game_name, 'web_game_icon': gameCookie.lk_game_file}))
            this.getCarpicList()
            dispatch(getAllGoodsData({}))
        } else {
            this.getIndexData(location.query.game_id)
        }
        /* if (!gameCookie || !gameCookie.web_game_id) {
            this.getIndexData(location.query.game_id)
        } else {
            dispatch(addLoginData({'web_game_id': gameCookie.lk_game_id, 'web_game_name': gameCookie.lk_game_name, 'web_game_icon': gameCookie.lk_game_file}))
            this.getCarpicList()
            dispatch(getAllGoodsData({}))
        } */
        /* let gameId = ''
        if (!other.isSendGameId) {
            if (location.query.game_id) {
                gameId = location.query.game_id
                /!* ajaxGet('/api_web_game', {'lk_game_id': location.query.game_id}, function (data) {
                    if (data.code === 200) {
                        let _data = data.data[0]
                        console.log(data)
                        dispatch(addLoginData({'web_game_id': _data.lk_game_id, 'web_game_name': _data.lk_game_name, 'web_game_icon': _data.lk_game_file}))
                        dispatch(addOtherData({'isSendGameId': true}))
                        _this.getCarpicList()
                        dispatch(getAllGoodsData({}))
                    }
                }) *!/
            } else {
                dispatch(showAlert({'isShow': true, 'msg': '您没有选择游戏ID！'}))
                return
            }
        } else {
            gameId = loginInfo.web_game_id
            /!* dispatch(getAllGoodsData({}))
            this.getCarpicList() *!/
        }
        this.getIndexData(gameId) */
    }
    componentDidMount () {
        ajaxGet('/api_web_sum', {})
        // console.log(window.wx)
        // let grantType = 'client_credential'
        // let appId = 'wx4b9bd59d34f8053a'
        // let secret = '805f170dc0d86d6dd000f36169fe5e69'
        // let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=' + grantType + '&appid=' + appId + '&secret=' + secret
        // ajaxGet(url, {}, (res) => {
        //     console.log(res)
        // })
    }
    setTapId (id) {
        this.setState({
            currTapId: id
        })
    }
    getIndexData (gameId) {
        const {dispatch} = this.props
        const _this = this
        ajaxGet('/api_web_game', {'lk_game_id': gameId}, function (data) {
            if (data.code === 200) {
                let _data = data.data[0]
                Cookies.set('gameInfo', {'web_game_id': _data.lk_game_id, 'web_game_name': _data.lk_game_name, 'web_game_icon': _data.lk_game_file})
                dispatch(addLoginData({'web_game_id': _data.lk_game_id, 'web_game_name': _data.lk_game_name, 'web_game_icon': _data.lk_game_file}))
                // dispatch(addOtherData({'isSendGameId': true}))
                _this.getCarpicList()
                dispatch(getAllGoodsData({}))
            }
        })
    }
    selectTap (id, name) {
        const { dispatch } = this.props
        // dispatch(getGoodsData({'lk_column_id': id}))
        dispatch(addIndexData({'columnName': name, 'columnId': id}))
    }
    getDetailInfo (data) {
        // this.props.dispatch(addDetailInfo(data))
        // hashHistory.push({pathname: `/detail`})
        hashHistory.push({pathname: `/detail`, query: {'lk_goods_id': data.lk_goods_id}})
    }
    // 轮播图数据
    getCarpicList () {
        const { dispatch } = this.props
        ajaxGet('/web_carpic_list', {}, (res) => {
            if (res.code === 200) {
                dispatch(addIndexData({'carpicList': res.data}))
                // this.setState({'carpicList': res.data})
                let bannerSwiper = new Swiper('.swiper-container', {
                    autoplay: 3000,
                    preventClicks: true,
                    preventLinksPropagation: true,
                    autoplayDisableOnInteraction: false
                })
                bannerSwiper.startAutoplay()
            } else {
                dispatch(addIndexData({'carpicList': res.data}))
                // this.setState({'carpicList': []})
            }
        })
    }
    // 滚动
    _scroll (e) {
        const {tapData} = this.props
        let _target = $(e.target)
        let _targetTop = parseInt(_target.offset().top)
        let _bodyHeight = $('body').height()
        let _children = _target.children()
        let _childrenHeight = _children.height()
        let _childrenTop = parseInt(_children.offset().top)
        if (_bodyHeight + 10 > _childrenHeight + _childrenTop) {
            this.setTapId(tapData[tapData.length - 1].lk_column_id)
        } else {
            for (let i = 0; i < tapData.length; i++) {
                let _el = $(`#tapList${tapData[i].lk_column_id}`)
                let _offsetTop = parseInt(_el.offset().top)
                let _height = _el.height()
                let _diff = _targetTop - _height
                if (_offsetTop > _diff && _offsetTop < _targetTop) {
                    this.setTapId(tapData[i].lk_column_id)
                    break
                }
            }
        }
    }
    render () {
        const { dispatch, tapData, listData, other, alert, indexInfo } = this.props
        let gameCookie = Cookies.getJSON('gameInfo')
        return <div className="index-main">
            <Title render={other.title} />
            <header >
                <div>
                    <div className="user-round">
                        <img src={!gameCookie ? '' : `${URL}${gameCookie.web_game_icon}`} />
                    </div>
                    <span>{!gameCookie ? '' : gameCookie.web_game_name}</span>
                </div>
                <div onClick={() => { !Cookies.get('isLogin') ? dispatch(showLogin(true)) : dispatch(addIndexData({'isShowUser': true})) }}>
                    <i className="img-user"></i>
                    <span>个人中心</span>
                </div>
            </header>
            <div className="index-carouser">
                <CarouselIndex setInfo={(item) => this.getDetailInfo(item)} carpicList = {indexInfo.carpicList} />
            </div>
            <div className="index-content">
                <div className="index-tab">
                    <TabIndex currTapId={this.state.currTapId} setTapId={(id) => this.setTapId(id)} data={tapData} selectTap={ (id, name) => this.selectTap(id, name)} />
                </div>
                <div className="index-tab-cont tap-cont" onScroll={(e) => this._scroll(e)}>
                    <div>
                        {
                            !tapData.length ? <div className="no-data"><div><img src={noData}/></div><h4>暂无相关数据！</h4></div>
                                : tapData.map((column, i) => (
                                    <div style={{marginBottom: tapData.length - 1 === i ? '0' : ''}} key={i} id={`tapList${column.lk_column_id}`}>
                                        <div className="title">
                                            <i className="icon-lan"></i>
                                            <span>{!column.lk_column_name ? '' : column.lk_column_name}</span>
                                        </div>
                                        {
                                            !listData || !listData[column.lk_column_id] || !listData[column.lk_column_id].length ? <div className="no-data"><div><img src={noData}/></div><h4>暂无相关数据！</h4></div>
                                                : <div>
                                                    {listData[column.lk_column_id].map((item, index) => (
                                                        <div key={index} className="item" onClick={() => this.getDetailInfo({...item, 'lk_column_id': column.lk_column_id})}>
                                                            <div className="item-goods">
                                                                <div className="goods-block">
                                                                    <img src={`${URL}${item.lk_goods_file}`}/>
                                                                    {parseInt(item.lk_goods_hot) === 2 ? <div className="hot-img-large"></div> : ''}
                                                                    <div className="goods-root">{item.lk_goods_quota === 'android' ? '仅限安卓' : '仅限IOS'}</div>
                                                                    {/* {!item.lk_goods_hot || item.lk_goods_hot === '1' ? '' : <div className="hot-img"></div>}
                                                                <div className="goods-root">{item.lk_goods_quota === 'android' ? '仅限安卓' : '仅限IOS'}</div> */}
                                                                </div>
                                                                <div className="goods-info">
                                                                    <h4>{item.lk_goods_name}</h4>
                                                                    <div>
                                                                        <div>
                                                                            <i className="iconfont icon-yuan"></i>{toFixed2(item.lk_goods_sprice)}
                                                                            <span className="oprice">{!item.lk_goods_oprice ? '' : toFixed2(item.lk_goods_oprice)}</span>
                                                                        </div>
                                                                        <span>已售出{!item.lk_goods_dsales ? 0 : item.lk_goods_dsales}件</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="btn-yellow">
                                                                立即购买
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                        }
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
            <UserIndex />
            <Login />
            <Alert data={{...alert}} onClose={() => dispatch(showAlert({'isShow': false}))}/>
        </div>
    }
}

// export default Index
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        other: state.other,
        alert: state.other.alert,
        loginInfo: state.login.info,
        indexInfo: state.indexInfo,
        tapData: state.indexInfo.tapData,
        listData: state.indexInfo.listData
    }
}
export default connect(mapStateToProps)(Index)

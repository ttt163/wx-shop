/**
 * Author：zhoushuanglong
 * Time：2017/7/26
 * Description：main
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Layout, Breadcrumb, Tag } from 'antd'
import $ from 'jquery'
import {axiosAjax, getCrumbKey} from '../../public/index'
import {NavKey} from '../../public/config'
import Left from './left'

import { breadcrumb, navigation } from '../../actions/index'
import './index.scss'
import MainHeader from './header'
import {addGameData} from '../../actions/other.action'

const {Content, Sider} = Layout

class Main extends Component {
    componentWillMount () {
        this.props.actions.addGameData({'gameName': !$.cookie('gameName') ? '' : $.cookie('gameName'), 'gameIcon': !$.cookie('gameIcon') ? '' : $.cookie('gameIcon')})
    }

    handleClick = () => {
        hashHistory.push('/')
    }
    loginOut () {
        axiosAjax('POST', '/api_login_out', {}, function (data) {
            if (data.code === 200) {
                hashHistory.push('/login')
            }
        })
    }
    render () {
        const props = this.props
        let tag = $.cookie('gameName') ? <Tag onClick={this.handleClick} color="#108ee9" className="game-id">欢迎来到<span className="name"> {props.other.game.gameName} </span>  后台系统</Tag> : ''
        return <Layout>
            <MainHeader tag={tag} />
            <Layout>
                <Sider width={200} className="shop-slider">
                    <Left location = {props.location} />
                </Sider>
                <Layout className="shop-content-wrap">
                    <Breadcrumb className="shop-breadcrumb">
                        {
                            getCrumbKey(props.location).map((item, index) => <Breadcrumb.Item key={index}>{NavKey[item]}</Breadcrumb.Item>)
                        }
                    </Breadcrumb>
                    <Content className="shop-content">
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    }
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo,
        breadcrumbArr: state.breadcrumbArr,
        navigationArr: state.navigationArr,
        other: state.other,
        spinInfo: state.other.spinInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({breadcrumb, navigation, addGameData}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

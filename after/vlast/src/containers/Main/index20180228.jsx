/**
 * Author：zhoushuanglong
 * Time：2017/7/26
 * Description：main
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Layout, Menu, Breadcrumb, Icon, Tag } from 'antd'
import $ from 'jquery'
import {axiosAjax} from '../../public/index'

import { breadcrumb, navigation } from '../../actions/index'
import './index.scss'
import menuData from '../../public/menuData'
// import logo from '../../public/img/logo.svg'
import MainHeader from './header'
import {addGameData} from '../../actions/other.action'

const {SubMenu, Item} = Menu
const {Content, Sider} = Layout

class Main extends Component {
    componentWillMount () {
        const {location} = this.props
        const _query = location.query
        // this.checkLogin()
        if (!_query.navKey) {
            this.props.actions.breadcrumb([menuData[0].text, !menuData[0].children ? menuData[0].text : menuData[0].children[0].text])
            this.props.actions.navigation(!menuData[0].children ? menuData[0].key : menuData[0].children[0].key, !menuData[0].children ? '' : menuData[0].key)
        } else {
            this.props.actions.navigation(_query.navKey, _query.navPrevKey)
            this.props.actions.breadcrumb([_query.crumbPrevText, _query.crumbText])
        }
        this.props.actions.addGameData({'gameName': !$.cookie('gameName') ? '' : $.cookie('gameName'), 'gameIcon': !$.cookie('gameIcon') ? '' : $.cookie('gameIcon')})
    }

    componentWillUpdate () {
        // this.checkLogin()
    }

    // checkLogin = () => {
    //     if (!$.cookie('email') || !$.cookie('password')) {
    //         hashHistory.push('/login')
    //     }
    // }
    handleClick = () => {
        hashHistory.push('/')
    }

    menuJsx = (selectkey, openkey) => {
        const {location} = this.props
        const _query = location.query
        const This = this
        return <Menu
            className="shop-menu"
            mode="inline"
            // openKeys={[openkey ? openkey.toString() : '']}
            defaultOpenKeys={[!_query.navPrevKey ? openkey : _query.navPrevKey]}
            selectedKeys={[selectkey.toString()]}>
            {menuData.map(d => {
                if (d.children) {
                    return <SubMenu
                        key={d.key}
                        title={<span><Icon type={d.icon}/>{d.text}</span>}>
                        {d.children.map(data => {
                            return <Item key={data.key}>
                                <span><Icon type={data.icon}/><span>{data.text}</span></span>
                                <Link onClick={() => {
                                    This.props.actions.breadcrumb([d.text, data.text])
                                    This.props.actions.navigation(data.key, d.key)
                                    hashHistory.push({'pathname': data.link, 'query': {'navKey': data.key, 'navPrevKey': d.key, 'crumbText': data.text, 'crumbPrevText': d.text}})
                                }}/>
                            </Item>
                        })}
                    </SubMenu>
                } else {
                    return <Item key={d.key}>
                        <span><Icon type={d.icon}/><span>{d.text}</span></span>
                        <Link onClick={() => {
                            This.props.actions.breadcrumb([d.text])
                            This.props.actions.navigation(d.key)
                            hashHistory.push({'pathname': d.link, 'query': {'navKey': d.key, 'navPrevKey': '', 'crumbText': d.text, 'crumbPrevText': ''}})
                        }}/>
                    </Item>
                }
            })}
        </Menu>
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
            {/* <Header className="header">
                <div className="shop-logo"><img src={logo}/></div>
                {tag}
                <div className="shop-func">
                    <Button title="系统" type="primary" shape="circle" icon="setting" onClick={() => { hashHistory.push('/system') }}/>
                    <Button title="退出" type="primary" shape="circle" icon="logout" onClick={() => { this.loginOut() }}/>
                </div>
            </Header> */}
            <Layout>
                <Sider width={200} className="shop-slider">
                    {this.menuJsx(this.props.navigationArr[0], this.props.navigationArr[1])}
                </Sider>
                <Layout className="shop-content-wrap">
                    <Breadcrumb className="shop-breadcrumb">
                        {this.props.breadcrumbArr.map((d, i) => {
                            return <Breadcrumb.Item key={i}>{d}</Breadcrumb.Item>
                        })}
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

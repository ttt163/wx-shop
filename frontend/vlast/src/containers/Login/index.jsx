/**
 * Author：tantingting
 * Time：2017/8/19
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './login.index.scss'
import logo from './img/logo.png'
import { login, addLoginQuery, showLogin } from '../../actions/login.action'
import Alert from '../../components/Alert/index'
import { showAlert, addAlertData } from '../../actions/index'
import Cookies from 'js-cookie'

class Login extends Component {
    _login () {
        const {dispatch, query, callBack} = this.props
        if (!query.passportName) {
            dispatch(showAlert({'isShow': true, 'msg': '请输入蓝港通行账号'}))
            return
        }
        if (!query.password) {
            dispatch(showAlert({'isShow': true, 'msg': '请输入密码'}))
            return
        }
        let _data = {
            'strType': '1',
            'userMAC': '0',
            /* 'web_game_id': 163, */
            ...query
        }
        dispatch(login(_data, (msg) => {
            dispatch(showAlert({'isShow': true, 'msg': msg}))
        }, () => {
            if (callBack) {
                callBack()
            }
        }))
    }

    componentWillMount () {
        const {dispatch, query} = this.props
        let loginCookie = Cookies.getJSON('loginCookie')
        if (!loginCookie) {} else if (!query.passportName) {
            dispatch(addLoginQuery({'passportName': loginCookie.passportName, 'password': loginCookie.password}))
        }
    }

    render () {
        const {dispatch, query, isShowLogin, alert} = this.props
        return <div>
            <div className="login-main" onClick={(e) => { dispatch(showLogin(false)) }} style={{'display': !isShowLogin ? 'none' : 'block'}}>
                <div className="login-content" onClick={(e) => {
                    e.nativeEvent.stopImmediatePropagation()
                    e.stopPropagation()
                    dispatch(showLogin(true))
                }}>
                    <div className="logo"><img src={logo}/></div>
                    <div className="input-group">
                        <i className="iconfont icon-user"></i>
                        <input placeholder="请输入蓝港通行账号" value={query.passportName} onChange={(e) => dispatch(addLoginQuery({'passportName': e.target.value}))}/>
                    </div>
                    <div className="input-group">
                        <i className="iconfont icon-pwd"></i>
                        <input placeholder="请输入密码" type="password" value={query.password} onChange={(e) => dispatch(addLoginQuery({'password': e.target.value}))}/>
                    </div>
                    <a className="login-btn" href="javascript:void (0)" onClick={() => this._login()}>登录</a>
                </div>
            </div>
            <Alert data={{...alert}} onClose={() => dispatch(addAlertData({'isShow': false}))}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        isShowLogin: state.login.isShowLogin,
        query: state.login.query,
        alert: state.other.alert
    }
}
export default connect(mapStateToProps)(Login)

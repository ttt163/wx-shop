/**
 * Author：tantingting
 * Time：2017/8/19
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './login.index.scss'
import logo from './img/logo.png'
import {login, addLoginQuery} from '../../actions/login.action'

class Login extends Component {
    _login () {
        const { dispatch, query } = this.props
        let _data = {
            'strType': '1',
            'userMAC': '0',
            'web_game_id': 163,
            ...query
        }
        dispatch(login(_data))
    }
    render () {
        const { dispatch, query } = this.props
        return <div className="login-main">
            <div>
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
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        login: state.login,
        query: state.login.query
    }
}
export default connect(mapStateToProps)(Login)

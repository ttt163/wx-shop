/**
 * Author：zhoushuanglong
 * Time：2017/7/31
 * Description：login
 */

import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd'
import './index.scss'
import { login } from '../../actions/index'

const FormItem = Form.Item
class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch} = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const form = this.props.form.getFieldsValue()
                // this.props.actions.login(form.email, form.password)
                dispatch(login(form.email, form.password))
            }
        })
    }

    render () {
        const {getFieldDecorator} = this.props.form
        return <div className="login-wrap">
            <header className="clearfix"><div className="logo">{/* <img src={logo}/> */}</div><h3 className="system-title">移动商城管理后台</h3></header>
            <div className="login-main">
                <div className="login-contain">
                    <div className="login-icon"></div>
                    <h3>用户登录</h3>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{required: true, message: '请输入账号'}],
                                initialValue: ''
                            })(
                                <Input prefix={
                                    <Icon type="user"/>
                                } type="text" placeholder="请输入账号"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码'}],
                                initialValue: ''
                            })(
                                <Input prefix={
                                    <Icon type="lock"/>
                                } type="password" placeholder="请输入密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {/* <a className="login-form-forgot" href="">忘记密码</a> */}
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
            {/* <div className="shop-logo"><img src={logo}/></div>
            <h1>移动社区管理后台</h1> */}
            {/* <div className="login-content">
                <div className="login-main">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{required: true, message: '请输入账号'}]
                            })(
                                <Input prefix={
                                    <Icon type="user"/>
                                } type="text" placeholder="请输入账号"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码'}]
                            })(
                                <Input prefix={
                                    <Icon type="lock"/>
                                } type="password" placeholder="请输入密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <a className="login-form-forgot" href="">忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div> */}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo
    }
}

export default connect(mapStateToProps)(Form.create()(Login))

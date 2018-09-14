/**
 * Author：tantingting
 * Time：2017/8/22
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Table, Form, Row, Col, Input } from 'antd'
import { selectGoodGet } from '../../actions/goodsList'
import { permissionUpdate, permissionAdd, permissionGet, permissionSearch, getDepList } from '../../actions/permission'
import { gameList } from '../../actions/index'
import './config.scss'
import UserInfo from './user.info'
import UserConfig from './user.config'
import {userRole} from '../../public/config'
// const confirm = Modal.confirm

class UserPermission extends Component {
    constructor () {
        super()
        this.state = {
            index: null,
            visible: false,
            update: false,
            configShow: false,
            sEmail: '',
            configUserType: 'add',
            selectUser: null
        }

        this.columns = [{
            title: '邮箱账号',
            width: '15%',
            dataIndex: 'email'
        }, {
            title: '角色',
            dataIndex: 'role',
            render: (text, record) => {
                return userRole[text]
            }
        }, {
            title: '所属部门或项目组',
            dataIndex: 'division_name'
        }, {
            title: '项目权限',
            width: '30%',
            dataIndex: 'game'
        }, {
            title: '备注',
            dataIndex: 'remark'
        }, {
            title: '最后登录时间',
            dataIndex: 'lk_last_logo_datime'
        }, {
            title: '操作',
            render: (text, record, index) => {
                if (record.email === 'admin') {
                    return <span> 无操作权限</span>
                } else {
                    return <div className="goods-operate">
                        <a className="mr15" onClick={() => {
                            this.edit(record, 'edit')
                        }}>修改用户信息</a>
                        <a className="mr15" onClick={() => {
                            this.editConfig(record)
                        }}>编辑项目权限</a>
                        {/* <a onClick={() => { */}
                        {/* this.deleteConfirm(text) */}
                        {/* }}>删除用户</a> */}
                    </div>
                }
            }
        }]
    }

    componentWillMount () {
        const {actions} = this.props
        actions.gameList()
        actions.permissionGet()
        actions.getDepList()
    }

    edit (record, type) {
        this.props.actions.selectGoodGet(record)
        this.setState({visible: true, configUserType: !type ? 'add' : type})
    }
    editConfig (record) {
        this.props.actions.selectGoodGet(record)
        this.setState({configShow: true, selectUser: record})
    }

    search () {
        const {actions} = this.props
        if (!this.state.sEmail) {
            actions.permissionGet()
        } else {
            actions.permissionSearch({'email': this.state.sEmail})
        }
    }

    // 删除用户
    // deleteConfirm = (text) => {
    //     confirm({
    //         title: '提示',
    //         content: `确认要将此用户 删除 吗 ?`,
    //         onOk () {},
    //         onCancel () {}
    //     })
    // }

    render () {
        const { permissionList, selectUser } = this.props
        return <div className="common system">
            <div className="s-top clearfix">
                <div className="float-left">
                    <Row>
                        <Col span="16"><Input value={this.state.sEmail} onChange={(e) => this.setState({'sEmail': e.target.value})} placeholder="请输入邮箱账号"/></Col>
                        <Col span="6" offset="2"><Button type="primary" icon="search" onClick={() => this.search()}>搜索</Button></Col>
                    </Row>
                </div>
                <div className="float-right">
                    <Button type="primary" icon="plus" onClick={() => this.edit({})}>新建</Button>
                </div>
            </div>
            <Table className="center-table mt15" columns={this.columns} dataSource={permissionList} bordered pagination={true}/>
            <UserInfo type={this.state.configUserType} visible={this.state.visible} close={() => { this.setState({'visible': false}) }} data={selectUser} />
            <UserConfig visible={this.state.configShow} close={() => { this.setState({'configShow': false, selectUser: null}) }} data={this.state.selectUser} />
        </div>
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        selectUser: state.selectGood,
        gameListInfo: state.gameListInfo,
        permissionList: state.permissionList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ permissionUpdate, permissionAdd, permissionGet, permissionSearch, gameList, selectGoodGet, getDepList }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserPermission))

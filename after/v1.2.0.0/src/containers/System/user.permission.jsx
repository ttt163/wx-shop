/**
 * Author：tantingting
 * Time：2017/8/22
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Button, Table, Modal, Form, Radio, Checkbox, Row, Col } from 'antd'
import { selectGoodGet } from '../../actions/goodsList'
import { permissionUpdate, permissionAdd, permissionGet } from '../../actions/permission'
import { gameList } from '../../actions/index'
import './config.scss'
// const { TextArea } = Input
const FormItem = Form.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const confirm = Modal.confirm

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15}
}
const formItem = {
    span: 24,
    offset: 2
}
class UserPermission extends Component {
    constructor () {
        super()
        this.state = {
            index: null,
            visible: false,
            update: false
        }

        this.columns = [{
            title: '邮箱账号',
            width: '25%',
            dataIndex: 'email'
        }, {
            title: '角色',
            dataIndex: 'role',
            width: '15%',
            render: (text, record) => {
                if (text === 0) {
                    return '用户'
                } else if (text === 1) {
                    return '管理员'
                }
            }
        }, {
            title: '项目权限',
            width: '30%',
            dataIndex: 'game',
            render: (text, record) => {
                if (!text || text.length === 0) {
                    return '-'
                } else if (text.length >= 5) {
                    return <div>
                        <span>{text.substring(0, 20)}</span>
                    </div>
                }
                return text
            }
        }, {
            title: '操作',
            render: (text, record, index) => {
                if (record.email === 'admin') {
                    return <span> 无操作权限</span>
                } else {
                    return <div className="goods-operate">
                        <a className="mr15" onClick={() => {
                            this.edit(record)
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
        this.props.actions.gameList()
        this.props.actions.permissionGet()
    }

    edit (record) {
        this.props.actions.selectGoodGet(record)
        this.setState({visible: true, update: true})
    }
    submitForm = (e) => {
        e.preventDefault()
        let { gameListInfo } = this.props
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values.lk_game_id)
            if (!err) {
                values.game = []
                for (let i = 0; i < values.lk_game_id.length; i++) {
                    for (let j = 0; j < gameListInfo.length; j++) {
                        if (parseInt(values.lk_game_id[i]) === gameListInfo[j].lk_game_id) {
                            values.game.push(gameListInfo[j].lk_game_name)
                        }
                    }
                }
                values.static = 0
                values.game = values.game.join(',')
                values.lk_game_id = values.lk_game_id.join(',')
                this.state.update ? this.props.actions.permissionUpdate(values) : this.props.actions.permissionAdd(values)
                this.props.form.resetFields()
                this.setState({ visible: false, update: false })
                this.props.actions.selectGoodGet({})
            } else {
                return false
            }
        })
    }
    // 取消提交
    cancelForm = () => {
        this.setState({visible: false})
        this.props.form.resetFields()
        this.props.actions.selectGoodGet({})
    }

    // 删除用户
    deleteConfirm = (text) => {
        confirm({
            title: '提示',
            content: `确认要将此用户 删除 吗 ?`,
            onOk () {},
            onCancel () {}
        })
    }

    render () {
        const selectUser = this.props.selectUser
        const { permissionList } = this.props
        const {getFieldDecorator} = this.props.form
        return <div className="common system">
            <Button type="primary" icon="plus" onClick={() => this.setState({'visible': !this.state.visible})}>新建</Button>
            <Table className="center-table mt30" columns={this.columns} dataSource={permissionList} bordered pagination={true}/>
            <Modal
                className="common update-permission"
                title={this.state.update ? '修改用户权限' : '新增用户权限'}
                visible = {this.state.visible}
                onOk={this.submitForm}
                onCancel={this.cancelForm}
                okText="确认"
                cancelText="取消"
            >
                <Form>
                    <FormItem label="邮箱账号" {...formItemLayout}>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '请输入正确的邮箱账号'
                            }, {
                                required: true, message: '请输入邮箱账号'
                            }],
                            initialValue: this.state.update ? selectUser.email : ''
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="角色">
                        {getFieldDecorator('role', {
                            initialValue: this.state.update ? `${selectUser.role}` : '0'
                        })(
                            <RadioGroup>
                                <Radio value="0">用户</Radio>
                                <Radio value="1">管理员</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem label="项目权限" {...formItemLayout}>
                        {getFieldDecorator('lk_game_id', {
                            initialValue: selectUser.lk_game_id ? selectUser.lk_game_id.split(',') : []
                        })(
                            <CheckboxGroup>
                                <Row>
                                    {this.props.gameListInfo.map((item, i) => {
                                        return <Col key={i} {...formItem}><Checkbox value={`${item.lk_game_id}`}>{item.lk_game_name}</Checkbox></Col>
                                    })}
                                </Row>
                            </CheckboxGroup>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        selectUser: state.selectGood,
        gameListInfo: state.gameListInfo,
        permissionList: state.permissionList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ permissionUpdate, permissionAdd, permissionGet, gameList, selectGoodGet }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserPermission))

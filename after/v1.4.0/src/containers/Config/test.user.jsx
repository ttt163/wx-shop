/**
 * Author：tantingting
 * Time：2017/12/27
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Table, Modal, Form, Row, Col } from 'antd'
import './config.scss'
import {getTestUserList, addTestUser, searchUser, delTestUser, addData} from '../../actions/testUser.action'
const { TextArea } = Input
const FormItem = Form.Item
let columns = []
const confirm = Modal.confirm
class TestUser extends Component {
    constructor () {
        super()
        this.state = {
            'visible': false,
            'searchName': ''
        }
    }
    componentWillMount () {
        const {dispatch} = this.props
        columns = [{
            title: '序号',
            key: '1',
            render: (text, record) => {
                return <span>{record.key + 1}</span>
            }
        }, {
            title: '测试用户账号',
            key: '2',
            dataIndex: 'passport_name'
        }, {
            title: '操作',
            key: '3',
            render: (text, record) => {
                return <div className="goods-operate">
                    <a onClick={() => this.delColItem(record)}>删除</a>
                </div>
            }
        }]
        dispatch(getTestUserList())
    }
    componentWillUnmount () {
        const {dispatch} = this.props
        dispatch(addData({'query': {}}))
    }
    /* 删除 */
    delColItem (record) {
        const {dispatch} = this.props
        confirm({
            title: '提示',
            content: `确认要删除吗 ?`,
            onOk () {
                dispatch(delTestUser({'test_user_id': record.test_user_id}, record.key))
            },
            onCancel () {}
        })
    }
    submitForm = () => {
        const { form, dispatch } = this.props
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            form.resetFields()
            this.setState({ visible: false })
            // console.log(values)
            dispatch(addTestUser({...values}))
        })
    }
    searchTestUser () {
        const {dispatch} = this.props
        if (!this.state.searchName) {
            return
        }
        dispatch(searchUser({passport_name: this.state.searchName}))
    }
    render () {
        const {getFieldDecorator} = this.props.form
        const {list} = this.props
        return <div className="recommend-config common">
            <Row>
                <Col span="5">
                    <Input value={this.state.searchName} onChange={(e) => this.setState({'searchName': e.target.value})} placeholder="请输入测试用户账号"/>
                </Col>
                <Col span="2" className="text-right">
                    <Button type="primary" icon="search" onClick={() => this.searchTestUser()} >搜索</Button>
                </Col>
                <Col span="2" offset="15" className="text-right">
                    <Button type="primary" icon="plus" onClick={() => { this.setState({'visible': !this.state.visible}) }}>新建</Button>
                </Col>
            </Row>
            <Table className="center-table mt30" columns={columns} dataSource={!list.length ? [] : list.map((item, index) => ({...item, 'key': index}))} bordered />
            {/*
               添加测试用户
            */}
            <Modal className="common" title='添加测试用户' visible={this.state.visible} onOk={() => this.submitForm()} onCancel={() => this.setState({ 'visible': false })}
                okText="确认" cancelText="取消">
                <Form>
                    <FormItem>
                        {getFieldDecorator('passport_name', {
                            rules: [{
                                required: true, message: '请输入要添加测试用户账号，多个账号请用“,”分隔开！'
                            }],
                            initialValue: ''
                        })(<TextArea placeholder="请输入要添加测试用户账号，多个账号请用“,”分隔开" rows="6" />)}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        query: state.testUserData.query,
        list: state.testUserData.list
    }
}

export default connect(mapStateToProps)(Form.create()(TestUser))
